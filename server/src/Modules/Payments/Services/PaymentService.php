<?php
namespace Haseri\Backend\Modules\Payments\Services;

class PaymentService
{
    private $secretKey;

    public function __construct()
    {
        $this->secretKey = $_ENV['CHAPA_SECRET_KEY'] ?? '';
    }

    public function initiate(array $data)
    {
        $ch = curl_init('https://api.chapa.co/v1/transaction/initialize');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->secretKey,
            'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            return ['status' => 'error', 'message' => $error];
        }

        $decoded = json_decode($response, true);
        return $decoded ?? ['status' => 'error', 'message' => 'Invalid JSON response'];
    }

    public function verifyAndConfirm(string $txRef)
    {
        $ch = curl_init('https://api.chapa.co/v1/transaction/verify/' . $txRef);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->secretKey,
        ]);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            return ['status' => 'error', 'message' => $error];
        }

        $decoded = json_decode($response, true);
        return $decoded ?? ['status' => 'error', 'message' => 'Invalid JSON response'];
    }

    public function verify(string $txRef)
    {
        return $this->verifyAndConfirm($txRef);
    }

    public function initialize(array $data)
    {
        return $this->initiate($data);
    }
}