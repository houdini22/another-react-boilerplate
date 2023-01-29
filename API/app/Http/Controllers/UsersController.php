<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function getList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $users = User::with('roles')
            ->with('permissions')
            ->with('roles.permissions')
            ->orderBy('id', 'ASC')
            ->get();

        return response()->json([
            'users' => $users->toArray(),
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

        $user->fill($request->post());

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
            'name' => 'required|unique:users,name',
            'password' => 'required|min:3|max:50|same:confirm_password',
            'confirm_password' => 'required|min:3|max:50',
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

        $user = User::find($request->segments()[5]);
        if (!$user) {
            return $this->response404();
        }

        $role = Role::find($request->segments()[6]);
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
}
