"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Bell, Check, MailWarning, Trash2, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useNotifications } from "../hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationCenterProps {
  disabled?: boolean;
  scope?: "user" | "admin";
}

export function NotificationCenter({ disabled = false, scope = "user" }: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    loading,
    getAll,
    getCount,
    markAsRead,
    markAllAsRead,
    remove
  } = useNotifications(scope);

  // Initial fetch and polling
  useEffect(() => {
    if (disabled) return;
    getCount();
    const interval = setInterval(getCount, 60000);
    return () => clearInterval(interval);
  }, [disabled, getCount]);

  // Fetch all when opened
  useEffect(() => {
    if (disabled) return;
    if (open) {
      getAll();
    }
  }, [disabled, open, getAll]);

  const sortedNotifications = useMemo(
    () => [...notifications].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [notifications]
  );

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "relative p-2.5 rounded-xl transition-all duration-300",
              open
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg"
                : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white ring-2 ring-white dark:ring-slate-950 shadow-sm animate-in zoom-in duration-300">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="z-50 w-[min(26rem,calc(100vw-2rem))] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl p-0 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Notification Hub</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {unreadCount > 0 ? `${unreadCount} New alerts pending` : "System is up to date"}
                </p>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAllAsRead();
                  }}
                  className="h-8 px-4 rounded-full bg-white dark:bg-slate-800 text-[8px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all border-none shadow-sm"
                >
                  <Check className="w-3 h-3 mr-1.5" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* List Area */}
          <div className="max-h-[420px] overflow-y-auto custom-scrollbar p-3 space-y-3 bg-slate-50/30 dark:bg-slate-950/30">
            {loading && notifications.length === 0 ? (
              <div className="p-16 flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing...</span>
              </div>
            ) : sortedNotifications.length > 0 ? (
              <div className="space-y-3">
                {sortedNotifications.map((notification) => {
                  const isRead = notification.is_read ?? (notification as any).read ?? Boolean((notification as any).readAt);
                  const title = notification.title;
                  const message = notification.message ?? (notification as any).body;
                  const createdAt = notification.created_at ?? (notification as any).createdAt;

                  return (
                    <motion.div
                      layout
                      key={notification.id}
                      className={cn(
                        "group p-4 rounded-2xl transition-all relative border-none",
                        "bg-white dark:bg-slate-900",
                        "hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 hover:-translate-y-1 hover:ring-2 hover:ring-primary/20 hover:bg-primary/[0.01] dark:hover:bg-primary/[0.03]",
                        !isRead ? "ring-2 ring-primary/10 shadow-md" : "opacity-95"
                      )}
                    >
                      <div className="flex gap-4">
                        <div className="mt-0.5 shrink-0">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                            !isRead ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          )}>
                            {notification.type === 'error' ? <MailWarning size={16} /> : <Bell size={16} />}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={cn(
                              "text-[10px] md:text-[11px] font-black uppercase tracking-wider truncate pr-2 transition-colors",
                              !isRead ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                            )}>
                              {title}
                            </span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 shrink-0">
                              <Clock size={10} />
                              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-[10.5px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide mb-3 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-100">
                            {message}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {!isRead ? (
                                <button
                                  onClick={() => markAsRead(notification.id.toString())}
                                  className="text-[8px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-70 transition-opacity"
                                >
                                  Mark Seen
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-slate-400">
                                  <Check className="h-2.5 w-2.5" />
                                  Read
                                </span>
                              )}
                              <button
                                onClick={() => remove(notification.id.toString())}
                                className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-red-500 transition-colors"
                              >
                                Archive
                              </button>
                            </div>

                            {notification.reference_id && (
                              <div className="flex items-center gap-1 text-primary">
                                <span className="text-[8px] font-black uppercase tracking-widest">Detail</span>
                                <ChevronRight size={10} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-20 flex flex-col items-center gap-5 text-center">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-200 shadow-sm">
                  <Bell size={36} className="opacity-20" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-2">Inbox Empty</h4>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">No notifications yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Area */}
          <button className="w-full py-5 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 text-slate-900 dark:text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-heading">
            View All Platform Activity
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
