<?php
namespace Haseri\Backend\Modules\Notifications\Controllers;

use Haseri\Backend\Modules\Notifications\Services\NotificationService;
use Haseri\Backend\Shared\Helpers\Response;
use Haseri\Backend\Shared\Exceptions\HttpException;
#notification controllers
class NotificationController
{
    private $service;

    public function __construct()
    {
        $this->service = new NotificationService();
    }

    public function index($user)
    {
        $result = $this->service->getAll($user->id);
        Response::success($result);
    }

    public function unread($user)
    {
        $result = $this->service->unread($user->id);
        Response::success($result);
    }

    public function count($user)
    {
        $result = $this->service->count($user->id);
        Response::success(['count' => $result]);
    }

    public function markAsRead($user, $id)
    {
        try {
            $result = $this->service->markAsRead($user->id, $id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }

    public function markAllAsRead($user)
    {
        $result = $this->service->markAllAsRead($user->id);
        Response::success($result);
    }

    public function destroy($user, $id)
    {
        try {
            $result = $this->service->delete($user->id, $id);
            Response::success($result);
        } catch (HttpException $e) {
            Response::error($e->getMessage(), $e->getStatusCode());
        }
    }
}