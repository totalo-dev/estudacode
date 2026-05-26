import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/progress/ProgressBar";
import { Clock, BookOpen, Lock } from "lucide-react";
import { Trilha } from "@/lib/types";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import Link from "next/link";

interface TrilhaCardProps {
  trilha: Trilha;
  /** Quando true, exibe o cadeado e bloqueia a navegação */
  bloqueada?: boolean;
}

export default function TrilhaCard({ trilha, bloqueada = false }: TrilhaCardProps) {
  const inner = (
    <Card hover={!bloqueada} className={`h-full relative ${bloqueada ? "opacity-60 cursor-not-allowed select-none" : ""}`}>
      {/* Overlay de cadeado */}
      {bloqueada && (
        <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] z-10 gap-2">
          <div className="w-10 h-10 rounded-full bg-card border border-card flex items-center justify-center">
            <Lock size={18} className="text-secondary" />
          </div>
          <span className="text-xs text-secondary font-medium px-3 py-1 bg-card rounded-full border border-card">
            Plano Pro ou Vitalício
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: trilha.cor + "20" }}
        >
          {trilha.icone}
        </div>
        {trilha.planoNecessario === "gratis" ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
            ✦ Grátis
          </span>
        ) : trilha.progresso > 0 ? (
          <Badge variant="primary">{trilha.progresso}%</Badge>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            ⚡ Pro
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-text mb-2">{trilha.nome}</h3>
      <p className="text-secondary text-sm mb-4 line-clamp-2">{trilha.descricao}</p>

      <div className="flex items-center space-x-4 text-sm text-secondary mb-4">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{trilha.duracaoEstimada}</span>
        </div>
        <div className="flex items-center space-x-1">
          <BookOpen size={16} />
          <span>{trilha.totalModulos} módulos</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${getDifficultyColor(trilha.dificuldade)}`}>
          {getDifficultyLabel(trilha.dificuldade)}
        </span>
      </div>

      {trilha.progresso > 0 && <ProgressBar value={trilha.progresso} />}
    </Card>
  );

  if (bloqueada) {
    return (
      <Link href="/planos" className="block" aria-label={`Fazer upgrade para acessar ${trilha.nome}`}>
        {inner}
      </Link>
    );
  }

  return <Link href={`/trilhas/${trilha.slug}`}>{inner}</Link>;
}
