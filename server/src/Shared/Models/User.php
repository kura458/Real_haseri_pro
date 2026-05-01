<?php
namespace Haseri\Backend\Shared\Models;
use Illuminate\Database\Eloquent\Model;
class User extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'google_id',
        'avatar',
        'role',
        'is_active',
        'email_verified_at',
        'phone_verified_at',
        'last_login_at',
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    public function refreshTokens()
    {
        return $this->hasMany(RefreshToken::class, 'user_id');
    }
}