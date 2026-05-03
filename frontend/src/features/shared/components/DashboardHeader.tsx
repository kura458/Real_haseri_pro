"use client";

import React from "react";
import { Menu, Bell, Search, Maximize } from "lucide-react";
import { useUiStore } from "@/src/hooks/useUiStore";
import { UserMenu } from "./UserMenu";
import { Button } from "@/src/components/ui/button";

export const DashboardHeader = () => {
  const { toggleSidebar } = useUiStore();

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b-2 border-slate-900 sticky top-0 z-30 flex lg:hidden items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-3 bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:hover:text-white relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </Button>
        <UserMenu />
      </div>
    </header>
  );
};
