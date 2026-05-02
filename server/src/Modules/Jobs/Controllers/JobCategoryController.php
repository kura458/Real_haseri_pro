<?php
namespace Haseri\Backend\Modules\Jobs\Controllers;

use Haseri\Backend\Modules\Jobs\Services\JobCategoryService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class JobCategoryController
{
    private $service;

    public function __construct()
    {
        $this->service = new JobCategoryService();
    }

    public function index()
    {
        $result = $this->service->all();
        Response::success($result);
    }

    public function store($user)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->create($data);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function update($user, $id)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->update($id, $data);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function destroy($user, $id)
    {
        try {
            $result = $this->service->delete($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}