<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('admins', function ($table) {
    $table->id();
    $table->string('name', 100);
    $table->string('email', 255)->unique();
    $table->string('password', 255);
    $table->boolean('is_active')->default(true);
    $table->timestamp('last_login_at')->nullable();
    $table->timestamps();
});

echo "✅ admins table created\n";