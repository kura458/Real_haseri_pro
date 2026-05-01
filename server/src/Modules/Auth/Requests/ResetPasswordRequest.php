<?php
namespace Haseri\Backend\Modules\Auth\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;
use Haseri\Backend\Shared\Helpers\ValidationHelper;

class ResetPasswordRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        if (empty($data['user_id'])) {
            $errors['user_id'] = 'User ID is required';
        }

        $passError = ValidationHelper::password($data['new_password'] ?? '');
        if ($passError) $errors['new_password'] = $passError;

        if (empty($data['new_password_confirmation'])) {
            $errors['new_password_confirmation'] = 'Password confirmation is required';
        } elseif ($data['new_password'] !== $data['new_password_confirmation']) {
            $errors['new_password_confirmation'] = 'Passwords do not match';
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}