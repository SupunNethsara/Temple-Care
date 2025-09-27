<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingSlotsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello API!']);
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

Route::apiResource('bookings', BookingSlotsController::class);
Route::apiResource('slots', \App\Http\Controllers\SlotController::class);

Route::get('available-slots', [BookingSlotsController::class, 'availableSlots']);

