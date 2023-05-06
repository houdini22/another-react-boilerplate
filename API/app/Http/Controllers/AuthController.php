<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
                Log::add($user, 'auth.login_failed', [
                    'message' => 'user_not_active'
                ]);
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

                Log::add($user, 'auth.login_success');

                return $this->responseOK([
                    'data' => $user->toAuthArray()
                ]);
            }
        }

        Log::add(NULL, 'auth.login_failed', [
            'message' => 'wrong_credentials'
        ]);

        return response()->json([
            'message' => 'Wrong email or password.'
        ], 401);
    }

    public function postLoginWithToken(Request $request)
    {
        $credentials = $request->only('email', 'token');

        if (!Arr::get($credentials, 'email') || !Arr::get($credentials, 'token')) {
            Log::add(NULL, 'auth.login_with_token_failed', [
                'message' => 'empty_token_or_email'
            ]);
            return $this->response404();
        }

        $user = User::where('email', $credentials['email'])->where('token', $credentials['token'])->first();

        if (!$user) {
            Log::add(NULL, 'auth.login_with_token_failed', [
                'message' => 'user_not_found'
            ]);
            return $this->response404();
        }

        if ($user->status === User::$STATUS_NOT_ACTIVE) {
            Log::add($user, 'auth.login_with_token_failed', [
                'model' => $user,
                'message' => 'account_not_active'
            ]);
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

            Log::add($user, 'auth.login_with_token');

            return $this->responseOK([
                'data' => $user->toAuthArray(),
            ]);
        } else {
            Log::add($user, 'auth.login_with_token_failed', [
                'model' => $user,
                'message' => 'account_not_active'
            ]);
        }

        return $this->response404();
    }

    public function postLogout(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user->token = null;
        $user->save();

        Log::add($user, 'auth.logout');

        return response()->json([
            'message' => 'OK'
        ]);
    }
}
