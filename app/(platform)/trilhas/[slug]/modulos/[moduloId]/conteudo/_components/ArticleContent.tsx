"use client";

import Link from "next/link";
import { ChevronLeft, CheckCircle, Circle } from "lucide-react";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import ProgressBar from "@/components/progress/ProgressBar";
import Callout from "@/components/content/Callout";
import CodeBlock from "@/components/content/CodeBlock";
import PaginationNavigation from "@/components/navigation/PaginationNavigation";
import { useProgresso } from "@/lib/hooks/useProgresso";
import type { Trilha, Modulo } from "@/lib/types";
import type { ConteudoTopico } from "@/data/conteudo";

interface ArticleContentProps {
  trilha: Trilha;
  modulo: Modulo;
  conteudo: ConteudoTopico;
  moduloAnterior?: Pick<Modulo, "id" | "titulo">;
  moduloProximo?: Pick<Modulo, "id" | "titulo">;
}

export default function ArticleContent({
  trilha,
  modulo,
  conteudo,
  moduloAnterior,
  moduloProximo,
}: ArticleContentProps) {
  const { calcularProgresso, toggleTopico, topicosConcluido } = useProgresso();

  // Progresso real do usuário — lê do localStorage via hook
  const topicoIds = modulo.topicos.map((t) => t.id);
  const fallbacks = modulo.topicos.map((t) => t.concluido);
  const progresso = calcularProgresso(topicoIds, fallbacks);

  // Tópico de conteúdo atual — é o que o usuário está visualizando
  const topicoConteudo = modulo.topicos.find((t) => t.tipo === "conteudo");
  const isConcluido = topicoConteudo
    ? topicosConcluido(topicoConteudo.id, topicoConteudo.concluido)
    : false;

  function handleToggleConcluido() {
    if (!topicoConteudo) return;
    toggleTopico(topicoConteudo.id, !isConcluido);
  }

  return (
    <main className="flex-1 lg:ml-64 xl:mr-72 px-4 md:px-8 lg:px-16 py-8">
      {/* Link de volta — só aparece em mobile */}
      <div className="lg:hidden mb-4">
        <Link
          href={`/trilhas/${trilha.slug}`}
          className="inline-flex items-center space-x-2 text-secondary hover:text-text text-sm"
        >
          <ChevronLeft size={16} />
          <span>Voltar para {trilha.nome}</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Trilhas", href: "/trilhas" },
            { label: trilha.nome, href: `/trilhas/${trilha.slug}` },
            { label: modulo.titulo },
          ]}
        />

        {/* Progresso real — atualiza em tempo real conforme tópicos são marcados */}
        <div className="mt-6 mb-8">
          <ProgressBar value={progresso} showLabel />
        </div>

        <article>
          <h1 id="introducao" className="text-3xl md:text-4xl font-bold text-text mb-4">
            {conteudo.titulo}
          </h1>

          <p className="text-lg text-secondary mb-8">{conteudo.intro}</p>

          {conteudo.callout && (
            <Callout type={conteudo.callout.tipo} title={conteudo.callout.titulo}>
              {conteudo.callout.texto}
            </Callout>
          )}

          <h2 id="topicos" className="text-2xl font-bold text-text mt-12 mb-4">
            Conceitos Principais
          </h2>

          <ul className="list-disc list-inside text-text space-y-2 mb-6">
            {conteudo.topicos.map((t) => (
              <li key={t} className="text-secondary">
                {t}
              </li>
            ))}
          </ul>

          {conteudo.codigo && (
            <>
              <h3 id="exemplo" className="text-xl font-semibold text-text mt-8 mb-4">
                Exemplo Prático
              </h3>
              <div className="my-6">
                <CodeBlock
                  code={conteudo.codigo}
                  language={conteudo.linguagem ?? "javascript"}
                />
              </div>
              <Callout type="success" title="Dica">
                Experimente modificar o código acima. A prática é essencial para o aprendizado!
              </Callout>
            </>
          )}

          <h2 id="conclusao" className="text-2xl font-bold text-text mt-12 mb-4">
            Conclusão
          </h2>
          <p className="text-text mb-4">{conteudo.conclusao}</p>
        </article>

        {/* Botão de conclusão — persiste no localStorage via useProgresso */}
        {topicoConteudo && (
          <button
            onClick={handleToggleConcluido}
            className={`mt-10 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
              isConcluido
                ? "bg-success/10 text-success border border-success/30 hover:bg-success/20"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isConcluido ? (
              <>
                <CheckCircle size={18} />
                Concluído — clique para desmarcar
              </>
            ) : (
              <>
                <Circle size={18} />
                Marcar como concluído
              </>
            )}
          </button>
        )}

        <div className="mt-8">
          <PaginationNavigation
            previous={
              moduloAnterior
                ? {
                    title: moduloAnterior.titulo,
                    href: `/trilhas/${trilha.slug}/modulos/${moduloAnterior.id}/conteudo`,
                  }
                : undefined
            }
            next={
              moduloProximo
                ? {
                    title: moduloProximo.titulo,
                    href: `/trilhas/${trilha.slug}/modulos/${moduloProximo.id}/conteudo`,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </main>
  );
}
