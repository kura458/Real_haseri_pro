<?php
namespace Haseri\Backend\Shared\Exceptions;

class InternalServerErrorException extends HttpException
{
    public function __construct($message = 'Internal Server Error')
    {
        parent::__construct($message, 500);
    }
}