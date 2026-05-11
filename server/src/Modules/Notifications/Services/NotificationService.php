<?php
namespace Haseri\Backend\Modules\Notifications\Services;

use Haseri\Backend\Shared\Models\User;
use Haseri\Backend\Shared\Models\Notification;
use Haseri\Backend\Shared\Exceptions\NotFoundException;
#notifications service
class NotificationService
{
    public function getAll($userId)
    {
        $user = User::find($userId);
        return $user->notifications()->orderBy('created_at', 'desc')->limit(50)->get();
    }

    public function unread($userId)
    {
        $user = User::find($userId);
        return $user->unreadNotifications()->orderBy('created_at', 'desc')->get();
    }

    public function count($userId)
    {
        $user = User::find($userId);
        return $user->unreadCount();
    }

    public function markAsRead($userId, $id)
    {
        $user = User::find($userId);
        $user->markAsRead($id);
        return ['message' => 'Marked as read'];
    }

    public function markAllAsRead($userId)
    {
        $user = User::find($userId);
        $user->markAllAsRead();
        return ['message' => 'All marked as read'];
    }

    public function delete($userId, $id)
    {
        $notification = Notification::where('id', $id)
            ->where('user_id', $userId)
            ->first();
        if (!$notification) throw new NotFoundException('Notification not found');
        $notification->delete();
        return ['message' => 'Deleted'];
    }
}