"use client";

import React, { useState, useEffect } from "react";
import { Heading } from "@/src/features/shared/components";
import { Pencil, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";

interface ProfileEditableAsideProps {
  title: string;
  data: { label: string; value: string; name: string; type?: string }[];
  displayData?: { label: string; value: string; name: string }[];
  onSave: (data: Record<string, string>) => Promise<void>;
  icon?: React.ReactNode;
}

export function ProfileEditableAside({ title, data, displayData, onSave, icon }: ProfileEditableAsideProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(
      data.reduce((acc, curr) => {
        const value = typeof curr.value === "string" ? curr.value : "";
        return { ...acc, [curr.name]: value };
      }, {})
    );
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(formData);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-500 scale-75">{icon}</span>}
          <Heading level={3} className="text-[7px] font-black uppercase tracking-[0.26em]">{title}</Heading>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black uppercase tracking-widest italic flex items-center gap-2">
                Edit {title}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {data.map((field) => (
                <div key={field.name} className="grid gap-2">
                  <label htmlFor={field.name} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {field.label}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="h-10 text-sm font-medium rounded-lg"
                  />
                </div>
              ))}
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)} 
                className="font-bold uppercase tracking-widest text-[10px] h-10 rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-[10px] h-10 rounded-lg min-w-[100px]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3.5">
        {(displayData || data).map((field) => {
          const value = displayData ? field.value : formData[field.name];
          const safeValue = typeof value === "string" ? value : "";

          return (
          <div key={field.name}>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {field.label}
            </label>
            <p className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate">
              {safeValue || <span className="text-slate-400 italic">Not provided</span>}
            </p>
          </div>
        );
        })}
      </div>
    </div>
  );
}
