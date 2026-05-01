<?php
namespace Haseri\Backend\Modules\Auth\Middleware;

use Haseri\Backend\Shared\Helpers\JWT;
use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Admin;
use Haseri\Backend\Shared\Exceptions\UnauthorizedException;

class AuthMiddleware
{
    public static function handle()
    {
        $token = self::getToken();

        try {
            $payload = JWT::validateAccessToken($token);
            $user = User::find($payload->sub);

            if (!$user || !$user->is_active) {
                throw new UnauthorizedException('User not found or inactive');
            }

            return $user;
        } catch (\Exception $e) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    public static function handleAdmin()
    {
        $token = self::getToken();

        try {
            $payload = JWT::validateAccessToken($token);

            if ($payload->role !== 'admin') {
                throw new UnauthorizedException('Admin access required');
            }

            $admin = Admin::find($payload->sub);

            if (!$admin || !$admin->is_active) {
                throw new UnauthorizedException('Admin not found or inactive');
            }

            return $admin;
        } catch (\Exception $e) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private static function getToken()
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (empty($header) || !preg_match('/^Bearer\s+(.*)$/', $header, $matches)) {
            throw new UnauthorizedException('No token provided');
        }

        return $matches[1];
    }
}