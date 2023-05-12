<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class Config extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRoles;

    protected $table = 'config';
    protected $fillable = [
        'key', 'type', 'value', 'description', 'is_editable', 'is_deletable'
    ];

    public function toArray()
    {
        $value = null;
        switch ($this->type) {
            case 'string':
                $value = "";
                break;

            case "object":
            case "array":
                $value = [];

                // no break
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

    public static function getByKey($key)
    {
        return Config::where('key', '=', $key)->first();
    }
}
