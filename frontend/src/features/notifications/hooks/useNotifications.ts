"use client";

import { useState, useCallback } from "react";
import { notificationsApi } from "../services";
import type { Notification } from "../types";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getAll();
      setNotifications(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  const getUnread = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getUnread();
      setNotifications(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  const getCount = useCallback(async () => {
    try {
      const res = await notificationsApi.getCount();
      setUnreadCount(res.data.data.count);
    } catch {
      //
    }
  }, []);

  const markAsRead = async (id: string) => {
    await notificationsApi.markAsRead(id);
    getAll();
    getCount();
  };

  const markAllAsRead = async () => {
    await notificationsApi.markAllAsRead();
    getAll();
    getCount();
  };

  const remove = async (id: string) => {
    await notificationsApi.delete(id);
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