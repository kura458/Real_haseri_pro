<?php
namespace Haseri\Backend\Shared\Models;
use Illuminate\Database\Eloquent\Model;
class RefreshToken extends Model
{
    protected $table = 'refresh_tokens';

    protected $fillable = [
        'user_id',
        'admin_id',
        'user_type',
        'token',
        'expires_at',
        'revoked',
    ];

    protected $casts = [
        'revoked' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}