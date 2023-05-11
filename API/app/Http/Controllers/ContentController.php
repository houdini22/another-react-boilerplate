<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tree;
use Illuminate\Http\Request;
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
                ->with('documentCategory')
                ->with('documentCategory.category')
                ->with('documentCategory.category.menuCategory')
                ->where(function ($query) use ($url) {
                    $query
                        ->whereHas('category', function ($query) use ($url) {
                            $query->where('categories.category_url', '=', $url);
                        })
                        ->orWhereHas('document', function ($query) use ($url) {
                            $query->where('documents.document_url', '=', $url);
                        });
                })
                ->first();

            if (!$tree) {
                return response(view('content/404'), 404);
            }

            if ($tree->tree_object_type === 'category') {
                return $this->renderCategory($request, $tree);
            } else if ($tree->tree_object_type === 'document') {
                return $this->renderDocument($request, $tree);
            }
        }
    }

    protected function renderDefaultIndexPage()
    {


        return view('content.index');
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

        return response(view('content.category', [
            'category' => $tree->category,
            'tree' => $tree,
            'document' => $tree->category->indexDocument->document,
            'menu' => $tree
                ->category
                ->menuCategory
                ->children()
                ->where(function($query) {
                    $query->where('tree_is_published', '=', 1)
                        ->where(function($query) {
                            $query->where(DB::raw("tree_published_from"), '<=', DB::raw('NOW()'))
                                ->where(DB::raw("tree_published_to"), '>=',  DB::raw('NOW()'));
                        });
                })
                ->with('category')
                ->with('document')
                ->with('link')
                ->get(),
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

        return response(view('content.category', [
            'tree' => $tree,
            'document' => $tree->document,
            'menu' => $tree
                ->documentCategory
                ->category
                ->menuCategory
                ->children()
                ->where(function($query) {
                    $query->where('tree_is_published', '=', 1)
                        ->where(function($query) {
                            $query->where(DB::raw("tree_published_from"), '<=', DB::raw('NOW()'))
                                ->where(DB::raw("tree_published_to"), '>=',  DB::raw('NOW()'));
                        });
                })
                ->with('category')
                ->with('document')
                ->with('link')
                ->get(),
        ]))->withCookie(cookie('visits', json_encode($cookie)));
    }
}
