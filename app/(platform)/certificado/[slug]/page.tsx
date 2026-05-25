"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Share2, CheckCircle, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getDifficultyLabel } from "@/lib/utils";
import { notFound } from "next/navigation";

// Data de conclusão simulada — será dinâmica com backend
const DATA_CONCLUSAO = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// ID único simulado — será gerado pelo backend
function gerarId(slug: string) {
  return `EC-${slug.slice(0, 3).toUpperCase()}-2026-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export default function CertificadoPage({ params }: { params: { slug: string } }) {
  const trilha = getTrilhaBySlug(params.slug);
  const certRef = useRef<HTMLDivElement>(null);

  if (!trilha) notFound();

  const certificadoId = gerarId(params.slug);

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

      {/* Header de ações — oculto na impressão */}
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

      {/* Área do certificado */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Certificado */}
          <div
            ref={certRef}
            className="relative bg-surface border-2 border-primary/30 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 print:shadow-none print:border-gray-300"
          >
            {/* Borda decorativa superior */}
            <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-primary" />

            {/* Conteúdo */}
            <div className="px-8 md:px-16 py-12 md:py-16 text-center">

              {/* Logo */}
              <div className="flex items-center justify-center space-x-3 mb-10">
                <Image
                  src="/favicon_io/android-chrome-192x192.png"
                  alt="EstudaCode"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-2xl font-bold text-text">EstudaCode</span>
              </div>

              {/* Ícone de certificado */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <Award size={40} className="text-primary" />
                </div>
              </div>

              {/* Título */}
              <p className="text-secondary text-sm uppercase tracking-widest font-medium mb-3">
                Certificado de Conclusão
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                Este certificado é concedido a
              </h1>

              {/* Nome do aluno */}
              <div className="my-8">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Usuário EstudaCode
                </p>
                <div className="mt-3 h-px w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
              </div>

              {/* Descrição */}
              <p className="text-secondary text-lg mb-2">
                por concluir com êxito a trilha
              </p>

              {/* Nome da trilha */}
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

              {/* Conquistas */}
              <div className="flex flex-wrap justify-center gap-4 my-8">
                {[
                  "Exercícios práticos",
                  "Quizzes de conhecimento",
                  "Projeto final",
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-1.5 text-sm text-secondary">
                    <CheckCircle size={14} className="text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Data e ID */}
              <div className="mt-10 pt-8 border-t border-card flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-secondary text-xs uppercase tracking-wider mb-1">Data de Conclusão</p>
                  <p className="text-text font-semibold">{DATA_CONCLUSAO}</p>
                </div>

                {/* Assinatura */}
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

            {/* Borda decorativa inferior */}
            <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-primary" />
          </div>

          {/* Nota sobre backend */}
          <p className="text-center text-secondary text-xs mt-6 print:hidden">
            Este certificado é uma prévia visual. A versão final será gerada automaticamente ao concluir a trilha após a implementação do backend.
          </p>

          {/* Links relacionados */}
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

      {/* Estilos de impressão */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
