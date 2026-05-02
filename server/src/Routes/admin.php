<?php
use Haseri\Backend\Modules\Auth\Controllers\AdminAuthController;
use Haseri\Backend\Modules\Admin\Controllers\TechnicianApprovalController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Auth
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

    // Technician Approvals
    if ($uri === '/api/admin/verifications/pending' && $method === 'GET') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->pending($admin);
        exit;
    }

    if ($uri === '/api/admin/verifications/approve' && $method === 'POST') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->approve($admin);
        exit;
    }

    if ($uri === '/api/admin/verifications/reject' && $method === 'POST') {
        $admin = AuthMiddleware::handleAdmin();
        (new TechnicianApprovalController())->reject($admin);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}