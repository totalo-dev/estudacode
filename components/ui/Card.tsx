import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-surface p-6",
        hover && "transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
