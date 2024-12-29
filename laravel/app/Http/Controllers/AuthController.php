<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessTokenResult;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Créer un token Sanctum pour l'utilisateur
            $token = $user->createToken('MyApp')->plainTextToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function createUser(Request $request){
        $user = User::create([
            'name' => "admin",
            'email' => "admin@gmail.com",
            'password' => Hash::make("123456"),
        ]);
    }
}

