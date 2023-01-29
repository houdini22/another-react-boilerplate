<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::insert([[
            'name' => 'can_everything',
            'guard_name' => 'web'
        ]]);

        $permission = Permission::find(1);
        $role = Role::find(1);

        $role->givePermissionTo($permission);
    }
}
