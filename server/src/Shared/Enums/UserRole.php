<?php
namespace Haseri\Backend\Shared\Enums;

class UserRole
{
    const CUSTOMER = 'customer';
    const PROVIDER = 'provider';

    public static function all()
    {
        return [self::CUSTOMER, self::PROVIDER];
    }
}