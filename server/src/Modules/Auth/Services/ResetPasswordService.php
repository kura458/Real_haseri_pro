<?php
namespace Haseri\Backend\Modules\Auth\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\RefreshToken;
use Haseri\Backend\Shared\Exceptions\NotFoundException;
use Haseri\Backend\Shared\Exceptions\ValidationException;

class ResetPasswordService
{
    public function reset(int $userId, string $newPassword, string $confirmation)
    {
        if ($newPassword !== $confirmation) {
            throw new ValidationException(['new_password_confirmation' => 'Passwords do not match']);
        }

        $user = User::find($userId);

        if (!$user) {
            throw new NotFoundException('User not found');
        }

        $user->update([
            'password' => password_hash($newPassword, PASSWORD_DEFAULT),
        ]);

        RefreshToken::where('user_id', $user->id)
            ->update(['revoked' => true]);

        return ['message' => 'Password reset successful'];
    }
}