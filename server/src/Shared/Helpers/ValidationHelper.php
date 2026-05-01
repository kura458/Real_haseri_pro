<?php
namespace Haseri\Backend\Shared\Helpers;

class ValidationHelper
{
    public static function name($value, $field = 'Name')
    {
        if (empty($value)) {
            return "$field is required";
        }
        if (strlen($value) < 2) {
            return "$field must be at least 2 characters";
        }
        if (!preg_match('/^[a-zA-Z\s]+$/', $value)) {
            return "$field must contain only letters";
        }
        return null;
    }

    public static function email($value)
    {
        if (empty($value)) {
            return 'Email is required';
        }
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'Invalid email format';
        }
        return null;
    }

    public static function phone($value)
    {
        if (empty($value)) {
            return null; 
        }
        if (!preg_match('/^\+?[0-9]{10,15}$/', $value)) {
            return 'Invalid phone number';
        }
        return null;
    }

    public static function password($value)
    {
        if (empty($value)) {
            return 'Password is required';
        }
        if (strlen($value) < 8) {
            return 'Password must be at least 8 characters';
        }
        if (!preg_match('/[A-Z]/', $value)) {
            return 'Password must contain uppercase letter';
        }
        if (!preg_match('/[a-z]/', $value)) {
            return 'Password must contain lowercase letter';
        }
        if (!preg_match('/[0-9]/', $value)) {
            return 'Password must contain number';
        }
        return null;
    }

    public static function role($value)
    {
        if (empty($value)) {
            return 'Role is required';
        }
        if (!in_array($value, ['customer', 'provider'])) {
            return 'Invalid role';
        }
        return null;
    }
}