"use client";

import { 
  SharedTopNav, 
  DashboardFooter 
} from "@/src/features/shared/components";
import { cn } from "@/src/lib/utils";

export default function TechnicianDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <SharedTopNav />
      
      <main className="flex-grow">
        <div className="w-full">
          {children}
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
