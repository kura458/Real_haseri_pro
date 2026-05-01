<?php
namespace Haseri\Backend\Shared\Exceptions;

class HttpException extends \Exception
{
    protected $statusCode;

    public function __construct($message, $statusCode)
    {
        parent::__construct($message, $statusCode);
        $this->statusCode = $statusCode;
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }
}