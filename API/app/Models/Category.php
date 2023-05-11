<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
        'category_url',
        'category_meta_title',
        'category_meta_keywords',
        'category_meta_robots',
        'category_meta_description',
        'index_document_id',
        'menu_category_id',
    ];

    public function indexDocument()
    {
        return $this->hasOne(Tree::class, 'id', 'index_document_id');
    }

    public function menuCategory()
    {
        return $this->hasOne(Tree::class, 'id', 'menu_category_id');
    }
}
