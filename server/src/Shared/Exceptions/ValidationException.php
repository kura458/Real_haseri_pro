<?php
namespace Haseri\Backend\Shared\Exceptions;

class ValidationException extends HttpException
{
    private $errors;

    public function __construct($errors = [], $message = 'Validation Failed')
    {
        parent::__construct($message, 422);
        $this->errors = $errors;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}