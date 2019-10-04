<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();
        $request->session()->flush();
        $request->session()->regenerate();
        return response()->json([
            'status' => 'ok',
            'csrfToken' => csrf_token(),
        ]);
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        Auth::loginUsingId($user->id);
        return $request->expectsJson()
        ? response()->json([
            'status' => 'ok',
            'csrfToken' => csrf_token(),
            'token' => $user->api_token,
            'user' => $user->toArray(),
        ]) : redirect()->intended('/');
    }


    protected function sendFailedLoginResponse(Request $request)
    {
        return $request->expectsJson()
        ? response()->json(['message' => "Echec de l’authentification"], 401) : redirect('/login')
        ->withInput($request->only($this->username(), 'remember'))
        ->withErrors([
            $this->username() => __('auth.failed'),
        ]);
    }
}
