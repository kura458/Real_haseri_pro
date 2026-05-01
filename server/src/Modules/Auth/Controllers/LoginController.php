<?php
namespace Haseri\Backend\Modules\Auth\Controllers;

use Haseri\Backend\Modules\Auth\Services\LoginService;
use Haseri\Backend\Modules\Auth\Requests\LoginRequest;
use Haseri\Backend\Modules\Auth\Middleware\AuthMiddleware;
use Haseri\Backend\Shared\Models\RefreshToken;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Helpers\Cookie;
use Haseri\Backend\Shared\Exceptions\HttpException;
use Haseri\Backend\Shared\Exceptions\UnauthorizedException;

class LoginController
{
    private $loginService;

    public function __construct()
    {
        $this->loginService = new LoginService();
    }

    public function login()
    {
        try {
            $request = new LoginRequest();
            $data = $request->validate();

            $credential = $data['email'] ?? $data['phone'];
            $result = $this->loginService->login($credential, $data['password']);
            
            Cookie::set('refresh_token', $result['refresh_token'], 604800);
            unset($result['refresh_token']);

            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode(), 
                method_exists($e, 'getErrors') ? $e->getErrors() : null);
        }
    }

    public function refresh()
    {
        try {
            $refreshToken = Cookie::get('refresh_token');

            if (empty($refreshToken)) {
                throw new UnauthorizedException('No refresh token');
            }

            $storedToken = RefreshToken::where('token', $refreshToken)
                ->where('revoked', false)
                ->first();

            if (!$storedToken) {
                throw new UnauthorizedException('Invalid token');
            }

            $storedToken->update(['revoked' => true]);

            $result = $this->loginService->refreshToken($refreshToken);
            
            Cookie::set('refresh_token', $result['refresh_token'], 604800);
            unset($result['refresh_token']);

            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function logout()
    {
        try {
            $user = AuthMiddleware::handle();

            RefreshToken::where('user_id', $user->id)
                ->where('revoked', false)
                ->update(['revoked' => true]);

            Cookie::delete('refresh_token');

            Response::success(['message' => 'Logged out']);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}