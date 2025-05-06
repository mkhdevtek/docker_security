<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function listAll() {
        $user = User::all();
        if($user->isEmpty()) {
            $data = [
                'message' => 'User table is empty',
                'status' => 200
            ];
            return response()->json($data, 200);
        }
        return response()->json($user, 200);
    }

    public function listId($id) {
        $user = User::find($id);
        if($user==null) {
            $data = [
                'message' => 'User not found',
                'status' => 404
            ];
            return response()->json($data, 200);
        }
        return response()->json($user, 200);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|unique:user,email|max:191',
            'password' => 'required|min:6|max:191',
            'role_id' => 'required'
        ]);

        if($validator->fails()) {
            $data = [
                'message' => 'Validation Error',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'remember_token' => Str::random(10)
        ]);
        $data = [
            'message' => 'User succesfully created',
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        if(!$user) {
            $data = [
                'message' => 'User not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'max:191',
            'email' => 'max:191|email|unique:user,email,'.$id,
            'password' => 'max:191|min:6',
            'role_id' => 'numeric'
        ]);

        if($validator->fails()) {
            $data = [
                'message' => 'Validation Error',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id
        ]);
        $data = [
            'message' => 'User succesfully updated',
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    public function delete($id) {
        $user = User::find($id);
        if(!$user) {
            $data = [
                'message' => 'User not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $user->delete();
        $data = [
            'message' => 'User deleted',
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}
