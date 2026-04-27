<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\AdminLoginRequest;
use App\Http\Requests\Api\V1\Auth\VerifyOtpRequest;
use App\Services\Auth\AdminAuthService;
use Illuminate\Http\JsonResponse;

class AdminAuthController extends Controller
{
    public function __construct(
        private AdminAuthService $adminAuthService
    ) {}

    public function login(AdminLoginRequest $request): JsonResponse
    {
        try {
            $result = $this->adminAuthService->sendOtp(
                $request->email,
                $request->password
            );

            return response()->json([
                'success' => true,
                'message' => $result['message'],
                'data' => ['email' => $result['email']]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    public function verifyOtp(VerifyOtpRequest $request): JsonResponse
    {
        try {
            $result = $this->adminAuthService->verifyOtp(
                $request->email,
                $request->otp
            );

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
    }

    public function refresh(): JsonResponse
    {
        $result = $this->adminAuthService->refreshToken(auth('admin')->user());

        return response()->json([
            'success' => true,
            'message' => 'Token refreshed',
            'data' => $result
        ]);
    }

    public function logout(): JsonResponse
    {
        $this->adminAuthService->logout(auth('admin')->user());

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}