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
            'message' => 'NOT_LOGGED_IN',
        ], 401);
    }

    public function response404($message = 'NOT_FOUND', $data = [])
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ], 404);
    }

    public function responseOK($data = null) {
        return response()->json([
            'message' => 'ok',
            'data' => [
                'data' => $data
            ],
        ]);
    }
}
