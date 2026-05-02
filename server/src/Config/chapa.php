<?php
return [
    'secret_key' => $_ENV['CHAPA_SECRET_KEY'] ?? '',
    'public_key' => $_ENV['CHAPA_PUBLIC_KEY'] ?? '',
    'callback_url' => $_ENV['APP_URL'] . '/api/payment/callback',
    'return_url' => $_ENV['FRONTEND_URL'] . '/payment/success',
    'verification_fee' => 100,
    'job_post_fee' => 50,
];