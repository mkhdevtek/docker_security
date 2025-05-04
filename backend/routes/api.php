<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Ruta de prueba
Route::get('/test', function () {
    return response()->json([
        'message' => 'API funcionando correctamente',
        'status' => 'success'
    ]);
});

// Rutas de autenticación
Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Rutas protegidas que requieren autenticación JWT
Route::middleware('auth:api')->group(function () {
    // Ejemplo de rutas protegidas
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Aquí puedes agregar todas tus rutas de API protegidas
    Route::get('/protected-data', function () {
        return response()->json([
            'message' => 'Datos protegidos accesibles solo con token JWT válido',
            'data' => [
                'secret' => 'Información confidencial',
                'timestamp' => now()
            ]
        ]);
    });
});
