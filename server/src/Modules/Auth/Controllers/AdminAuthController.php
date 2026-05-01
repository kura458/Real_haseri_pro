<?php
namespace Haseri\Backend\Modules\Auth\Controllers;

use Haseri\Backend\Modules\Auth\Services\AdminAuthService;
use Haseri\Backend\Modules\Auth\Requests\AdminLoginRequest;
use Haseri\Backend\Modules\Auth\Requests\AdminOtpRequest;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Models\RefreshToken;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Helpers\Cookie;
use Haseri\Backend\Shared\Exceptions\HttpException;

class AdminAuthController
{
    private $adminAuthService;

    public function __construct()
    {
        $this->adminAuthService = new AdminAuthService();
    }

    public function login()
    {
        try {
            $request = new AdminLoginRequest();
            $data = $request->validate();

            $result = $this->adminAuthService->login($data['email'], $data['password']);

            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function verifyOtp()
    {
        try {
            $request = new AdminOtpRequest();
            $data = $request->validate();

            $result = $this->adminAuthService->verifyOtp($data['admin_id'], $data['code']);

            Cookie::set('admin_refresh_token', $result['refresh_token'], 604800);
            unset($result['refresh_token']);

            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function logout()
    {
        try {
            $admin = AuthMiddleware::handleAdmin();

            RefreshToken::where('admin_id', $admin->id)
                ->where('revoked', false)
                ->update(['revoked' => true]);

            Cookie::delete('admin_refresh_token');

            Response::success(['message' => 'Logged out']);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}