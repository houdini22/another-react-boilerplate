<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PermissionsController extends Controller
{
    public function getList(Request $request)
    {
        $user = $this->getUserFromRequest($request);

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

        Log::add($user, 'permissions.list', [
            'request' => $request
        ]);

        return response()->json([
            'data' => $permissions->toArray(),
        ]);
    }

    public function getFiltersData(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $filters = $request->get('filters');

        $hasRoles = Permission::select('id');
        $hasUsers = Permission::select('id');
        $roles = Role::select([
            'roles.id as id',
            'roles.name as name',
            'count' => DB::raw('count(distinct role_has_permissions.permission_id) as count')
        ])->from('roles', 'roles')
            ->leftJoin('role_has_permissions', 'role_has_permissions.role_id', 'roles.id')
            ->leftJoin('model_has_permissions', 'model_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->leftJoin('users', 'users.id', 'model_has_permissions.model_id')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'user')) {
                    $query->where('users.name', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereNull('role_has_permissions.role_id');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereNotNull('role_has_permissions.role_id');
                }
                if (Arr::get($filters, 'has_users') === 'no') {
                    $query->whereNull('model_has_permissions.model_id');
                } else if (Arr::get($filters, 'has_users') === 'yes') {
                    $query->whereNotNull('users.id');
                }
            })
            ->groupBy("id");

        if (Arr::get($filters, 'has_roles') === 'no') {
            $hasRoles = $hasRoles->whereDoesntHave('roles');
            $hasUsers = $hasUsers->whereDoesntHave('roles');
        } else if (Arr::get($filters, 'has_roles') === 'yes') {
            $hasRoles = $hasRoles->whereHas('roles');
            $hasUsers = $hasUsers->whereHas('roles');
        }

        if (Arr::get($filters, 'has_users') === 'no') {
            $hasUsers = $hasUsers->whereDoesntHave('users');
            $hasRoles = $hasRoles->whereDoesntHave('users');
            $roles = $roles->whereDoesntHave('users');
        } else if (Arr::get($filters, 'has_users') === 'yes') {
            $hasUsers = $hasUsers->whereHas('users');
            $hasRoles = $hasRoles->whereHas('users');
            $roles = $roles->whereHas('users');
        }

        if (Arr::get($filters, 'roles')) {
            $hasRoles = $hasRoles->whereHas('roles', function ($query) use ($filters) {
                $query->whereIn('id', $filters['roles']);
            });
            $hasUsers = $hasUsers->whereHas('roles', function ($query) use ($filters) {
                $query->whereIn('id', $filters['roles']);
            });
        }

        if (Arr::get($filters, 'user')) {
            $hasRoles = $hasRoles->whereHas('users', function ($query) use ($filters) {
                $query->where('name', '=', $filters['user']);
            });
            $hasUsers = $hasUsers->whereHas('users', function ($query) use ($filters) {
                $query->where('name', '=', $filters['user']);
            });
            $roles = $roles->whereHas('users', function ($query) use ($filters) {
                $query->where('name', '=', $filters['user']);
            });
        }

        $hasRoles = $hasRoles->get();
        $hasUsers = $hasUsers->get();
        $roles = $roles->get();

        return $this->responseOK([
            'has_roles' => [
                'count' => $hasRoles->count()
            ],
            'has_users' => [
                'count' => $hasUsers->count()
            ],
            'roles' => [
                'count' => $roles->map(function ($item) use ($filters) {
                    if (Arr::get($filters, 'roles')) {
                        if (!in_array($item['id'], $filters['roles'])) {
                            return 0;
                        }
                    }

                    return ['count' => $item['count']];
                })->sum('count'),
                'data' => $roles,
            ]
        ]);
    }

    public function getGetPermission(Request $request, $id)
    {
        $user = $this->getUserFromRequest($request);

        $permission = Permission::with('roles')->with('users')->find($id);

        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.get',
                'request' => $request
            ]);
            return $this->response404();
        }

        return response()->json([
            'permission' => $permission->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $permission = Permission::find($request->post('id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.permissions_edit',
                'request' => $request
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
            'model' => $permission,
            'request' => $request
        ]);

        return response()->json([
            'permission' => $permission->toArray(),
        ]);
    }

    public function postAdd(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        if ($request->post('role_id') && $request->post("permission") && $request->post("permission") !== "add") {
            $permission = Permission::findById($request->post('permission'));
            if (!$permission) {
                Log::add($user, 'permissions.not_found', [
                    'message' => 'while.permissions_add',
                    'request' => $request
                ]);
                return response()->json([
                    'message' => 'Not found.',
                ], 404);
            }
            $role = Role::findById($request->post('role_id'));
            if (!$role) {
                Log::add($user, 'roles.not_found', [
                    'message' => 'while.permissions_add',
                    'model' => $permission,
                    'request' => $request
                ]);
                return response()->json([
                    'message' => 'Not found.',
                ], 404);
            }
            $role->givePermissionTo($permission);

            Log::add($user, 'permissions.add', [
                'model' => $permission,
                'request' => $request
            ]);
            Log::add($user, 'roles.add_permission', [
                'model' => $role,
                'related_model' => $permission,
                'request' => $request
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
                'request' => $request
            ]);
            if ($request->post('role_id')) {
                $role = Role::findById($request->post('role_id'));
                if (!$role) {
                    Log::add($user, 'roles.not_found', [
                        'message' => 'while.permissions_add',
                        'model' => $permission,
                        'request' => $request
                    ]);
                    return $this->response404();
                }
                $role->givePermissionTo($permission);
                Log::add($user, 'roles.add_permission', [
                    'model' => $role,
                    'related_model' => $role,
                    'request' => $request
                ]);
            }
            return response()->json([
                'permission' => $permission->toArray(),
            ]);
        }


    }

    public function postAddPermissionToUser(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.users_add_permission',
                'request' => $request
            ]);
            return $this->response404();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.users_add_permission',
                'model' => $permission,
                'request' => $request
            ]);
            return $this->response404();
        }

        $u->givePermissionTo($permission);

        Log::add($user, 'users.add_permission', [
            'model' => $u,
            'related_model' => $permission,
            'request' => $request
        ]);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postDeleteUserPermission(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.users_remove_permission',
                'request' => $request
            ]);
            return $this->response404();
        }

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'model' => $permission,
                'message' => 'while.users_remove_permission',
                'request' => $request
            ]);
            return $this->response404();
        }

        Log::add($user, 'users.remove_permission', [
            'model' => $u,
            'related_model' => $permission,
            'request' => $request
        ]);

        $u->revokePermissionTo($permission);

        return response()->json([
            'msg' => 'ok',
        ]);
    }
}
