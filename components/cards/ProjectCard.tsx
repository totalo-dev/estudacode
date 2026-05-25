import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/progress/ProgressBar";
import { Clock, CheckCircle } from "lucide-react";
import { Projeto } from "@/lib/types";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import Link from "next/link";

interface ProjectCardProps {
  projeto: Projeto;
}

export default function ProjectCard({ projeto }: ProjectCardProps) {
  const completedTasks = projeto.checklist.filter(item => item.concluido).length;
  const totalTasks = projeto.checklist.length;
  
  return (
    <Link href={`/projetos/${projeto.id}`}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <Badge variant={projeto.progresso > 0 ? "primary" : "default"}>
            {projeto.progresso > 0 ? "Em andamento" : "Novo"}
          </Badge>
          <span className={`text-sm font-medium ${getDifficultyColor(projeto.dificuldade)}`}>
            {getDifficultyLabel(projeto.dificuldade)}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-text mb-2">{projeto.titulo}</h3>
        <p className="text-secondary text-sm mb-4 line-clamp-2">{projeto.descricao}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Progresso</span>
            <span className="text-text font-medium">{completedTasks}/{totalTasks} tarefas</span>
          </div>
          
          {projeto.progresso > 0 && (
            <ProgressBar value={projeto.progresso} />
          )}
        </div>
      </Card>
    </Link>
  );
}
