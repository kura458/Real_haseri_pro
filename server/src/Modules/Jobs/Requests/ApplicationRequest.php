<?php
namespace Haseri\Backend\Modules\Jobs\Requests;

use Haseri\Backend\Shared\Exceptions\ValidationException;

class ApplicationRequest
{
    public function validate()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!empty($data['message']) && strlen($data['message']) > 1000) {
            throw new ValidationException(['message' => 'Message must not exceed 1000 characters']);
        }

        return $data;
    }
}