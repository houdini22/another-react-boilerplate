<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->status === User::$STATUS_NOT_ACTIVE) {
                return response()->json([
                    'message' => 'ERR_STATUS_NOT_ACTIVE'
                ], 403);
            }

            if ($user->status === User::$STATUS_ACTIVE) {
                $user->generateToken();

                $user->last_active = Carbon::now();
                $user->save();

                return response()->json([
                    'data' => [
                        'user' => [
                            'name' => $user->name,
                            'email' => $user->email,
                            'token' => $user->token,
                            'roles' => $user->roles->pluck('name'),
                            'permissions' => $user->getPermissionsViaRoles()->pluck('name')
                        ]
                    ]
                ]);
            }
        }

        return response()->json([
            'message' => 'ERR'
        ], 401);
    }

    public function postLoginWithToken(Request $request)
    {
        $credentials = $request->only('email', 'token');
        $user = User::where('email', $credentials['email'])->where('token', $credentials['token'])->first();

        if (!$user) {
            return $this->response401();
        }

        if ($user->status === User::$STATUS_NOT_ACTIVE) {
            return response()->json([
                'message' => 'ERR_STATUS_NOT_ACTIVE'
            ], 403);
        }

        if ($user->status === User::$STATUS_ACTIVE) {
            $user->generateToken();

            $user->last_active = Carbon::now();
            $user->save();

            return response()->json([
                'data' => [
                    'user' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'token' => $user->token,
                        'roles' => $user->roles->pluck('name'),
                        'permissions' => $user->getPermissionsViaRoles()->pluck('name')
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
