<?php
namespace Haseri\Backend\Modules\Auth\Controllers;

use Haseri\Backend\Modules\Auth\Services\ForgotPasswordService;
use Haseri\Backend\Modules\Auth\Requests\VerifyIdentityRequest;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;

class ForgotPasswordController
{
    public function verifyIdentity()
    {
        try {
            $request = new VerifyIdentityRequest();
            $data = $request->validate();

            $service = new ForgotPasswordService();
            $result = $service->verifyIdentity($data);

            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}