import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
}

export const LoadingSpinner = ({ 
  className, 
  size = "md", 
  label 
}: LoadingSpinnerProps) => {
  const sizes = {
    sm: "w-4 h-4 stroke-[3]",
    md: "w-6 h-6 stroke-[2]",
    lg: "w-10 h-10 stroke-[1.5]",
    xl: "w-16 h-16 stroke-[1]",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        <Loader2 className={cn("text-primary animate-spin", sizes[size])} />
        <div className={cn(
          "absolute inset-0 border-2 border-primary/20 rounded-full",
          sizes[size] === "w-4 h-4 stroke-[3]" ? "border" : ""
        )} />
      </div>
      {label && (
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">
          {label}
        </span>
      )}
    </div>
  );
};
