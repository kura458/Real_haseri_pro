<?php
namespace Haseri\Backend\Shared\Helpers;

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class JWT
{
    private static $accessSecret;
    private static $refreshSecret;

    public static function init()
    {
        self::$accessSecret = $_ENV['JWT_ACCESS_SECRET'];
        self::$refreshSecret = $_ENV['JWT_REFRESH_SECRET'];
    }

    public static function generateAccessToken($userId, $role)
    {
        $payload = [
            'sub' => $userId,
            'role' => $role,
            'type' => 'access',
            'iat' => time(),
            'exp' => time() + 3600,
        ];

        return FirebaseJWT::encode($payload, self::$accessSecret, 'HS256');
    }

    public static function generateRefreshToken($userId, $role)
    {
        $payload = [
            'sub' => $userId,
            'role' => $role,
            'type' => 'refresh',
            'iat' => time(),
            'exp' => time() + 604800,
        ];

        return FirebaseJWT::encode($payload, self::$refreshSecret, 'HS256');
    }

    public static function validateAccessToken($token)
    {
        return FirebaseJWT::decode($token, new Key(self::$accessSecret, 'HS256'));
    }

    public static function validateRefreshToken($token)
    {
        return FirebaseJWT::decode($token, new Key(self::$refreshSecret, 'HS256'));
    }
}