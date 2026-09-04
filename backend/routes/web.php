<?php

use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PaymentSettingController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (auth()->check()) {
        return auth()->user()->isAdmin()
            ? redirect()->route('admin.dashboard')
            : redirect()->route('student.dashboard');
    }

    return redirect()->route('login');
});

Route::middleware('guest')->group(function () {
    Route::redirect('/login', '/admin/login');
    Route::get('/admin/login', [LoginController::class, 'create'])->name('login');
    Route::post('/admin/login', [LoginController::class, 'store'])->name('login.store');
    Route::get('/admin/forgot-password', [PasswordResetController::class, 'request'])->name('password.request');
    Route::post('/admin/forgot-password', [PasswordResetController::class, 'email'])->name('password.email');
    Route::get('/admin/reset-password/{token}', [PasswordResetController::class, 'edit'])->name('password.reset');
    Route::post('/admin/reset-password', [PasswordResetController::class, 'update'])->name('password.update');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
});

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', StudentDashboardController::class)->name('student.dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::view('/notifications', 'notifications.index')->name('notifications.page');

    Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
        Route::get('/', AdminDashboardController::class)->name('dashboard');
        Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::post('notifications/read', [NotificationController::class, 'markRead'])->name('notifications.read');
        Route::delete('notifications', [NotificationController::class, 'destroyAll'])->name('notifications.destroy-all');
        Route::delete('notifications/{notification}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
        Route::resource('courses', CourseController::class)->except(['show']);
        Route::get('payments', [PaymentController::class, 'index'])->name('payments.index');
        Route::post('payments/{payment}/complete', [PaymentController::class, 'complete'])->name('payments.complete');
        Route::delete('payments/{payment}', [PaymentController::class, 'destroy'])->name('payments.destroy');
        Route::get('settings/payments', [PaymentSettingController::class, 'edit'])->name('settings.payments');
        Route::put('settings/payments', [PaymentSettingController::class, 'update'])->name('settings.payments.update');
        Route::get('students', [StudentController::class, 'index'])->name('students.index');
        Route::get('students/{user}', [StudentController::class, 'show'])->name('students.show');
        Route::delete('students/{user}', [StudentController::class, 'destroy'])->name('students.destroy');
    });
});
