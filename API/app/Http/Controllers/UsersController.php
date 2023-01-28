<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        $users = User::orderBy('id', 'ASC')->get();

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

        $user = User::find($id);

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
}
