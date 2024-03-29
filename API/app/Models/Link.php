<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'tree_id',
        'link_name',
        'link_url',
        'link_target',
        'category_id',
        'document_id',
        'file_id',
        'link_display_children',
        'icon_id'
    ];

    public function linkDocument()
    {
        return $this->hasOne(Tree::class, 'id', 'document_id');
    }

    public function linkCategory()
    {
        return $this->hasOne(Tree::class, 'id', 'category_id');
    }

    public function linkFile()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

    public function iconFile()
    {
        return $this->hasOne(File::class, 'id', 'icon_id');
    }
}
