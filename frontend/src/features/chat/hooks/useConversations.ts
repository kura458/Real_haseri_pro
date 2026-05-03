"use client";

import { useState, useCallback } from "react";
import { chatApi } from "../services";

export const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getConversations = useCallback(async () => {
    setLoading(true);
    try {
      const [convRes, countRes] = await Promise.all([
        chatApi.getConversations(),
        chatApi.getUnreadCount(),
      ]);
      setConversations(convRes.data.data);
      setUnreadCount(countRes.data.data.count);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  return { conversations, unreadCount, loading, getConversations };
};