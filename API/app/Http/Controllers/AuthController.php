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

                if ($user->email_verified_at === NULL) {
                    $user->email_verified_at = Carbon::now();
                }

                $user->save();

                $avatar = $user->avatar()->first();
                if ($avatar) {
                    $avatar = $avatar->toArray();
                } else {
                    $avatar = null;
                }

                $additional = [];
                if ($user->is_super_admin) {
                    $additional[] = 'Super Admin';
                }

                return response()->json([
                    'data' => [
                        'user' => [
                            'name' => $user->name,
                            'email' => $user->email,
                            'token' => $user->token,
                            'roles' => array_unique(
                                array_merge(
                                    $user->roles->pluck('name')->toArray(),
                                    $additional
                                )
                            ),
                            'permissions' => array_unique(
                                array_merge(
                                    $user->getPermissionsViaRoles()->pluck('name')->toArray(),
                                    collect($user->permissions->toArray())->pluck('name')->toArray(),
                                )
                            ),
                            'avatar' => $avatar,
                        ]
                    ]
                ]);
            }
        }

        return response()->json([
            'message' => 'Wrong email or password.'
        ], 401);
    }

    public function postLoginWithToken(Request $request)
    {
        $credentials = $request->only('email', 'token');
        $user = User::where('email', $credentials['email'])->where('token', $credentials['token'])->first();

        if (!$user) {
            return $this->response404();
        }

        if ($user->status === User::$STATUS_NOT_ACTIVE) {
            return response()->json([
                'message' => 'ERR_STATUS_NOT_ACTIVE'
            ], 403);
        }

        if ($user->status === User::$STATUS_ACTIVE && $user->email_verified_at !== NULL) {
            $user->generateToken();

            $user->last_active = Carbon::now();
            $user->save();

            $avatar = $user->avatar()->first();
            if ($avatar) {
                $avatar = $avatar->toArray();
            } else {
                $avatar = null;
            }

            return response()->json([
                'data' => [
                    'user' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'token' => $user->token,
                        'roles' => $user->roles->pluck('name'),
                        'permissions' => $user->getPermissionsViaRoles()->pluck('name'),
                        'avatar' => $avatar,
                    ]
                ]
            ]);
        }

        return response()->json([
            'message' => 'NOT_FOUND'
        ], 404);
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
