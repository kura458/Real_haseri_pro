<?php
namespace Haseri\Backend\Modules\Admin\Services;

use Haseri\Backend\Shared\Models\TechnicianVerification;
use Haseri\Backend\Shared\Models\Notification;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class TechnicianApprovalService
{
    public function pending()
    {
        return TechnicianVerification::with('user', 'address')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function approve($verificationId, $adminId)
    {
        $verification = TechnicianVerification::find($verificationId);
        if (!$verification) throw new NotFoundException('Verification not found');

        $verification->update([
            'status' => 'approved',
            'reviewed_by' => $adminId,
            'reviewed_at' => now(),
        ]);

        Notification::create([
            'user_id' => $verification->user_id,
            'title' => 'Verification Approved',
            'message' => 'Your verification has been approved. You can now apply for jobs.',
            'type' => 'verification_approved',
            'reference_id' => $verification->id,
        ]);

        return ['message' => 'Verification approved'];
    }

    public function reject($verificationId, $adminId, $reason)
    {
        $verification = TechnicianVerification::find($verificationId);
        if (!$verification) throw new NotFoundException('Verification not found');

        $verification->update([
            'status' => 'rejected',
            'rejection_reason' => $reason,
            'reviewed_by' => $adminId,
            'reviewed_at' => now(),
        ]);

        Notification::create([
            'user_id' => $verification->user_id,
            'title' => 'Verification Rejected',
            'message' => $reason,
            'type' => 'verification_rejected',
            'reference_id' => $verification->id,
        ]);

        return ['message' => 'Verification rejected'];
    }
}