import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/progress/ProgressBar";
import { Clock, BookOpen } from "lucide-react";
import { Trilha } from "@/lib/types";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import Link from "next/link";

interface TrilhaCardProps {
  trilha: Trilha;
}

export default function TrilhaCard({ trilha }: TrilhaCardProps) {
  return (
    <Link href={`/trilhas/${trilha.slug}`}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl`} style={{ backgroundColor: trilha.cor + '20' }}>
            {trilha.icone}
          </div>
          <Badge variant={trilha.progresso > 0 ? "primary" : "default"}>
            {trilha.progresso > 0 ? `${trilha.progresso}%` : "Novo"}
          </Badge>
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
        
        {trilha.progresso > 0 && (
          <ProgressBar value={trilha.progresso} />
        )}
      </Card>
    </Link>
  );
}
