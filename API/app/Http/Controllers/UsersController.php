<?php

namespace App\Http\Controllers;

use App\Events\UserDataChanged;
use App\Events\UserForceLogout;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UsersController extends Controller
{
    public function getList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $filters = $request->get('filters');

        $query = User::with(['roles' => function ($query) {
            $query->withCount('permissions');
        }])
            ->with('permissions')
            ->with('roles.permissions')
            ->with('avatar')
            ->withCount(['files', 'permissions', 'roles']);

        if (!empty($filters['order_by']) && !empty($filters['order_direction'])) {
            $query = $query->orderBy($filters['order_by'], $filters['order_direction']);
        }

        if (!empty($filters['search'])) {
            $query = $query->where(function ($query) use ($filters) {
                $query->where('email', 'like', "%{$filters['search']}%")
                    ->orWhere('name', 'like', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['status'])) {
            $query = $query->where(function ($query) use ($filters) {
                if ($filters['status'] !== 'yes_or_no') {
                    $query->where('status', $filters['status'] === 'active' ? 1 : 0);
                }
            });
        }

        if (!empty($filters['avatar'])) {
            $query = $query->where(function ($query) use ($filters) {
                if ($filters['avatar'] !== 'yes_or_no') {
                    if ($filters['avatar'] === 'yes') {
                        $query->whereNotNull('avatar_id');
                    } else {
                        $query->whereNull('avatar_id');
                    }
                }
            });
        }

        if (!empty($filters['roles'])) {
            $query = $query->whereHas('roles', function ($query) use ($filters) {
                if (!empty($filters['roles'])) {
                    $query->whereIn('id', $filters['roles']);
                }
            });
        }

        if (!empty($filters['permissions'])) {
            $query = $query->whereHas('permissions', function ($query) use ($filters) {
                $query->whereIn('id', $filters['permissions']);
            });
        }

        if (!empty($filters['files'])) {
            if ($filters['files'] === 'yes') {
                $query = $query->whereHas('files');
            } else if ($filters['files'] === 'no') {
                $query = $query->whereDoesntHave('files');
            }
        }

        if (!empty($filters['has_roles'])) {
            if ($filters['has_roles'] === 'yes') {
                $query = $query->whereHas('roles');
            } else if ($filters['has_roles'] === 'no') {
                $query = $query->whereDoesntHave('roles');
            }
        }

        if (!empty($filters['has_permissions'])) {
            if ($filters['has_permissions'] === 'yes') {
                $query = $query->whereHas('permissions');
            } else if ($filters['has_permissions'] === 'no') {
                $query = $query->whereDoesntHave('permissions');
            }
        }

        if (!empty($filters['items_per_page'])) {
            $users = $query->paginate($filters['items_per_page']);
        } else {
            $users = $query->paginate(10000);
        }

        Log::add($user, 'users.list', []);

        return response()->json([
            'data' => $users->toArray(),
        ]);
    }

    public function getGet(Request $request, $id)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::with('roles')
            ->with('permissions')
            ->with('roles')
            ->with('roles.permissions')
            ->with('avatar')
            ->withCount(['files', 'roles', 'permissions'])
            ->find($id);

        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.get'
            ]);
            return $this->response404();
        }

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->post('id'));
        if (!$u) {
            Log::add($u, 'users.not_found', [
                'message' => 'while.edit'
            ]);
            return $this->response404();
        }

        $request->validate([
            'email' => ['required', 'email', Rule::unique('users')->where(function ($query) use ($u) {
                return $query->where('id', '<>', $u->id);
            })],
            'name' => ['required', Rule::unique('users')->where(function ($query) use ($u) {
                return $query->where('id', '<>', $u->id);
            })],
            'password' => ['confirmed', Password::min(8)
                ->mixedCase()
                ->symbols()
                ->numbers()
                ->letters()],
            'password_confirmation' => Password::min(8)
                ->mixedCase()
                ->symbols()
                ->numbers()
                ->letters()
        ]);

        $values = $request->post();
        unset($values['avatar']);

        $u->fill($values);

        if ($request->post('password')) {
            $u->password = bcrypt($request->post('password'));
        }

        $u->save();

        Log::add($user, 'users.edit', [
            'model' => $u
        ]);

        broadcast(new UserDataChanged($u));

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function postAdd(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

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
        $u->password = bcrypt($user->password);
        $u->save();

        Log::add($user, 'users.add', [
            'model' => $u
        ]);

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function deleteDeleteUser(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.delete'
            ]);
            return $this->response404();
        }

        Log::add($user, 'users.delete', [
            'model' => $u
        ]);

        broadcast(new UserForceLogout($u, $u->token));

        $u->delete();

        return $this->responseOK();
    }

    public function postAddUserRole(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add($u, 'users.not_found', [
                'message' => 'while.add_to_user'
            ]);
            return $this->response404();
        }

        $role = Role::find($request->route('role_id'));
        if (!$role) {
            Log::add($user, 'roles.not_found', [
                'model' => $u,
                'message' => 'while.add_to_user'
            ]);
            return $this->response404();
        }

        $u->assignRole($role);

        Log::add($user, 'users.add_role', [
            'model' => $u,
            'related_model' => $role,
        ]);

        broadcast(new UserDataChanged($u));

        return $this->responseOK();
    }

    public function postSendActivationEmail(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->post('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.send_activation_email'
            ]);
            return $this->response404();
        }

        $u->email_verified_at = NULL;
        $u->email_verify_token = \Illuminate\Support\Str::random(16);
        $u->save();

        Mail::send('email_users_activate_account', [
            'url' => url('/users/activate/' . $u->email_verify_token),
        ], function ($message) use ($request, $u) {
            $message->to($u->email, $u->email)->subject('Activate account on ' . url('/'));
            $message->from(config('app.from_email'));
        });

        Log::add($user, 'users.send_activation_email', [
            'model' => $u
        ]);

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function getActivate(Request $request)
    {
        $user = User::where('email_verify_token', $request->route('email_verified_token'))
            ->get()->first();
        if (!$user) {
            Log::add(NULL, 'users.not_found', [
                'message' => 'while.activate'
            ]);
            return $this->response404();
        }

        $user->email_verify_token = NULL;
        $user->email_verified_at = Carbon::now();
        $user->save();

        Log::add(NULL, 'users.activate', [
            'model' => $user
        ]);

        return redirect('/#/users/account_activated');
    }

    public function postChangeAvatar(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.change_avatar'
            ]);
            return $this->response404();
        }

        $request->validate([
            'avatar' => 'required|file|max:2048'
        ]);

        if ($u->avatar()->first()) {
            Log::add($user, 'users.remove_avatar', [
                'model' => $u,
                'message' => 'while.change_avatar',
                'related_model' => $u->avatar()->first(),
            ]);
            $u->avatar()->delete();
        }

        $file = File::upload($request->file('avatar'), $user);

        $u->avatar_id = $file->id;
        $u->save();

        Log::add($user, 'users.change_avatar', [
            'model' => $u,
            'related_model' => $file,
        ]);

        broadcast(new UserDataChanged($u));

        return $this->responseOK([
            'data' => $u->toArray(),
        ]);
    }

    public function postDeleteAvatar(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->post('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.delete_avatar'
            ]);
            return $this->response404();
        }

        if ($u->avatar()->first()) {
            Log::add($user, 'users.remove_avatar', [
                'model' => $u,
                'message' => 'while.delete_avatar',
                'related_model' => $u->avatar()->first()
            ]);
            $u->avatar()->delete();
        }

        $u->avatar_id = NULL;
        $u->save();

        broadcast(new UserDataChanged($u));

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postForceLogin(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.force_login',
            ]);
            return $this->response404();
        }

        $token = $u->token;

        $u->token = NULL;
        $u->save();

        Log::add($user, 'users.force_login', [
            'model' => $u
        ]);

        broadcast(new UserForceLogout($u, $token));

        return $this->responseOK();
    }

    public function postActivate(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.activate',
            ]);
            return $this->response404();
        }

        $u->status = 1;
        $u->save();

        Log::add($user, 'users.activate', [
            'model' => $u
        ]);

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function postDeactivate(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.deactivate',
            ]);
            return $this->response404();
        }

        $u->status = 0;
        $u->save();

        Log::add($user, 'users.deactivate', [
            'model' => $u
        ]);

        broadcast(new UserForceLogout($u, $u->token));

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }
}
