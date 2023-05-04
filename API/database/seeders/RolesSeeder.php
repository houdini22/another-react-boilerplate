<?php

namespace Database\Seeders;

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
        Role::insert([
            [
                'name' => 'Admin',
                'guard_name' => 'web',
                'is_deletable' => true,
            ],
        ]);

        $user = User::find(1);
        $role = Role::find(1);

        $user->assignRole($role);
    }
}
