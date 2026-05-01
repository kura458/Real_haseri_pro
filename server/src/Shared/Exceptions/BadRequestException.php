<?php
namespace Haseri\Backend\Shared\Exceptions;

class BadRequestException extends HttpException
{
    public function __construct($message = 'Bad Request')
    {
        parent::__construct($message, 400);
    }
}