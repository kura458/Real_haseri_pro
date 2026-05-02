<?php
namespace Haseri\Backend\Modules\Technician\Controllers;

use Haseri\Backend\Modules\Technician\Services\TechnicianVerificationService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class TechnicianVerificationController
{
    private $service;

    public function __construct()
    {
        $this->service = new TechnicianVerificationService();
    }

    public function submit($user)
    {
        try {
            $data = $_POST;
            $files = $_FILES;
            $result = $this->service->submit($user->id, $data, $files);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function status($user)
    {
        try {
            $result = $this->service->status($user->id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}