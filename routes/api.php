<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingSlotsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello API!']);
});
//User
Route::post('register' ,[AuthController::class ,'Register']);
Route::post('login' ,[AuthController::class ,'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

//Booking slots
Route::apiResource("/booking", BookingSlotsController::class);
