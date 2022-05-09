<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Document;
use App\Models\Link;
use App\Models\Tree;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class TreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rootTree = new Tree([
            'tree_object_type' => 'category',
            'tree_published_from' => Carbon::create(1988)->format('Y-m-d H:i:s'),
            'tree_published_to' => Carbon::create(2099)->format('Y-m-d H:i:s'),
            'tree_is_deletable' => false,
            'tree_alias' => 'root',
            'tree_is_published' => true,
        ]);
        $rootTree->save();

        $rootCategory = new Category([
            'category_name' => 'ROOT',
            'tree_id' => $rootTree->id,
        ]);
        $rootCategory->save();

        $rootTree->category_id = $rootCategory->id;
        $rootTree->save();

        // SYSTEM CATEGORY
        $systemTree = $rootTree->children()->create([
            'tree_is_published' => false,
            'tree_published_from' => null,
            'tree_published_to' => null,
            'tree_is_visible_frontend' => false,
            'tree_is_visible_backend' => true,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => false,
            'tree_is_editable' => false,
            'tree_has_edit_button' => false,
            'tree_is_viewable' => false,
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_menu_is_visible' => false,
            'tree_alias' => 'system_category',
            'tree_object_type' => 'category',
        ]);

        $systemCategory = Category::create([
            'tree_id' => $systemTree->id,
            'category_name' => 'SYSTEM',

        ]);
        $systemCategory->save();

        $systemTree->category_id = $systemCategory->id;
        $systemTree->save();

        // SYSTEM PAGES

        $page404Tree = $systemTree->children()->create([
            'tree_is_published' => true,
            'tree_published_from' => Carbon::create(1988)->format('Y-m-d H:i:s'),
            'tree_published_to' => Carbon::create(2099)->format('Y-m-d H:i:s'),
            'tree_is_visible_frontend' => true,
            'tree_is_visible_backend' => true,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => false,
            'tree_is_editable' => true,
            'tree_has_edit_button' => true,
            'tree_is_viewable' => true,
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_menu_is_visible' => false,
            'tree_alias' => 'page_404',
            'tree_object_type' => 'document',
        ]);

        $page404Document = Document::create([
            'tree_id' => $page404Tree->id,
            'document_name' => '404',
            'document_content' => '404'
        ]);
        $page404Document->save();

        $page404Tree->document_id = $page404Tree->id;
        $page404Tree->save();

        // SAMPLE CATEGORY

        $sampleTree = $rootTree->children()->create([
            'tree_is_published' => true,
            'tree_published_from' => Carbon::create(1988)->format('Y-m-d H:i:s'),
            'tree_published_to' => Carbon::create(2099)->format('Y-m-d H:i:s'),
            'tree_is_visible_frontend' => true,
            'tree_is_visible_backend' => true,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => true,
            'tree_is_editable' => true,
            'tree_has_edit_button' => true,
            'tree_is_viewable' => true,
            'tree_url_is_showable' => true,
            'tree_url_is_editable' => true,
            'tree_menu_is_visible' => true,
            'tree_object_type' => 'category',
        ]);

        $sampleCategory = Category::create([
            'tree_id' => $sampleTree->id,
            'category_name' => 'Sample category',
            'category_url' => '/sample-category'
        ]);
        $sampleCategory->save();

        $sampleTree->category_id = $sampleCategory->id;
        $sampleTree->save();

        // SAMPLE PAGES

        $samplePageTree = $sampleTree->children()->create([
            'tree_is_published' => true,
            'tree_published_from' => Carbon::create(1988)->format('Y-m-d H:i:s'),
            'tree_published_to' => Carbon::create(2099)->format('Y-m-d H:i:s'),
            'tree_is_visible_frontend' => true,
            'tree_is_visible_backend' => true,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => true,
            'tree_is_editable' => true,
            'tree_has_edit_button' => true,
            'tree_is_viewable' => true,
            'tree_url_is_showable' => true,
            'tree_url_is_editable' => true,
            'tree_menu_is_visible' => true,
            'tree_object_type' => 'document',
        ]);

        $samplePageDocument = Document::create([
            'tree_id' => $samplePageTree->id,
            'document_name' => '404',
            'document_content' => '404',
            'document_url' => '/sample-category/sample-document'
        ]);
        $samplePageDocument->save();

        $samplePageTree->document_id = $samplePageDocument->id;
        $samplePageTree->save();

        // SAMPLE LINK

        $sampleLinkTree = $sampleTree->children()->create([
            'tree_is_published' => true,
            'tree_published_from' => Carbon::create(1988)->format('Y-m-d H:i:s'),
            'tree_published_to' => Carbon::create(2099)->format('Y-m-d H:i:s'),
            'tree_is_visible_frontend' => true,
            'tree_is_visible_backend' => true,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => true,
            'tree_is_editable' => true,
            'tree_has_edit_button' => true,
            'tree_is_viewable' => true,
            'tree_url_is_showable' => true,
            'tree_url_is_editable' => true,
            'tree_menu_is_visible' => true,
            'tree_object_type' => 'link',
        ]);

        $sampleLink = Link::create([
            'tree_id' => $sampleLinkTree->id,
            'link_name' => 'Google link',
            'link_url' => 'https://google.com',
            'link_target' => '_blank'
        ]);
        $sampleLink->save();

        $sampleLinkTree->link_id = $sampleLink->id;
        $sampleLinkTree->save();
    }
}
