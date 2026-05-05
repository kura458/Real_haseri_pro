import React from "react";
import { AdminVerificationsTable } from "@/src/features/admin/components";

export default function AdminVerificationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">
            Technician Verification
          </h1>
          <p className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] text-slate-400 uppercase mt-1 md:mt-2">
            Identity & Professional Credentials Review
          </p>
        </div>
      </div>

      <AdminVerificationsTable />
    </div>
  );
}
