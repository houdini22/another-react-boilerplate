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
                'name' => 'admin',
                'guard_name' => 'web',
            ],
        ]);
        Role::insert([
            [
                'name' => 'moderator',
                'guard_name' => 'web',
            ],
        ]);

        $user = User::find(1);
        $role = Role::find(1);

        $user->assignRole($role);
    }
}
