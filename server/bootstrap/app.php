<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Dotenv\Dotenv;
use Haseri\Backend\Core\Database;
use Haseri\Backend\Shared\Helpers\JWT;
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();
Database::init();
JWT::init();