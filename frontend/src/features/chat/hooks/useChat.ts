"use client";

import { useState, useCallback, useEffect } from "react";
import Pusher from "pusher-js";
import { chatApi } from "../services";
import type { Message, SendMessageInput } from "../types";

let pusherClient: Pusher | null = null;

if (typeof window !== "undefined") {
  pusherClient = new Pusher(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    { cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER! }
  );
}

export const useChat = (userId?: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !pusherClient) return;

    const channel = pusherClient.subscribe(`chat.${userId}`);
    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient?.unsubscribe(`chat.${userId}`);
    };
  }, [userId]);

  const getMessages = useCallback(async (jobId: string, otherUserId: string) => {
    setLoading(true);
    try {
      const res = await chatApi.getMessages(jobId, otherUserId);
      setMessages(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  const send = async (data: SendMessageInput) => {
    const res = await chatApi.send(data);
    return res.data.data;
  };

  const markAsRead = async (jobId: string) => {
    await chatApi.markAsRead(jobId);
  };

  return { messages, loading, getMessages, send, markAsRead };
};