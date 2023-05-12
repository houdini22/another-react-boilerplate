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
            'tree_display_name' => 'root',
        ]);
        $rootTree->save();

        $rootCategory = new Category([
            'category_name' => 'ROOT',
            'tree_id' => $rootTree->id,
        ]);
        $rootCategory->save();

        $rootTree->category_id = $rootCategory->id;
        $rootTree->save();

        // MENU CATEGORY
        $menuTree = $rootTree->children()->create([
            'tree_is_published' => false,
            'tree_published_from' => null,
            'tree_published_to' => null,
            'tree_is_visible_frontend' => false,
            'tree_is_visible_backend' => false,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => false,
            'tree_is_editable' => false,
            'tree_has_edit_button' => false,
            'tree_is_viewable' => false,
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_menu_is_visible' => false,
            'tree_class' => 'system_category',
            'tree_alias' => 'menu_category',
            'tree_object_type' => 'category',
            'tree_display_name' => 'MENU'
        ]);

        $menuTreeCategory = Category::create([
            'tree_id' => $menuTree->id,
            'category_name' => 'MENU',
        ]);
        $menuTreeCategory->save();

        $menuTree->category_id = $menuTreeCategory->id;
        $menuTree->save();

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
            'tree_class' => 'system_category',
            'tree_alias' => 'system_category',
            'tree_object_type' => 'category',
            'tree_display_name' => 'SYSTEM'
        ]);

        $menuTreeCategory = Category::create([
            'tree_id' => $systemTree->id,
            'category_name' => 'SYSTEM',
        ]);
        $menuTreeCategory->save();

        $systemTree->category_id = $menuTreeCategory->id;
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
            'tree_class' => 'system_page',
            'tree_display_name' => '404'
        ]);

        $page404Document = Document::create([
            'tree_id' => $page404Tree->id,
            'document_name' => '404',
            'document_content' => 'Page not found.'
        ]);
        $page404Document->save();

        $page404Tree->document_id = $page404Tree->id;
        $page404Tree->save();

        //

        $pageIndex = $systemTree->children()->create([
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
            'tree_publishing_is_editable' => false,
            'tree_category_is_editable' => false,
            'tree_menu_is_visible' => true,
            'tree_alias' => 'page_index',
            'tree_object_type' => 'document',
            'tree_class' => 'system_page',
            'tree_display_name' => 'Hello, World! - Index'
        ]);

        $pageIndexDocument = Document::create([
            'tree_id' => $pageIndex->id,
            'document_name' => 'Hello, World! - Index',
            'document_content' => 'Hello, World! - Content from CMS.'
        ]);
        $pageIndexDocument->save();

        $pageIndex->document_id = $pageIndexDocument->id;
        $pageIndex->save();

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
            'tree_display_name' => 'Sample Category'
        ]);

        $sampleCategory = Category::create([
            'tree_id' => $sampleTree->id,
            'category_name' => 'Sample Category',
            'category_url' => '/sample-category'
        ]);
        $sampleCategory->save();

        $sampleTree->category_id = $sampleCategory->id;
        $sampleTree->save();

        // INDEX DOCUMENT

        $samplePageTreeIndex = $sampleTree->children()->create([
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
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_publishing_is_editable' => false,
            'tree_menu_is_visible' => true,
            'tree_object_type' => 'document',
            'tree_class' => 'index_page',
            'tree_display_name' => 'Index Document'
        ]);

        $samplePageTreeIndexDocument = Document::create([
            'tree_id' => $samplePageTreeIndex->id,
            'document_name' => 'Index page of Sample Category',
            'document_content' => 'Some content...'
        ]);
        $samplePageTreeIndexDocument->save();

        $samplePageTreeIndex->document_id = $samplePageTreeIndexDocument->id;
        $samplePageTreeIndex->save();

        $sampleCategory->index_document_id = $samplePageTreeIndex->id;
        $sampleCategory->menu_category_id = $sampleTree->id;
        $sampleCategory->save();

        // SAMPLE SUBCATEGORY

        $sampleTree2 = $sampleTree->children()->create([
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
            'tree_display_name' => 'Sample Subcategory'
        ]);

        $sampleCategory2 = Category::create([
            'tree_id' => $sampleTree2->id,
            'category_name' => 'Sample Subcategory',
            'category_url' => '/sample-category/sample-subcategory'
        ]);
        $sampleCategory2->save();

        $sampleTree2->category_id = $sampleCategory2->id;
        $sampleTree2->save();

        // INDEX DOCUMENT

        $samplePageTreeIndex2 = $sampleTree2->children()->create([
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
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_publishing_is_editable' => false,
            'tree_menu_is_visible' => true,
            'tree_class' => 'index_page',
            'tree_object_type' => 'document',
            'tree_display_name' => 'Index Document'
        ]);

        $samplePageTreeIndexDocument2 = Document::create([
            'tree_id' => $samplePageTreeIndex2->id,
            'document_name' => 'Index page of Sample Subcategory',
            'document_content' => 'Some content...'
        ]);
        $samplePageTreeIndexDocument2->save();

        $samplePageTreeIndex2->document_id = $samplePageTreeIndexDocument2->id;
        $samplePageTreeIndex2->save();

        $sampleCategory2->index_document_id = $samplePageTreeIndex2->id;
        $sampleCategory2->menu_category_id = $sampleTree2->id;
        $sampleCategory2->save();

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
            'tree_display_name' => 'Sample document'
        ]);

        $samplePageDocument = Document::create([
            'tree_id' => $samplePageTree->id,
            'document_name' => 'Sample document',
            'document_url' => '/sample-category/sample-document',
            'document_content' => 'Some content...',
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
            'tree_display_name' => 'Google link'
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
