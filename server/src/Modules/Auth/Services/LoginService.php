<?php
namespace Haseri\Backend\Modules\Auth\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\RefreshToken;
use Haseri\Backend\Shared\Helpers\JWT;
use Haseri\Backend\Shared\Exceptions\UnauthorizedException;

class LoginService
{
    public function login(string $credential, string $password)
    {
        $user = User::where('email', $credential)
                    ->orWhere('phone', $credential)
                    ->first();

        if (!$user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!password_verify($password, $user->password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!$user->is_active) {
            throw new UnauthorizedException('Account deactivated');
        }

        return $this->generateTokens($user);
    }

    public function loginWithGoogle(array $googleUser)
    {
        $client = new \Google_Client(['client_id' => $_ENV['GOOGLE_CLIENT_ID']]);
        $payload = $client->verifyIdToken($googleUser['id_token']);

        if (!$payload) {
            throw new UnauthorizedException('Invalid Google token');
        }

        $user = User::where('google_id', $payload['sub'])
                    ->orWhere('email', $payload['email'])
                    ->first();

        if (!$user) {
            $user = User::create([
                'first_name'        => $payload['given_name'],
                'last_name'         => $payload['family_name'] ?? '',
                'email'             => $payload['email'],
                'google_id'         => $payload['sub'],
                'avatar'            => $payload['picture'] ?? null,
                'email_verified_at' => date('Y-m-d H:i:s'),
            ]);

            return [
                'new_user' => true,
                'user' => [
                    'id'         => $user->id,
                    'first_name' => $user->first_name,
                    'last_name'  => $user->last_name,
                    'email'      => $user->email,
                    'avatar'     => $user->avatar,
                ],
            ];
        }

        if (!$user->is_active) {
            throw new UnauthorizedException('Account deactivated');
        }

        if ($user->role === null) {
            return [
                'new_user' => true,
                'user' => [
                    'id'         => $user->id,
                    'first_name' => $user->first_name,
                    'last_name'  => $user->last_name,
                    'email'      => $user->email,
                    'avatar'     => $user->avatar,
                ],
            ];
        }

        return $this->generateTokens($user);
    }

    public function setRoleAfterGoogle($userId, $role)
    {
        $user = User::find($userId);

        if (!$user) {
            throw new UnauthorizedException('User not found');
        }

        if (!in_array($role, ['customer', 'provider'])) {
            throw new UnauthorizedException('Invalid role');
        }

        $user->update(['role' => $role]);

        return $this->generateTokens($user);
    }

    public function refreshToken(string $refreshToken)
    {
        $payload = JWT::validateRefreshToken($refreshToken);
        $user = User::find($payload->sub);

        if (!$user || !$user->is_active) {
            throw new UnauthorizedException('User not found');
        }

        return $this->generateTokens($user);
    }

    private function generateTokens($user)
    {
        $accessToken  = JWT::generateAccessToken($user->id, $user->role);
        $refreshToken = JWT::generateRefreshToken($user->id, $user->role);

        RefreshToken::create([
            'user_id'    => $user->id,
            'user_type'  => 'user',
            'token'      => $refreshToken,
            'expires_at' => date('Y-m-d H:i:s', time() + 604800),
        ]);

        $user->update(['last_login_at' => date('Y-m-d H:i:s')]);

        return [
            'access_token'  => $accessToken,
            'refresh_token' => $refreshToken,
            'expires_in'    => 3600,
            'user' => [
                'id'         => $user->id,
                'first_name' => $user->first_name,
                'last_name'  => $user->last_name,
                'email'      => $user->email,
                'phone'      => $user->phone,
                'role'       => $user->role,
                'avatar'     => $user->avatar,
            ],
        ];
    }
}