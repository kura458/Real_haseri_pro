<?php

namespace App\Support;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class BrevoService
{
    public function sendAdminOtp(string $email, string $name, string $otpCode): bool
    {
        try {
            Mail::html(
                $this->otpTemplate($otpCode, $name),
                function ($message) use ($email, $name) {
                    $message->to($email, $name)
                        ->subject('🔐 Admin Login OTP - Haseri')
                        ->from(
                            config('services.brevo.sender_email'),
                            config('services.brevo.sender_name')
                        );
                }
            );
            return true;
        } catch (\Exception $e) {
            Log::error('OTP Email failed: ' . $e->getMessage());
            return false;
        }
    }

    private function otpTemplate(string $otp, string $name): string
    {
        return <<<HTML
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
            <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2563eb; margin: 0;">🔐 Haseri Admin</h1>
                </div>
                <p style="color: #4b5563;">Hello {$name},</p>
                <p style="color: #4b5563;">Use this OTP to complete your admin login:</p>
                <div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                    <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #2563eb;">{$otp}</span>
                </div>
                <p style="color: #9ca3af; font-size: 12px;">Expires in 10 minutes. If you didn't request this, ignore.</p>
            </div>
        </body>
        </html>
        HTML;
    }
}