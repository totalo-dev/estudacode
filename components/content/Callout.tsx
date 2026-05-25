import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const config = {
    info: {
      icon: Info,
      bg: "bg-primary/10",
      border: "border-primary/20",
      text: "text-primary",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-500",
    },
    success: {
      icon: CheckCircle,
      bg: "bg-success/10",
      border: "border-success/20",
      text: "text-success",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-500",
    },
  };
  
  const { icon: Icon, bg, border, text } = config[type];
  
  return (
    <div className={cn("rounded-lg border p-4", bg, border)}>
      <div className="flex items-start space-x-3">
        <Icon className={cn("flex-shrink-0 mt-0.5", text)} size={20} />
        <div className="flex-1">
          {title && <div className={cn("font-semibold mb-1", text)}>{title}</div>}
          <div className="text-text text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
