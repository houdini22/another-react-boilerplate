<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Tree extends Model
{
    use HasFactory;
    use NodeTrait;

    protected $table = 'tree';
    protected $with = ['category'];

    public function category()
    {
        return $this->hasOne(Category::class);
    }
}
