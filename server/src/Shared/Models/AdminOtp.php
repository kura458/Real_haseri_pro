<?php
namespace Haseri\Backend\Shared\Models;
use Illuminate\Database\Eloquent\Model;
class AdminOtp extends Model
{
    protected $table = 'admin_otps';

    public $timestamps = false;

    protected $fillable = [
        'admin_id',
        'code',
        'expires_at',
        'used',
    ];

    protected $casts = [
        'used' => 'boolean',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}