<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:60,1');
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:30,1');
Route::post('/forgot-password', [PasswordResetController::class, 'forgot'])->middleware('throttle:6,1');
Route::post('/reset-password', [PasswordResetController::class, 'reset'])->middleware('throttle:6,1');
Route::get('/courses', [CatalogController::class, 'index']);
Route::get('/courses/{slug}', [CatalogController::class, 'show']);
Route::get('/checkout-config', [PurchaseController::class, 'config']);
Route::post('/paypal/ipn', [PurchaseController::class, 'paypalIpn']);

Route::middleware('api.token')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::patch('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/purchases', [PurchaseController::class, 'index']);
    Route::post('/purchases', [PurchaseController::class, 'store'])->middleware('throttle:20,1');
    Route::get('/purchases/{payment}', [PurchaseController::class, 'show']);
    Route::post('/purchases/{payment}/pay', [PurchaseController::class, 'pay'])->middleware('throttle:20,1');
    Route::post('/purchases/{payment}/verify', [PurchaseController::class, 'verify'])->middleware('throttle:20,1');
    Route::post('/purchases/{payment}/paypal-return', [PurchaseController::class, 'paypalReturn'])->middleware('throttle:20,1');
});
