<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Config;
use App\Models\Tree;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => ['required', 'email', 'unique:users,email'],
            'name' => ['required', 'alpha_dash', 'unique:users,name'],
            'password' => ['required', 'confirmed', Password::min(8)
                ->mixedCase()
                ->symbols()
                ->numbers()
                ->letters()],
            'password_confirmation' => ['required'],
            'captcha' => ['required', 'captcha']
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'email_verify_token' => Str::random(16),
            /*
            'status' => User::$STATUS_ACTIVE,
            'email_verified_at' => Carbon::now(),*/
        ]);

        Mail::send('email_users_activate_account', [
            'url' => url('/users/activate/' . $user->email_verify_token),
        ], function (Message $message) use ($user) {
            $message->to($user->email, $user->name)->subject('Activate ' . config('app.name') . ' account');
            $message->from(config('app.from_email'));
        });

        return $user;
    }

    public function register(Request $request)
    {
        return response(view('auth.register', [
            'mainMenu' => Tree::getMenuByName('main_menu'),
            'slug' => '/register',
            'app' => Config::getAppConfig(),
            'contentPartial' => Tree::getPartialByName('register_partial'),
        ]));
    }

    public function postRegister(Request $request)
    {
        if (($validator = $this->validator($request->all()))->fails()) {
            return redirect()->back()->withErrors($validator->errors());
        }

        event(new Registered($user = $this->create($request->all())));

        $this->guard()->login($user);

        if ($response = $this->registered($request, $user)) {
            return $response;
        }

        return $request->wantsJson()
            ? new JsonResponse([], 201)
            : redirect($this->redirectPath())->with('message', [
                'type' => 'warning',
                'message' => "Check your email to activate your account."
            ]);
    }
}
