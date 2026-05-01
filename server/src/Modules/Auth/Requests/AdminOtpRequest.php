<?php
namespace Haseri\Backend\Modules\Auth\Requests;
use Haseri\Backend\Shared\Exceptions\ValidationException;
class AdminOtpRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $errors = [];

        if (empty($data['admin_id'])) {
            $errors['admin_id'] = 'Admin ID is required';
        }

        if (empty($data['code'])) {
            $errors['code'] = 'OTP code is required';
        } elseif (strlen($data['code']) !== 6) {
            $errors['code'] = 'OTP must be 6 digits';
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        return $data;
    }
}