<?php
namespace Haseri\Backend\Modules\Admin\Controllers;

use Haseri\Backend\Modules\Admin\Services\UserManagementService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

#user managemnts  
class UserManagementController
{
    private $service;

    public function __construct()
    {
        $this->service = new UserManagementService();
    }

    public function index($admin)
    {
        $filters = $_GET;
        $result = $this->service->all($filters);
        Response::success($result);
    }

    public function show($admin, $id)
    {
        try {
            $result = $this->service->find($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function deactivate($admin, $id)
    {
        try {
            $result = $this->service->deactivate($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function activate($admin, $id)
    {
        try {
            $result = $this->service->activate($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function destroy($admin, $id)
    {
        try {
            $result = $this->service->delete($id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}