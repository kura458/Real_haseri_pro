<?php

namespace App\Services\Auth;

use App\Models\AdminOtp;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AdminOtpService
{
    /**
     * Generate a new OTP for admin login.
     */
    public function generateOtp(string $email): string
    {
        // Delete old OTPs for this email
        AdminOtp::where('email', $email)->delete();

        // Generate 6-digit OTP
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store hashed OTP with 10-minute expiry
        AdminOtp::create([
            'email' => $email,
            'code' => Hash::make($code),
            'expires_at' => Carbon::now()->addMinutes(10),
        ]);

        // Return plain code (to send via email)
        return $code;
    }

    /**
     * Verify OTP code for admin login.
     */
    public function verifyOtp(string $email, string $code): bool
    {
        $otpRecord = AdminOtp::where('email', $email)
            ->where('expires_at', '>', Carbon::now())
            ->latest()
            ->first();

        if (!$otpRecord) {
            return false;
        }

        if (!Hash::check($code, $otpRecord->code)) {
            return false;
        }

        // Delete used OTP (one-time use)
        $otpRecord->delete();

        return true;
    }
}