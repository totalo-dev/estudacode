"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/progress/ProgressBar";
import { getProjetoById } from "@/lib/services/projetos.service";
import { CheckCircle, Circle, Target, Lightbulb } from "lucide-react";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ProjetoPage({ params }: { params: { id: string } }) {
  const projeto = getProjetoById(params.id);
  const [checklist, setChecklist] = useState(projeto?.checklist || []);
  const [salvo, setSalvo] = useState(false);
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    if (!projeto) return;
    const salvoLocal = localStorage.getItem(`estudacode:projeto:${projeto.id}`);
    if (salvoLocal) {
      setChecklist(JSON.parse(salvoLocal));
    }
  }, [projeto]);
  
  if (!projeto) {
    return <div>Projeto não encontrado</div>;
  }
  
  const completedTasks = checklist.filter(item => item.concluido).length;
  const totalTasks = checklist.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const toggleTask = (taskId: string) => {
    setChecklist(checklist.map(item =>
      item.id === taskId ? { ...item, concluido: !item.concluido } : item
    ));
    setSalvo(false);
  };

  function salvarProgresso() {
    if (!projeto) return;
    localStorage.setItem(`estudacode:projeto:${projeto.id}`, JSON.stringify(checklist));
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  }
  
  return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="primary">Projeto</Badge>
            <span className={`text-sm font-medium ${getDifficultyColor(projeto.dificuldade)}`}>
              {getDifficultyLabel(projeto.dificuldade)}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-text mb-2">{projeto.titulo}</h1>
          <p className="text-secondary text-lg">{projeto.descricao}</p>
        </div>
        
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text">Progresso do Projeto</h2>
            <span className="text-2xl font-bold text-text">{completedTasks}/{totalTasks}</span>
          </div>
          <ProgressBar value={progress} showLabel />
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Target className="text-primary" size={20} />
              <h2 className="text-xl font-semibold text-text">Objetivos de Aprendizado</h2>
            </div>
            <ul className="space-y-2">
              {projeto.objetivos.map((objetivo, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-text text-sm">{objetivo}</span>
                </li>
              ))}
            </ul>
          </Card>
          
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="text-primary" size={20} />
              <h2 className="text-xl font-semibold text-text">Requisitos</h2>
            </div>
            <ul className="space-y-2">
              {projeto.requisitos.map((requisito, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Circle className="text-secondary flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-text text-sm">{requisito}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        
        <Card>
          <h2 className="text-xl font-semibold text-text mb-6">Checklist de Desenvolvimento</h2>
          <div className="space-y-3">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleTask(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all text-left",
                  item.concluido
                    ? "border-success/20 bg-success/5"
                    : "border-card hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  item.concluido
                    ? "border-success bg-success"
                    : "border-secondary"
                )}>
                  {item.concluido && <CheckCircle className="text-white" size={16} />}
                </div>
                <span className={cn(
                  "flex-1",
                  item.concluido ? "text-secondary line-through" : "text-text"
                )}>
                  {item.texto}
                </span>
              </button>
            ))}
          </div>
        </Card>
        
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <Button variant="outline" onClick={salvarProgresso}>
            {salvo ? "Progresso salvo" : "Salvar Progresso"}
          </Button>
          <Button
            variant="primary"
            disabled={completedTasks < totalTasks}
            onClick={() => {
              salvarProgresso();
              setConcluido(true);
            }}
          >
            {completedTasks === totalTasks ? "Marcar como Concluído" : "Concluir Todas as Tarefas"}
          </Button>
        </div>
      </div>
  );
}
