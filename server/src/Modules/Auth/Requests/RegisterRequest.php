<?php
namespace Haseri\Backend\Modules\Auth\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;
use Haseri\Backend\Shared\Helpers\ValidationHelper;

class RegisterRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        // First name
        $nameError = ValidationHelper::name($data['first_name'] ?? '', 'First name');
        if ($nameError) $errors['first_name'] = $nameError;

        // Last name
        $nameError = ValidationHelper::name($data['last_name'] ?? '', 'Last name');
        if ($nameError) $errors['last_name'] = $nameError;

        // Email or Phone required
        if (empty($data['email']) && empty($data['phone'])) {
            $errors['email'] = 'Email or phone is required';
        }

        // Email
        if (!empty($data['email'])) {
            $emailError = ValidationHelper::email($data['email']);
            if ($emailError) $errors['email'] = $emailError;
        }

        // Phone
        if (!empty($data['phone'])) {
            $phoneError = ValidationHelper::phone($data['phone']);
            if ($phoneError) $errors['phone'] = $phoneError;
        }

        // Password
        $passError = ValidationHelper::password($data['password'] ?? '');
        if ($passError) $errors['password'] = $passError;

        // Role
        $roleError = ValidationHelper::role($data['role'] ?? '');
        if ($roleError) $errors['role'] = $roleError;

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}