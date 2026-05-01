<?php
namespace Haseri\Backend\Modules\Auth\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;
use Haseri\Backend\Shared\Helpers\ValidationHelper;
class AdminLoginRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        $emailError = ValidationHelper::email($data['email'] ?? '');
        if ($emailError) $errors['email'] = $emailError;

        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}