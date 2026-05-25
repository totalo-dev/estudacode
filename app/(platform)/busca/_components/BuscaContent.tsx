"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TrilhaCard from "@/components/cards/TrilhaCard";
import ProjectCard from "@/components/cards/ProjectCard";
import { buscarTrilhas, getTrilhas } from "@/lib/services/trilhas.service";
import { buscarProjetos, getProjetos } from "@/lib/services/projetos.service";
import { Search, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

type Filtro = "tudo" | "trilhas" | "projetos";

export default function BuscaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filtro, setFiltro] = useState<Filtro>("tudo");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  function handleQueryChange(valor: string) {
    setQuery(valor);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (valor.trim()) params.set("q", valor.trim());
      router.replace(`/busca${params.toString() ? `?${params}` : ""}`, { scroll: false });
    }, 300);
  }

  const trilhasFiltradas = useMemo(() => {
    return query.trim() ? buscarTrilhas(query) : getTrilhas();
  }, [query]);

  const projetosFiltrados = useMemo(() => {
    return query.trim() ? buscarProjetos(query) : getProjetos();
  }, [query]);

  const totalResultados =
    (filtro === "tudo" || filtro === "trilhas" ? trilhasFiltradas.length : 0) +
    (filtro === "tudo" || filtro === "projetos" ? projetosFiltrados.length : 0);

  const mostrarTrilhas = filtro === "tudo" || filtro === "trilhas";
  const mostrarProjetos = filtro === "tudo" || filtro === "projetos";

  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Busca</h1>
          <p className="text-secondary">Encontre trilhas e projetos</p>
        </div>

        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Buscar trilhas, projetos, tecnologias..."
            autoFocus
            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-surface border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
              aria-label="Limpar busca"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {(["tudo", "trilhas", "projetos"] as Filtro[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              aria-pressed={filtro === f}
              className="capitalize"
            >
              <Badge variant={filtro === f ? "primary" : "default"}>
                {f === "tudo" ? "Tudo" : f === "trilhas" ? "Trilhas" : "Projetos"}
              </Badge>
            </button>
          ))}
        </div>

        {query && (
          <p className="text-sm text-secondary">
            {totalResultados === 0
              ? "Nenhum resultado encontrado"
              : `${totalResultados} resultado${totalResultados !== 1 ? "s" : ""} para "${query}"`}
          </p>
        )}

        {mostrarTrilhas && (
          <section>
            {filtro === "tudo" && (
              <h2 className="text-xl font-semibold text-text mb-4">Trilhas</h2>
            )}
            {trilhasFiltradas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trilhasFiltradas.map((trilha) => (
                  <TrilhaCard key={trilha.id} trilha={trilha} />
                ))}
              </div>
            ) : (
              mostrarTrilhas &&
              query && <p className="text-secondary text-sm">Nenhuma trilha encontrada.</p>
            )}
          </section>
        )}

        {mostrarProjetos && (
          <section>
            {filtro === "tudo" && (
              <h2 className="text-xl font-semibold text-text mb-4">Projetos</h2>
            )}
            {projetosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projetosFiltrados.map((projeto) => (
                  <ProjectCard key={projeto.id} projeto={projeto} />
                ))}
              </div>
            ) : (
              mostrarProjetos &&
              query && <p className="text-secondary text-sm">Nenhum projeto encontrado.</p>
            )}
          </section>
        )}

        {!query && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto text-secondary mb-4 opacity-40" />
            <p className="text-secondary">Digite algo para começar a buscar</p>
          </div>
        )}

        {query && totalResultados === 0 && (
          <EmptyState
            icon={Search}
            title="Nenhum resultado"
            description={`Não encontramos nada para "${query}". Tente outros termos.`}
          />
        )}
      </div>
  );
}
