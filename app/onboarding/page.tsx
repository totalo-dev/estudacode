"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { getTrilhas } from "@/lib/services/trilhas.service";
import { getDifficultyLabel } from "@/lib/utils";

type Etapa = 1 | 2 | 3;

const objetivos = [
  { id: "emprego", label: "Conseguir meu primeiro emprego como dev", emoji: "💼" },
  { id: "freelance", label: "Trabalhar como freelancer", emoji: "🚀" },
  { id: "mudar", label: "Mudar de área para tecnologia", emoji: "🔄" },
  { id: "crescer", label: "Crescer na carreira atual", emoji: "📈" },
  { id: "hobby", label: "Aprender por hobby", emoji: "🎯" },
  { id: "projeto", label: "Construir um projeto próprio", emoji: "🏗️" },
];

const niveis = [
  { id: "zero", label: "Nunca programei", desc: "Começando do absoluto zero", emoji: "🌱" },
  { id: "basico", label: "Conheço o básico", desc: "Já vi HTML/CSS/JS mas não domino", emoji: "📚" },
  { id: "intermediario", label: "Tenho alguma experiência", desc: "Já fiz alguns projetos pequenos", emoji: "⚡" },
  { id: "avancado", label: "Sou desenvolvedor", desc: "Quero aprender novas tecnologias", emoji: "🔥" },
];

const trilhasPorNivel: Record<string, string[]> = {
  zero: ["fundamentos-web"],
  basico: ["fundamentos-web", "react-moderno"],
  intermediario: ["react-moderno", "typescript-avancado", "nodejs-backend"],
  avancado: ["typescript-avancado", "nextjs-fullstack", "design-systems"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>(1);
  const [objetivo, setObjetivo] = useState("");
  const [nivel, setNivel] = useState("");
  const [trilhaSelecionada, setTrilhaSelecionada] = useState("");

  const trilhasRecomendadas = getTrilhas().filter((t) =>
    nivel ? trilhasPorNivel[nivel]?.includes(t.slug) : true
  );

  function avancar() {
    if (etapa < 3) setEtapa((e) => (e + 1) as Etapa);
  }

  function voltar() {
    if (etapa > 1) setEtapa((e) => (e - 1) as Etapa);
  }

  function comecar() {
    if (trilhaSelecionada) {
      router.push(`/trilhas/${trilhaSelecionada}`);
    } else {
      router.push("/dashboard");
    }
  }

  const progresso = ((etapa - 1) / 2) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Header */}
      <header className="px-4 py-5 border-b border-surface">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon_io/android-chrome-192x192.png" alt="EstudaCode" width={28} height={28} className="object-contain" />
            <span className="text-lg font-bold text-text">EstudaCode</span>
          </Link>
          <Link href="/dashboard" className="text-secondary hover:text-text text-sm transition-colors">
            Pular →
          </Link>
        </div>
      </header>

      {/* Barra de progresso */}
      <div className="h-1 bg-surface">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progresso}%` }}
        />
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Etapa 1 — Objetivo */}
          {etapa === 1 && (
            <div>
              <div className="text-center mb-10">
                <p className="text-primary text-sm font-medium mb-2">Etapa 1 de 3</p>
                <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
                  Qual é o seu objetivo?
                </h1>
                <p className="text-secondary">Isso nos ajuda a recomendar o melhor caminho para você.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {objetivos.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setObjetivo(obj.id)}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 text-left transition-all ${
                      objetivo === obj.id
                        ? "border-primary bg-primary/10"
                        : "border-card hover:border-primary/50 bg-surface"
                    }`}
                  >
                    <span className="text-2xl">{obj.emoji}</span>
                    <span className={`text-sm font-medium ${objetivo === obj.id ? "text-text" : "text-secondary"}`}>
                      {obj.label}
                    </span>
                    {objetivo === obj.id && (
                      <CheckCircle size={16} className="text-primary ml-auto flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!objetivo}
                onClick={avancar}
              >
                Continuar
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          )}

          {/* Etapa 2 — Nível */}
          {etapa === 2 && (
            <div>
              <div className="text-center mb-10">
                <p className="text-primary text-sm font-medium mb-2">Etapa 2 de 3</p>
                <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
                  Qual é o seu nível atual?
                </h1>
                <p className="text-secondary">Seja honesto — isso garante que você comece no lugar certo.</p>
              </div>

              <div className="space-y-3 mb-8">
                {niveis.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNivel(n.id)}
                    className={`flex items-center space-x-4 w-full p-4 rounded-xl border-2 text-left transition-all ${
                      nivel === n.id
                        ? "border-primary bg-primary/10"
                        : "border-card hover:border-primary/50 bg-surface"
                    }`}
                  >
                    <span className="text-2xl">{n.emoji}</span>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${nivel === n.id ? "text-text" : "text-text"}`}>
                        {n.label}
                      </p>
                      <p className="text-secondary text-xs mt-0.5">{n.desc}</p>
                    </div>
                    {nivel === n.id && (
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" size="lg" onClick={voltar} className="flex-1">
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar
                </Button>
                <Button variant="primary" size="lg" className="flex-1" disabled={!nivel} onClick={avancar}>
                  Continuar
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Etapa 3 — Trilha recomendada */}
          {etapa === 3 && (
            <div>
              <div className="text-center mb-10">
                <p className="text-primary text-sm font-medium mb-2">Etapa 3 de 3</p>
                <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
                  Trilhas recomendadas para você
                </h1>
                <p className="text-secondary">Escolha por onde quer começar. Você pode mudar depois.</p>
              </div>

              <div className="space-y-3 mb-8">
                {trilhasRecomendadas.slice(0, 4).map((trilha) => (
                  <button
                    key={trilha.id}
                    onClick={() => setTrilhaSelecionada(trilha.slug)}
                    className={`flex items-center space-x-4 w-full p-4 rounded-xl border-2 text-left transition-all ${
                      trilhaSelecionada === trilha.slug
                        ? "border-primary bg-primary/10"
                        : "border-card hover:border-primary/50 bg-surface"
                    }`}
                  >
                    <span className="text-3xl">{trilha.icone}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text text-sm">{trilha.nome}</p>
                      <p className="text-secondary text-xs mt-0.5 truncate">{trilha.descricao}</p>
                      <div className="flex items-center space-x-3 mt-1.5 text-xs text-secondary">
                        <span>{getDifficultyLabel(trilha.dificuldade)}</span>
                        <span>•</span>
                        <span>{trilha.duracaoEstimada}</span>
                        <span>•</span>
                        <span>{trilha.totalModulos} módulos</span>
                      </div>
                    </div>
                    {trilhaSelecionada === trilha.slug && (
                      <CheckCircle size={18} className="text-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" size="lg" onClick={voltar} className="flex-1">
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar
                </Button>
                <Button variant="primary" size="lg" className="flex-1" onClick={comecar}>
                  {trilhaSelecionada ? "Começar Trilha" : "Ir para o Dashboard"}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
