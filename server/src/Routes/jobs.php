<?php
use Haseri\Backend\Modules\Jobs\Controllers\JobController;
use Haseri\Backend\Modules\Jobs\Controllers\JobApplicationController;
use Haseri\Backend\Modules\Jobs\Controllers\JobCategoryController;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Categories
    if ($uri === '/api/jobs/categories' && $method === 'GET') {
        (new JobCategoryController())->index();
        exit;
    }

    if ($uri === '/api/jobs/categories' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new JobCategoryController())->store($user);
        exit;
    }

    if (preg_match('/^\/api\/jobs\/categories\/(\d+)$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new JobCategoryController())->update($user, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/jobs\/categories\/(\d+)$/', $uri, $m) && $method === 'DELETE') {
        $user = AuthMiddleware::handle();
        (new JobCategoryController())->destroy($user, $m[1]);
        exit;
    }

    // Jobs
    if ($uri === '/api/jobs' && $method === 'GET') {
        (new JobController())->index();
        exit;
    }

    if (preg_match('/^\/api\/jobs\/(\d+)$/', $uri, $m) && $method === 'GET') {
        (new JobController())->show($m[1]);
        exit;
    }

    // authenticated routes prevent unauthenticated access to job creation and managements
    if ($uri === '/api/jobs' && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new JobController())->store($user);
        exit;
    }

    if ($uri === '/api/jobs/mine' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new JobController())->myJobs($user);
        exit;
    }

    if (preg_match('/^\/api\/jobs\/(\d+)\/complete$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new JobController())->complete($user, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/jobs\/(\d+)\/cancel$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new JobController())->cancel($user, $m[1]);
        exit;
    }

    // Applications
    if (preg_match('/^\/api\/jobs\/(\d+)\/apply$/', $uri, $m) && $method === 'POST') {
        $user = AuthMiddleware::handle();
        (new JobApplicationController())->apply($user, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/jobs\/(\d+)\/applications$/', $uri, $m) && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new JobApplicationController())->jobApplications($user, $m[1]);
        exit;
    }

    if ($uri === '/api/applications/mine' && $method === 'GET') {
        $user = AuthMiddleware::handle();
        (new JobApplicationController())->myApplications($user);
        exit;
    }

    if (preg_match('/^\/api\/applications\/(\d+)\/accept$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new JobApplicationController())->accept($user, $m[1]);
        exit;
    }

    if (preg_match('/^\/api\/applications\/(\d+)\/reject$/', $uri, $m) && $method === 'PUT') {
        $user = AuthMiddleware::handle();
        (new JobApplicationController())->reject($user, $m[1]);
        exit;
    }
} catch (HttpException $e) {
    Response::error($e->getMessage(), $e->getStatusCode());
}