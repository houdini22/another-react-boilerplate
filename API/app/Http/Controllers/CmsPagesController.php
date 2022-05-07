<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use App\Models\User;
use Illuminate\Http\Request;

class CmsPagesController extends Controller
{
    public function getPages(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $currentNode = Tree::where('id', '=', $request->get('parent_id'))->first();
        $nodes = $currentNode->children()->get();

        return response()->json([
            'nodes' => $nodes->toArray(),
            'currentNode' => $currentNode->toArray(),
        ]);
    }
}
