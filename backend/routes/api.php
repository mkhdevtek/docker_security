<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Use App\Http\Controllers\UserController;
Use App\Http\Controllers\RoleController;
Use App\Http\Controllers\LoginController;

Route::post('/login', [LoginController::class, 'login']);

Route::post('/logout', [LoginController::class, 'logout']);

Route::post('/register', [LoginController::class, 'register']);

// User routes
Route::get('/user', [UserController::class, 'listAll']);
Route::get('/user/{id}', [UserController::class, 'listId']);
Route::post('/user', [UserController::class, 'create']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'delete']);

// Role routes
Route::get('/role', [RoleController::class, 'list']);
Route::post('/role', [RoleController::class, 'create']);
Route::put('/role/{id}', [RoleController::class, 'update']);
Route::delete('/role/{id}', [RoleController::class, 'delete']);
