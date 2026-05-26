"use client";

import Card            from "@/components/ui/Card";
import ProgressRing    from "@/components/progress/ProgressRing";
import TrilhaCard      from "@/components/cards/TrilhaCard";
import StatsCard       from "@/components/cards/StatsCard";
import { getTrilhas } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import { getProjetos } from "@/lib/services/projetos.service";
import { useProgresso } from "@/lib/hooks/useProgresso";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { Trophy, Target, CheckCircle, type LucideIcon } from "lucide-react";
import type { Trilha } from "@/lib/types";

interface DashboardStats {
  progressoGeral: number;
  trilhasEmAndamento: number;
  trilhasConcluidas: number;
  projetosConcluidos: number;
}

interface StatItem {
  label: string;
  getValue: (s: DashboardStats) => string | number;
  icon: LucideIcon;
  bgClass: string;
  iconClass: string;
}

const STAT_ITEMS: StatItem[] = [
  {
    label:     "Progresso Geral",
    getValue:  (s) => `${s.progressoGeral}%`,
    icon:      Target,
    bgClass:   "bg-primary/10",
    iconClass: "text-primary",
  },
  {
    label:     "Trilhas Ativas",
    getValue:  (s) => s.trilhasEmAndamento,
    icon:      CheckCircle,
    bgClass:   "bg-success/10",
    iconClass: "text-success",
  },
  {
    label:     "Projetos Concluídos",
    getValue:  (s) => s.projetosConcluidos,
    icon:      Trophy,
    bgClass:   "bg-orange-500/10",
    iconClass: "text-orange-500",
  },
];

export default function DashboardPage() {
  const { calcularProgressoModulo } = useProgresso();
  const { nome } = useAuthContext();

  // Primeiro nome para a saudação
  const primeiroNome = nome.split(" ")[0];

  const trilhasComProgresso = getTrilhas().map((trilha): Trilha => {
    const modulos = getModulosBySlug(trilha.slug);
    const totalTopicos = modulos.reduce((acc, modulo) => acc + modulo.topicos.length, 0);
    const progresso = totalTopicos > 0
      ? Math.round(
          modulos.reduce((acc, modulo) => {
            return acc + Math.round((calcularProgressoModulo(modulo) / 100) * modulo.topicos.length);
          }, 0) / totalTopicos * 100
        )
      : trilha.progresso;

    return { ...trilha, progresso };
  });

  const trilhasEmAndamento = trilhasComProgresso.filter((t) => t.progresso > 0 && t.progresso < 100);
  const trilhasParaExibir = trilhasEmAndamento.length > 0
    ? trilhasEmAndamento
    : trilhasComProgresso.slice(0, 2);

  const stats: DashboardStats = {
    progressoGeral: trilhasComProgresso.length > 0
      ? Math.round(trilhasComProgresso.reduce((acc, t) => acc + t.progresso, 0) / trilhasComProgresso.length)
      : 0,
    trilhasEmAndamento: trilhasEmAndamento.length,
    trilhasConcluidas: trilhasComProgresso.filter((t) => t.progresso === 100).length,
    projetosConcluidos: getProjetos().filter((p) => p.progresso === 100).length,
  };

  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Bem-vindo de volta, {primeiroNome}! 👋</h1>
          <p className="text-secondary">Continue de onde parou e alcance seus objetivos</p>
        </div>

        {/* Stats cards — data-driven, sem duplicação de markup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAT_ITEMS.map((item) => (
            <StatsCard
              key={item.label}
              label={item.label}
              value={item.getValue(stats)}
              icon={item.icon}
              bgClass={item.bgClass}
              iconClass={item.iconClass}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text mb-4">Trilhas em Andamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trilhasParaExibir.map((trilha) => (
                <TrilhaCard key={trilha.id} trilha={trilha} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text mb-4">Seu Progresso</h2>
            <Card>
              <div className="flex flex-col items-center py-6">
                <ProgressRing value={stats.progressoGeral} />
                <p className="text-secondary text-sm mt-4">Continue assim! Você está indo muito bem.</p>
              </div>
            </Card>

            <h3 className="text-xl font-bold text-text mt-6 mb-4">Atividades Recentes</h3>
            <Card>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-text text-sm">Completou Hooks Avançados</p>
                    <p className="text-secondary text-xs">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-text text-sm">Iniciou Context API</p>
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
  );
}
