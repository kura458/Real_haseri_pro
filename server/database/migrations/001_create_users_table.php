<?php
use Illuminate\Database\Capsule\Manager as DB;
DB::schema()->create('users', function ($table) {
    $table->id();
    $table->string('first_name', 100);
    $table->string('last_name', 100);
    $table->string('email', 255)->unique();
    $table->string('phone', 20)->unique()->nullable();
    $table->string('password', 255)->nullable();
    $table->string('google_id', 255)->unique()->nullable();
    $table->string('avatar', 255)->nullable();
    $table->enum('role', ['customer', 'provider'])->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamp('email_verified_at')->nullable();
    $table->timestamp('phone_verified_at')->nullable();
    $table->timestamp('last_login_at')->nullable();
    $table->timestamps();
});

echo "✅ users table created\n";