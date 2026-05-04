"use client";

import React from "react";
import { Heading } from "@/src/features/shared/components";
import { CheckCircle2, XCircle, Users, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useJobApplications } from "@/src/features/jobs/hooks";
import type { Job, JobApplication } from "@/src/features/jobs/types";
import { formatDate } from "@/src/utils/date-utils";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";

interface ProfileApplicationsPanelProps {
  jobs: Job[];
}

const getInitials = (name?: string | null) => {
  if (!name) return "T";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]).join("").toUpperCase() || "T";
};

const statusTone = (status: JobApplication["status"]) => {
  if (status === "accepted") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "rejected") return "bg-rose-50 text-rose-700 border-rose-200";
  if (status === "withdrawn") return "bg-slate-100 text-slate-600 border-slate-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
};

export function ProfileApplicationsPanel({ jobs }: ProfileApplicationsPanelProps) {
  const { applications, getApplications, accept, reject, loading } = useJobApplications();
  const [selectedJobId, setSelectedJobId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!selectedJobId && jobs.length > 0) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  React.useEffect(() => {
    if (!selectedJobId) return;
    getApplications(String(selectedJobId));
  }, [selectedJobId, getApplications]);

  const selectedJob = React.useMemo(
    () => jobs.find((job) => job.id === selectedJobId) || null,
    [jobs, selectedJobId]
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level={2} className="text-xl font-bold mb-1">Applicants</Heading>
          <p className="text-xs text-slate-500 font-medium">
            Review technicians for each job and respond quickly
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <select
            value={selectedJobId ?? ""}
            onChange={(event) => setSelectedJobId(Number(event.target.value))}
            className="h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-[11px] font-bold uppercase tracking-widest px-3 text-slate-700"
          >
            {jobs.length === 0 && <option value="">No jobs yet</option>}
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">Post a job to receive technician applications.</p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : applications.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
            <span>{selectedJob?.title || "Job"}</span>
            <span>{applications.length} applicants</span>
          </div>
          {applications.map((application) => {
            const providerName = application.provider?.name || "Technician";
            const avatarSrc = resolveAssetUrl(application.provider?.avatar);

            return (
              <div
                key={application.id}
                className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-800">
                        {avatarSrc ? (
                          <AvatarImage src={avatarSrc} alt={providerName} className="object-cover" />
                        ) : null}
                        <AvatarFallback className="bg-slate-900 text-white text-[11px] font-black">
                          {getInitials(providerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">
                          {providerName}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                          Applied {formatDate(application.created_at)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${statusTone(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      {application.proposed_price !== null && (
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Proposed: ETB {application.proposed_price}
                        </span>
                      )}
                      {application.message && (
                        <span className="text-[11px] text-slate-500 max-w-lg">
                          “{application.message}”
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-8 px-3 text-[10px] font-black uppercase tracking-widest border-slate-200"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        Chat
                      </Button>
                      <Button
                        disabled={application.status !== "pending"}
                        onClick={() => accept(String(application.id))}
                        className="h-8 px-3 text-[10px] font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Accept
                      </Button>
                      <Button
                        disabled={application.status !== "pending"}
                        onClick={() => reject(String(application.id))}
                        className="h-8 px-3 text-[10px] font-black uppercase tracking-widest bg-rose-600 hover:bg-rose-700 text-white"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">No applications yet for this job.</p>
        </div>
      )}
    </div>
  );
}
