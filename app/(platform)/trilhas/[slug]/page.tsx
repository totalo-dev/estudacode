import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/progress/ProgressBar";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import { Clock, BookOpen, CheckCircle, Circle, Play, Award } from "lucide-react";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/utils";
import Link from "next/link";

export default function TrilhaPage({ params }: { params: { slug: string } }) {
  const trilha = getTrilhaBySlug(params.slug);
  const trilhaModulos = getModulosBySlug(params.slug);

  if (!trilha) {
    return <DashboardLayout><div>Trilha não encontrada</div></DashboardLayout>;
  }

  const modulosConcluidos = trilhaModulos.filter(m => m.concluido).length;
  const trilhaConcluida = trilhaModulos.length > 0 && modulosConcluidos === trilhaModulos.length;

  // Primeiro módulo não concluído para o botão Continuar
  const proximoModulo = trilhaModulos.find(m => !m.concluido) || trilhaModulos[0];

  return (
    <DashboardLayout>
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
                  {trilha.progresso > 0 ? "Continuar" : "Começar"}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {trilha.progresso > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text">Seu Progresso</span>
              <span className="text-sm text-secondary">
                {modulosConcluidos}/{trilhaModulos.length} módulos • {trilha.progresso}%
              </span>
            </div>
            <ProgressBar value={trilha.progresso} />
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
              {trilhaModulos.map((modulo, index) => (
                <Card key={modulo.id} hover>
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      modulo.concluido ? "bg-success/10" : "bg-surface"
                    }`}>
                      {modulo.concluido ? (
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
                        <Badge variant={modulo.concluido ? "success" : "default"}>
                          {modulo.concluido ? "Concluído" : "Pendente"}
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
                            href={`/trilhas/${params.slug}/modulos/${modulo.id}/${topico.tipo}`}
                            className="text-xs px-3 py-1.5 rounded-lg bg-surface hover:bg-card transition-colors"
                          >
                            {topico.concluido && <CheckCircle size={12} className="inline mr-1 text-success" />}
                            {topico.titulo}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
