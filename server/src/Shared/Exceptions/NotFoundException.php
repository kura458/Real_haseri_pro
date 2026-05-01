<?php
namespace Haseri\Backend\Shared\Exceptions;

class NotFoundException extends HttpException
{
    public function __construct($message = 'Not Found')
    {
        parent::__construct($message, 404);
    }
}