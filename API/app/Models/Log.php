<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;

class Log extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'model_id', 'type', 'model_class_name', 'user_id', 'message', 'related_model_class_name', 'related_model_id', 'ip_address', 'payload'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public static function add($user, $type, $data = [])
    {
        $payload = [
            'changed_model_fields' => Arr::get($data, 'model') ? Arr::get($data, 'model')->getChanges() : null,
            'changed_related_model_fields' => Arr::get($data, 'related_model') ? Arr::get($data, 'related_model')->getChanges() : null,
            'request_all_parameters' => Arr::get($data, 'request')->all(),
            'request_post_parameters' => Arr::get($data, 'request')->post(),
            'request_url' => url()->full(),
        ];
        return Log::create([
            'type' => $type,
            'user_id' => (is_object($user) && ((new \ReflectionClass($user))->getName()) === User::class) ? $user->id : 0,
            'model_class_name' => Arr::get($data, 'model') ? (new \ReflectionClass(Arr::get($data, 'model')))->getName() : null,
            'model_id' => Arr::get($data, 'model') ? Arr::get($data, 'model')->id : null,
            'message' => Arr::get($data, 'message'),
            'related_model_class_name' => Arr::get($data, 'related_model') ? (new \ReflectionClass(Arr::get($data, 'related_model')))->getName() : null,
            'related_model_id' => Arr::get($data, 'related_model') ? Arr::get($data, 'related_model')->id : null,
            'ip_address' => Arr::get($data, 'request')->getClientIp(),
            'payload' => json_encode($payload)
        ]);
    }
}
