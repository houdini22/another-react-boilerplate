<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Role as RoleBase;

class Role extends RoleBase
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'name', 'guard_name'
    ];
    protected $casts = [
        'is_deletable' => 'boolean',
    ];
}
