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
        // Vérifier si l'email existe déjà
        $existingUser = User::where('email', "admin@gmail.com")->exists();
    
        if ($existingUser) {
            return response()->json([
                'success' => false,
                'message' => "L'utilisateur est déjà créé."
            ], 400); 
        }
    
        // Créer l'utilisateur si l'email est unique
        $user = User::create([
            'name' => "admin", 
            'email' => "admin@gmail.com", 
            'password' => Hash::make("123456"), 
        ]);
    
        return response()->json([
            'success' => true,
            'message' => "L'utilisateur a été ajouté avec succès.",
            'user' => $user
        ], 201);
    }
    
}

