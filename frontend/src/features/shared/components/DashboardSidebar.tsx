"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import {
  LayoutDashboard,
  User,
  ShieldCheck,
  Briefcase,
  Bell,
  Settings,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Search
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useUiStore } from "@/src/hooks/useUiStore";
import { useAuth } from "@/src/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapsed } = useUiStore();
  const { user } = useAuth();

  const isCustomer = user?.role === "customer";
  const isTechnician = user?.role === "technician";

  const menuItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, show: true },
    {
      label: "My Profile",
      href: isCustomer ? "/customer/profile" : "/technician/profile",
      icon: User,
      show: isCustomer || isTechnician
    },
    {
      label: "Verification",
      href: isCustomer ? "/customer/verify" : "/technician/verify",
      icon: ShieldCheck,
      show: isCustomer || isTechnician
    },
    { label: "My Jobs", href: "/dashboard/jobs", icon: Briefcase, show: true },
    { label: "Notifications", href: "/dashboard/notifications", icon: Bell, show: true },
    { label: "Settings", href: "/dashboard/settings", icon: Settings, show: true },
  ];

  const sidebarWidth = sidebarCollapsed ? "w-[80px]" : "w-[280px]";

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -300,
          width: sidebarOpen ? (sidebarCollapsed ? 80 : 280) : 0
        }}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-slate-950 border-r-2 border-slate-900 z-50 overflow-hidden flex flex-col transition-all duration-300",
          !sidebarOpen && "lg:w-0 lg:border-none"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" className={cn("flex items-center gap-2 group transition-all", sidebarCollapsed && "scale-0 w-0 opacity-0")}>
            <div className="w-8 h-8 bg-primary flex items-center justify-center border border-primary group-hover:rotate-90 transition-transform">
              <span className="text-white font-black text-lg italic">H</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Haseri<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleSidebarCollapsed}
              className="hidden lg:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-900"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-8 px-3 space-y-2">
          {/* Desktop Only Actions in Sidebar */}
          {!sidebarCollapsed && (
            <div className="hidden lg:block px-4 mb-6 space-y-4">
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">
                <Search className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest">Search...</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
                  Dashboard
                </span>
                <button className="relative p-1 text-slate-400 hover:text-primary transition-colors">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full" />
                </button>
              </div>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="hidden lg:flex flex-col items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-3 text-slate-400 hover:text-primary transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Search</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="relative p-3 text-slate-400 hover:text-primary transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Notifications</TooltipContent>
              </Tooltip>
            </div>
          )}

          <div className={cn("px-4 mb-4 transition-opacity", sidebarCollapsed && "hidden")}>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
              Navigation
            </span>
          </div>

          <TooltipProvider delayDuration={0}>
            {menuItems.filter(item => item.show).map((item) => {
              const isActive = pathname === item.href;
              const content = (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center group transition-all duration-200 border-2",
                    sidebarCollapsed ? "justify-center p-3" : "justify-between px-4 py-4",
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]"
                      : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                    )} />
                    {!sidebarCollapsed && (
                      <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {isActive && !sidebarCollapsed && <ChevronRight className="w-4 h-4 text-primary" />}
                </Link>
              );

              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent side="right" className="rounded-none bg-slate-900 border-none text-[10px] font-black uppercase tracking-widest px-3 py-2">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }
              return <div key={item.href}>{content}</div>;
            })}
          </TooltipProvider>
        </nav>

        {/* Sidebar Footer */}
        <div className={cn(
          "p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all",
          sidebarCollapsed ? "items-center" : "items-start"
        )}>
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div><UserMenu /></div>
              </TooltipTrigger>
              <TooltipContent side="right">User Account</TooltipContent>
            </Tooltip>
          ) : (
            <div className="w-full">
              <UserMenu />
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};
