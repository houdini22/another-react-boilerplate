<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;

class Log extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'model_id', 'type', 'model_class_name', 'user_id', 'message'
    ];

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public static function add($user, $type, $model = NULL, $message = '') {
        return Log::create([
            'type' => $type,
            'user_id' => $user ? $user->id : 0,
            'model_class_name' => $model ? (new \ReflectionClass($model))->getName() : NULL,
            'model_id' => $model ? $model->id : NULL,
            'message' => $message
        ]);
    }
}
