<?php
namespace Haseri\Backend\Modules\Admin\Controllers;

use Haseri\Backend\Modules\Admin\Services\TechnicianApprovalService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class TechnicianApprovalController
{
    private $service;

    public function __construct()
    {
        $this->service = new TechnicianApprovalService();
    }

    public function pending($admin)
    {
        try {
            $result = $this->service->pending();
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function approve($admin)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->approve($data['verification_id'], $admin->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function reject($admin)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->service->reject($data['verification_id'], $admin->id, $data['reason']);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}