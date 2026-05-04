"use client";

import React from "react";
import { Heading } from "@/src/features/shared/components";
import { Camera, MapPin, Phone, Mail, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useCustomerProfile } from "../hooks/useCustomerProfile";
import { toast } from "react-hot-toast";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";

export function ProfileHeader() {
  const { user } = useAuth();
  const { uploadAvatar, loading } = useCustomerProfile();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const avatarSrc = resolveAssetUrl(user?.avatar);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await uploadAvatar(file);
      if (res !== null) toast.success("Avatar updated");
      else toast.error("Failed to update avatar");
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
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt="Avatar" className="object-cover" />
            ) : null}
            <AvatarFallback className="bg-slate-900 text-white text-3xl md:text-4xl font-black uppercase">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <button 
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 bg-primary text-white rounded-full border-[3px] border-white shadow-lg hover:scale-110 transition-transform z-30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Camera className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
        </div>
      </div>

      <div className="w-full mt-2">
        <div className="flex items-center gap-3">
          <Heading level={1} weight="black" uppercase className="text-2xl md:text-3xl tracking-tighter break-words text-slate-900 dark:text-white">
            {user?.first_name} {user?.last_name}
          </Heading>
          {user?.is_verified && (
            <div className="bg-primary/10 text-primary p-1 rounded-full shrink-0" title="Verified Account">
               <Shield className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </div>
          )}
        </div>
        
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-lg mt-1">
          Customer at Haseri Marketplace
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 gap-x-6 mt-4">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {user?.address?.city || user?.city || "Add Location"}
              {user?.address?.specific_location ? ` • ${user.address.specific_location}` : ""}
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
