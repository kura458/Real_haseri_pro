<?php
namespace Haseri\Backend\Shared\Exceptions;

class ConflictException extends HttpException
{
    public function __construct($message = 'Conflict')
    {
        parent::__construct($message, 409);
    }
}