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
    protected $fillable = [
        'tree_is_published',
        'tree_published_from',
        'tree_published_to',
        'tree_is_visible_frontend',
        'tree_is_visible_backend',
        'tree_is_visible_in_select',
        'tree_is_deletable',
        'tree_is_editable',
        'tree_has_edit_button',
        'tree_is_viewable',
        'tree_url_is_showable',
        'tree_url_is_editable',
        'tree_menu_is_visible',
        'tree_alias',
        'tree_object_type',
    ];

    public function category()
    {
        return $this->hasOne(Category::class);
    }
}
