"use client";

import { 
  SharedTopNav, 
  DashboardFooter 
} from "@/src/features/shared/components";
import { cn } from "@/src/lib/utils";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <SharedTopNav />
      
      <main className="flex-grow">
        {/* We remove the max-w-7xl here so the page can control its own width, similar to LinkedIn which has a specific container size per page */}
        <div className="w-full">
          {children}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
