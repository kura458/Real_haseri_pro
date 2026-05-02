<?php
namespace Haseri\Backend\Modules\Jobs\Controllers;

use Haseri\Backend\Modules\Jobs\Services\JobService;
use Haseri\Backend\Modules\Jobs\Requests\CreateJobRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class JobController
{
    private $service;

    public function __construct()
    {
        $this->service = new JobService();
    }

    public function index()
    {
        $filters = $_GET;
        $result = $this->service->getAll($filters);
        Response::success($result);
    }

    public function show($id)
    {
        try {
            $result = $this->service->getById($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function store($user)
    {
        try {
            $request = new CreateJobRequest();
            $data = $request->validate();
            $result = $this->service->create($user->id, $data);
            Response::success($result, 201);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode(), $e->getErrors() ?? null);
        }
    }

    public function myJobs($user)
    {
        $result = $this->service->getByCustomer($user->id);
        Response::success($result);
    }

    public function complete($user, $id)
    {
        try {
            $result = $this->service->complete($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function cancel($user, $id)
    {
        try {
            $result = $this->service->cancel($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}