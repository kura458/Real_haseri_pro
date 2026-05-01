<?php
use Haseri\Backend\Modules\Auth\Controllers\AdminAuthController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/admin/login' && $method === 'POST') {
    (new AdminAuthController())->login();
    exit;
}

if ($uri === '/api/admin/verify-otp' && $method === 'POST') {
    (new AdminAuthController())->verifyOtp();
    exit;
}

if ($uri === '/api/admin/logout' && $method === 'POST') {
    (new AdminAuthController())->logout();
    exit;
}