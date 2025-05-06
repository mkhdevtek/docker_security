<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request) {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Attempt to authenticate the user
        // $credentials = $request->only('email', 'password');
        // if (auth()->attempt($credentials)) {
        //     // If successful, return a success response
        //     $user = auth()->user();
        //     $token = $user->createToken('Personal Access Token')->accessToken;
        //     return response()->json([
        //         'message' => 'Login successful',
        //         'token' => $token,
        //         'user' => $user,
        //     ], 200);
        // }
        // If unsuccessful, return an error response
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request) {
        // Log the user out
        auth()->logout();

        // Return a success response
        return response()->json(['message' => 'Logout successful'], 200);
    }

    public function register(Request $request) {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:191',
            'email' => 'required|email|unique:user,email|max:191',
            'password' => 'required|string|min:6|max:191|confirmed',
            'role_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422);
        }
        // Check if the email already exists
        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            return response()->json(['message' => 'Email already exists'], 409);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        // Return a success response
        return response()->json(['message' => 'User registered successfully'], 201);
    }
}
