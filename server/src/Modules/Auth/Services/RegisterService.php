<?php
namespace Haseri\Backend\Modules\Auth\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\RefreshToken;
use Haseri\Backend\Shared\Helpers\JWT;
use Haseri\Backend\Shared\Exceptions\ConflictException;
use Haseri\Backend\Shared\Enums\UserRole;

class RegisterService
{
    public function register(array $data)
    {
        if (!in_array($data['role'], UserRole::all())) {
            throw new ConflictException('Invalid role');
        }

        if (User::where('email', $data['email'])->exists()) {
            throw new ConflictException('Email already registered');
        }

        if (!empty($data['phone']) && User::where('phone', $data['phone'])->exists()) {
            throw new ConflictException('Phone already registered');
        }

        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'phone'      => $data['phone'] ?? null,
            'password'   => password_hash($data['password'], PASSWORD_DEFAULT),
            'role'       => $data['role'],
        ]);

        $accessToken  = JWT::generateAccessToken($user->id, $user->role);
        $refreshToken = JWT::generateRefreshToken($user->id, $user->role);

        RefreshToken::create([
            'user_id'    => $user->id,
            'user_type'  => 'user',
            'token'      => $refreshToken,
            'expires_at' => date('Y-m-d H:i:s', time() + 604800),
        ]);

        return [
            'access_token'  => $accessToken,
            'refresh_token' => $refreshToken,
            'expires_in'    => 3600,
            'user' => [
                'id'         => $user->id,
                'first_name' => $user->first_name,
                'last_name'  => $user->last_name,
                'email'      => $user->email,
                'role'       => $user->role,
            ],
        ];
    }
}