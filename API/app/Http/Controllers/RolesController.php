<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RolesController extends Controller
{
    public function getList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $roles = Role::with('permissions')->orderBy('id', 'ASC')->get();

        return response()->json([
            'roles' => $roles->toArray(),
        ]);
    }

    public function getGet(Request $request, $id)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $role = Role::with('permissions')->find($id);

        return response()->json([
            'role' => $role->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $role = Role::find($request->post('id'));
        if (!$role) {
            return $this->response404();
        }

        $request->validate([
            'name' => ['required', Rule::unique('users')->where(function ($query) use ($user) {
                return $query->where('id', '<>', $user->id);
            })],
        ]);

        $role->fill($request->post());
        $role->save();

        return response()->json([
            'role' => $role->toArray(),
        ]);
    }

    public function postAdd(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $request->validate([
            'name' => 'required|unique:roles,name',
        ]);

        $role = new Role();
        $role->fill($request->post());
        $role->save();

        return response()->json([
            'role' => $role->toArray(),
        ]);
    }

    public function deleteDeleteRole(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $role = Role::find($request->segments()[4]);
        if (!$role) {
            return $this->response404();
        }

        $role->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postPermissionAdd(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $request->validate([
            'permission' => 'required',
            'role_id' => 'required|exists:roles,id'
        ]);

        $role = Role::find($request->post('role_id'));

        if ($request->post('permission') === 'add') {
            $request->validate([
                'name' => 'required|unique:permission,name',
                'guard_name' => 'required|unique:permission,guard_name',
            ]);
            $permission = new Permission();
            $permission->fill($request->post());
            $permission->save();

            $role->givePermissionTo($permission);
        } else {
            $permission = Permission::find($request->post('permission'));
            $role->givePermissionTo($permission);
        }
        return response()->json([
            'role' => $role->toArray(),
        ]);
    }

    public function getPermissionList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permisions = Permission::orderBy('name', 'ASC')->get();

        return response()->json([
            'permissions' => $permisions->toArray(),
        ]);
    }

    public function deleteDeleteUserPermission(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $role = Role::find($request->segments()[5]);
        if (!$role) {
            return $this->response404();
        }

        $permission = Permission::find($request->segments()[6]);
        if (!$permission) {
            return $this->response404();
        }

        $permission->removeRole($role);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function deleteDeletePermission(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            return $this->response404();
        }

        $permission->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }
}
