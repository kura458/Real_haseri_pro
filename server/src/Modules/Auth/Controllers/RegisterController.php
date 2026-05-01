<?php
namespace Haseri\Backend\Modules\Auth\Controllers;

use Haseri\Backend\Modules\Auth\Services\RegisterService;
use Haseri\Backend\Modules\Auth\Requests\RegisterRequest;
use Haseri\Backend\Shared\Exceptions\HttpException;

class RegisterController
{
    public function register()
    {
        try {
            $request = new RegisterRequest();
            $data = $request->validate();

            $service = new RegisterService();
            $result = $service->register($data);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'data'    => $result,
            ]);

        } catch (HttpException $e) {
            http_response_code($e->getStatusCode());
            echo json_encode([
                'success' => false,
                'error'   => $e->getMessage(),
                'errors'  => method_exists($e, 'getErrors') ? $e->getErrors() : null,
            ]);
        }
    }
}