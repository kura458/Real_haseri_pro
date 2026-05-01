<?php
namespace Haseri\Backend\Modules\Auth\Controllers;

use Haseri\Backend\Modules\Auth\Services\ResetPasswordService;
use Haseri\Backend\Modules\Auth\Requests\ResetPasswordRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class ResetPasswordController
{
    public function reset()
    {
        try {
            $request = new ResetPasswordRequest();
            $data = $request->validate();

            $service = new ResetPasswordService();
            $result = $service->reset(
                $data['user_id'],
                $data['new_password'],
                $data['new_password_confirmation']
            );

            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}