"use client";

import { 
  DashboardSidebar, 
  DashboardHeader, 
  DashboardFooter 
} from "@/src/features/shared/components";
import { useUiStore } from "@/src/hooks/useUiStore";
import { cn } from "@/src/lib/utils";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen } = useUiStore();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardSidebar />
      
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        !sidebarOpen && "lg:ml-0"
      )}>
        <DashboardHeader />
        
        <main className="flex-grow p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
