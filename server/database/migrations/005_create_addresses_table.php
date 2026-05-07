<?php
use Illuminate\Database\Capsule\Manager as DB;

#address for the  shared is added
DB::schema()->create('addresses', function ($table) {
    $table->id();
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    $table->string('label', 100)->nullable();
    $table->string('city', 100);
    $table->string('sub_city', 100)->nullable();
    $table->string('woreda', 50)->nullable();
    $table->string('kebele', 50)->nullable();
    $table->string('specific_location', 255)->nullable();
    $table->boolean('is_primary')->default(false);
    $table->timestamps();
    $table->index('user_id');
    $table->index('city');

});
