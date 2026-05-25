"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/progress/ProgressBar";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import { Clock, BookOpen, CheckCircle, Circle, Play, Award } from "lucide-react";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import Link from "next/link";
import { useProgresso } from "@/lib/hooks/useProgresso";
import { temAcesso, useAuth } from "@/lib/hooks/useAuth";
import type { Modulo, Topico } from "@/lib/types";

function getTopicoHref(slug: string, modulo: Modulo, topico: Topico) {
  if (topico.tipo === "conteudo") {
    return `/trilhas/${slug}/modulos/${modulo.id}/conteudo`;
  }

  if (topico.tipo === "exercicio") {
    const exercicioIndex = modulo.topicos
      .filter((t) => t.tipo === "exercicio")
      .findIndex((t) => t.id === topico.id);
    return `/trilhas/${slug}/modulos/${modulo.id}/exercicios/${exercicioIndex + 1}`;
  }

  return `/trilhas/${slug}/modulos/${modulo.id}/${topico.tipo}`;
}

export default function TrilhaPage({ params }: { params: { slug: string } }) {
  const trilha = getTrilhaBySlug(params.slug);
  const trilhaModulos = getModulosBySlug(params.slug);
  const { topicoConcluido, calcularProgressoModulo, moduloConcluidoEfetivo } = useProgresso();
  const { plano } = useAuth();

  if (!trilha) {
    return <div>Trilha não encontrada</div>;
  }

  if (!temAcesso(plano, trilha.planoNecessario)) {
    return (
        <div className="max-w-2xl mx-auto">
          <Card>
            <div className="text-center py-8">
              <span className="text-5xl mb-4 block">{trilha.icone}</span>
              <h1 className="text-2xl font-bold text-text mb-2">{trilha.nome}</h1>
              <p className="text-secondary mb-6">
                Esta trilha faz parte do plano Pro. A trilha demo continua liberada para testar a plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/planos">
                  <Button variant="primary">Ver planos</Button>
                </Link>
                <Link href="/trilhas/trilha-demo">
                  <Button variant="outline">Abrir trilha demo</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
    );
  }

  const modulosConcluidos = trilhaModulos.filter((m) => moduloConcluidoEfetivo(m)).length;
  const trilhaConcluida = trilhaModulos.length > 0 && modulosConcluidos === trilhaModulos.length;
  const totalTopicos = trilhaModulos.reduce((acc, modulo) => acc + modulo.topicos.length, 0);
  const topicosConcluidos = trilhaModulos.reduce(
    (acc, modulo) => acc + modulo.topicos.filter((topico) => topicoConcluido(topico)).length,
    0
  );
  const progressoTrilha = totalTopicos > 0
    ? Math.round((topicosConcluidos / totalTopicos) * 100)
    : trilha.progresso;

  // Primeiro módulo não concluído para o botão Continuar
  const proximoModulo = trilhaModulos.find((m) => !moduloConcluidoEfetivo(m)) || trilhaModulos[0];

  return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">{trilha.icone}</span>
              <div>
                <h1 className="text-3xl font-bold text-text">{trilha.nome}</h1>
                <p className="text-secondary mt-1">{trilha.descricao}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-secondary" />
                <span className="text-secondary">{trilha.duracaoEstimada}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen size={16} className="text-secondary" />
                <span className="text-secondary">{trilha.totalModulos} módulos</span>
              </div>
              <Badge variant="primary" className={getDifficultyColor(trilha.dificuldade)}>
                {getDifficultyLabel(trilha.dificuldade)}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {trilhaConcluida && (
              <Link href={`/certificado/${params.slug}`}>
                <Button variant="outline" size="lg">
                  <Award size={18} className="mr-2 text-yellow-500" />
                  Ver Certificado
                </Button>
              </Link>
            )}
            {proximoModulo && (
              <Link href={`/trilhas/${params.slug}/modulos/${proximoModulo.id}/conteudo`}>
                <Button variant="primary" size="lg">
                  <Play size={18} className="mr-2" />
                  {progressoTrilha > 0 ? "Continuar" : "Começar"}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {progressoTrilha > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text">Seu Progresso</span>
              <span className="text-sm text-secondary">
                {modulosConcluidos}/{trilhaModulos.length} módulos • {progressoTrilha}%
              </span>
            </div>
            <ProgressBar value={progressoTrilha} />
            {trilhaConcluida && (
              <p className="text-success text-sm mt-3 flex items-center space-x-2">
                <CheckCircle size={14} />
                <span>Trilha concluída! Seu certificado está disponível.</span>
              </p>
            )}
          </Card>
        )}

        <div>
          <h2 className="text-2xl font-bold text-text mb-6">Módulos</h2>
          {trilhaModulos.length === 0 ? (
            <Card>
              <p className="text-secondary text-center py-8">
                Os módulos desta trilha estão sendo preparados. Em breve!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {trilhaModulos.map((modulo, index) => {
                const moduloConcluido = moduloConcluidoEfetivo(modulo);
                const progressoModulo = calcularProgressoModulo(modulo);

                return (
                <Card key={modulo.id} hover>
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      moduloConcluido ? "bg-success/10" : "bg-surface"
                    }`}>
                      {moduloConcluido ? (
                        <CheckCircle className="text-success" size={20} />
                      ) : (
                        <span className="text-secondary font-semibold">{index + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-text mb-1">{modulo.titulo}</h3>
                          <p className="text-secondary text-sm">{modulo.descricao}</p>
                        </div>
                        <Badge variant={moduloConcluido ? "success" : progressoModulo > 0 ? "primary" : "default"}>
                          {moduloConcluido ? "Concluído" : progressoModulo > 0 ? `${progressoModulo}%` : "Pendente"}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-secondary mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{modulo.duracaoEstimada}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Circle size={14} />
                          <span>{modulo.topicos.length} tópicos</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {modulo.topicos.map((topico) => (
                          <Link
                            key={topico.id}
                            href={getTopicoHref(params.slug, modulo, topico)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-surface hover:bg-card transition-colors"
                          >
                            {topicoConcluido(topico) && <CheckCircle size={12} className="inline mr-1 text-success" />}
                            {topico.titulo}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
              })}
            </div>
          )}
        </div>
      </div>
  );
}
