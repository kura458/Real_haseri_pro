"use client";

import React, { useState } from "react";
import { Heading } from "@/src/features/shared/components";
import { Camera, MapPin, Phone, Mail, Shield, Loader2, Pencil } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { providersApi } from "../services";
import { toast } from "react-hot-toast";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";
import { useProviderSkills } from "../hooks/useProviderSkills";

export function ProviderProfileHeader() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const avatarSrc = resolveAssetUrl(user?.avatar);
  const { skills } = useProviderSkills();

  const resolveUser = (payload: any) => payload?.data ?? payload?.user ?? payload?.data?.user ?? null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await providersApi.updateAvatar(formData);
      const userData = resolveUser(res.data);
      if (userData) setUser(userData);
      if (!userData) {
        try {
          const profileRes = await providersApi.getProfile();
          const refreshed = resolveUser(profileRes.data);
          if (refreshed) setUser(refreshed);
        } catch {
          // ignore refresh failures
        }
      }
      toast.success("Avatar updated");
    } catch {
      toast.error("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start -mt-16 md:-mt-20 relative z-30 px-6 md:px-8 pb-4 w-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="flex justify-between w-full items-end">
        <div className="relative group shrink-0">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt="Avatar" className="object-cover" /> : null}
            <AvatarFallback className="bg-slate-900 text-white text-3xl md:text-4xl font-black uppercase">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <button
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 bg-primary text-white rounded-full border-[3px] border-white shadow-lg hover:scale-110 transition-transform z-30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
            ) : (
              <Camera className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="w-full mt-2">
        <div className="flex items-center gap-3">
          <Heading level={1} weight="black" uppercase className="text-2xl md:text-3xl tracking-tighter break-words text-slate-900 dark:text-white">
            {user?.first_name} {user?.last_name}
          </Heading>
          {user?.technician_verification?.status === "approved" && (
            <div className="bg-primary/10 text-primary p-1 rounded-full shrink-0" title="Verified Technician">
              <Shield className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Skills</p>
              <button
                type="button"
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Edit skills"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-lg mt-1">
          Technician on Haseri Marketplace
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 gap-x-6 mt-4">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {(user as any)?.address?.city || (user as any)?.city || "Add Location"}
              {(user as any)?.address?.specific_location ? ` • ${(user as any).address.specific_location}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Phone className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest">{user?.phone || "No Phone"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Mail className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest lowercase">{user?.email}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
