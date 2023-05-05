<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::insert([
            [
                'name' => 'Super Admin',
                'guard_name' => 'web',
                'is_deletable' => false,
            ],
        ]);

        $user = User::find(1);
        $role = Role::find(1);
        $user->assignRole($role);


        $roles = [
            [
                'name' => 'roles',
                'guard_name' => 'web',
                'is_deletable' => false,
                'permissions' => [
                    [
                        'name' => 'roles.add',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.add_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.list_permissions',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.list_users',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'roles.remove_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                ]
            ],
            [
                'name' => 'permissions',
                'guard_name' => 'web',
                'is_deletable' => false,
                'permissions' => [
                    [
                        'name' => 'permissions.add',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'permissions.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'permissions.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'permissions.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                ]
            ],
            [
                'name' => 'users',
                'guard_name' => 'web',
                'is_deletable' => false,
                'permissions' => [
                    [
                        'name' => 'users.add',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.add_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.add_role',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.change_avatar',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.change_status',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.force_activation',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.force_login',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.list_permissions',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.list_roles',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                    [
                        'name' => 'users.remove_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                    ],
                ]
            ]
        ];

        foreach ($roles as $r) {
            $role = new Role(['name' => $r['name'], 'guard_name' => $r['guard_name'], 'is_deletable' => $r['is_deletable']]);
            $role->save();

            foreach ($r['permissions'] as $p) {
                $permission = new Permission(['name' => $p['name'], 'guard_name' => $p['guard_name'], 'is_deletable' => $p['is_deletable']]);
                $permission->save();

                $role->givePermissionTo($permission);
            }

            $user->assignRole($role);
        }

    }
}
