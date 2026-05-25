"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import { getProjetos } from "@/lib/services/projetos.service";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { FolderKanban } from "lucide-react";
import { Difficulty } from "@/lib/types";

type FiltroStatus = "todos" | "em-andamento" | "concluidos" | "novos";
type FiltroDificuldade = "todas" | Difficulty;

const filtrosStatus: { label: string; value: FiltroStatus }[] = [
  { label: "Todos", value: "todos" },
  { label: "Em Andamento", value: "em-andamento" },
  { label: "Concluídos", value: "concluidos" },
  { label: "Novos", value: "novos" },
];

const filtrosDificuldade: { label: string; value: FiltroDificuldade }[] = [
  { label: "Todas", value: "todas" },
  { label: "Iniciante", value: "iniciante" },
  { label: "Intermediário", value: "intermediario" },
  { label: "Avançado", value: "avancado" },
];

const todosProjetos = getProjetos();

export default function ProjetosPage() {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [filtroDificuldade, setFiltroDificuldade] = useState<FiltroDificuldade>("todas");

  const projetosFiltrados = useMemo(() => {
    return todosProjetos.filter((p) => {
      const passaStatus =
        filtroStatus === "todos" ||
        (filtroStatus === "em-andamento" && p.progresso > 0 && p.progresso < 100) ||
        (filtroStatus === "concluidos" && p.progresso === 100) ||
        (filtroStatus === "novos" && p.progresso === 0);

      const passaDificuldade =
        filtroDificuldade === "todas" || p.dificuldade === filtroDificuldade;

      return passaStatus && passaDificuldade;
    });
  }, [filtroStatus, filtroDificuldade]);

  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Projetos Práticos</h1>
          <p className="text-secondary">Aplique seus conhecimentos construindo projetos reais</p>
        </div>

        {/* Filtro por status */}
        <div className="space-y-3">
          <p className="text-xs text-secondary uppercase tracking-wider font-medium">Status</p>
          <div className="flex items-center flex-wrap gap-2">
            {filtrosStatus.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFiltroStatus(f.value)}
                aria-pressed={filtroStatus === f.value}
              >
                <Badge variant={filtroStatus === f.value ? "primary" : "default"}>
                  {f.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por dificuldade */}
        <div className="space-y-3">
          <p className="text-xs text-secondary uppercase tracking-wider font-medium">Dificuldade</p>
          <div className="flex items-center flex-wrap gap-2">
            {filtrosDificuldade.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFiltroDificuldade(f.value)}
                aria-pressed={filtroDificuldade === f.value}
              >
                <Badge variant={filtroDificuldade === f.value ? "primary" : "default"}>
                  {f.label}
                  {f.value !== "todas" && (
                    <span className="ml-1.5 opacity-70">
                      ({todosProjetos.filter((p) => p.dificuldade === f.value).length})
                    </span>
                  )}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Contagem */}
        <p className="text-sm text-secondary -mt-4">
          {projetosFiltrados.length} projeto{projetosFiltrados.length !== 1 ? "s" : ""} encontrado{projetosFiltrados.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {projetosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetosFiltrados.map((projeto) => (
              <ProjectCard key={projeto.id} projeto={projeto} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderKanban}
            title="Nenhum projeto encontrado"
            description="Não há projetos para os filtros selecionados."
          />
        )}
      </div>
  );
}
