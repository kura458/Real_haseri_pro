import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";
import type { SendMessageInput } from "../types";

export const chatApi = {
  send: (data: SendMessageInput) =>
    clientApi.post(API_ROUTES.CHAT.SEND, data),

  getMessages: (jobId: string, userId: string) =>
    clientApi.get(API_ROUTES.CHAT.MESSAGES(jobId, userId)),

  getConversations: () =>
    clientApi.get(API_ROUTES.CHAT.CONVERSATIONS),

  markAsRead: (jobId: string) =>
    clientApi.put(API_ROUTES.CHAT.MARK_READ(jobId)),

  getUnreadCount: () =>
    clientApi.get(API_ROUTES.CHAT.UNREAD_COUNT),
};