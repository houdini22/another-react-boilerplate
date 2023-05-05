<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Permission as PermissionsBase;

class Permission extends PermissionsBase
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'name', 'description'
    ];

    protected $casts = [
        'is_deletable' => 'boolean',
        'is_name_editable' => 'boolean',
    ];

    protected $table = "permissions";
}
