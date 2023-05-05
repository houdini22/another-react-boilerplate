<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Document;
use App\Models\Link;
use App\Models\Tree;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CmsPagesController extends Controller
{
    public function getPages(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $currentNode = Tree::where('id', '=', $request->get('parent_id'))
            ->where('copy_of_id', null)
            ->with('category')
            ->withDepth()
            ->first();
        $nodes = $currentNode->children()->get();

        $parents = $currentNode->ancestors()->with('category')->get();
        if ($parents) {
            $parents = $parents->toArray();
        }

        $currentNodeData = $currentNode->toArray();
        $currentNodeParent = $currentNode->parent()->first();
        $currentNodeData['parent'] = $currentNodeParent ? $currentNodeParent->toArray() : null;

        return response()->json([
            'nodes' => $nodes->toArray(),
            'currentNode' => $currentNodeData,
            'parents' => $parents ? $parents : []
        ]);
    }

    public function getParentCategorySelectOptions(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $nodes = Tree::where('tree_is_visible_backend', '=', true)
            ->where('tree_is_visible_in_select', '=', true)
            ->where('tree_object_type', '=', 'category')
            ->where('tree_class', '<>', 'copy')
            ->get()
            ->toTree();

        $options = [];

        $traverse = function ($tree, $prefix = ' - ') use (&$traverse, &$options) {
            foreach ($tree as $t) {
                $options[] = [
                    'label' => $prefix . ' ' . $t->category->category_name,
                    'value' => $t->id,
                ];

                $traverse($t->children, $prefix . ' - ');
            }
        };

        $traverse($nodes);

        return response()->json([
            'options' => $options
        ]);
    }

    public function getFetchIndexDocumentsSelectOptions(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $nodes = Tree::where('tree_is_visible_backend', '=', true)
            ->where('tree_is_visible_in_select', '=', true)
            ->where('tree_object_type', '=', 'document')
            ->where('tree_class', '<>', 'copy')
            ->get()
            ->toTree();

        $options = [
        ];

        $traverse = function ($tree, $prefix = ' - ') use (&$traverse, &$options) {
            foreach ($tree as $t) {
                $options[] = [
                    'label' => $prefix . ' ' . $t->document->document_name,
                    'value' => $t->id,
                ];

                $traverse($t->children, $prefix . ' - ');
            }
        };

        $traverse($nodes);

        return response()->json([
            'options' => $options
        ]);
    }

    public function postAddCategory(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $values = $request->post();

        $validator = Validator::make($values, [
            'category.category_name' => ['required', 'max:256'],
            'category.category_url' => ['required', 'max:256', 'unique:categories,category_url'],
            'category.category_meta_title' => 'max:256',
            'category.category_meta_keywords'=> 'max:512',
            'category.category_meta_robots'=> 'max:64',
            'category.category_meta_description'=> 'max:512',
            'tree.tree_is_published' => ['required'],
            'tree.tree_published_from' => ['required'],
            'tree.tree_published_to' => ['required'],
            'tree.tree_display_name' => ['required', 'max:64'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        }

        $parent = Tree::find($values['parent_id']);

        $tree = $parent->children()->create([
            'tree_is_published' => Arr::get($values, 'tree.tree_is_published'),
            'tree_published_from' => Arr::get($values, 'tree.tree_published_from'),
            'tree_published_to' => Arr::get($values, 'tree.tree_published_to'),
            'tree_object_type' => 'category',
            'tree_display_name' => Arr::get($values, 'tree.tree_display_name'),
        ]);

        $menuCategoryIdThis = Arr::get($values, 'category.menu_category_id') === 'new';
        if ($menuCategoryIdThis) {
            unset($values['category']['menu_category_id']);
        }

        $category = new Category(Arr::get($values, 'category'));
        $category->tree_id = $tree->id;
        $category->save();

        if ($menuCategoryIdThis) {
            $category->menu_category_id = $category->id;
            $category->save();
        }

        $tree->category_id = $category->id;
        $tree->save();

        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $tree->toArray()
            ],
        ]);
    }

    public function postEditCategory(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $tree = Tree::with('category')->where('id', '=', Arr::get($request->post(), 'tree.id'))->first();
        if (!$tree) {
            return $this->response404('NOT_FOUND', [
                'id' => Arr::get('tree.id', $request->post())
            ]);
        }

        $values = $request->post();

        $validator = Validator::make($values, [
            'category.category_name' => ['required', 'max:256'],
            'category.category_url' => ['required', 'max:256', 'unique:categories,category_url,'.$tree->category->id],
            'category.category_meta_title' => 'max:256',
            'category.category_meta_keywords'=> 'max:512',
            'category.category_meta_robots'=> 'max:64',
            'category.category_meta_description'=> 'max:512',
            'parent_id' => 'required',
            'tree.tree_is_published' => ['required'],
            'tree.tree_published_from' => ['required'],
            'tree.tree_published_to' => ['required'],
            'tree.tree_display_name' => ['required', 'max:64'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        }


        $tree->fill(Arr::get($values, 'tree'));
        $tree->save();

        $tree->category->fill(Arr::get($values, 'category'));
        $tree->category->save();

        if (Arr::get($values, 'parent_id') != $tree->parent_id) {
            $tree->appendToNode(Tree::find(Arr::get($values, 'parent_id')))->save();
        }

        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $tree->toArray()
            ],
        ]);
    }
    public function postEditDocument(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $tree = Tree::with('document')->where('id', '=', Arr::get($request->post(), 'tree.id'))->first();
        if (!$tree) {
            return $this->response404('NOT_FOUND', [
                'id' => Arr::get('tree.id', $request->post())
            ]);
        }

        $values = $request->post();

        $validator = Validator::make($values, [
            'document.document_name' => ['required', 'max:256'],
            'document.document_url' => ['required', 'max:256', 'unique:documents,id,'.$tree->document->id],
            'parent_id' => 'required',
            'document.document_meta_title' => 'max:256',
            'document.document_meta_keywords'=> 'max:512',
            'document.document_meta_robots'=> 'max:64',
            'document.document_meta_description'=> 'max:512',
            'tree.tree_is_published' => ['required'],
            'tree.tree_published_from' => ['required'],
            'tree.tree_published_to' => ['required'],
            'tree.tree_display_name' => ['required', 'max:64'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        }


        $tree->fill(Arr::get($values, 'tree'));
        $tree->save();

        $tree->document->fill(Arr::get($values, 'document'));
        $tree->document->save();

        if (Arr::get($values, 'parent_id') != $tree->parent_id) {
            $tree->appendToNode(Tree::find(Arr::get($values, 'parent_id')))->save();
        }

        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $tree->toArray()
            ],
        ]);
    }
    public function postEditLink(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $tree = Tree::with('link')->where('id', '=', Arr::get($request->post(), 'tree.id'))->first();
        if (!$tree) {
            return $this->response404('NOT_FOUND', [
                'id' => Arr::get('tree.id', $request->post())
            ]);
        }

        $values = $request->post();

        $validator = Validator::make($values, [
            'link.link_name' => ['required', 'max:256'],
            'link.link_url' => ['required', 'url'],
            'parent_id' => 'required',
            'tree.tree_is_published' => ['required'],
            'tree.tree_published_from' => ['required'],
            'tree.tree_published_to' => ['required'],
            'tree.tree_display_name' => ['required', 'max:64'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        }

        $tree->fill(Arr::get($values, 'tree'));
        $tree->save();

        $tree->link->fill(Arr::get($values, 'link'));
        $tree->link->save();

        if (Arr::get($values, 'parent_id') != $tree->parent_id) {
            $tree->appendToNode(Tree::find(Arr::get($values, 'parent_id')))->save();
        }

        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $tree->toArray()
            ],
        ]);
    }
    public function postPublish(Request $request)
    {
        $tree = Tree::find($request->post('id'));
        $tree->tree_is_published = true;
        $tree->save();

        return response()->json([
            'message' => 'ok'
        ]);
    }

    public function postUnpublish(Request $request)
    {
        $tree = Tree::find($request->post('id'));
        $tree->tree_is_published = false;
        $tree->save();

        return response()->json([
            'message' => 'ok'
        ]);
    }

    public function deleteDeleteNode(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $node = Tree::find($request->get('id'));

        foreach ($node->descendants as $d) {
            $d->delete();
        }
        $node->delete();

        return response()->json([
            'message' => 'ok'
        ]);
    }

    public function postAddDocument(Request $request)
    {
        $values = $request->post();

        $validator = Validator::make($values, [
            'document.document_name' => 'required|max:256',
            'document.document_url' => 'required|max:256|unique:documents,document_url',
            'document.document_meta_title' => 'max:256',
            'document.document_meta_keywords'=> 'max:512',
            'document.document_meta_robots'=> 'max:64',
            'document.document_meta_description'=> 'max:512',
            'parent_id' => 'required',
            'tree.tree_is_published' => ['required'],
            'tree.tree_published_from' => ['required'],
            'tree.tree_published_to' => ['required'],
            'tree.tree_display_name' => ['required', 'max:64'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        }

        $parent = Tree::find($values['parent_id']);

        $tree = $parent->children()->create([
            'tree_is_published' => Arr::get($values, 'tree.tree_is_published'),
            'tree_published_from' => Arr::get($values, 'tree.tree_published_from'),
            'tree_published_to' => Arr::get($values, 'tree.tree_published_to'),
            'tree_object_type' => 'document',
            'tree_display_name' => Arr::get($values, 'tree.tree_display_name'),
        ]);

        $document = new Document(Arr::get($values, 'document'));
        $document->tree_id = $tree->id;
        $document->save();

        $tree->document_id = $document->id;
        $tree->save();

        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $tree->toArray()
            ],
        ]);
    }

    public function postAddLink(Request $request)
    {
        $values = $request->post();

        $validator = Validator::make($values, [
            'link.link_name' => 'required|max:256',
            'link.link_url' => 'required|max:256|url',
            'tree.tree_display_name' => ['required', 'max:64'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        }

        $parent = Tree::find($values['parent_id']);

        $tree = $parent->children()->create([
            'tree_is_published' => Arr::get($values, 'tree.tree_is_published'),
            'tree_published_from' => Arr::get($values, 'tree.tree_published_from'),
            'tree_published_to' => Arr::get($values, 'tree.tree_published_to'),
            'tree_object_type' => 'link',
            'tree_display_name' => Arr::get($values, 'tree.tree_display_name'),
        ]);

        $link = new Link(Arr::get($values, 'link'));
        $link->tree_id = $tree->id;
        $link->save();

        $tree->link_id = $link->id;
        $tree->save();

        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $tree->toArray()
            ],
        ]);
    }
}
