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

    public function file()
    {
        return $this->hasOne(File::class, 'id', 'value');
    }

    public function toArray()
    {
        $value = null;

        if ($this->model_type) {
            if ($this->model_type === "file") {
                $value = $this->file;
            }
        } else {
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

    public static function getAppConfig()
    {
        $config = [
            'name' => Config::getByKey('app.name')->value,
        ];

        $logo = null;
        $logoId = Config::getByKey('app.logo')->value;
        if ($logoId) {
            $file = File::find($logoId);
            if ($file) {
                $logo = $file->toArray();
            }
        }

        $config['logo'] = $logo;
        return $config;
    }
}
