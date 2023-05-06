<?php

namespace App\Http\Controllers;

use App\Models\Log;
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
                        ->orWhere('description', 'like', "%{$filters['search']}%");
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

        Log::add($user, 'permissions.list', []);

        return response()->json([
            'data' => $permissions->toArray(),
        ]);
    }

    public function getGetPermission(Request $request, $id)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::with('roles')->with('users')->find($id);

        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.get'
            ]);
            return $this->response404();
        }

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
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.permissions_edit'
            ]);
            return $this->response404();
        }

        $request->validate([
            'name' => ['required', Rule::unique('permissions')->where(function ($query) use ($permission) {
                return $query->where('id', '<>', $permission->id);
            })],
            'description' => 'max:512'
        ]);

        $permission->fill($request->post());
        $permission->save();

        Log::add($user, 'permissions.edit', [
            'model' => $permission
        ]);

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

        if ($request->post('role_id') && $request->post("permission") && $request->post("permission") !== "add") {
            $permission = Permission::findById($request->post('permission'));
            if (!$permission) {
                Log::add($user, 'permissions.not_found', [
                    'message' => 'while.permissions_add',
                ]);
                return response()->json([
                    'message' => 'Not found.',
                ], 404);
            }
            $role = Role::findById($request->post('role_id'));
            if (!$role) {
                Log::add($user, 'roles.not_found', [
                    'message' => 'while.permissions_add',
                    'model' => $permission
                ]);
                return response()->json([
                    'message' => 'Not found.',
                ], 404);
            }
            $role->givePermissionTo($permission);

            Log::add($user, 'permissions.add', [
                'model' => $permission
            ]);
            Log::add($user, 'roles.add_permission', [
                'model' => $role,
                'related_model' => $permission,
            ]);

            return response()->json([
                'permission' => $permission->toArray(),
            ]);
        } else {
            $request->validate([
                'name' => ['required', 'unique:permissions,name'],
                'description' => ['max:512']
            ]);
            $permission = new Permission();
            $permission->fill($request->post());
            $permission->guard_name = 'web';
            $permission->save();
            Log::add($user, 'permissions.add', [
                'model' => $permission,
            ]);
            if ($request->post('role_id')) {
                $role = Role::findById($request->post('role_id'));
                if (!$role) {
                    Log::add($user, 'roles.not_found', [
                        'message' => 'while.permissions_add',
                        'model' => $permission
                    ]);
                    return $this->response404();
                }
                $role->givePermissionTo($permission);
                Log::add($user, 'roles.add_permission', [
                    'model' => $role,
                    'related_model' => $role,
                ]);
            }
            return response()->json([
                'permission' => $permission->toArray(),
            ]);
        }


    }

    public function postAddPermissionToUser(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.users_add_permission',
            ]);
            return $this->response404();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.users_add_permission',
                'model' => $permission
            ]);
            return $this->response404();
        }

        $u->givePermissionTo($permission);

        Log::add($user, 'users.add_permission', [
            'model' => $u,
            'related_model' => $permission
        ]);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postDeleteUserPermission(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.users_remove_permission'
            ]);
            return $this->response404();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'model' => $permission,
                'message' => 'while.users_remove_permission'
            ]);
            return $this->response404();
        }

        Log::add($user, 'users.remove_permission', [
            'model' => $u,
            'related_model' => $permission
        ]);

        $u->revokePermissionTo($permission);

        return response()->json([
            'msg' => 'ok',
        ]);
    }
}
