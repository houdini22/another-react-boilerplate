<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Tree;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->status === User::$STATUS_NOT_ACTIVE) {
                Log::add($user, 'auth.login_failed', [
                    'message' => 'user_not_active',
                    'request' => $request
                ]);
                return response()->json([
                    'message' => 'ERR_STATUS_NOT_ACTIVE'
                ], 403);
            }

            if ($user->status === User::$STATUS_ACTIVE) {
                $user->generateToken();

                $user->last_active = Carbon::now();

                if ($user->email_verified_at === null) {
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

                Log::add($user, 'auth.login_success', [
                    'model' => $user,
                    'request' => $request
                ]);

                return $this->responseOK([
                    'user' => $user->toAuthArray()
                ]);
            }
        }

        Log::add(null, 'auth.login_failed', [
            'message' => 'wrong_credentials',
            'request' => $request
        ]);

        return response()->json([
            'message' => 'Wrong email or password.'
        ], 401);
    }

    public function postLoginWithToken(Request $request)
    {
        $credentials = $request->only('email', 'token');

        if (!Arr::get($credentials, 'email') || !Arr::get($credentials, 'token')) {
            Log::add(null, 'auth.login_with_token_failed', [
                'message' => 'empty_token_or_email',
                'request' => $request
            ]);
            return $this->response404([
                'message' => 'empty_token_or_email'
            ]);
        }

        $user = User::where('email', $credentials['email'])->where('token', $credentials['token'])->first();

        if (!$user) {
            Log::add(null, 'auth.login_with_token_failed', [
                'message' => 'user_not_found',
                'request' => $request
            ]);
            return $this->response404([
                'message' => 'user_not_found'
            ]);
        }

        if ($user->status === User::$STATUS_NOT_ACTIVE) {
            Log::add($user, 'auth.login_with_token_failed', [
                'model' => $user,
                'message' => 'account_not_active',
                'request' => $request
            ]);
            return response()->json([
                'message' => 'ERR_STATUS_NOT_ACTIVE'
            ], 403);
        }

        if ($user->status === User::$STATUS_ACTIVE && $user->email_verified_at !== null) {
            $user->generateToken();

            $user->last_active = Carbon::now();
            $user->save();

            $avatar = $user->avatar()->first();
            if ($avatar) {
                $avatar = $avatar->toArray();
            } else {
                $avatar = null;
            }

            Log::add($user, 'auth.login_with_token', [
                'model' => $user,
                'request' => $request
            ]);

            return $this->responseOK([
                'user' => $user->toAuthArray(),
            ]);
        } else {
            Log::add($user, 'auth.login_with_token_failed', [
                'model' => $user,
                'message' => 'email_not_verified',
                'request' => $request
            ]);
        }

        return $this->response404([
            'message' => 'email_not_verified'
        ]);
    }

    public function postLogout(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $user->token = null;
        $user->save();

        Log::add($user, 'auth.logout', [
            'model' => $user,
            'request' => $request
        ]);

        return response()->json([
            'message' => 'OK'
        ]);
    }

    public function postRegister(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
            'name' => ['required', 'alpha_dash', 'unique:users,name'],
            'password' => ['required', 'confirmed', Password::min(8)
                ->mixedCase()
                ->symbols()
                ->numbers()
                ->letters()],
            'password_confirmation' => ['required'],
        ]);

        $u = new User();
        $u->fill($request->post());
        $u->password = bcrypt($u->password);
        $u->save();

        Log::add($u, 'users.register', [
            'model' => $u,
            'request' => $request
        ]);

        return $this->responseOK([
            'user' => $u,
        ]);
    }
}
