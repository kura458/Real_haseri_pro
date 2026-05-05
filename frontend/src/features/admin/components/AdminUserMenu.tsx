"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAvatar } from "../hooks/useAdminAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { LogOut, User, Shield, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

const MenuAvatar = ({ src, alt, initials, className, showStatus }: any) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="relative">
      <div className={cn("rounded-none border-2 border-slate-900/10 bg-white overflow-hidden flex items-center justify-center", className)}>
        {src && !hasError ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setHasError(true)} />
        ) : (
          <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center font-black text-xs tracking-tighter">{initials}</div>
        )}
      </div>
      {showStatus && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-none" />}
    </div>
  );
};

export function AdminUserMenu({ showFullOnOpen = true, side = "bottom", align = "end" }: any) {
  const { admin, fullName, email, avatarSrc, initials, logout } = useAdminAvatar();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!admin) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.02 }} className={cn(
            "flex items-center gap-3 p-1.5 pr-4 transition-all duration-300 rounded-none border cursor-pointer group w-full",
            open ? "bg-white border-slate-900 shadow-card" : "bg-transparent border-transparent hover:border-border/60 hover:bg-white/50",
            !showFullOnOpen && "justify-center pr-1.5"
          )}>
            <MenuAvatar src={avatarSrc} alt={fullName} initials={initials} className="h-9 w-9 group-hover:border-slate-900" showStatus />
            {showFullOnOpen && (
              <>
                <div className="flex flex-col items-start mr-2 overflow-hidden flex-1">
                  <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 leading-tight truncate w-full">{fullName}</span>
                  <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-tight">Administrator</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", open && "rotate-180 text-slate-900")} />
              </>
            )}
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent side={side} align={align} sideOffset={8} className="w-72 rounded-none border-2 border-slate-900 p-0 shadow-[10px_10px_0px_0px_rgba(15,23,42,0.1)] bg-white overflow-hidden z-[60]">
          <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
            <MenuAvatar src={avatarSrc} alt={fullName} initials={initials} className="h-12 w-12 border border-slate-900/20" />
            <div className="overflow-hidden">
              <DropdownMenuLabel className="p-0 font-black uppercase tracking-widest text-[13px] text-slate-900 truncate">{fullName}</DropdownMenuLabel>
              <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-tight">{email}</p>
            </div>
          </div>
          <div className="p-2 space-y-1 bg-slate-50/30">
            <DropdownMenuItem className="flex items-center gap-4 p-4 rounded-none focus:bg-white focus:text-primary cursor-pointer transition-all group">
              <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 group-focus:border-primary/20 transition-colors"><User className="w-4 h-4 text-slate-400 group-focus:text-primary" /></div>
              <div><p className="text-[11px] font-black uppercase tracking-widest">Profile</p><p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Settings</p></div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-4 p-4 rounded-none focus:bg-white focus:text-primary cursor-pointer transition-all group">
              <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 group-focus:border-primary/20 transition-colors"><Shield className="w-4 h-4 text-slate-400 group-focus:text-primary" /></div>
              <div><p className="text-[11px] font-black uppercase tracking-widest">Security</p><p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Access</p></div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-2 my-2 bg-slate-200" />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-4 p-4 rounded-none text-destructive focus:bg-destructive/5 cursor-pointer transition-all group">
              <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 group-focus:border-destructive/20 transition-colors"><LogOut className="w-4 h-4" /></div>
              <div><p className="text-[11px] font-black uppercase tracking-widest">Sign Out</p><p className="text-[9px] opacity-70 uppercase font-bold tracking-tight">Exit</p></div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
