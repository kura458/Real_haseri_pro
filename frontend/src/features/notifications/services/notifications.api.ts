import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

export const notificationsApi = {
  getAll: () =>
    clientApi.get(API_ROUTES.NOTIFICATIONS.BASE),

  getUnread: () =>
    clientApi.get(API_ROUTES.NOTIFICATIONS.UNREAD),

  getCount: () =>
    clientApi.get(API_ROUTES.NOTIFICATIONS.COUNT),

  markAsRead: (id: string) =>
    clientApi.put(API_ROUTES.NOTIFICATIONS.MARK_READ(id)),

  markAllAsRead: () =>
    clientApi.put(API_ROUTES.NOTIFICATIONS.READ_ALL),

  delete: (id: string) =>
    clientApi.delete(API_ROUTES.NOTIFICATIONS.DELETE(id)),
};