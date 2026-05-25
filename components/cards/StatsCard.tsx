import type { LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  bgClass: string;   // ex: "bg-primary/10"
  iconClass: string; // ex: "text-primary"
}

export default function StatsCard({ label, value, icon: Icon, bgClass, iconClass }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-secondary text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-text">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgClass}`}>
          <Icon size={24} className={iconClass} />
        </div>
      </div>
    </Card>
  );
}
