"use client";

import React from "react";
import Link from "next/link";

export const DashboardFooter = () => {
  return (
    <footer className="py-8 px-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-200 flex items-center justify-center text-[10px] font-black">H</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            &copy; {new Date().getFullYear()} Haseri Marketplace. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/help" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Support Center
          </Link>
        </div>
      </div>
    </footer>
  );
};
