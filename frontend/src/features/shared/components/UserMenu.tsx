"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { LogOut, LayoutDashboard, ShieldCheck, UserCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

const MenuAvatar = ({
  src,
  alt,
  initials,
  className,
  showStatus,
}: {
  src?: string | null;
  alt: string;
  initials: string;
  className: string;
  showStatus?: boolean;
}) => (
  <div className="relative">
    <Avatar className={cn("rounded-none border-2 border-slate-900/10 bg-white", className)}>
      {src ? <AvatarImage src={src} alt={alt} className="object-cover" /> : null}
      <AvatarFallback className="rounded-none bg-slate-900 text-white font-black text-xs tracking-tighter">
        {initials}
      </AvatarFallback>
    </Avatar>
    {showStatus ? (
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-none" />
    ) : null}
  </div>
);

export const UserMenu = () => {
  const { user, logout, isAdmin, adminLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!user && !isAdmin) return null;

  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
    } else {
      logout();
    }
    router.push("/login");
  };

  const initials = isAdmin
    ? "AD"
    : `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "U";
  const displayName = isAdmin ? "Administrator" : `${user?.first_name} ${user?.last_name}`;
  const identifier = isAdmin ? "Admin Portal" : user?.email || user?.phone || "User Account";

  const dashboardHref = isAdmin 
    ? "/admin/dashboard" 
    : user?.role === "customer" 
      ? "/customer/profile" 
      : "/technician/profile";

  return (
    <div 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={cn(
              "flex items-center gap-3 p-1.5 pr-4 transition-all duration-300 rounded-none border cursor-pointer group",
              open 
                ? "bg-white border-slate-900 shadow-card" 
                : "bg-transparent border-transparent hover:border-border/60 hover:bg-white/50"
            )}
          >
            <MenuAvatar
              src={user?.avatar}
              alt={displayName}
              initials={initials}
              className="h-10 w-10 group-hover:border-slate-900 transition-colors duration-300"
              showStatus
            />

            <div className="hidden lg:flex flex-col items-start mr-2">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 leading-tight">
                {displayName}
              </span>
              <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-tight">
                {user?.role || "Admin"}
              </span>
            </div>

            <ChevronDown className={cn(
              "w-4 h-4 text-slate-400 transition-transform duration-300",
              open && "rotate-180 text-slate-900"
            )} />
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          align="end" 
          sideOffset={8}
          className="w-72 rounded-none border-2 border-slate-900 p-0 shadow-[10px_10px_0px_0px_rgba(15,23,42,0.1)] bg-white overflow-hidden"
        >
          {/* Header Area - Clean White Style */}
          <div className="p-6 bg-white border-b border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <MenuAvatar
                src={user?.avatar}
                alt={displayName}
                initials={initials}
                className="h-12 w-12 border border-slate-900/20"
              />
              <div className="overflow-hidden">
                <DropdownMenuLabel className="p-0 font-black uppercase tracking-widest text-[13px] text-slate-900 truncate">
                  {displayName}
                </DropdownMenuLabel>
                <p className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-tight">
                  {identifier}
                </p>
              </div>
            </div>
            
            <Link 
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full p-3 bg-slate-900 text-white hover:bg-slate-800 transition-all group"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Dashboard</span>
              <LayoutDashboard className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Menu Items - Spacious & Modern */}
          <div className="p-2 space-y-1 bg-slate-50/30">
            {!isAdmin && (
              <>
                <DropdownMenuItem asChild>
                  <Link 
                    href="/customer/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-none focus:bg-white focus:text-primary border border-transparent focus:border-slate-900/10 cursor-pointer transition-all group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 group-focus:border-primary/20 transition-colors">
                      <UserCircle className="w-4 h-4 text-slate-400 group-focus:text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest">My Profile</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Personal settings</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link 
                    href="/customer/verify"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-none focus:bg-white focus:text-primary border border-transparent focus:border-slate-900/10 cursor-pointer transition-all group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 group-focus:border-primary/20 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-slate-400 group-focus:text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest">Security</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Account verification</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator className="mx-2 my-2 bg-slate-200" />

            <DropdownMenuItem 
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 rounded-none text-destructive focus:bg-destructive/5 cursor-pointer transition-all group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 group-focus:border-destructive/20 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest">Sign Out</p>
                <p className="text-[9px] opacity-70 uppercase font-bold tracking-tight">Exit your session</p>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
