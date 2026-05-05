"use client";

import React, { useEffect, useState } from "react";
import { useAdminVerifications } from "../hooks/useAdminVerifications";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Eye, Clock } from "lucide-react";
import { VerificationReviewModal } from "@/src/features/admin/components/VerificationReviewModal";
import type { PendingVerification } from "../types";

export function AdminVerificationsTable() {
  const { verifications, loading, fetchPending, approve, reject } = useAdminVerifications();
  const [selectedVerification, setSelectedVerification] = useState<PendingVerification | null>(null);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      <div className="p-4 sm:p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Pending Verifications</h2>
          <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Review technician credentials and documents</p>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
          {verifications.length} pending
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 dark:bg-slate-800/50">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Technician</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Email</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Location</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Submitted</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Loading verifications...
                </TableCell>
              </TableRow>
            ) : verifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  No pending verifications
                </TableCell>
              </TableRow>
            ) : (
              verifications.map((v) => (
                <TableRow key={v.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <TableCell className="text-[11px] font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                    {v.user.first_name} {v.user.last_name}
                  </TableCell>
                  <TableCell className="text-[10px] font-semibold text-slate-500 lowercase">
                    {v.user.email}
                  </TableCell>
                  <TableCell className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    {v.address?.city || "N/A"}
                  </TableCell>
                  <TableCell className="text-[10px] font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {new Date(v.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-none text-[9px] font-black uppercase tracking-widest border bg-amber-50 text-amber-600 border-amber-200">
                      {v.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 px-4 rounded-none border border-slate-200 hover:border-slate-900 gap-2 text-[10px] font-black uppercase tracking-widest"
                      onClick={() => setSelectedVerification(v)}
                    >
                      <Eye className="h-4 w-4" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <VerificationReviewModal
        verification={selectedVerification}
        isOpen={!!selectedVerification}
        onClose={() => setSelectedVerification(null)}
        onApprove={approve}
        onReject={reject}
      />
    </div>
  );
}
