<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminOtp extends Model
{
    protected $table = 'admin_otps';

    protected $fillable = [
        'email',
        'code',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];
}