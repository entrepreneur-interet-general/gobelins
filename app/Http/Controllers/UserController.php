<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function me(Request $request)
    {
        return $request->user();
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email:rfc',
            'password' => 'nullable|required_with:newPassword',
            'newPassword' => 'nullable|required_with:password|min:6'
        ]);


        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->newPassword) {
            if (Hash::check($request->password, $user->password)) {
                $user->password = Hash::make($request->newPassword);
            } else {
                throw ValidationException::withMessages([
                    'password' => ['L’ancien mot de passe est incorrect']
                ]);
            }
        }

        $user->save();

        return [
            'user' => $user,
        ];
    }
}
