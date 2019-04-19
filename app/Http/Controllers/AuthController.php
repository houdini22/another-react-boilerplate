<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class AuthController extends Controller
{
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user->generateToken();

            return response()->json([
                'data' => [
                    'user' => [
                        'username' => $user->email,
                        'token' => $user->token,
                    ]
                ]
            ]);
        }

        return response()->json([
            'message' => 'ERR'
        ], 401);
    }

    public function postLogout(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user->token = null;
        $user->save();

        return response()->json([
            'message' => 'OK'
        ]);
    }
}
