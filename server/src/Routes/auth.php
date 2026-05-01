<?php
use Haseri\Backend\Modules\Auth\Controllers\RegisterController;
use Haseri\Backend\Modules\Auth\Controllers\LoginController;
use Haseri\Backend\Modules\Auth\Controllers\GoogleAuthController;
use Haseri\Backend\Modules\Auth\Controllers\ForgotPasswordController;
use Haseri\Backend\Modules\Auth\Controllers\ResetPasswordController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/auth/register' && $method === 'POST') {
    (new RegisterController())->register();
    exit;
}

if ($uri === '/api/auth/login' && $method === 'POST') {
    (new LoginController())->login();
    exit;
}

if ($uri === '/api/auth/google' && $method === 'POST') {
    (new GoogleAuthController())->callback();
    exit;
}

if ($uri === '/api/auth/google/role' && $method === 'POST') {
    (new GoogleAuthController())->setRole();
    exit;
}

if ($uri === '/api/auth/refresh' && $method === 'POST') {
    (new LoginController())->refresh();
    exit;
}

if ($uri === '/api/auth/logout' && $method === 'POST') {
    (new LoginController())->logout();
    exit;
}

// Step 1: Verify identity
if ($uri === '/api/auth/forgot-password' && $method === 'POST') {
    (new ForgotPasswordController())->verifyIdentity();
    exit;
}

// Step 2: Set new password
if ($uri === '/api/auth/reset-password' && $method === 'POST') {
    (new ResetPasswordController())->reset();
    exit;
}