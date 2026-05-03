import React from "react";
import { cn } from "@/src/lib/utils";

interface FormFieldProps {
  label?: string;
  error?: string | null;
  touched?: boolean;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  hint?: string;
}

export const FormField = ({
  label,
  error,
  touched,
  children,
  className,
  required,
  hint,
}: FormFieldProps) => {
  const showError = touched && error;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-end">
          <label 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80"
          >
            {label}
            {required && <span className="text-primary ml-1">*</span>}
          </label>
          {hint && (
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">
              {hint}
            </span>
          )}
        </div>
      )}
      
      <div className="relative group">
        {children}
      </div>

      {showError && (
        <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};
