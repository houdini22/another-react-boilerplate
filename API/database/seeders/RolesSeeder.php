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
                'is_name_editable' => false,
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
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'roles.add',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.add_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.list_permissions',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.list_users',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'roles.remove_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ],
            [
                'name' => 'permissions',
                'guard_name' => 'web',
                'is_deletable' => false,
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'permissions.add',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'permissions.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'permissions.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'permissions.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ],
            [
                'name' => 'users',
                'guard_name' => 'web',
                'is_deletable' => false,
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'users.add',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.add_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.add_role',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.change_avatar',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.change_status',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.force_activation',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.force_login',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.list_permissions',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.list_roles',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.remove_permission',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'users.remove_role',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ],
            [
                'name' => 'cms',
                'guard_name' => 'web',
                'is_deletable' => false,
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'cms.add_category',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.add_document',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.add_link',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.delete_category',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.delete_document',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.delete_link',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.edit_category',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.edit_document',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.edit_link',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.publish',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.unpublish',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'cms.settings',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ],
            [
                'name' => 'media',
                'guard_name' => 'web',
                'is_deletable' => false,
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'media.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'media.upload',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'media.edit',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'media.delete',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ],
            [
                'name' => 'logs',
                'guard_name' => 'web',
                'is_deletable' => false,
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'logs.list',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ],
            [
                'name' => 'system',
                'guard_name' => 'web',
                'is_deletable' => false,
                'is_name_editable' => false,
                'permissions' => [
                    [
                        'name' => 'system.edit_settings',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                    [
                        'name' => 'system.settings',
                        'guard_name' => 'web',
                        'is_deletable' => false,
                        'is_name_editable' => false,
                    ],
                ]
            ]
        ];

        foreach ($roles as $r) {
            $role = new Role(['name' => $r['name'], 'guard_name' => $r['guard_name'], 'is_deletable' => $r['is_deletable'], 'is_name_editable' => $r['is_name_editable']]);
            $role->save();

            foreach ($r['permissions'] as $p) {
                $permission = new Permission(['name' => $p['name'], 'guard_name' => $p['guard_name'], 'is_deletable' => $p['is_deletable'], 'is_name_editable' => $r['is_name_editable']]);
                $permission->save();

                $role->givePermissionTo($permission);
            }

            $user->assignRole($role);
        }

    }
}
