<?php

namespace App\Http\Controllers;

use App\Events\UserDataChanged;
use App\Models\Log;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RolesController extends Controller
{
    public function getList(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $filters = $request->get('filters');

        $query = Role::with('permissions')
            ->with('users')
            ->where(function ($query) use ($filters) {
                if (!empty($filters['search'])) {
                    $query->where('name', 'like', "%{$filters['search']}%")
                        ->orWhere('description', 'like', "%{$filters['search']}%");
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

        if (!empty($filters['has_users'])) {
            if ($filters['has_users'] === 'yes') {
                $query = $query->whereHas('users');
            } elseif ($filters['has_users'] === 'no') {
                $query = $query->whereDoesntHave('users');
            }
        }

        if (!empty($filters['has_permissions'])) {
            if ($filters['has_permissions'] === 'yes') {
                $query = $query->whereHas('permissions');
            } elseif ($filters['has_permissions'] === 'no') {
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

        if (empty($filters)) {
            $roles = $query->get();
        } else {
            $roles = $query->paginate(Arr::get($filters, 'items_per_page', 10000));
        }

        Log::add($user, 'roles.list', [
            'request' => $request
        ]);

        return $this->responseOK($roles);
    }

    public function getFiltersData(Request $request)
    {
        $user = User::getFromRequest($request);

        $filters = $request->get('filters');

        $hasPermissions = Role::with('permissions')->select('id');
        $hasUsers = Role::with('permissions')->select('id');
        $permissions = Permission::select([
            'permissions.id as id',
            'permissions.name as name',
            'permissions.name',
            'count' => DB::raw('count(distinct role_has_permissions.role_id) as count')
        ])->from('permissions', 'permissions')
            ->leftJoin('role_has_permissions', 'role_has_permissions.permission_id', 'permissions.id')
            ->leftJoin('model_has_roles', 'role_has_permissions.role_id', 'model_has_roles.role_id')
            ->leftJoin('roles', 'roles.id', 'model_has_roles.role_id')
            ->leftJoin('users', 'users.id', 'model_has_roles.model_id')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'user')) {
                    $query->where('users.name', '=', Arr::get($filters, 'user'));
                }
                if (Arr::get($filters, 'search')) {
                    $query->where(function ($query) use ($filters) {
                        $query->where('roles.name', 'like', "%{$filters['search']}%")
                            ->orWhere('roles.description', 'like', "%{$filters['search']}%");
                    });
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereNull('role_has_permissions.role_id');
                } elseif (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereNotNull('role_has_permissions.role_id');
                }
                if (Arr::get($filters, 'has_users') === 'no') {
                    $query->whereNull('model_has_roles.model_id');
                } elseif (Arr::get($filters, 'has_users') === 'yes') {
                    $query->whereNotNull('model_has_roles.model_id');
                }
            })
            ->groupBy("id");

        if (Arr::get($filters, 'has_permissions') === 'no') {
            $hasUsers->whereDoesntHave('permissions');
        } elseif (Arr::get($filters, 'has_permissions') === 'yes') {
            $hasUsers->whereHas('permissions');
        }

        if (Arr::get($filters, 'has_users') === 'no') {
            $hasPermissions->whereDoesntHave('users');
        } elseif (Arr::get($filters, 'has_users') === 'yes') {
            $hasPermissions->whereHas('users');
        }

        if (Arr::get($filters, 'permissions')) {
            $hasPermissions->whereHas('permissions', function ($query) use ($filters) {
                $query->whereIn('id', $filters['permissions']);
            });
            $hasUsers->whereHas('permissions', function ($query) use ($filters) {
                $query->whereIn('id', $filters['permissions']);
            });
        }

        if (Arr::get($filters, 'user')) {
            $hasPermissions->whereHas('users', function ($query) use ($filters) {
                $query->where('name', '=', $filters['user']);
            });
            $hasUsers->whereHas('users', function ($query) use ($filters) {
                $query->where('name', '=', $filters['user']);
            });
        }

        if (Arr::get($filters, 'search')) {
            $hasPermissions->where(function ($query) use ($filters) {
                $query->where('roles.name', 'like', "%{$filters['search']}%")
                    ->orWhere('roles.description', 'like', "%{$filters['search']}%");
            });
            $hasUsers->where(function ($query) use ($filters) {
                $query->where('roles.name', 'like', "%{$filters['search']}%")
                    ->orWhere('roles.description', 'like', "%{$filters['search']}%");
            });
            $permissions->where(function ($query) use ($filters) {
                $query->where('roles.name', 'like', "%{$filters['search']}%")
                    ->orWhere('roles.description', 'like', "%{$filters['search']}%");
            });
        }

        $permissions = $permissions->having('count', '>', 0)->get();
        $hasUsers = $hasUsers->get();
        $hasPermissions = $hasPermissions->get();

        return $this->responseOK([
            'has_permissions' => [
                'count:yes_or_no' => $hasPermissions->count(),
                'count:yes' => $hasPermissions
                    ->filter(function ($item) {
                        return count($item['permissions']) > 0;
                    })
                    ->count(),
                'count:no' => $hasPermissions
                    ->filter(function ($item) {
                        return count($item['permissions']) === 0;
                    })
                    ->count(),
            ],
            'has_users' => [
                'count:yes_or_no' => $hasUsers->count(),
                'count:yes' => $hasUsers
                    ->filter(function ($item) {
                        return count($item['users']) > 0;
                    })
                    ->count(),
                'count:no' => $hasUsers
                    ->filter(function ($item) {
                        return count($item['users']) === 0;
                    })
                    ->count(),
            ],
            'permissions' => [
                'data' => $permissions,
                'count' => $permissions
                    ->filter(function ($item) {
                        return $item['count'] > 0;
                    })
                    ->count()
            ]
        ]);
    }

    public function getGet(Request $request, $id)
    {
        $user = $this->getUserFromRequest($request);

        $role = Role::with('permissions')
            ->with('users')
            ->find($id);

        if (!$role) {
            Log::add($user, 'roles.not_found', [
                'message' => 'while.get',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $id,
                    'model' => Role::class,
                ],
            ]);
        }

        return $this->responseOK([
            'role' => $role->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $role = Role::find($request->post('id'));
        if (!$role) {
            Log::add($user, 'roles.not_found', [
                'message' => 'while.edit',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => Role::class,
                ],
            ]);
        }

        $request->validate([
            'name' => ['required', Rule::unique('roles')->where(function ($query) use ($role) {
                return $query->where('id', '<>', $role->id);
            })],
            'description' => 'max:512'
        ]);

        $role->fill($request->post());
        $role->save();

        Log::add($user, 'roles.edit', [
            'model' => $role,
            'request' => $request
        ]);

        return response()->json([
            'role' => $role->toArray(),
        ]);
    }

    public function postAdd(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $request->validate([
            'name' => 'required|unique:roles,name',
            'description' => 'max:512'
        ]);

        $role = new Role();
        $role->fill($request->post());
        $role->guard_name = 'web';
        $role->save();

        Log::add($user, 'roles.add', [
            'model' => $role,
            'request' => $request
        ]);

        return response()->json([
            'role' => $role->toArray(),
        ]);
    }

    public function deleteDeleteRole(Request $request)
    {
        $user = $this->getUserFromRequest($request);
        $role = Role::find($request->route('id'));
        if (!$role) {
            Log::add($user, 'roles.not_found', [
                'model' => $role,
                'message' => 'while.delete',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => Role::class,
                ],
            ]);
        }

        Log::add($user, 'roles.delete', [
            'model' => $role,
            'request' => $request
        ]);

        $role->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function getPermissionList(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $permisions = Permission::orderBy('name', 'ASC')->get();

        return $this->responseOK([
            'permissions' => $permisions->toArray(),
        ]);
    }

    public function deleteDeleteUserRole(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.users_remove_role',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('user_id'),
                    'model' => User::class,
                ],
            ]);
        }

        $role = Role::find($request->route('role_id'));
        if (!$role) {
            Log::add($user, 'roles.not_found', [
                'message' => 'while.users_remove_role',
                'model' => $u,
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('role_id'),
                    'model' => Role::class,
                ],
            ]);
        }

        foreach ($role->users as $u2) {
            broadcast(new UserDataChanged($u2));
        }

        $u->removeRole($role);

        Log::add($user, 'users.remove_role', [
            'model' => $u,
            'related_model' => $role,
            'request' => $request
        ]);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function deleteDeleteRolePermission(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $role = Role::find($request->route('role_id'));
        if (!$role) {
            Log::add($user, 'roles.not_found', [
                'message' => 'while.roles_remove_permission',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('role_id'),
                    'model' => Role::class,
                ],
            ]);
        }

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.roles_remove_permission',
                'model' => $role,
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('permission_id'),
                    'model' => Permission::class,
                ],
            ]);
        }

        $permission->removeRole($role);

        Log::add($user, 'roles.remove_permission', [
            'model' => $role,
            'related_model' => $permission,
            'request' => $request
        ]);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function deleteDeletePermission(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $permission = Permission::find($request->route('permission_id'));
        if (!$permission) {
            Log::add($user, 'permissions.not_found', [
                'message' => 'while.delete',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('permission_id'),
                    'model' => Permission::class,
                ],
            ]);
        }

        Log::add($user, 'permissions.delete', [
            'model' => $permission,
            'request' => $request
        ]);

        $permission->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }
}
