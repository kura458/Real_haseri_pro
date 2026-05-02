<?php
namespace Haseri\Backend\Modules\Payments\Controllers;
use Haseri\Backend\Modules\Payments\Services\PaymentService;
use Haseri\Backend\Shared\Helpers\Response;

class PaymentController
{
    private $paymentService;

    public function __construct()
    {
        $this->paymentService = new PaymentService();
    }

    public function initiate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->paymentService->initiate($data);
        Response::success($result);
    }

    public function callback()
    {
        $txRef = $_GET['tx_ref'] ?? null;
        if ($txRef) {
            $result = $this->paymentService->verifyAndConfirm($txRef);
            if ($result['status'] === 'success') {
                header('Location: ' . $_ENV['FRONTEND_URL'] . '/payment/success');
                exit;
            }
        }
        header('Location: ' . $_ENV['FRONTEND_URL'] . '/payment/failed');
        exit;
    }
}