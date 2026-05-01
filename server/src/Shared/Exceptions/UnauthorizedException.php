<?php
namespace Haseri\Backend\Shared\Exceptions;

class UnauthorizedException extends HttpException
{
    public function __construct($message = 'Unauthorized')
    {
        parent::__construct($message, 401);
    }
}