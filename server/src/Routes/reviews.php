<?php


// these routes are for reviews module, they will be included in the main router

use Haseri\Backend\Modules\Reviews\Controllers\ReviewController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($uri === '/api/reviews' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new ReviewController())->store($user);
        exit;
    }

    if (preg_match('/^\/api\/reviews\/user\/(\d+)$/', $uri, $m) && $method === 'GET') {
        (new ReviewController())->userReviews($m[1]);
        exit;
    }

    if (preg_match('/^\/api\/reviews\/job\/(\d+)$/', $uri, $m) && $method === 'GET') {
        (new ReviewController())->jobReviews($m[1]);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}