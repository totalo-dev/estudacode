import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/progress/ProgressRing";
import TrilhaCard from "@/components/cards/TrilhaCard";
import { trilhas } from "@/data/trilhas";
import { Trophy, Target, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const trilhasEmAndamento = trilhas.filter(t => t.progresso > 0 && t.progresso < 100);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Bem-vindo de volta! 👋</h1>
          <p className="text-secondary">Continue de onde parou e alcance seus objetivos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm mb-1">Progresso Geral</p>
                <p className="text-3xl font-bold text-text">45%</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="text-primary" size={24} />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm mb-1">Trilhas Ativas</p>
                <p className="text-3xl font-bold text-text">2</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-success" size={24} />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm mb-1">Projetos Concluídos</p>
                <p className="text-3xl font-bold text-text">8</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Trophy className="text-orange-500" size={24} />
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text mb-4">Trilhas em Andamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trilhasEmAndamento.map((trilha) => (
                <TrilhaCard key={trilha.id} trilha={trilha} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-text mb-4">Seu Progresso</h2>
            <Card>
              <div className="flex flex-col items-center py-6">
                <ProgressRing value={45} />
                <p className="text-secondary text-sm mt-4">Continue assim! Você está indo muito bem.</p>
              </div>
            </Card>
            
            <h3 className="text-xl font-bold text-text mt-6 mb-4">Atividades Recentes</h3>
            <Card>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-text text-sm">Completou "Hooks Avançados"</p>
                    <p className="text-secondary text-xs">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-text text-sm">Iniciou "Context API"</p>
                    <p className="text-secondary text-xs">Há 5 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-text text-sm">Completou Quiz de React</p>
                    <p className="text-secondary text-xs">Ontem</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
