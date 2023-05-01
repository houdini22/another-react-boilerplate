<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function getList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $filters = $request->get('filters');

        $query = User::with('roles')
            ->with('permissions')
            ->with('roles.permissions')
            ->with('avatar')
            ->orderBy($filters['order_by'], $filters['order_direction'])
            ->where(function ($query) use ($filters) {
                $query->where('email', 'like', "%{$filters['search']}%")
                    ->orWhere('name', 'like', "%{$filters['search']}%");
            })
            ->where(function ($query) use ($filters) {
                if ($filters['status'] !== 'active_or_not_active') {
                    $query->where('status', $filters['status'] === 'active' ? 1 : 0);
                }
            })
            ->where(function ($query) use ($filters) {
                if ($filters['avatar'] !== 'has_or_has_not') {
                    if ($filters['avatar'] === 'has') {
                        $query->whereNotNull('avatar_id');
                    } else {
                        $query->whereNull('avatar_id');
                    }
                }
            })
            ->withCount(['files', 'permissions', 'roles']);

        if (!empty($filters['roles'])) {
            $query = $query->whereHas('roles', function ($query) use ($filters) {
                if (!empty($filters['roles'])) {
                    $query->whereIn('id', $filters['roles']);
                }
            });
        }

        if (!empty($filters['permissions'])) {
            $query = $query->whereHas('roles.permissions', function ($query) use ($filters) {
                if (!empty($filters['permissions'])) {
                    $query->whereIn('id', $filters['permissions']);
                }
            });
        }

        if ($filters['files'] === 'yes') {
            $query = $query->whereHas('files');
        } else if ($filters['files'] === 'no') {
            $query = $query->whereDoesntHave('files');
        }

        $users = $query->paginate($filters['items_per_page']);

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
            ->with('roles.permissions')
            ->with('avatar')
            ->withCount(['files'])
            ->find($id);

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
            'password' => 'min:3|max:50|same:password_confirmation',
            'password_confirmation' => 'min:3|max:50'
        ]);

        $values = $request->post();
        unset($values['avatar']);

        $user->fill($values);

        if ($request->post('password')) {
            $user->password = bcrypt($request->post('password'));
        }

        $user->save();

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
            'email' => 'required|email|unique:users,email',
            'name' => 'required|unique:users,name|alpha_dash',
            'password' => 'required|min:3|max:50|confirmed',
            'password_confirmation' => 'required|min:3|max:50',
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

        $user = User::find($request->segments()[4]);
        if (!$user) {
            return $this->response404();
        }

        $user->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function deleteDeleteUserRole(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user = User::find($request->segments()[5]);
        if (!$user) {
            return $this->response404();
        }

        $role = Role::find($request->segments()[6]);
        if (!$role) {
            return $this->response404();
        }

        $user->removeRole($role);

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

        $user->token = NULL;
        $user->save();

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
