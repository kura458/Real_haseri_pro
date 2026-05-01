<?php
namespace Haseri\Backend\Modules\Auth\Controllers;
use Haseri\Backend\Modules\Auth\Services\LoginService;
use Haseri\Backend\Shared\Exceptions\HttpException;
class GoogleAuthController
{
    public function callback()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $service = new LoginService();
            $result = $service->loginWithGoogle($data);

            echo json_encode(['success' => true, 'data' => $result]);

        } catch (HttpException $e) {
            http_response_code($e->getStatusCode());
            echo json_encode([
                'success' => false,
                'error'   => $e->getMessage(),
            ]);
        }
    }

    public function setRole()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $service = new LoginService();
            $result = $service->setRoleAfterGoogle($data['user_id'], $data['role']);

            echo json_encode(['success' => true, 'data' => $result]);

        } catch (HttpException $e) {
            http_response_code($e->getStatusCode());
            echo json_encode([
                'success' => false,
                'error'   => $e->getMessage(),
            ]);
        }
    }
}