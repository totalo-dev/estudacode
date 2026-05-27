"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Share2, CheckCircle, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import { getDifficultyLabel } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useProgresso } from "@/lib/hooks/useProgresso";
import { useAuthContext } from "@/lib/contexts/AuthContext";

const DATA_CONCLUSAO = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function gerarId(slug: string): string {
  // Tenta carregar ID já gerado para este slug (estável entre renders)
  const chave = `estudacode:cert-id:${slug}`;
  try {
    const salvo = localStorage.getItem(chave);
    if (salvo) return salvo;
    const novo = `EC-${slug.slice(0, 3).toUpperCase()}-2026-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    localStorage.setItem(chave, novo);
    return novo;
  } catch {
    return `EC-${slug.slice(0, 3).toUpperCase()}-2026-DEMO`;
  }
}

function calcularProgressoTrilha(
  slug: string,
  topicoConcluido: ReturnType<typeof useProgresso>["topicoConcluido"]
) {
  const modulos = getModulosBySlug(slug);
  const totalTopicos = modulos.reduce((acc, m) => acc + m.topicos.length, 0);
  if (totalTopicos === 0) return 0;

  const concluidos = modulos.reduce(
    (acc, m) => acc + m.topicos.filter((t) => topicoConcluido(t)).length,
    0
  );
  return Math.round((concluidos / totalTopicos) * 100);
}

export default function CertificadoPage({ params }: { params: { slug: string } }) {
  const trilhaEncontrada = getTrilhaBySlug(params.slug);
  const certRef = useRef<HTMLDivElement>(null);
  const { topicoConcluido } = useProgresso();
  const { nome } = useAuthContext();

  const progressoTrilha = useMemo(
    () => (trilhaEncontrada ? calcularProgressoTrilha(params.slug, topicoConcluido) : 0),
    [params.slug, topicoConcluido, trilhaEncontrada]
  );

  const certificadoId = useMemo(() => gerarId(params.slug), [params.slug]);

  if (!trilhaEncontrada) {
    return notFound();
  }

  const trilha = trilhaEncontrada;

  if (progressoTrilha < 100) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <Card className="max-w-lg w-full text-center p-8">
          <Award size={48} className="mx-auto text-primary mb-4" />
          <h1 className="text-2xl font-bold text-text mb-2">Certificado indisponível</h1>
          <p className="text-secondary mb-2">
            Conclua 100% da trilha <span className="text-text font-medium">{trilha.nome}</span> para desbloquear o certificado.
          </p>
          <p className="text-sm text-secondary mb-6">Progresso atual: {progressoTrilha}%</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/trilhas/${params.slug}`}>
              <Button variant="primary">Continuar trilha</Button>
            </Link>
            <Link href="/trilhas">
              <Button variant="outline">Ver todas as trilhas</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  function handleImprimir() {
    window.print();
  }

  function handleCompartilhar() {
    if (navigator.share) {
      navigator.share({
        title: `Certificado EstudaCode — ${trilha.nome}`,
        text: `Concluí a trilha ${trilha.nome} na EstudaCode!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-surface px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href={`/trilhas/${params.slug}`}
            className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span>Voltar para a trilha</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleCompartilhar}>
              <Share2 size={16} className="mr-2" />
              Compartilhar
            </Button>
            <Button variant="primary" size="sm" onClick={handleImprimir}>
              <Download size={16} className="mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            ref={certRef}
            className="relative bg-surface border-2 border-primary/30 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 print:shadow-none print:border-gray-300"
          >
            <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-primary" />

            <div className="px-8 md:px-16 py-12 md:py-16 text-center">
              <div className="flex items-center justify-center space-x-3 mb-10">
                <Image
                  src="/favicon_io/web-app-manifest-192x192.png"
                  alt="EstudaCode"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-2xl font-bold text-text">EstudaCode</span>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <Award size={40} className="text-primary" />
                </div>
              </div>

              <p className="text-secondary text-sm uppercase tracking-widest font-medium mb-3">
                Certificado de Conclusão
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                Este certificado é concedido a
              </h1>

              <div className="my-8">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  {nome}
                </p>
                <div className="mt-3 h-px w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
              </div>

              <p className="text-secondary text-lg mb-2">por concluir com êxito a trilha</p>

              <div className="my-6 inline-block">
                <div
                  className="px-8 py-4 rounded-2xl border-2 inline-flex items-center space-x-3"
                  style={{ borderColor: trilha.cor + "60", backgroundColor: trilha.cor + "15" }}
                >
                  <span className="text-3xl">{trilha.icone}</span>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-text">{trilha.nome}</p>
                    <p className="text-secondary text-sm">
                      {getDifficultyLabel(trilha.dificuldade)} • {trilha.duracaoEstimada} • {trilha.totalModulos} módulos
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 my-8">
                {["Exercícios práticos", "Quizzes de conhecimento", "Projeto final"].map((item) => (
                  <div key={item} className="flex items-center space-x-1.5 text-sm text-secondary">
                    <CheckCircle size={14} className="text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-card flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-secondary text-xs uppercase tracking-wider mb-1">Data de Conclusão</p>
                  <p className="text-text font-semibold">{DATA_CONCLUSAO}</p>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "Georgia, serif" }}>
                    EstudaCode
                  </div>
                  <div className="h-px w-32 bg-card mx-auto mb-1" />
                  <p className="text-secondary text-xs">Plataforma EstudaCode</p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-secondary text-xs uppercase tracking-wider mb-1">ID do Certificado</p>
                  <p className="text-text font-mono text-sm font-semibold">{certificadoId}</p>
                </div>
              </div>
            </div>

            <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-primary" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 print:hidden">
            <Link href="/trilhas">
              <Button variant="outline" size="md">
                Explorar outras trilhas
              </Button>
            </Link>
            <Link href="/perfil/usuario">
              <Button variant="ghost" size="md">
                Ver meu perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
