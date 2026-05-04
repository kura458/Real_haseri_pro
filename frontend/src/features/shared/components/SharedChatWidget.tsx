"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Heading } from "@/src/features/shared/components";
import { MessageSquare, Send, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/hooks/useAuth";
import { useChat, useConversations } from "@/src/features/chat/hooks";
import type { Message } from "@/src/features/chat/types";

type ConversationSummary = {
  jobId: number;
  otherUserId: number;
  name: string;
  avatar?: string | null;
  lastMsg: string;
  time: string;
  hasUnread: boolean;
};

export function SharedChatWidget() {
  const { user } = useAuth();
  const { conversations, unreadCount, loading, getConversations } = useConversations();
  const { getMessages, send, markAsRead } = useChat(user?.id);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ConversationSummary | null>(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (user?.id) {
      getConversations();
    }
  }, [user?.id, getConversations]);

  const formatTime = (iso: string) => {
    const ts = Date.parse(iso);
    if (Number.isNaN(ts)) return "--";
    const diffMinutes = Math.floor((Date.now() - ts) / 60000);
    if (diffMinutes < 1) return "now";
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  const conversationGroups = useMemo(() => {
    if (Array.isArray(conversations)) {
      return conversations.reduce<Record<string, Message[]>>((acc, message) => {
        const key = String(message.job_id);
        if (!acc[key]) acc[key] = [];
        acc[key].push(message);
        return acc;
      }, {});
    }

    return (conversations || {}) as Record<string, Message[]>;
  }, [conversations]);

  const summaries = useMemo(() => {
    if (!user?.id) return [] as ConversationSummary[];

    return Object.values(conversationGroups)
      .filter((group) => group.length > 0)
      .map((group) => {
        const latest = group[0];
        const otherUser = latest.sender_id === user.id ? latest.receiver : latest.sender;
        const hasUnread = group.some(
          (message) => !message.is_read && message.receiver_id === user.id
        );

        return {
          jobId: latest.job_id,
          otherUserId: otherUser?.id ?? 0,
          name: otherUser?.name || "Unknown",
          avatar: otherUser?.avatar,
          lastMsg: latest.message,
          time: formatTime(latest.created_at),
          hasUnread,
        } as ConversationSummary;
      });
  }, [conversationGroups, user?.id]);

  const filteredSummaries = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return summaries;
    return summaries.filter((chat) => chat.name.toLowerCase().includes(term));
  }, [summaries, search]);

  const handleSelect = async (chat: ConversationSummary) => {
    setSelected(chat);
    await getMessages(String(chat.jobId), String(chat.otherUserId));
    await markAsRead(String(chat.jobId));
    getConversations();
  };

  const handleSend = async () => {
    if (!selected || !messageText.trim()) return;

    await send({
      job_id: selected.jobId,
      receiver_id: selected.otherUserId,
      message: messageText.trim(),
    });

    setMessageText("");
    await getMessages(String(selected.jobId), String(selected.otherUserId));
    getConversations();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[360px]">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <Heading level={3} className="text-xs font-black uppercase tracking-widest">Messages</Heading>
          </div>
          <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {unreadCount}
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search chats..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-8 h-8 text-[11px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Loading conversations...
          </div>
        )}
        {!loading && filteredSummaries.length === 0 && (
          <div className="p-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            No conversations yet.
          </div>
        )}
        {filteredSummaries.map((chat) => (
          <button
            key={`${chat.jobId}-${chat.otherUserId}`}
            type="button"
            onClick={() => handleSelect(chat)}
            className={`w-full text-left p-3 flex items-center gap-3 transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0 ${
              selected?.jobId === chat.jobId && selected?.otherUserId === chat.otherUserId
                ? "bg-slate-100 dark:bg-slate-800/70"
                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                {chat.avatar ? (
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                ) : (
                  <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {chat.name[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              {chat.hasUnread && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-[11px] font-black text-slate-900 dark:text-white truncate">{chat.name}</h4>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{chat.time}</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate font-medium">{chat.lastMsg}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-2">
          <Input
            placeholder={selected ? "Write a message..." : "Select a chat..."}
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            disabled={!selected}
            className="h-8 text-[10px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!selected || !messageText.trim()}
            className="p-2 bg-primary/10 text-primary rounded-lg disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
