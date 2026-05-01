<?php
namespace Haseri\Backend\Shared\Helpers;

class Cookie
{
    public static function set($name, $value, $expiry)
    {
        setcookie($name, $value, [
            'expires' => time() + $expiry,
            'path' => '/',
            'httponly' => true,
            'secure' => false, 
            'samesite' => 'Lax',
        ]);
    }

    public static function get($name)
    {
        return $_COOKIE[$name] ?? '';
    }

    public static function delete($name)
    {
        setcookie($name, '', time() - 3600, '/');
    }
}