<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function response401()
    {
        return response()->json([
            'message' => 'You have to be logged in.',
        ], 401);
    }

    public function response404()
    {
        return response()->json([
            'message' => 'NOT_FOUND',
        ], 404);
    }
}
