<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Role;

class RoleController extends Controller
{
    public function list() {
        $role = Role::all();
        if($role->isEmpty()) {
            $data = [
                'message' => 'Roles table is empty',
                'status' => 200
            ];
            return response()->json($data, 200);
        }
        return response()->json($role, 200);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:255',
        ]);
        if($validator->fails()) {
            $data = [
                'message' => '',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $role = Role::create($request->all());
        $data = [
            'message' => 'Role succesfully created',
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    public function update(Request $request, $id) {
        $role = Role::find($id);
        if(!$role) {
            $data = [
                'message' => 'Role not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:255',
        ]);

        $role->update($request->all());

        $data = [
            'message' => 'Role succesfully updated',
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    public function delete($id) {
        $role = Role::find($id);
        if(!$role) {
            $data = [
                'message' => 'Role not found', 
                'status' => 404
            ];
            return request()->json($data, 404);
        }

        $role->delete();
        $data = [
            'message' => 'Rol deleted succesfully',
            'status' => 201
        ];
        return response()->json($data, 201);
    }
}
