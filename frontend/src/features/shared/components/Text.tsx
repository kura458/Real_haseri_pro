import React from "react";
import { cn } from "@/src/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "black";
  variant?: "default" | "muted" | "primary" | "destructive";
  as?: "p" | "span" | "div";
}

export const Text = ({
  size = "md",
  children,
  className,
  weight = "normal",
  variant = "default",
  as: Tag = "p",
  ...props
}: TextProps) => {
  const sizes = {
    xs: "text-[10px] md:text-xs tracking-wide",
    sm: "text-sm leading-relaxed",
    md: "text-base leading-relaxed",
    lg: "text-lg md:text-xl leading-relaxed",
    xl: "text-xl md:text-2xl leading-relaxed",
  };

  const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    black: "font-black",
  };

  const variants = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    destructive: "text-destructive",
  };

  return (
    <Tag
      className={cn(sizes[size], weights[weight], variants[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
