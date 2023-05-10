<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class Config extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $table = 'config';
    protected $fillable = [
        'key', 'type', 'value', 'description', 'is_editable', 'is_deletable'
    ];
}
