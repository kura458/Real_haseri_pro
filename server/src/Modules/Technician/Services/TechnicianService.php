<?php
namespace Haseri\Backend\Modules\Technician\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Address;
use Haseri\Backend\Shared\Models\TechnicianSkill;
use Haseri\Backend\Shared\Helpers\Upload\ImageUploader;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class TechnicianService
{
    public function get($userId)
    {
     $user = User::with(['address', 'technicianVerification', 'skills'])->find($userId);
 if (!$user) throw new NotFoundException('User not found');
        return $user;
    }

    public function update($userId, array $data)
    {
        $user = User::find($userId);
        if (!$user) throw new NotFoundException('User not found');

        $user->update([
            'first_name' => $data['first_name'] ?? $user->first_name,
            'last_name' => $data['last_name'] ?? $user->last_name,
            'phone' => $data['phone'] ?? $user->phone,
        ]);

        if (!empty($data['city'])) {
            Address::updateOrCreate(
                ['user_id' => $userId, 'is_primary' => true],
                [
                    'label' => $data['label'] ?? 'Workshop',
                    'city' => $data['city'],
                    'sub_city' => $data['sub_city'] ?? null,
                    'woreda' => $data['woreda'] ?? null,
                    'kebele' => $data['kebele'] ?? null,
                    'specific_location' => $data['specific_location'] ?? null,
                ]
            );
        }

        return User::with(['address', 'technicianVerification', 'skills'])->find($userId);
    }

    public function updateAvatar($userId, $file)
    {
        $uploader = new ImageUploader();
        $path = $uploader->upload($file, 'profiles');
        User::find($userId)->update(['avatar' => $path]);
        return ['avatar' => $path];
    }

    public function updateCover($userId, $file)
    {
        $uploader = new ImageUploader();
        $path = $uploader->upload($file, 'covers');
        User::find($userId)->update(['cover_image' => $path]);
        return ['cover_image' => $path];
    }

    public function updateSkills($userId, array $skills)
    {
        TechnicianSkill::where('user_id', $userId)->delete();
        foreach ($skills as $skill) {
            TechnicianSkill::create([
                'user_id' => $userId,
                'skill_name' => $skill,
            ]);
        }
        return TechnicianSkill::where('user_id', $userId)->get();
    }

    public function getSkills($userId)
    {
        return TechnicianSkill::where('user_id', $userId)->get();
    }
}