import React from "react";
import { cn } from "@/src/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "muted" | "dark";
  padding?: "none" | "small" | "medium" | "large";
}

export const Section = ({
  children,
  className,
  variant = "default",
  padding = "medium",
  ...props
}: SectionProps) => {
  const variants = {
    default: "",
    glass: "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-y border-border/50",
    muted: "bg-muted/30",
    dark: "bg-slate-900 text-white",
  };

  const paddings = {
    none: "py-0",
    small: "py-8 md:py-12",
    medium: "py-16 md:py-24",
    large: "py-24 md:py-32",
  };

  return (
    <section
      className={cn(paddings[padding], variants[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
};
