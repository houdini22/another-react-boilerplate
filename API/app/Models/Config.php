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

    public function toArray()
    {
        $value = NULL;
        switch ($this->type) {
            case 'string':
                $value = "";
                break;

            case "object":
            case "array":
                $value = [];

            default:
                break;
        }
        if ($this->value) {
            $value = $this->value;
        }

        return [
            'key' => $this->key,
            'type' => $this->type,
            'value' => $value,
        ];
    }

    public static function getByKey($key) {
        return Config::where('key', '=', $key)->first();
    }
}
