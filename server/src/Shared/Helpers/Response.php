<?php
namespace Haseri\Backend\Shared\Helpers;

class Response
{
    public static function json($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }

    public static function success($data, $statusCode = 200)
    {
        self::json(['success' => true, 'data' => $data], $statusCode);
    }

    public static function error($message, $statusCode = 400, $errors = null)
    {
        $response = ['success' => false, 'error' => $message];
        if ($errors) $response['errors'] = $errors;
        self::json($response, $statusCode);
    }
}