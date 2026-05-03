<?php
use Illuminate\Database\Capsule\Manager as DB;
DB::schema()->create('refresh_tokens', function ($table) {
    $table->id();
    $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
    $table->foreignId('admin_id')->nullable()->constrained('admins')->onDelete('cascade');
    $table->enum('user_type', ['user', 'admin']);
    $table->string('token', 255)->unique();
    $table->timestamp('expires_at');
    $table->boolean('revoked')->default(false);
    $table->timestamps();
});
