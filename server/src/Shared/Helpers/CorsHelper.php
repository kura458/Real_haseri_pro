<?php
namespace Haseri\Backend\Shared\Helpers;

class CorsHelper
{
    public static function handle()
    {
        $config = require __DIR__ . '/../../Config/cors.php';

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowedOrigin = in_array($origin, $config['allowed_origins']) ? $origin : $config['allowed_origins'][0];

        header('Access-Control-Allow-Origin: ' . $allowedOrigin);
        header('Access-Control-Allow-Methods: ' . implode(', ', $config['allowed_methods']));
        header('Access-Control-Allow-Headers: ' . implode(', ', $config['allowed_headers']));
        header('Access-Control-Allow-Credentials: ' . ($config['supports_credentials'] ? 'true' : 'false'));
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}