<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tree;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

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
            ->withDepth()
            ->first();
        $nodes = $currentNode->children()->get();

        return response()->json([
            'nodes' => $nodes->toArray(),
            'currentNode' => $currentNode->toArray(),
        ]);
    }

    public function getParentCategorySelectOptions(Request $request) {
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

        $traverse = function ($tree, $prefix = '-') use (&$traverse, &$options) {
            foreach ($tree as $t) {
                $options[] = [
                    'label' => $prefix.' '.$t->category->category_name,
                    'value' => $t->id,
                ];

                $traverse($t->children, $prefix.'-');
            }
        };

        $traverse($nodes);

        return response()->json([
            'options' => $options
        ]);
    }

    public function getIndexDocumentsSelectOptions(Request $request) {
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

        $traverse = function ($tree, $prefix = '-') use (&$traverse, &$options) {
            foreach ($tree as $t) {
                $options[] = [
                    'label' => $prefix.' '.$t->document->document_name,
                    'value' => $t->id,
                ];

                $traverse($t->children, $prefix.'-');
            }
        };

        $traverse($nodes);

        return response()->json([
            'options' => $options
        ]);
    }

    public function postAddCategory(Request $request) {
        $values = $request->post();

        $validator = Validator::make($values, [
            'category.category_name' => 'required|max:256',
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
        ]);

        $category = new Category(Arr::get($values, 'category'));
        $category->tree_id = $tree->id;
        $category->save();

        $tree->category_id = $category->id;
        $tree->save();

        return response()->json([
            'message' => 'ok'
        ]);
    }

    public function postPublish(Request $request) {
        $tree = Tree::find($request->post('id'));
        $tree->tree_is_published = true;
        $tree->save();

        return response()->json([
            'message' => 'ok'
        ]);
    }

    public function postUnpublish(Request $request) {
        $tree = Tree::find($request->post('id'));
        $tree->tree_is_published = false;
        $tree->save();

        return response()->json([
            'message' => 'ok'
        ]);
    }
}
