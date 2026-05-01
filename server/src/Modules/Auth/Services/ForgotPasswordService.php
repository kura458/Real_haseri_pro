<?php
namespace Haseri\Backend\Modules\Auth\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class ForgotPasswordService
{
    public function verifyIdentity(array $data)
    {
        $user = null;

        if (!empty($data['email'])) {
            $user = User::where('email', $data['email'])->first();
        } elseif (!empty($data['phone'])) {
            $user = User::where('phone', $data['phone'])->first();
        }

        if (!$user) {
            throw new NotFoundException('No account found with this email or phone');
        }

        return [
            'message' => 'Identity verified',
            'user_id' => $user->id,
        ];
    }
}