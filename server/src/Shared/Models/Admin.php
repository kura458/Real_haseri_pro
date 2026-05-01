<?php
namespace Haseri\Backend\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',
        'last_login_at',
    ];
    protected $hidden = ['password'];
    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function otps()
    {
        return $this->hasMany(AdminOtp::class);
    }

    public function refreshTokens()
    {
        return $this->hasMany(RefreshToken::class, 'admin_id');
    }
}