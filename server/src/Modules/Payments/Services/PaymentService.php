<?php
namespace Haseri\Backend\Modules\Payments\Services;

use Haseri\Backend\Shared\Models\Payment;

class PaymentService
{
    private $chapa;

    public function __construct()
    {
        $this->chapa = new ChapaService();
    }

    public function initiate(array $data)
    {
        $txRef = 'haseri_' . uniqid() . '_' . time();

        $response = $this->chapa->initialize([
            'amount' => $data['amount'],
            'currency' => 'ETB',
            'email' => $data['email'],
            'first_name' => $data['first_name'] ?? 'Customer',
            'last_name' => $data['last_name'] ?? 'Haseri',
            'tx_ref' => $txRef,
            'callback_url' => $_ENV['APP_URL'] . '/api/payment/callback',
            'return_url' => $_ENV['FRONTEND_URL'] . '/payment/success',
            'customization' => [
                'title' => $data['title'] ?? 'Haseri Payment',
                'description' => $data['description'] ?? 'Payment',
            ],
        ]);

        if ($response['status'] === 'success') {
            Payment::create([
                'user_id' => $data['user_id'],
                'payment_type' => $data['payment_type'],
                'related_id' => $data['related_id'] ?? null,
                'amount' => $data['amount'],
                'chapa_tx_ref' => $txRef,
                'status' => 'pending',
            ]);

            return ['checkout_url' => $response['data']['checkout_url'], 'tx_ref' => $txRef];
        }

        return $response;
    }

    public function verifyAndConfirm(string $txRef)
    {
        $response = $this->chapa->verify($txRef);

        if ($response['status'] === 'success') {
            Payment::where('chapa_tx_ref', $txRef)->update([
                'status' => 'paid',
                'chapa_transaction_id' => $response['data']['id'] ?? null,
            ]);
        }

        return $response;
    }
}