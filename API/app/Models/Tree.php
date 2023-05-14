<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Kalnoy\Nestedset\NodeTrait;

class Tree extends Model
{
    use HasFactory;
    use NodeTrait;

    protected $table = 'tree';
    protected $with = ['category', 'document', 'link'];
    protected $fillable = [
        'tree_is_published',
        'tree_published_from',
        'tree_published_to',
        'tree_is_visible_frontend',
        'tree_is_visible_backend',
        'tree_is_visible_in_select',
        'tree_is_deletable',
        'tree_is_editable',
        'tree_has_edit_button',
        'tree_is_viewable',
        'tree_url_is_showable',
        'tree_url_is_editable',
        'tree_menu_is_visible',
        'tree_alias',
        'tree_object_type',
        'tree_class',
        'parent_id',
        'tree_display_name',
        'tree_publishing_is_editable',
    ];

    public function category()
    {
        return $this->hasOne(Category::class);
    }

    public function document()
    {
        return $this->hasOne(Document::class);
    }

    public function documentCategory()
    {
        return $this->hasOne(Tree::class, 'id', 'parent_id');
    }

    public function link()
    {
        return $this->hasOne(Link::class);
    }

    public function delete()
    {
        if ($this->tree_object_type === 'category') {
            $this->category()->delete();
        } elseif ($this->tree_object_type === 'document') {
            $this->document()->delete();
        } elseif ($this->tree_object_type === "link") {
            $this->link()->delete();
        }

        return parent::delete(); // TODO: Change the autogenerated stub
    }

    public static function getMenuByName($name)
    {
        return Tree::where('tree_alias', '=', 'menu_category')
            ->first()
            ->children()
            ->where(function ($query) use ($name) {
                $query->where('tree_alias', '=', $name);
            })
            ->first()
            ->children()
            ->with('link')
            ->with('link.iconFile')
            ->with('link.linkDocument')
            ->with('link.linkDocument.document')
            ->with('link.linkCategory')
            ->with('link.linkCategory.category')
            ->with('link.linkCategory.children')
            ->with('link.linkCategory.children.category')
            ->with('link.linkCategory.children.document')
            ->with('link.linkCategory.children.link')
            ->where(function($query) {
                $query->where(function($query) {
                    $query->whereHas('link.linkCategory.children', function($query) {
                        $query->where('tree.tree_class', '<>', 'index_page');
                    });
                })->orWhere(function($query) {
                    $query->whereDoesntHave('link.linkCategory.children');
                });

            })
            ->get()
            ->toTree();
    }

    public static function createNodeCategory($treeData, $categoryData)
    {
        $treeData['tree_object_type'] = 'category';

        $tree = Tree::create($treeData);

        $categoryData['tree_id'] = $tree->id;
        $category = Category::create($categoryData);

        $tree->category_id = $category->id;
        $tree->save();

        return $tree;
    }

    public function createChildren($children)
    {
        foreach ($children as $child) {
            if (Arr::get($child, 'type') === 'document') {
                $documentTree = $this->createChildDocument(Arr::get($child, 'tree'), Arr::get($child, 'document'));

                if (Arr::get($child, 'onAdd')) {
                    Arr::get($child, 'onAdd')($documentTree, $documentTree->document()->first(), $this);
                }
            } elseif (Arr::get($child, 'type') === 'category') {
                $categoryTree = $this->createChildCategory(Arr::get($child, 'tree'), Arr::get($child, 'category'));
                $categoryTree->createChildren(Arr::get($child, 'children', []));
            } elseif (Arr::get($child, 'type') === 'link') {
                $this->createChildLink(Arr::get($child, 'tree'), Arr::get($child, 'link'));
            }
        }
    }

    public function createChildCategory($treeData, $categoryData, $children = [], $onAdd = null)
    {
        $treeData['tree_object_type'] = 'category';

        $tree = $this->children()->create($treeData);

        $categoryData['tree_id'] = $tree->id;
        $category = Category::create($categoryData);

        $tree->category_id = $category->id;
        $tree->save();
        $category->menu_category_id = $tree->id;
        $category->save();

        $tree->createChildren($children);

        if ($onAdd) {
            $onAdd($tree, $category, $this);
        }

        return $tree;
    }

    public function createChildDocument($treeData, $documentData)
    {
        $treeData['tree_object_type'] = 'document';

        $tree = $this->children()->create($treeData);

        $documentData['tree_id'] = $tree->id;
        $document = Document::create($documentData);

        $tree->document_id = $document->id;
        $tree->save();

        return $tree;
    }

    public function createChildLink($treeData, $linkData)
    {
        $treeData['tree_object_type'] = 'link';

        $tree = $this->children()->create($treeData);

        $linkData['tree_id'] = $tree->id;
        $link = Link::create($linkData);

        $tree->link_id = $link->id;
        $tree->save();

        return $tree;
    }

    public static function getPartialByName($name)
    {
        $tree = Tree::with('document')
            ->where('tree_alias', '=', $name)
            ->first();

        return $tree;
    }
}
