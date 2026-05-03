<?php
return [
    'allowed_origins' => [
        $_ENV['FRONTEND_URL'] ?? 'http://localhost:3000',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    'supports_credentials' => true,
];
#cours config  to connect with frontend