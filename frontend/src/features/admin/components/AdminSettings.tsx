"use client";

import React, { useEffect, useState } from "react";
import { useAdminSettings } from "../hooks/useAdminSettings";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  DollarSign, 
  Save, 
  RefreshCcw, 
  ShieldCheck, 
  Briefcase,
  AlertCircle,
  Info
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export function AdminSettings() {
  const { fees, loading, fetchFees, updateFees } = useAdminSettings();
  const [formData, setFormData] = useState({
    verification_fee: 0,
    job_post_fee: 0
  });

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  useEffect(() => {
    if (fees) {
      setFormData({
        verification_fee: fees.verification_fee,
        job_post_fee: fees.job_post_fee
      });
    }
  }, [fees]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFees(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">Fee Setting</h2>
          <p className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] text-slate-400 uppercase mt-1 md:mt-2">
            Verification Fee & Platform Parameters
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => fetchFees()}
          disabled={loading}
          className="h-9 px-4 rounded-none border border-slate-200 hover:border-slate-900 gap-2 text-[10px] font-black uppercase tracking-widest self-start md:self-auto"
        >
          <RefreshCcw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Reset to current
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Fee Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-900/10 group-hover:bg-slate-900 transition-colors" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Verification Fee</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <Input
                type="number"
                name="verification_fee"
                value={formData.verification_fee}
                onChange={handleInputChange}
                className="pl-12 h-14 bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 rounded-xl text-base font-black tracking-tight focus:ring-0 focus:border-slate-900 dark:focus:border-white transition-all"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Job Post Fee Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-900/10 group-hover:bg-slate-900 transition-colors" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Job Posting Fee</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <Input
                type="number"
                name="job_post_fee"
                value={formData.job_post_fee}
                onChange={handleInputChange}
                className="pl-12 h-14 bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 rounded-xl text-base font-black tracking-tight focus:ring-0 focus:border-slate-900 dark:focus:border-white transition-all"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20 gap-4 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[30deg] translate-x-16" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <AlertCircle className="text-white w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white">Review Changes</h4>
              <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white/50 mt-0.5">Changes will take effect immediately across the platform.</p>
            </div>
          </div>
          
          <Button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto h-12 px-10 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black uppercase tracking-widest text-[10px] transition-all relative z-10 shadow-lg"
          >
            {loading ? (
              <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
