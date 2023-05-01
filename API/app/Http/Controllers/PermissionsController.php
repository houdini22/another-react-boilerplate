<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PermissionsController extends Controller
{
    public function getList(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $filters = $request->get('filters');

        $query = Permission::with('roles')
            ->with('users')
            ->with('users.roles')
            ->with('users.roles.permissions')
            ->where(function ($query) use ($filters) {
                if (!empty($filters['search'])) {
                    $query->where('name', 'like', "%{$filters['search']}%")
                        ->orWhere('guard_name', 'like', "%{$filters['search']}%");
                }
            })
            ->orderBy(empty($filters['order_by']) ? 'id' : $filters['order_by'], empty($filters['order_direction']) ? 'asc' : $filters['order_direction'])
            ->withCount(['users', 'roles']);

        if (!empty($filters['roles'])) {
            $query = $query->whereHas('roles', function ($query) use ($filters) {
                if (!empty($filters['roles'])) {
                    $query->whereIn('id', $filters['roles']);
                }
            });
        }

        if (!empty($filters['has_users'])) {
            if ($filters['has_users'] === 'yes') {
                $query = $query->whereHas('users');
            } else if ($filters['has_users'] === 'no') {
                $query = $query->whereDoesntHave('users');
            }
        }

        if (!empty($filters['has_roles'])) {
            if ($filters['has_roles'] === 'yes') {
                $query = $query->whereHas('roles');
            } else if ($filters['has_roles'] === 'no') {
                $query = $query->whereDoesntHave('roles');
            }
        }

        if (!empty($filters['user'])) {
            $query = $query->whereHas('users', function ($query) use ($filters) {
                if (!empty($filters['user'])) {
                    $query->where('name', '=', $filters['user']);
                }
            });
        }

        $permissions = $query->paginate(empty($filters['items_per_page']) ? 10000 : $filters['items_per_page']);

        return response()->json([
            'data' => $permissions->toArray(),
        ]);
    }

    public function getGet(Request $request, $id)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::with('users')->with('roles')->find($id);

        if (!$permission) {
            return response()->json([
                'message' => 'Not Found'
            ], 404);
        }

        return response()->json([
            'permission' => $permission->toArray(),
        ]);
    }

    public function getGetPermission(Request $request, $id)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::with('roles')->with('users')->find($id);

        return response()->json([
            'permission' => $permission->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::find($request->post('id'));
        if (!$permission) {
            return $this->response404();
        }

        $request->validate([
            'name' => ['required', 'unique:permissions,name'],
        ]);

        $permission->fill($request->post());
        $permission->save();

        return response()->json([
            'permission' => $permission->toArray(),
        ]);
    }

    public function postAdd(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $request->validate([
            'name' => 'required|unique:permissions,name',
        ]);

        $permission = Permission::create(['name' => $request->post('name')]);

        if ($request->post('role_id')) {
            $role = Role::findById($request->post('role_id'));
            $role->givePermissionTo($permission);
        }

        return response()->json([
            'permission' => $permission->toArray(),
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
                'name' => 'required|unique:permissions,name',
                'guard_name' => 'required',
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

    public function deleteDeleteUserRole(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $role = Role::find($request->segments()[5]);
        if (!$role) {
            return $this->response404();
        }

        $user->removeRole($role);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function deleteDeleteRolePermission(Request $request)
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

    public function postAddPermissionToUser(Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            return $this->response404();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            return $this->response404();
        }

        $u->givePermissionTo($permission);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postDeleteUserPermission(Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            return $this->response404();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            return $this->response404();
        }

        $u->revokePermissionTo($permission);

        return response()->json([
            'msg' => 'ok',
        ]);
    }
}
