import React from "react";
import { cn } from "@/src/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  weight?: "normal" | "bold" | "black";
  uppercase?: boolean;
}

export const Heading = ({
  level = 1,
  children,
  className,
  weight = "bold",
  uppercase = false,
  ...props
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const levels = {
    1: "text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95]",
    2: "text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95]",
    3: "text-3xl md:text-4xl tracking-tight leading-tight",
    4: "text-2xl md:text-3xl tracking-tight leading-tight",
    5: "text-xl md:text-2xl font-bold tracking-tight",
    6: "text-lg font-bold tracking-tight",
  };

  const weights = {
    normal: "font-normal",
    bold: "font-bold",
    black: "font-black",
  };

  return (
    <Tag
      className={cn(
        levels[level],
        weights[weight],
        uppercase && "uppercase",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
