"use client";

import { useState, useCallback } from "react";
import { notificationsApi } from "../services";
import type { Notification } from "../types";

type NotificationScope = "user" | "admin";

export const useNotifications = (scope: NotificationScope = "user") => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getAll(scope);
      setNotifications(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, [scope]);

  const getUnread = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getUnread(scope);
      setNotifications(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, [scope]);

  const getCount = useCallback(async () => {
    try {
      const res = await notificationsApi.getCount(scope);
      setUnreadCount(res.data.data.count);
    } catch {
      //
    }
  }, [scope]);

  const markAsRead = async (id: string) => {
    await notificationsApi.markAsRead(id, scope);
    getAll();
    getCount();
  };

  const markAllAsRead = async () => {
    await notificationsApi.markAllAsRead(scope);
    getAll();
    getCount();
  };

  const remove = async (id: string) => {
    await notificationsApi.delete(id, scope);
    getAll();
    getCount();
  };

  return {
    notifications,
    unreadCount,
    loading,
    getAll,
    getUnread,
    getCount,
    markAsRead,
    markAllAsRead,
    remove,
  };
};