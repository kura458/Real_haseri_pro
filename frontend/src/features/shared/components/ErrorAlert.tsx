import React from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export const ErrorAlert = ({ message, onClose, className }: ErrorAlertProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 bg-destructive/5 border-l-4 border-destructive animate-in fade-in slide-in-from-left-2",
        className
      )}
    >
      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-destructive">
          Error Detected
        </p>
        <p className="text-xs text-destructive/90 font-medium mt-1 leading-relaxed">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-destructive/50 hover:text-destructive transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
