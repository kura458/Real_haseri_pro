<?php
namespace Haseri\Backend\Modules\Auth\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;
use Haseri\Backend\Shared\Helpers\ValidationHelper;

class LoginRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        // Email or Phone
        if (empty($data['email']) && empty($data['phone'])) {
            $errors['email'] = 'Email or phone is required';
        }

        if (!empty($data['email'])) {
            $emailError = ValidationHelper::email($data['email']);
            if ($emailError) $errors['email'] = $emailError;
        }

        if (!empty($data['phone'])) {
            $phoneError = ValidationHelper::phone($data['phone']);
            if ($phoneError) $errors['phone'] = $phoneError;
        }

        // Password
        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}