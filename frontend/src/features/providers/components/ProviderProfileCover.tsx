"use client";

import React, { useState } from "react";
import { Heading } from "@/src/features/shared/components";
import { Edit3, Loader2, Maximize2, Minimize2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/src/hooks/useAuth";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { providersApi } from "../services";
import { toast } from "react-hot-toast";

export function ProviderProfileCover() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("cover_image", file);
      const res = await providersApi.updateCover(formData);
      if (res.data?.data) toast.success("Cover image updated");
      else toast.error("Failed to update cover image");
    } catch {
      toast.error("Failed to update cover image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full bg-slate-900 overflow-hidden group transition-all duration-500 ease-in-out cursor-pointer",
        isExpanded ? "h-[50vh] md:h-[60vh]" : "h-48 md:h-64"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-[6px] border-r-[6px] border-primary z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-[6px] border-l-[6px] border-primary z-10 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 opacity-80" />
      {user?.cover_image ? (
        <Image
          src={user.cover_image}
          alt="Cover"
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 opacity-20">
            <Heading level={1} weight="black" uppercase className="text-8xl text-white tracking-tighter italic">
              HASERI
            </Heading>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 bg-black/30 p-2 rounded-full backdrop-blur-sm text-white/70 hover:text-white transition-colors">
        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={loading}
        className="absolute bottom-6 right-6 z-20 rounded-none bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 uppercase font-black text-[10px] tracking-widest gap-2"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Edit3 className="w-3.5 h-3.5" />}
        {loading ? "Uploading..." : "Change Cover"}
      </Button>
    </div>
  );
}
