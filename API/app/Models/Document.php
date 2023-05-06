<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'tree_id',
        'document_name',
        'document_url',
        'document_meta_title',
        'document_meta_keywords',
        'document_meta_description',
        'document_meta_robots',
        'document_content',
    ];
}
