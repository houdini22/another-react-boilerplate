<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $configs = [
            [
                'key' => 'cms.meta.title',
                'type' => 'string',
                'value' => 'Meta Title',
                'description' => 'Site Meta Title',
                'is_deletable' => false,
            ],
            [
                'key' => 'cms.meta.description',
                'type' => 'string',
                'value' => 'Meta Description',
                'description' => 'Site Meta Description',
                'is_deletable' => false,
            ],
            [
                'key' => 'cms.meta.keywords',
                'type' => 'string',
                'value' => 'Meta Keywords',
                'description' => 'Site Meta Keywords',
                'is_deletable' => false,
            ],
            [
                'key' => 'cms.meta.robots',
                'type' => 'string',
                'value' => 'Meta Robots',
                'description' => 'Site Meta Robots',
                'is_deletable' => false,
            ],
            [
                'key' => 'app.name',
                'type' => 'string',
                'value' => 'Application Name',
                'description' => 'Application Name.',
                'is_deletable' => false,
            ],
            [
                'key' => 'app.logo',
                'type' => 'number',
                'value' => 0,
                'description' => 'File Resource for Logo.',
                'is_deletable' => false,
                'model_type' => 'file'
            ],
            [
                'key' => 'app.users.allow_register',
                'type' => 'boolean',
                'value' => 1,
                'description' => 'Allows registration for Users.',
                'is_deletable' => false,
            ],
            [
                'key' => 'app.users.allow_login',
                'type' => 'boolean',
                'value' => 1,
                'description' => 'Allows log in for Users.',
                'is_deletable' => false,
            ]
        ];

        foreach ($configs as $config) {
            $c = Config::create($config);
        }
    }
}
