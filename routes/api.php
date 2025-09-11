<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello API!']);
});
//User
Route::post('register' ,[\App\Http\Controllers\AuthController::class ,'Register']);
Route::post('login' ,[\App\Http\Controllers\AuthController::class ,'login']);
