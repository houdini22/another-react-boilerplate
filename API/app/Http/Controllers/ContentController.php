<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Config;
use App\Models\Document;
use App\Models\Tree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ContentController extends Controller
{
    public function getGet(Request $request)
    {
        $url = $request->route('slug');
        if (!$url) {
            return $this->renderDefaultIndexPage();
        } else {
            $url = '/' . $url;

            $tree = Tree::with('category')
                ->with('category.indexDocument')
                ->with('category.indexDocument.document')
                ->with('category.menuCategory')
                ->with('document')
                ->with('document.menuCategory')
                ->with('document.menuCategory.category')
                ->with('documentCategory')
                ->with('documentCategory.documentCategory')
                ->with('documentCategory.documentCategory.category')
                ->where(function ($query) use ($url) {
                    $query
                        ->whereHas('category', function ($query) use ($url) {
                            $query->where('categories.category_url', '=', $url);
                        })
                        ->orWhereHas('document', function ($query) use ($url) {
                            $query->where('documents.document_url', '=', $url);
                        });
                })
                ->withDepth()
                ->first();

            if (!$tree) {
                return response(view('content/404', [
                    'headerActions' => $this->getHeaderActions(),
                    'mainMenu' => $this->getMainMenu(),
                    'treeDocument' => Tree::with('document')->where('tree_alias', '=', 'page_404')->first(),
                ]), 404);
            }

            if ($tree->tree_object_type === 'category') {
                return $this->renderCategory($request, $tree);
            } elseif ($tree->tree_object_type === 'document') {
                return $this->renderDocument($request, $tree);
            }
        }
    }

    protected function getAppConfig()
    {
        return Config::getAppConfig();
    }

    public function getHeaderActions()
    {
        if (Auth::guest()) {
            $result = [];
            if (Config::getByKey('app.users.allow_login')->value) {
                $result[] = [
                    'label' => 'Log In',
                    'href' => url('/login'),
                ];
            }
            if (Config::getByKey('app.users.allow_register')->value) {
                $result[] = [
                    'label' => 'Register',
                    'href' => url('/register'),
                    'color' => 'warning'
                ];
            }
            return $result;
        } else {
            return [
                [
                    'label' => 'Log Out',
                    'href' => url('/logout'),
                ],
            ];
        }
    }

    protected function renderDefaultIndexPage()
    {
        $meta = [];
        $meta['title'] = Config::getByKey('cms.meta.title')->value;
        $meta['description'] = Config::getByKey('cms.meta.description')->value;
        $meta['keywords'] = Config::getByKey('cms.meta.keywords')->value;
        $meta['robots'] = Config::getByKey('cms.meta.robots')->value;

        $tree = Tree::with('document')
            ->where('tree_alias', '=', 'page_index')
            ->with('document.menuCategory')
            ->first();

        $mainMenu = $this->getMainMenu();

        $menu = [];
        $headerActions = $this->getHeaderActions();

        if ($tree->document->menuCategory) {
            $menu = $tree
                ->document
                ->menuCategory
                ->children()
                ->where('tree_is_published', '=', 1)
                ->where(function ($query) {
                    $query
                        ->where(function ($query) {
                            $query
                                ->whereNull('tree_published_from')
                                ->orWhere(function ($query) {
                                    $query
                                        ->whereNotNull('tree_published_from')
                                        ->where(DB::raw("tree_published_from"), '<=', DB::raw('NOW()'));
                                });
                        })
                        ->where(function ($query) {
                            $query
                                ->whereNull('tree_published_to')
                                ->orWhere(function ($query) {
                                    $query
                                        ->whereNotNull('tree_published_to')
                                        ->where(DB::raw("tree_published_to"), '<=', DB::raw('NOW()'));
                                });
                        });
                })
                ->where(function ($query) {
                    $query
                        ->where('tree_class', '=', 'menu_link')
                        ->orWhere(function ($query) {
                            $query
                                ->whereIn('tree_object_type', ['document', 'category', 'link'])
                                ->where('tree_class', '<>', 'index_page');
                        });
                })
                ->with('link')
                ->with('link.linkDocument')
                ->with('link.linkDocument.document')
                ->with('link.linkCategory')
                ->with('link.linkCategory.category')
                ->with('link.linkFile')
                ->with('document')
                ->with('category')
                ->get();
        }

        return response(view('content.index', [
            'meta' => $meta,
            'tree' => $tree,
            'document' => $tree->document,
            'app' => $this->getAppConfig(),
            'mainMenu' => $mainMenu,
            'menu' => $menu,
            'slug' => '/',
            'headerActions' => $headerActions,
        ]));
    }

    protected function getMainMenu()
    {
        return Tree::getMenuByName('main_menu');
    }

    protected function getMetaFromDocument(Document $document)
    {
        $meta = [];
        $metaTitle = Config::getByKey('cms.meta.title')->value;
        $meta['title'] = $metaTitle . ((!!$document->document_meta_title) ? ' - ' . $document->document_meta_title : '');
        $meta['description'] = $document->document_meta_description;
        $meta['keywords'] = $document->document_meta_keywords;
        $meta['robots'] = $document->document_meta_robots;
        $meta['separator'] = '-';

        if (!$meta['description']) {
            $meta['description'] = Config::getByKey('cms.meta.description')->value;
        }
        if (!$meta['keywords']) {
            $meta['keywords'] = Config::getByKey('cms.meta.keywords')->value;
        }
        if (!$meta['robots']) {
            $meta['robots'] = Config::getByKey('cms.meta.robots')->value;
        }

        return $meta;
    }

    protected function getMetaFromCategory(Category $category)
    {
        $meta = [];
        $metaTitle = Config::getByKey('cms.meta.title')->value;
        $meta['title'] = $metaTitle . ((!!$category->category_meta_title) ? ' - ' . $category->category_meta_title : '');
        $meta['description'] = $category->category_meta_description;
        $meta['keywords'] = $category->category_meta_keywords;
        $meta['robots'] = $category->category_meta_robots;
        $meta['separator'] = '-';

        if (!$meta['description']) {
            $meta['description'] = Config::getByKey('cms.meta.description')->value;
        }
        if (!$meta['keywords']) {
            $meta['keywords'] = Config::getByKey('cms.meta.keywords')->value;
        }
        if (!$meta['robots']) {
            $meta['robots'] = Config::getByKey('cms.meta.robots')->value;
        }

        return $meta;
    }

    protected function renderCategory(Request $request, Tree $tree)
    {
        $cookie = json_decode($request->cookie('visits'));
        if (!$cookie) {
            $cookie = [];
        }

        $tree->category->category_hits += 1;

        if (!in_array($tree->category->category_url, $cookie)) {
            $tree->category->category_unique_hits += 1;
        }

        $tree->category->save();

        $cookie[] = $tree->category->category_url;

        $meta = $this->getMetaFromCategory($tree->category);
        $menu = [];

        $parent = $tree->documentCategory;

        $document = null;
        if ($tree->category->indexDocument) {
            $document = $tree->category->indexDocument->document;
        }

        if ($tree->category->menuCategory) {
            $menu = $tree
                ->category
                ->menuCategory
                ->children()
                ->where('tree_is_published', '=', 1)
                ->where(function ($query) {
                    $query
                        ->where(function ($query) {
                            $query
                                ->whereNull('tree_published_from')
                                ->orWhere(function ($query) {
                                    $query
                                        ->whereNotNull('tree_published_from')
                                        ->where(DB::raw("tree_published_from"), '<=', DB::raw('NOW()'));
                                });
                        })
                        ->where(function ($query) {
                            $query
                                ->whereNull('tree_published_to')
                                ->orWhere(function ($query) {
                                    $query
                                        ->whereNotNull('tree_published_to')
                                        ->where(DB::raw("tree_published_to"), '<=', DB::raw('NOW()'));
                                });
                        });
                })
                ->where(function ($query) {
                    $query
                        ->where('tree_class', '=', 'menu_link')
                        ->orWhere(function ($query) {
                            $query
                                ->whereIn('tree_object_type', ['document', 'category', 'link'])
                                ->where('tree_class', '<>', 'index_page');
                        });
                })
                ->with('link')
                ->with('link.linkDocument')
                ->with('link.linkDocument.document')
                ->with('link.linkCategory')
                ->with('link.linkCategory.category')
                ->with('link.linkFile')
                ->with('document')
                ->with('category')
                ->get();

            //dd($menu->toArray());
        }

        return response(view('content.category', [
            'category' => $tree->category,
            'tree' => $tree,
            'document' => $document,
            'menu' => $menu,
            'meta' => $meta,
            'parent' => $parent,
            'app' => $this->getAppConfig(),
            'mainMenu' => $this->getMainMenu(),
            'slug' => '/' . $request->route('slug'),
            'headerActions' => $this->getHeaderActions(),
        ]))->withCookie(cookie('visits', json_encode($cookie)));
    }

    protected function renderDocument(Request $request, Tree $tree)
    {
        $cookie = json_decode($request->cookie('visits'));
        if (!$cookie) {
            $cookie = [];
        }

        $tree->document->document_hits += 1;

        if (!in_array($tree->document->document_url, $cookie)) {
            $tree->document->document_unique_hits += 1;
        }

        $tree->document->save();

        $cookie[] = $tree->document->document_url;

        $meta = $this->getMetaFromDocument($tree->document);

        $parent = $tree->documentCategory->documentCategory;

        $menu = [];
        if ($tree
            ->document
            ->menuCategory) {
            $menu = $tree
                ->document
                ->menuCategory
                ->children()
                ->where('tree_is_published', '=', 1)
                ->where(function ($query) {
                    $query
                        ->where(function ($query) {
                            $query
                                ->whereNull('tree_published_from')
                                ->orWhere(function ($query) {
                                    $query
                                        ->whereNotNull('tree_published_from')
                                        ->where(DB::raw("tree_published_from"), '<=', DB::raw('NOW()'));
                                });
                        })
                        ->where(function ($query) {
                            $query
                                ->whereNull('tree_published_to')
                                ->orWhere(function ($query) {
                                    $query
                                        ->whereNotNull('tree_published_to')
                                        ->where(DB::raw("tree_published_to"), '<=', DB::raw('NOW()'));
                                });
                        });
                })
                ->where(function ($query) {
                    $query
                        ->where('tree_class', '=', 'menu_link')
                        ->orWhere(function ($query) {
                            $query
                                ->whereIn('tree_object_type', ['document', 'category', 'link'])
                                ->where('tree_class', '<>', 'index_page');
                        });
                })
                ->with('link')
                ->with('link.linkDocument')
                ->with('link.linkDocument.document')
                ->with('link.linkCategory')
                ->with('link.linkCategory.category')
                ->with('document')
                ->with('category')
                ->get();
        }

        return response(view('content.category', [
            'tree' => $tree,
            'document' => $tree->document,
            'menu' => $menu,
            'meta' => $meta,
            'parent' => $parent,
            'app' => $this->getAppConfig(),
            'mainMenu' => $this->getMainMenu(),
            'slug' => '/' . $request->route('slug'),
            'headerActions' => $this->getHeaderActions(),
        ]))->withCookie(cookie('visits', json_encode($cookie)));
    }
}
