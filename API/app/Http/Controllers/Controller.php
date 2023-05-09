<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Arr;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function response401()
    {
        return response()->json([
            'message' => 'NOT_LOGGED_IN',
        ], 401);
    }

    public function response404($data = [])
    {
        return response()->json([
            'message' => Arr::get($data, 'message', "NOT_FOUND"),
            'data' => Arr::get($data, 'data'),
        ], 404);
    }

    public function responseOK($data = null) {
        return response()->json([
            'message' => Arr::get($data, 'message', 'OK'),
            'data' => [
                'data' => $data
            ],
        ]);
    }

    protected function getUserFromRequest(\Illuminate\Http\Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            Log::add(NULL, 'users.not_found', [
                'message' => 'while_get_by_token',
                'request' => $request
            ]);
            return $this->response401();
        }

        return $user;
    }
}
