<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Models\Role as RoleBase;

class Role extends RoleBase
{
    use HasFactory;
    use Notifiable;
    protected $fillable = [
        'name', 'description'
    ];
    protected $casts = [
        'is_deletable' => 'boolean',
        'is_name_editable' => 'boolean',
    ];
}
