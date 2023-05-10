<?php

namespace App\Http\Controllers;

use App\Events\UserDataChanged;
use App\Events\UserForceLogout;
use App\Models\File;
use App\Models\Log;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UsersController extends Controller
{
    public function getList(Request $request)
    {
        $user = $this->getUserFromRequest($request);

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
                    $query->where('status', $filters['status'] === 'yes' ? 1 : 0);
                }
            });
        }

        if (!empty($filters['has_avatar'])) {
            $query = $query->where(function ($query) use ($filters) {
                if ($filters['has_avatar'] === 'yes') {
                    $query->whereNotNull('avatar_id');
                } else if ($filters['has_avatar'] === 'no') {
                    $query->whereNull('avatar_id');
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

        if (!empty($filters['has_files'])) {
            if ($filters['has_files'] === 'yes') {
                $query = $query->whereHas('files');
            } else if ($filters['has_files'] === 'no') {
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

        if (empty($filters)) {
            $users = $query->get()->toArray();
        } else {
            $users = $query->paginate(10000);
        }

        Log::add($user, 'users.list', [
            'request' => $request
        ]);

        return $this->responseOK($users);
    }

    public function getFiltersData(Request $request)
    {
        $user = User::getFromRequest($request);

        $filters = $request->get('filters');

        $permissions = Permission::select([
            'permissions.*',
            'users.id as user_id',
            'files.class as files_class',
            'files.id as files_id',
            'files.user_id as files_user_id',
            'avatar.user_id as avatar_user_id',
            'avatar.id as avatar_id',
            'count' => DB::raw('count(distinct users.id) as count')
        ])->from('permissions', 'permissions')
            ->leftJoin('model_has_permissions', 'model_has_permissions.permission_id', 'permissions.id')
            ->leftJoin('users', 'users.id', 'model_has_permissions.model_id')
            ->leftJoin('model_has_roles', 'model_has_roles.model_id', 'users.id')
            ->leftJoin('files', 'files.user_id', 'users.id')
            ->leftJoin('files as avatar', 'users.avatar_id', 'avatar.id')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('users.name', 'LIKE', '%'.Arr::get($filters,'search').'%');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereNull('model_has_roles.model_id');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereNotNull('model_has_roles.model_id');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereNull('model_has_permissions.permission_id');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereNotNull('model_has_permissions.permission_id');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereNull('files.id');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query
                        ->whereNotNull('files.id')
                        ->where('files.class', '=', 'file');
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereNull('avatar.id');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereNotNull('avatar.id');
                }
                if (Arr::get($filters, 'status') === 'yes') {
                    $query->where('users.status', '=', 1);
                } else if (Arr::get($filters, 'status') === 'no') {
                    $query->where('users.status', '=', 0);
                }
            })
            ->groupBy("id");

        $roles = Role::select([
            'roles.id as id',
            'roles.name as name',
            'count' => DB::raw('count(distinct users.id) as count'),
        ])->from('roles', 'roles')
            ->leftJoin('role_has_permissions', 'role_has_permissions.role_id', 'roles.id')
            ->leftJoin('model_has_roles', 'model_has_roles.role_id', 'roles.id')
            ->leftJoin('users', 'users.id', 'model_has_roles.model_id')
            ->leftJoin('files', 'files.user_id', 'users.id')
            ->leftJoin('files as avatar', 'avatar.id', 'users.avatar_id')
            ->leftJoin('model_has_permissions', 'model_has_permissions.model_id', 'users.id')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('users.name', 'LIKE', '%'.Arr::get($filters,'search').'%');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereNull('model_has_roles.model_id');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereNotNull('model_has_roles.model_id');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereNull('model_has_permissions.permission_id');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereNotNull('model_has_permissions.permission_id');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereNull('files.id');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query
                        ->where('files.class', '=', 'file')
                        ->whereNotNull('files.id');
                }
                if (Arr::get($filters, 'status') === 'yes') {
                    $query->where('users.status', '=', 1);
                } else if (Arr::get($filters, 'status') === 'no') {
                    $query->where('users.status', '=', 0);
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereNull('avatar.id');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereNotNull('avatar.id');
                }
            })
            ->groupBy("id");

        $hasAvatar = User::with('avatar')
            ->with('permissions')
            ->with('roles')
            ->with('files')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('name', 'LIKE', '%' . Arr::get($filters, 'search') . '%');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereDoesntHave('permissions');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereHas('permissions');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereDoesntHave('roles');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereHas('roles');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereDoesntHave('files');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query->whereHas('files', function($query) {
                        $query
                            ->where('class', '=', 'file');
                    });
                }
                if (Arr::get($filters, 'status') === 'yes') {
                    $query->where('users.status', '=', 1);
                } else if (Arr::get($filters, 'status') === 'no') {
                    $query->where('users.status', '=', 0);
                }
            });
        $hasFiles = User::with('files')
            ->with('permissions')
            ->with('roles')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('name', 'LIKE', '%' . Arr::get($filters, 'search') . '%');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereDoesntHave('roles');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereHas('roles');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereDoesntHave('permissions');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereHas('permissions');
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereDoesntHave('avatar');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereHas('avatar');
                }
                if (Arr::get($filters, 'status') === 'yes') {
                    $query->where('users.status', '=', 1);
                } else if (Arr::get($filters, 'status') === 'no') {
                    $query->where('users.status', '=', 0);
                }
            });
        $hasRoles = User::with('roles')
            ->with('files')
            ->with('permissions')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('name', 'LIKE', '%' . Arr::get($filters, 'search') . '%');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereDoesntHave('permissions');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereHas('permissions');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereDoesntHave('files');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query->whereHas('files', function($query) {
                        $query
                            ->where('class', '=', 'file');
                    });
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereDoesntHave('avatar');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereHas('avatar');
                }
                if (Arr::get($filters, 'status') === 'yes') {
                    $query->where('users.status', '=', 1);
                } else if (Arr::get($filters, 'status') === 'no') {
                    $query->where('users.status', '=', 0);
                }
            });
        $hasPermissions = User::with('permissions')
            ->with('files')
            ->with('roles')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('name', 'LIKE', '%' . Arr::get($filters, 'search') . '%');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereDoesntHave('roles');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereHas('roles');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereDoesntHave('files');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query->whereHas('files', function($query) {
                        $query
                            ->where('class', '=', 'file');
                    });
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereDoesntHave('avatar');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereHas('avatar');
                }
                if (Arr::get($filters, 'status') === 'yes') {
                    $query->where('users.status', '=', 1);
                } else if (Arr::get($filters, 'status') === 'no') {
                    $query->where('users.status', '=', 0);
                }
            });
        $statusActive = User::with('permissions')
            ->with('roles')
            ->with('files')
            ->where('status', '=', 1)
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('name', 'LIKE', '%' . Arr::get($filters, 'search') . '%');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereDoesntHave('permissions');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereHas('permissions');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereDoesntHave('roles');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereHas('roles');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereDoesntHave('files');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query->whereHas('files', function($query) {
                        $query
                            ->where('class', '=', 'file');
                    });
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereDoesntHave('avatar');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereHas('avatar');
                }
            });

        $statusNotActive = User::with('permissions')
            ->with('roles')
            ->where('status', '=', 0)
            ->with('files')
            ->where(function ($query) use ($filters) {
                if (Arr::get($filters, 'search')) {
                    $query->where('name', 'LIKE', '%' . Arr::get($filters, 'search') . '%');
                }
                if (Arr::get($filters, 'has_permissions') === 'no') {
                    $query->whereDoesntHave('permissions');
                } else if (Arr::get($filters, 'has_permissions') === 'yes') {
                    $query->whereHas('permissions');
                }
                if (Arr::get($filters, 'has_roles') === 'no') {
                    $query->whereDoesntHave('roles');
                } else if (Arr::get($filters, 'has_roles') === 'yes') {
                    $query->whereHas('roles');
                }
                if (Arr::get($filters, 'has_files') === 'no') {
                    $query->whereDoesntHave('files');
                } else if (Arr::get($filters, 'has_files') === 'yes') {
                    $query->whereHas('files', function($query) {
                        $query
                            ->where('class', '=', 'file');
                    });
                }
                if (Arr::get($filters, 'has_avatar') === 'no') {
                    $query->whereDoesntHave('avatar');
                } else if (Arr::get($filters, 'has_avatar') === 'yes') {
                    $query->whereHas('avatar');
                }
            });

        if (Arr::get($filters, 'has_avatar') === 'no') {
        } else if (Arr::get($filters, 'has_avatar') === 'yes') {
        }
        if (Arr::get($filters, 'has_files') === 'no') {
        }
        if (Arr::get($filters, 'has_roles') === 'no') {
        } else if (Arr::get($filters, 'has_roles') === 'yes') {
        }
        if (Arr::get($filters, 'has_permissions') === 'no') {
        } else if (Arr::get($filters, 'has_permissions') === 'yes') {
        }

        $permissions = $permissions->get();
        $roles = $roles->get();
        $hasAvatar = $hasAvatar->get();
        $hasFiles = $hasFiles->get();
        $hasRoles = $hasRoles->get();
        $hasPermissions = $hasPermissions->get();
        $statusActive = $statusActive->get();
        $statusNotActive = $statusNotActive->get();

        return $this->responseOK([
            'permissions' => [
                'data' => $permissions,
                'count' => $permissions
                    ->filter(function ($item) {
                        return $item['count'] > 0;
                    })
                    ->count()
            ],
            'roles' => [
                'data' => $roles,
                'count' => $roles
                    ->filter(function ($item) {
                        return $item['count'] > 0;
                    })
                    ->count(),
            ],
            'has_avatar' => [
                'count:yes_or_no' => $hasAvatar->count(),
                'count:yes' => $hasAvatar
                    ->filter(function ($item) {
                        return Arr::get($item, 'avatar.id') !== NULL;
                    })
                    ->count(),
                'count:no' => $hasAvatar
                    ->filter(function ($item) {
                        return Arr::get($item, 'avatar.id') === NULL;
                    })
                    ->count()
            ],
            'has_files' => [
                'count:yes_or_no' => $hasFiles->count(),
                'count:yes' => $hasFiles
                    ->filter(function ($item) {
                        return count($item['files']) > 0;
                    })
                    ->count(),
                'count:no' => $hasFiles
                    ->filter(function ($item) {
                        return count($item['files']) === 0;
                    })
                    ->count()
            ],
            'has_roles' => [
                'count:yes_or_no' => $hasRoles->count(),
                'count:yes' => $hasRoles
                    ->filter(function ($item) {
                        return count($item['roles']) > 0;
                    })
                    ->count(),
                'count:no' => $hasRoles
                    ->filter(function ($item) {
                        return count($item['roles']) === 0;
                    })
                    ->count()
            ],
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
                    ->count()
            ],
            'status' => [
                'count:yes_or_no' => $statusActive->count() + $statusNotActive->count(),
                'count:yes' => $statusActive->count(),
                'count:no' => $statusNotActive->count(),
            ]
        ]);
    }

    public function getGet(Request $request, $id)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::with('roles')
            ->with('permissions')
            ->with('roles')
            ->with('roles.permissions')
            ->with('avatar')
            ->withCount(['files', 'roles', 'permissions'])
            ->find($id);

        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.get',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $id,
                    'model' => User::class,
                ],
            ]);
        }

        return $this->responseOK([
            'user' => $u->toArray(),
        ]);
    }

    public function postEdit(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->post('id'));
        if (!$u) {
            Log::add(NULL, 'users.not_found', [
                'message' => 'while.edit',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->post('id'),
                    'model' => User::class,
                ],
            ]);
        }

        $request->validate([
            'email' => ['required', 'email', Rule::unique('users')->where(function ($query) use ($u) {
                return $query->where('id', '<>', $u->id);
            })],
            'name' => ['required', Rule::unique('users')->where(function ($query) use ($u) {
                return $query->where('id', '<>', $u->id);
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

        $u->fill($values);

        if ($request->post('password')) {
            $u->password = bcrypt($request->post('password'));
        }

        $u->save();

        Log::add($user, 'users.edit', [
            'model' => $u,
            'request' => $request
        ]);

        broadcast(new UserDataChanged($u));

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function postAdd(Request $request)
    {
        $user = $this->getUserFromRequest($request);

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

        $u = new User();
        $u->fill($request->post());
        $u->password = bcrypt($u->password);
        $u->save();

        Log::add($user, 'users.add', [
            'model' => $u,
            'request' => $request
        ]);

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function deleteDeleteUser(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.delete',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => User::class,
                ],
            ]);
        }

        Log::add($user, 'users.delete', [
            'model' => $u,
            'request' => $request
        ]);

        broadcast(new UserForceLogout($u, $u->token));

        $u->delete();

        return $this->responseOK();
    }

    public function postAddUserRole(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('user_id'));
        if (!$u) {
            Log::add(NULL, 'users.not_found', [
                'message' => 'while.add_to_user',
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
                'model' => $u,
                'message' => 'while.add_to_user',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('role_id'),
                    'model' => Role::class,
                ],
            ]);
        }

        $u->assignRole($role);

        Log::add($user, 'users.add_role', [
            'model' => $u,
            'related_model' => $role,
            'request' => $request
        ]);

        broadcast(new UserDataChanged($u));

        return $this->responseOK();
    }

    public function postSendActivationEmail(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->post('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.send_activation_email',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->post('id'),
                    'model' => User::class,
                ],
            ]);
        }

        $u->email_verified_at = NULL;
        $u->email_verify_token = \Illuminate\Support\Str::random(16);
        $u->save();

        Mail::send('email_users_activate_account', [
            'url' => url('/users/activate/' . $u->email_verify_token),
        ], function ($message) use ($request, $u) {
            $message->to($u->email, $u->email)->subject('Activate account on ' . url('/'));
            $message->from(config('app.from_email'));
        });

        Log::add($user, 'users.send_activation_email', [
            'model' => $u,
            'request' => $request
        ]);

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function getActivate(Request $request)
    {
        $user = User::where('email_verify_token', $request->route('email_verified_token'))
            ->get()
            ->first();

        if (!$user) {
            Log::add(NULL, 'users.not_found', [
                'message' => 'while.activate',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('email_verified_token'),
                    'model' => User::class,
                ],
            ]);
        }

        $user->email_verify_token = NULL;
        $user->email_verified_at = Carbon::now();
        $user->save();

        Log::add(NULL, 'users.activate', [
            'model' => $user,
            'request' => $request
        ]);

        return redirect('/#/users/account_activated');
    }

    public function postChangeAvatar(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.change_avatar',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => User::class,
                ],
            ]);
        }

        $request->validate([
            'avatar' => 'required|file|max:2048'
        ]);

        if ($u->avatar()->first()) {
            Log::add($user, 'users.remove_avatar', [
                'model' => $u,
                'message' => 'while.change_avatar',
                'related_model' => $u->avatar()->first(),
                'request' => $request
            ]);
            $u->avatar()->delete();
        }

        $file = File::upload($request->file('avatar'), $user);
        $file->class = 'avatar';
        $file->save();

        $u->avatar_id = $file->id;
        $u->save();

        Log::add($user, 'users.change_avatar', [
            'model' => $u,
            'related_model' => $file,
            'request' => $request
        ]);

        broadcast(new UserDataChanged($u));

        return $this->responseOK([
            'data' => $u->toArray(),
        ]);
    }

    public function postDeleteAvatar(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->post('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.delete_avatar',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->post('id'),
                    'model' => User::class,
                ],
            ]);
        }

        if ($u->avatar()->first()) {
            Log::add($user, 'users.remove_avatar', [
                'model' => $u,
                'message' => 'while.delete_avatar',
                'related_model' => $u->avatar()->first(),
                'request' => $request
            ]);
            $u->avatar()->delete();
        }

        $u->avatar_id = NULL;
        $u->save();

        broadcast(new UserDataChanged($u));

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postForceLogin(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.force_login',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => User::class,
                ],
            ]);
        }

        $token = $u->token;

        $u->token = NULL;
        $u->save();

        Log::add($user, 'users.force_login', [
            'model' => $u,
            'request' => $request
        ]);

        broadcast(new UserForceLogout($u, $token));

        return $this->responseOK();
    }

    public function postActivate(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.activate',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => User::class,
                ],
            ]);
        }

        $u->status = 1;
        $u->save();

        Log::add($user, 'users.activate', [
            'model' => $u,
            'request' => $request
        ]);

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }

    public function postDeactivate(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $u = User::find($request->route('id'));
        if (!$u) {
            Log::add($user, 'users.not_found', [
                'message' => 'while.deactivate',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => User::class,
                ],
            ]);
        }

        $u->status = 0;
        $u->save();

        Log::add($user, 'users.deactivate', [
            'model' => $u,
            'request' => $request
        ]);

        broadcast(new UserForceLogout($u, $u->token));

        return response()->json([
            'user' => $u->toArray(),
        ]);
    }
}
