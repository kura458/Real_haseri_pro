<?php
namespace Haseri\Backend\Shared\Exceptions;

class TooManyRequestsException extends HttpException
{
    public function __construct($message = 'Too Many Requests')
    {
        parent::__construct($message, 429);
    }
}