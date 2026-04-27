<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Auth\AdminAuthController;

/*
|--------------------------------------------------------------------------
| Admin Authentication Routes
|--------------------------------------------------------------------------
| Separate from user auth - uses admin guard
*/

// Public - No auth required
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/verify-otp', [AdminAuthController::class, 'verifyOtp']);

    // Protected - Admin guard
    Route::middleware('auth:admin')->group(function () {
        Route::post('/refresh', [AdminAuthController::class, 'refresh']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        
        // Future admin routes here
        // Route::get('/dashboard', [AdminController::class, 'dashboard']);
        // Route::get('/users', [AdminController::class, 'users']);
        // Route::get('/reports', [ReportController::class, 'index']);
        // Route::get('/audit-logs', [AuditLogController::class, 'index']);
    });
});