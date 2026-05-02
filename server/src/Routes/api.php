<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/admin.php';
require_once __DIR__ . '/customer.php';
require_once __DIR__ . '/technician.php';
http_response_code(404);
echo json_encode(['error' => 'Not Found']);