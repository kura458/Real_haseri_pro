import React from "react";
import { cn } from "@/src/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fluid?: boolean;
}

export const Container = ({ children, className, fluid = false, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto px-4 md:px-6",
        fluid ? "w-full" : "container",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
