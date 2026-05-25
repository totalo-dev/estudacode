"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TrilhaCard from "@/components/cards/TrilhaCard";
import { getTrilhas, getTrilhasByDificuldade } from "@/lib/services/trilhas.service";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Difficulty } from "@/lib/types";

type Filtro = "todas" | Difficulty;

const filtros: { label: string; value: Filtro }[] = [
  { label: "Todas", value: "todas" },
  { label: "Iniciante", value: "iniciante" },
  { label: "Intermediário", value: "intermediario" },
  { label: "Avançado", value: "avancado" },
];

const todasTrilhas = getTrilhas();

export default function TrilhasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>("todas");

  const trilhasFiltradas = useMemo(
    () => getTrilhasByDificuldade(filtroAtivo),
    [filtroAtivo]
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Trilhas de Aprendizado</h1>
          <p className="text-secondary">Escolha uma trilha e comece sua jornada de aprendizado</p>
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          {filtros.map((f) => (
            <button key={f.value} onClick={() => setFiltroAtivo(f.value)}>
              <Badge variant={filtroAtivo === f.value ? "primary" : "default"}>
                {f.label}
                {f.value !== "todas" && (
                  <span className="ml-1.5 opacity-70">
                    ({todasTrilhas.filter((t) => t.dificuldade === f.value).length})
                  </span>
                )}
              </Badge>
            </button>
          ))}
        </div>

        {/* Contagem */}
        <p className="text-sm text-secondary -mt-4">
          {trilhasFiltradas.length} trilha{trilhasFiltradas.length !== 1 ? "s" : ""} encontrada{trilhasFiltradas.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {trilhasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trilhasFiltradas.map((trilha) => (
              <TrilhaCard key={trilha.id} trilha={trilha} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhuma trilha encontrada"
            description="Não há trilhas para o nível selecionado."
          />
        )}
      </div>
    </DashboardLayout>
  );
}
