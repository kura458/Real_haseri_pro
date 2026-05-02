<?php
use Haseri\Backend\Modules\Customer\Verification\Controllers\CustomerVerificationController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/api/customer/verify' && $method === 'POST') {
    (new CustomerVerificationController())->initiate();
    exit;
}

if ($uri === '/api/customer/verify/confirm' && $method === 'POST') {
    (new CustomerVerificationController())->confirm();
    exit;
}

if ($uri === '/api/customer/verification-status' && $method === 'GET') {
    (new CustomerVerificationController())->status();
    exit;
}