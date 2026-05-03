import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  title = "No results found",
  description = "We couldn't find what you're looking for. Try adjusting your filters.",
  icon,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-dashed border-border/60 bg-muted/5",
      className
    )}>
      <div className="w-16 h-16 bg-background border border-border flex items-center justify-center mb-6">
        {icon || <FolderOpen className="w-8 h-8 text-muted-foreground/60" />}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      {action && (
        <Button 
          onClick={action.onClick}
          className="rounded-none px-8 h-12 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px]"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
