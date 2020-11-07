<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'nick',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function generateToken()
    {
        do {
            $this->token = Str::random(32);
            $passed = true;
            try {
                $this->save();
            } catch (\Exception $e) {
                $passed = false;
            }
        } while ($passed === false);
    }

    public static function getFromRequest(\Illuminate\Http\Request $request)
    {
        $token = $request->header('X-SESSION-TOKEN');
        if ($token) {
            $user = \App\Models\User::where('token', '=', $token)->first();
            if ($user) {
                return $user;
            }
        }
        return false;
    }
}
