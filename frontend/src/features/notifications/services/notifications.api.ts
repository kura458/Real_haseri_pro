import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

type NotificationScope = "user" | "admin";

const routeByScope = (scope: NotificationScope) =>
  scope === "admin" ? API_ROUTES.ADMIN.NOTIFICATIONS : API_ROUTES.NOTIFICATIONS;

export const notificationsApi = {
  getAll: (scope: NotificationScope = "user") =>
    clientApi.get(routeByScope(scope).BASE),

  getUnread: (scope: NotificationScope = "user") =>
    clientApi.get(routeByScope(scope).UNREAD),

  getCount: (scope: NotificationScope = "user") =>
    clientApi.get(routeByScope(scope).COUNT),

  markAsRead: (id: string, scope: NotificationScope = "user") =>
    clientApi.put(routeByScope(scope).MARK_READ(id)),

  markAllAsRead: (scope: NotificationScope = "user") =>
    clientApi.put(routeByScope(scope).READ_ALL),

  delete: (id: string, scope: NotificationScope = "user") =>
    clientApi.delete(routeByScope(scope).DELETE(id)),
};