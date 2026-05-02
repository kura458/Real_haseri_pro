<?php
namespace Haseri\Backend\Modules\Payments\Services;

class ChapaService
{
    private $secretKey;

    public function __construct()
    {
        $this->secretKey = $_ENV['CHAPA_SECRET_KEY'];
    }

    public function initialize(array $data)
    {
        $ch = curl_init('https://api.chapa.co/v1/transaction/initialize');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->secretKey,
            'Content-Type: application/json',
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }

    public function verify(string $txRef)
    {
        $ch = curl_init('https://api.chapa.co/v1/transaction/verify/' . $txRef);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->secretKey,
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }
}