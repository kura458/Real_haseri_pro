<?php
namespace Haseri\Backend\Modules\Customer\Verification\Services;

use Haseri\Backend\Shared\Models\CustomerVerification;
use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Modules\Payments\Services\PaymentService;

class CustomerVerificationService
{
    private $paymentService;

    public function __construct()
    {
        $this->paymentService = new PaymentService();
    }

    public function initiate($userId)
    {
        $user = User::find($userId);
        $config = require __DIR__ . '/../../../../Config/chapa.php';

        return $this->paymentService->initiate([
            'user_id' => $userId,
            'amount' => $config['verification_fee'],
            'email' => $user->email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'payment_type' => 'customer_verification',
            'title' => 'Customer Verification',
            'description' => 'Identity verification for reviews',
        ]);
    }

    public function confirm($userId)
    {
        CustomerVerification::updateOrCreate(
            ['user_id' => $userId],
            ['status' => 'verified', 'verified_at' => now()]
        );

        return ['verified' => true];
    }

    public function status($userId)
    {
        $verification = CustomerVerification::where('user_id', $userId)->first();

        return [
            'verified' => $verification && $verification->status === 'verified',
            'verified_at' => $verification ? $verification->verified_at : null,
        ];
    }
}