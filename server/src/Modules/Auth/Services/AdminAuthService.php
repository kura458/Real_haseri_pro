<?php
namespace Haseri\Backend\Modules\Auth\Services;
use Haseri\Backend\Shared\Models\Admin;
use Haseri\Backend\Shared\Models\AdminOtp;
use Haseri\Backend\Shared\Models\RefreshToken;
use Haseri\Backend\Shared\Helpers\JWT;
use Haseri\Backend\Shared\Helpers\EmailHelper;
use Haseri\Backend\Shared\Exceptions\UnauthorizedException;

class AdminAuthService
{
    public function login(string $email, string $password)
    {
        $admin = Admin::where('email', $email)->first();

        if (!$admin || !password_verify($password, $admin->password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!$admin->is_active) {
            throw new UnauthorizedException('Account deactivated');
        }

        // Generate 6-digit OTP with leading zeros if necessary     
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Mark old OTPs as used to prevent reuse
        AdminOtp::where('admin_id', $admin->id)
            ->where('used', false)
            ->update(['used' => true]);

        // Save new OTP to database with 5-minute expiration            
        AdminOtp::create([
            'admin_id'   => $admin->id,
            'code'       => $code,
            'expires_at' => date('Y-m-d H:i:s', time() + 300),
        ]);

        // Send OTP via email (you can replace this with SMS or other methods if needed)
        EmailHelper::send(
            $admin->email,
            'Admin Login OTP - Haseri',
            "<h2>Your OTP Code</h2><p style='font-size:28px;font-weight:bold;letter-spacing:5px;'>{$code}</p><p>This code expires in 5 minutes.</p><p>If you didn't request this, ignore this email.</p>"
        );

        return [
            'message'  => 'OTP sent to your email',
            'admin_id' => $admin->id,
        ];
    }

    public function verifyOtp(int $adminId, string $code)
    {
        $otp = AdminOtp::where('admin_id', $adminId)
            ->where('code', $code)
            ->where('used', false)
            ->where('expires_at', '>', date('Y-m-d H:i:s'))
            ->first();

        if (!$otp) {
            throw new UnauthorizedException('Invalid or expired OTP');
        }

        // Mark OTP as used to prevent reuse
        $otp->update(['used' => true]);

        // Update last login timestamp
        $admin = Admin::find($adminId);
        $admin->update(['last_login_at' => date('Y-m-d H:i:s')]);

        // Generate tokens and return response
        return $this->generateTokens($admin);
    }

    public function refreshToken(string $refreshToken)
    {
        $payload = JWT::validateRefreshToken($refreshToken);

        if (!isset($payload->role) || $payload->role !== 'admin') {
            throw new UnauthorizedException('Admin access required');
        }

        $admin = Admin::find($payload->sub);

        if (!$admin || !$admin->is_active) {
            throw new UnauthorizedException('Admin not found or inactive');
        }

        return $this->generateTokens($admin);
    }

    private function generateTokens($admin)
    {
        $accessToken  = JWT::generateAccessToken($admin->id, 'admin');
        $refreshToken = JWT::generateRefreshToken($admin->id, 'admin');

        RefreshToken::create([
            'admin_id'   => $admin->id,
            'user_type'  => 'admin',
            'token'      => $refreshToken,
            'expires_at' => date('Y-m-d H:i:s', time() + 604800),
        ]);

        return [
            'access_token'  => $accessToken,
            'refresh_token' => $refreshToken,
            'expires_in'    => 3600,
            'admin' => [
                'id'    => $admin->id,
                'name'  => $admin->name,
                'email' => $admin->email,
            ],
        ];
    }
}