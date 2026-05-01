<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('admin_otps', function ($table) {
    $table->id();
    $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade');
    $table->string('code', 10);
    $table->timestamp('expires_at');
    $table->boolean('used')->default(false);
    $table->timestamp('created_at')->useCurrent();
});

echo "✅ admin_otps table created\n";