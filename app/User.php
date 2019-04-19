<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'token',
    ];

    public function generateToken()
    {
        do {
            $this->token = str_random(32);
            $passed = true;
            try {
                $this->save();
            } catch (\Exception $e) {
                $passed = false;
            }
        } while ($passed === false);
    }

    public static function getFromRequest(Request $request)
    {
        $token = $request->header('X-SESSION-TOKEN');
        if ($token) {
            $user = User::where('token', '=', $token)->first();
            if ($user) {
                return $user;
            }
        }
        return false;
    }
}
