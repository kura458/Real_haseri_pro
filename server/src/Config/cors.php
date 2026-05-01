<?php
return [
    'allowed_origins' => [$_ENV['FRONTEND_URL'] ?? 'http://localhost:3000'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowed_headers' => ['Content-Type', 'Authorization'],
    'supports_credentials' => true,
];