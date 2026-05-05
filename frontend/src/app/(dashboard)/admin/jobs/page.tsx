"use client";

import React, { useState } from "react";
import { AdminJobsTable, AdminCategoriesTable } from "@/src/features/admin/components";
import { Briefcase, Tag } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Tab = "jobs" | "categories";

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  const tabs = [
    { id: "jobs" as Tab, label: "Active Jobs", icon: Briefcase },
    { id: "categories" as Tab, label: "Categories", icon: Tag },
  ];

  return (
    <div className="p-4 md:p-10 space-y-10 min-h-screen bg-slate-50/30 dark:bg-slate-950/20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">Job Ecosystem</h2>
          <p className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] text-slate-400 uppercase mt-1 md:mt-2">
            Manage Service Categories & Monitor Live Requirements
          </p>
        </div>

        {/* Brutalist Tabs */}
        <div className="flex border-2 border-slate-900 dark:border-white p-1 bg-white dark:bg-slate-900 self-start md:self-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 transition-all duration-200 font-black uppercase tracking-widest text-[9px]",
                  isActive 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                    : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "jobs" ? (
          <AdminJobsTable />
        ) : (
          <AdminCategoriesTable />
        )}
      </div>
    </div>
  );
}
