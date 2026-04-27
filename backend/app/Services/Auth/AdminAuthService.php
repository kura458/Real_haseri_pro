<?php

namespace App\Services\Auth;

use App\Models\Admin;
use App\Support\BrevoService;
use Illuminate\Support\Facades\Hash;
class AdminAuthService
{
    public function __construct(
        private AdminOtpService $otpService,
        private BrevoService $brevoService
    ) {}

    public function sendOtp(string $email, string $password): array
    {
        $admin = Admin::where('email', $email)->first();

        if (!$admin || !Hash::check($password, $admin->password)) {
            throw new \Exception('Invalid credentials');
        }

        $otpCode = $this->otpService->generateOtp($email);
        $this->brevoService->sendAdminOtp($admin->email, $admin->name, $otpCode);

        return [
            'message' => 'OTP sent to your email',
            'email' => $admin->email,
        ];
    }

    public function verifyOtp(string $email, string $otp): array
    {
        if (!$this->otpService->verifyOtp($email, $otp)) {
            throw new \Exception('Invalid or expired OTP');
        }

        $admin = Admin::where('email', $email)->first();
        $token = $admin->createToken('admin-token', ['admin'], now()->addHours(24))->plainTextToken;

        return [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ],
            'token' => $token,
            'expires_at' => now()->addHours(24)->toDateTimeString(),
        ];
    }

    public function refreshToken($admin): array
    {
        $admin->currentAccessToken()->delete();
        $token = $admin->createToken('admin-token', ['admin'], now()->addHours(24))->plainTextToken;

        return [
            'token' => $token,
            'expires_at' => now()->addHours(24)->toDateTimeString(),
        ];
    }

    public function logout($admin): void
    {
        $admin->currentAccessToken()->delete();
    }
}