<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreeFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'tree_id',
        'file_id',
    ];

    public function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }
}
