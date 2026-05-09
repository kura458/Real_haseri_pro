<?php
use Illuminate\Database\Capsule\Manager as DB;

DB::schema()->create('job_categories', function ($table) {
    $table->id();
    $table->string('name', 100);
    $table->text('description')->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamp('created_at')->useCurrent();
});
