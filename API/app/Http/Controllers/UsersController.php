<?php

namespace App\Http\Controllers;

use App\Events\UserDataChanged;
use App\Events\UserForceLogout;
use App\Models\File;
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

        $user = User::with('roles')
            ->with('permissions')
            ->with('roles')
            ->with('roles.permissions')
            ->with('avatar')
            ->withCount(['files', 'roles', 'permissions'])
            ->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Not found.'
            ], 404);
        }

        return response()->json([
            'user' => $user->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->post('id'));
        if (!$user) {
            return $this->response404();
        }

        $request->validate([
            'email' => ['required', 'email', Rule::unique('users')->where(function ($query) use ($user) {
                return $query->where('id', '<>', $user->id);
            })],
            'name' => ['required', Rule::unique('users')->where(function ($query) use ($user) {
                return $query->where('id', '<>', $user->id);
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

        $user->fill($values);

        if ($request->post('password')) {
            $user->password = bcrypt($request->post('password'));
        }

        $user->save();

        broadcast(new UserDataChanged($user));

        return response()->json([
            'user' => $user->toArray(),
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

        $user = new User();
        $user->fill($request->post());
        $user->password = bcrypt($user->password);
        $user->save();

        return response()->json([
            'user' => $user->toArray(),
        ]);
    }

    public function deleteDeleteUser(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->route('id'));
        if (!$user) {
            return $this->response404();
        }

        $user->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postAddUserRole(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->route('user_id'));
        if (!$user) {
            return $this->response404();
        }

        $role = Role::find($request->route('role_id'));
        if (!$role) {
            return $this->response404();
        }

        $user->assignRole($role);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postSendActivationEmail(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->post('id'));
        if (!$user) {
            return $this->response404();
        }

        $user->email_verified_at = NULL;
        $user->email_verify_token = \Illuminate\Support\Str::random(16);
        $user->save();

        Mail::send('email_users_activate_account', [
            'url' => url('/users/activate/' . $user->email_verify_token),
        ], function ($message) use ($request, $user) {
            $message->to($user->email, $user->email)->subject('Activate account on ' . url('/'));
            $message->from(config('app.from_email'));
        });

        return response()->json([
            'user' => $user->toArray(),
        ]);
    }

    public function getActivate(Request $request)
    {
        $user = User::where('email_verify_token', $request->route('email_verified_token'))
            ->get()->first();
        if (!$user) {
            return $this->response404();
        }

        $user->email_verify_token = NULL;
        $user->email_verified_at = Carbon::now();
        $user->save();

        return redirect('/#/users/account_activated');
    }

    public function postChangeAvatar(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->route('id'));
        if (!$user) {
            return $this->response404();
        }

        $request->validate([
            'avatar' => 'required|file|max:2048'
        ]);

        if ($user->avatar()) {
            $user->avatar()->delete();
        }

        $file = File::upload($request->file('avatar'), $user);

        $user->avatar_id = $file->id;
        $user->save();

        broadcast(new UserDataChanged($user));

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postDeleteAvatar(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->post('id'));
        if (!$user) {
            return $this->response404();
        }

        if ($user->avatar()->get()) {
            $user->avatar()->delete();
        }

        $user->avatar_id = NULL;
        $user->save();

        broadcast(new UserDataChanged($user));

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

        $user = User::find($request->route('id'));
        if (!$user) {
            return $this->response404();
        }

        $token = $user->token;

        $user->token = NULL;
        $user->save();

        broadcast(new UserForceLogout($user, $token));

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postActivate(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->route('id'));
        if (!$user) {
            return $this->response404();
        }

        $user->status = 1;
        $user->save();

        return response()->json([
            'user' => $user->toArray(),
        ]);
    }

    public function postDeactivate(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->route('id'));
        if (!$user) {
            return $this->response404();
        }

        $user->status = 0;
        $user->save();

        return response()->json([
            'user' => $user->toArray(),
        ]);
    }
}
