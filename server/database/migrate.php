<?php
require_once __DIR__ . '/../bootstrap/app.php';

require __DIR__ . '/migrations/001_create_users_table.php';
require __DIR__ . '/migrations/002_create_admins_table.php';
require __DIR__ . '/migrations/003_create_admin_otps_table.php';
require __DIR__ . '/migrations/004_create_refresh_tokens_table.php';

echo "\n All tables migrated!\n";