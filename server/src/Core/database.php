<?php
namespace Haseri\Backend\Core;

use Illuminate\Database\Capsule\Manager as Capsule;

class Database
{
    public static function init()
    {
        $capsule = new Capsule;
        
        // Load config from Config file
        $config = require __DIR__ . '/../Config/database.php';
        
        $capsule->addConnection($config);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();
    }
}