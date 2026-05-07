<?php
use Illuminate\Database\Capsule\Manager as DB;
#user model for confeve  is updeted
if (!DB::schema()->hasColumn('users', 'cover_image')) {
    DB::schema()->table('users', function ($table) {
        $table->string('cover_image', 255)->nullable()->after('avatar');
    });}

if (!DB::schema()->hasTable('technician_skills')) {
    DB::schema()->create('technician_skills', function ($table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->string('skill_name', 100);
        $table->timestamp('created_at')->useCurrent();
    });
    
}