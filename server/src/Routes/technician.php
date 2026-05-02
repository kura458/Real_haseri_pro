<?php
use Haseri\Backend\Modules\Technician\Controllers\TechnicianVerificationController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($uri === '/api/technician/verify' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new TechnicianVerificationController())->submit($user);
        exit;
    }

    if ($uri === '/api/technician/verification-status' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new TechnicianVerificationController())->status($user);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}