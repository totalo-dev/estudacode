import Card from "@/components/ui/Card";
import { Badge as BadgeType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  badge: BadgeType;
}

export default function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <Card className={cn(
      "text-center",
      !badge.conquistado && "opacity-50 grayscale"
    )}>
      <div className="text-4xl mb-3">{badge.icone}</div>
      <h3 className="text-sm font-semibold text-text mb-1">{badge.nome}</h3>
      <p className="text-xs text-secondary">{badge.descricao}</p>
      {badge.conquistado && badge.dataConquista && (
        <p className="text-xs text-primary mt-2">{badge.dataConquista}</p>
      )}
    </Card>
  );
}
