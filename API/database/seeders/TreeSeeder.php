<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tree;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rootTree = new Tree([
            'tree_object_type' => 'category',
            'tree_published_from' => Carbon::create(1988)->format('Y-m-d H:i:s'),
            'tree_published_to' => Carbon::create(2099)->format('Y-m-d H:i:s'),
            'tree_is_deletable' => false,
            'tree_alias' => 'root',
            'tree_is_published' => true,
        ]);
        $rootTree->save();

        $rootCategory = new Category([
            'category_name' => 'ROOT',
            'tree_id' => $rootTree->id,
        ]);
        $rootCategory->save();

        $rootTree->category_id = $rootCategory->id;
        $rootTree->save();
    }
}
