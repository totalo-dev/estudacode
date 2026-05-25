"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import TrilhaCard from "@/components/cards/TrilhaCard";
import { getTrilhas, getTrilhasByDificuldade } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { BookOpen, Sparkles, Crown } from "lucide-react";
import { Difficulty, Trilha } from "@/lib/types";
import { useAuth, temAcesso } from "@/lib/hooks/useAuth";
import { useProgresso } from "@/lib/hooks/useProgresso";

type Filtro = "todas" | Difficulty;

const filtros: { label: string; value: Filtro }[] = [
  { label: "Todas", value: "todas" },
  { label: "Iniciante", value: "iniciante" },
  { label: "Intermediário", value: "intermediario" },
  { label: "Avançado", value: "avancado" },
];

const todasTrilhas = getTrilhas();

function enriquecerTrilhas(
  trilhas: Trilha[],
  calcularProgressoModulo: ReturnType<typeof useProgresso>["calcularProgressoModulo"]
) {
  return trilhas.map((trilha) => {
    const modulos = getModulosBySlug(trilha.slug);
    const totalTopicos = modulos.reduce((acc, modulo) => acc + modulo.topicos.length, 0);
    const topicosConcluidos = modulos.reduce((acc, modulo) => {
      return acc + Math.round((calcularProgressoModulo(modulo) / 100) * modulo.topicos.length);
    }, 0);

    return {
      ...trilha,
      progresso:
        totalTopicos > 0
          ? Math.round((topicosConcluidos / totalTopicos) * 100)
          : trilha.progresso,
    };
  });
}

export default function TrilhasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>("todas");
  const { plano, isFree } = useAuth();
  const { calcularProgressoModulo } = useProgresso();

  const trilhasFiltradas = useMemo(
    () => enriquecerTrilhas(getTrilhasByDificuldade(filtroAtivo), calcularProgressoModulo),
    [calcularProgressoModulo, filtroAtivo]
  );

  const trilhaDemo = trilhasFiltradas.filter((t) => t.slug === "trilha-demo");
  const trilhasPremium = trilhasFiltradas.filter((t) => t.slug !== "trilha-demo");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">Trilhas de Aprendizado</h1>
        <p className="text-secondary">
          Comece pela demo gratuita ou desbloqueie todas as trilhas com o plano Pro.
        </p>
      </div>

      <div className="flex items-center space-x-3 flex-wrap gap-y-2">
        {filtros.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFiltroAtivo(f.value)}
            aria-pressed={filtroAtivo === f.value}
          >
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

      {trilhaDemo.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-text">Trilha Demo — Grátis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trilhaDemo.map((trilha) => (
              <TrilhaCard key={trilha.id} trilha={trilha} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-yellow-500" />
            <h2 className="text-xl font-semibold text-text">Trilhas completas</h2>
          </div>
          {isFree && (
            <Link href="/planos">
              <Button variant="primary" size="sm">
                Fazer upgrade
              </Button>
            </Link>
          )}
        </div>

        <p className="text-sm text-secondary -mt-2">
          {trilhasPremium.length} trilha{trilhasPremium.length !== 1 ? "s" : ""} encontrada
          {trilhasPremium.length !== 1 ? "s" : ""}
        </p>

        {trilhasPremium.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trilhasPremium.map((trilha) => (
              <TrilhaCard
                key={trilha.id}
                trilha={trilha}
                bloqueada={!temAcesso(plano, trilha.planoNecessario)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="Nenhuma trilha encontrada"
            description="Não há trilhas para o nível selecionado."
          />
        )}
      </section>
    </div>
  );
}
