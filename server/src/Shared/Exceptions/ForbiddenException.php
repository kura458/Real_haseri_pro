<?php
namespace Haseri\Backend\Shared\Exceptions;

class ForbiddenException extends HttpException
{
    public function __construct($message = 'Forbidden')
    {
        parent::__construct($message, 403);
    }
}