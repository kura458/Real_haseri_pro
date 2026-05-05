"use client";

import React from "react";
import { Menu, Search, Bell } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AdminUserMenu } from "./AdminUserMenu";

interface AdminHeaderProps {
  toggleMobileSidebar: () => void;
}

export function AdminHeader({ toggleMobileSidebar }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 md:px-8 shadow-[0_2px_15px_-3px_rgb(0,0,0,0.02)] w-full">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 shrink-0"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        <form className="flex-1 max-w-md group min-w-0">
          <div className="relative w-full group">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              placeholder="SEARCH..."
              className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl pl-10 md:pl-11 pr-4 py-2.5 text-[10px] font-black tracking-widest outline-none focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-950 transition-all uppercase placeholder:text-slate-400 shadow-inner"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3 md:gap-4 ml-4 shrink-0">
        <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 hidden sm:flex">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-white dark:border-slate-950 shadow-sm"></span>
        </button>
        
        <AdminUserMenu side="bottom" align="end" />
      </div>
    </header>
  );
}
