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

        $filters = $request->get('filters');

        $query = Role::with('permissions')
            ->with('users')
            ->where(function ($query) use ($filters) {
                if (!empty($filters['search'])) {
                    $query->where('name', 'like', "%{$filters['search']}%")
                        ->orWhere('guard_name', 'like', "%{$filters['search']}%");
                }
            })
            ->orderBy(empty($filters['order_by']) ? 'id' : $filters['order_by'], empty($filters['order_direction']) ? 'asc' : $filters['order_direction'])
            ->withCount(['users', 'permissions']);

        if (!empty($filters['permissions'])) {
            $query = $query->whereHas('permissions', function ($query) use ($filters) {
                if (!empty($filters['permissions'])) {
                    $query->whereIn('id', $filters['permissions']);
                }
            });
        }

        if (!empty($filters['users'])) {
            if ($filters['users'] === 'yes') {
                $query = $query->whereHas('users');
            } else if ($filters['users'] === 'no') {
                $query = $query->whereDoesntHave('users');
            }
        }

        if (!empty($filters['has_permissions'])) {
            if ($filters['has_permissions'] === 'yes') {
                $query = $query->whereHas('permissions');
            } else if ($filters['has_permissions'] === 'no') {
                $query = $query->whereDoesntHave('permissions');
            }
        }

        if (!empty($filters['user'])) {
            $query = $query->whereHas('users', function ($query) use ($filters) {
                if (!empty($filters['user'])) {
                    $query->where('name', '=', $filters['user']);
                }
            });
        }

        $roles = $query->paginate(empty($filters['items_per_page']) ? 10000 : $filters['items_per_page']);

        return response()->json([
            'data' => $roles->toArray(),
        ]);
    }

    public function getGet(Request $request, $id)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $role = Role::with('permissions')
            ->with('users')
            ->find($id);

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
            'name' => ['required', Rule::unique('roles')->where(function ($query) use ($role) {
                return $query->where('id', '<>', $role->id);
            })],
            'description' => 'max:512'
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
            'description' => 'max:512'
        ]);

        $role = new Role();
        $role->fill($request->post());
        $role->guard_name = 'web';
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

        $role = Role::find($request->route('id'));
        if (!$role) {
            return $this->response404();
        }

        $role->delete();

        return response()->json([
            'msg' => 'ok',
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

        $user = User::find($request->route('user_id'));
        if (!$user) {
            return $this->response404();
        }

        $role = Role::find($request->route('role_id'));
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

        $role = Role::find($request->route('role_id'));
        if (!$role) {
            return $this->response404();
        }

        $permission = Permission::find($request->route('permission_id'));
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
