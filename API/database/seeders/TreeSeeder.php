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
        $rootTree = Tree::createNodeCategory([
            'tree_is_deletable' => false,
            'tree_is_published' => false,
            'tree_alias' => 'root',
            'tree_display_name' => 'ROOT',
        ], [
            'category_name' => 'ROOT',
        ]);

        $rootTree->createChildCategory([
            'tree_is_published' => false,
            'tree_is_visible_frontend' => false,
            'tree_is_visible_backend' => false,
            'tree_is_visible_in_select' => false,
            'tree_is_deletable' => false,
            'tree_is_editable' => false,
            'tree_has_edit_button' => false,
            'tree_is_viewable' => false,
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_menu_is_visible' => false,
            'tree_class' => 'system_category',
            'tree_alias' => 'menu_category',
            'tree_display_name' => 'MENU'
        ], [
            'category_name' => 'MENU',
        ], [
            [
                'type' => 'category',
                'tree' => [
                    'tree_is_deletable' => false,
                    'tree_url_is_showable' => false,
                    'tree_url_is_editable' => false,
                    'tree_publishing_is_editable' => false,
                    'tree_alias' => 'main_menu',
                    'tree_display_name' => "Main Menu",
                    'tree_class' => 'menu_category'
                ],
                'category' => [
                    'category_name' => 'Main Menu'
                ]
            ]
        ]);

        $rootTree->createChildCategory([
            'tree_is_published' => false,
            'tree_is_visible_frontend' => false,
            'tree_is_visible_backend' => false,
            'tree_is_visible_in_select' => false,
            'tree_is_deletable' => false,
            'tree_is_editable' => false,
            'tree_has_edit_button' => false,
            'tree_is_viewable' => false,
            'tree_url_is_showable' => false,
            'tree_url_is_editable' => false,
            'tree_menu_is_visible' => false,
            'tree_class' => 'system_category',
            'tree_alias' => 'partials_category',
            'tree_display_name' => 'PARTIALS'
        ], [
            'category_name' => 'PARTIALS',
        ], [
            [
                'type' => 'document',
                'tree' => [
                    'tree_is_deletable' => false,
                    'tree_url_is_showable' => false,
                    'tree_url_is_editable' => false,
                    'tree_alias' => 'login_partial',
                    'tree_display_name' => "Login Partial"
                ],
                'document' => [
                    'document_content' => 'Some text showing on login page...'
                ]
            ],
            [
                'type' => 'document',
                'tree' => [
                    'tree_is_deletable' => false,
                    'tree_url_is_showable' => false,
                    'tree_url_is_editable' => false,
                    'tree_alias' => 'register_partial',
                    'tree_display_name' => "Register Partial"
                ],
                'document' => [
                    'document_content' => 'Some text showing on register page...'
                ]
            ]
        ]);

        // SYSTEM CATEGORY
        $rootTree->createChildCategory([
            'tree_is_published' => false,
            'tree_published_from' => null,
            'tree_published_to' => null,
            'tree_is_visible_frontend' => false,
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
        ], [
            'category_name' => 'SYSTEM',
        ], [
            [
                'type' => 'document',
                'tree' => [
                    'tree_is_deletable' => false,
                    'tree_url_is_showable' => false,
                    'tree_url_is_editable' => false,
                    'tree_menu_is_visible' => false,
                    'tree_alias' => 'page_404',
                    'tree_object_type' => 'document',
                    'tree_class' => 'system_page',
                    'tree_display_name' => '404 Page',
                    'tree_publishing_is_editable' => false,
                ],
                'document' => [
                    'document_name' => '404',
                    'document_content' => 'Page not found.'
                ]
            ],
            [
                'type' => 'document',
                'tree' => [
                    'tree_is_deletable' => false,
                    'tree_url_is_showable' => false,
                    'tree_url_is_editable' => false,
                    'tree_publishing_is_editable' => false,
                    'tree_category_is_editable' => false,
                    'tree_alias' => 'page_index',
                    'tree_object_type' => 'document',
                    'tree_class' => 'system_page',
                    'tree_display_name' => 'Index Page'
                ],
                'document' => [
                    'document_name' => 'Hello, World! - Index',
                    'document_content' => 'Hello, World! - Content from CMS.'
                ]
            ]
        ]);

        $rootTree->createChildCategory([
            'tree_object_type' => 'category',
            'tree_display_name' => 'Pages'
        ], [
            'category_name' => 'Pages Category',
            'category_url' => '/pages'
        ], [
            [
                'type' => 'document',
                'tree' => [
                    'tree_display_name' => 'About Page'
                ],
                'document' => [
                    'document_name' => 'About',
                    'document_content' => 'About CMS System...',
                    'document_url' => '/pages/about',
                ],
                'onAdd' => function (Tree $tree, Document $document) use ($rootTree) {
                    $menuTree = Tree::where('tree_alias', '=', 'main_menu')->first();

                    $menuTree->createChildLink([
                        'tree_display_name' => $document->document_name,
                        'tree_class' => 'menu_link'
                    ], [
                        'link_name' => $document->document_name,
                        'document_id' => $tree->id,
                        'link_target' => '_self',
                    ]);

                    $document->menu_category_id = $menuTree->id;
                    $document->save();
                }
            ],
            [
                'type' => 'document',
                'tree' => [
                    'tree_display_name' => 'Contact Page'
                ],
                'document' => [
                    'document_name' => 'Contact',
                    'document_content' => 'Contact Content...',
                    'document_url' => '/pages/contact',
                ],
                'onAdd' => function (Tree $tree, Document $document) use ($rootTree) {
                    $menuTree = Tree::where('tree_alias', '=', 'main_menu')->first();

                    $menuTree->createChildLink([
                        'tree_display_name' => $document->document_name,
                        'tree_class' => 'menu_link'
                    ], [
                        'link_name' => $document->document_name,
                        'document_id' => $tree->id,
                        'link_target' => '_self',
                    ]);

                    $document->menu_category_id = $menuTree->id;
                    $document->save();
                }
            ],
        ]);

        $rootTree->createChildCategory(
            [
            'tree_object_type' => 'category',
            'tree_display_name' => 'Sample Category'
        ],
            [
            'category_name' => 'Sample Category',
            'category_url' => '/sample-category'
        ],
            [
            [
                'type' => 'document',
                'tree' => [
                    'tree_url_is_showable' => false,
                    'tree_url_is_editable' => false,
                    'tree_publishing_is_editable' => false,
                    'tree_class' => 'index_page',
                    'tree_display_name' => 'Index Document'
                ],
                'document' => [
                    'document_name' => 'Index page of Sample Category',
                    'document_content' => 'Some content...'
                ],
                'onAdd' => function (Tree $tree, Document $document, Tree $parent) {
                    $c = $parent->category()->first();
                    $c->index_document_id = $tree->id;
                    $c->save();
                }
            ],
            [
                'type' => 'category',
                'tree' => [
                    'tree_display_name' => 'Sample Subcategory'
                ],
                'category' => [
                    'category_name' => 'Sample Subcategory',
                    'category_url' => '/sample-category/sample-subcategory'
                ],
                'children' => [
                    [
                        'type' => 'document',
                        'tree' => [
                            'tree_url_is_showable' => false,
                            'tree_url_is_editable' => false,
                            'tree_publishing_is_editable' => false,
                            'tree_menu_is_visible' => true,
                            'tree_class' => 'index_page',
                            'tree_display_name' => 'Index Document'
                        ],
                        'document' => [
                            'document_name' => 'Index page of Sample Subcategory',
                            'document_content' => 'Some content...'
                        ],
                        'onAdd' => function (Tree $tree, Document $document, Tree $parent) {
                            $c = $parent->category()->first();
                            $c->index_document_id = $tree->id;
                            $c->save();
                        }
                    ],
                    [
                        'type' => 'document',
                        'tree' => [
                            'tree_display_name' => 'Some other document'
                        ],
                        'document' => [
                            'document_name' => 'Some other document',
                            'document_content' => 'Some other content...',
                            'document_url' => '/sample-category/sample-subcategory/some-other-document'
                        ],
                        'onAdd' => function (Tree $tree, Document $document, Tree $parent) {
                            $document->menu_category_id = $parent->id;
                            $document->save();

                            $c = $parent->category()->first();
                            $c->index_document_id = $tree->id;
                            $c->save();
                        }
                    ],
                    [
                        'type' => 'document',
                        'tree' => [
                            'tree_display_name' => 'Some other Document with no Menu'
                        ],
                        'document' => [
                            'document_name' => 'Some other Document with no Menu',
                            'document_content' => 'Some other content...',
                            'document_url' => '/sample-category/sample-subcategory/some-other-document-with-no-menu'
                        ],
                    ]
                ]
            ],
            [
                'type' => 'document',
                'tree' => [
                    'tree_display_name' => 'Sample Document'
                ],
                'document' => [
                    'document_name' => 'Sample Document',
                    'document_url' => '/sample-category/sample-document',
                    'document_content' => 'Some content...',
                ],
                'onAdd' => function (Tree $tree, Document $document, Tree $parent) {
                    $document->menu_category_id = $parent->id;
                    $document->save();
                }
            ],
            [
                'type' => 'document',
                'tree' => [
                    'tree_display_name' => 'Sample Document 2'
                ],
                'document' => [
                    'document_name' => 'Sample Document 2',
                    'document_url' => '/sample-category/sample-document-2',
                    'document_content' => 'Some content...',
                ],
                'onAdd' => function (Tree $tree, Document $document, Tree $parent) {
                    $document->menu_category_id = $parent->id;
                    $document->save();
                }
            ],
            [
                'type' => 'link',
                'tree' => [
                    'tree_display_name' => 'Google link'
                ],
                'link' => [
                    'link_name' => 'Google link',
                    'link_url' => 'https://google.com',
                    'link_target' => '_blank'
                ]
            ]
        ],
            function (Tree $tree, Category $category) use ($rootTree) {
                $menuTree = Tree::where('tree_alias', '=', 'main_menu')->first();

                $menuTree->createChildLink([
                    'tree_display_name' => $category->category_name,
                    'tree_class' => 'menu_link'
                ], [
                    'link_name' => $category->category_name,
                    'category_id' => $tree->id,
                    'link_target' => '_self',
                    'link_display_children' => true,
                ]);
            }
        );

        $rootTree->createChildCategory([
            'tree_is_published' => true,
            'tree_is_visible_frontend' => true,
            'tree_is_visible_backend' => true,
            'tree_is_visible_in_select' => true,
            'tree_is_deletable' => false,
            'tree_is_editable' => true,
            'tree_has_edit_button' => true,
            'tree_is_viewable' => true,
            'tree_url_is_showable' => true,
            'tree_url_is_editable' => true,
            'tree_menu_is_visible' => false,
            'tree_class' => 'system_category',
            'tree_alias' => 'rate',
            'tree_display_name' => 'RATE'
        ], [
            'category_name' => 'Rate',
        ]);
    }
}
