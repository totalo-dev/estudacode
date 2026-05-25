"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Callout from "@/components/content/Callout";
import { ChevronLeft, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import { useProgresso } from "@/lib/hooks/useProgresso";

// Exercícios por módulo — será substituído por banco de dados
const exerciciosPorModulo: Record<string, {
  id: string;
  titulo: string;
  enunciado: string;
  contexto: string;
  dicas: string[];
  verificacao: (codigo: string) => boolean;
  solucao: string;
  explicacao: string;
}[]> = {
  "demo-1": [
    {
      id: "1",
      titulo: "Monte seu plano de estudo",
      enunciado: "Crie um array chamado `plano` com três etapas de estudo e exiba a primeira etapa usando `console.log`.",
      contexto: "Este exercício confirma se você entendeu a ideia de quebrar o aprendizado em passos pequenos e verificáveis.",
      dicas: [
        "Use const plano = [...] para criar o array.",
        "Arrays começam no índice 0.",
        "Use console.log(plano[0]) para exibir o primeiro item.",
      ],
      verificacao: (codigo) => codigo.includes("plano") && codigo.includes("[") && codigo.includes("console.log"),
      solucao: `const plano = ["ler conteúdo", "praticar", "revisar feedback"];

console.log(plano[0]);`,
      explicacao: "Criamos uma lista simples de etapas e acessamos o primeiro item pelo índice 0.",
    },
  ],
  "1": [
    {
      id: "1",
      titulo: "Primeiro Componente",
      enunciado: "Crie um componente React chamado `Saudacao` que receba uma prop `nome` e exiba a mensagem 'Olá, [nome]!' dentro de um parágrafo.",
      contexto: "Este exercício pratica a criação de componentes funcionais e o uso de props — conceitos fundamentais do React.",
      dicas: [
        "Componentes React são funções que retornam JSX.",
        "Props são passadas como parâmetro da função: function Componente({ prop }) {}",
        "Use {nome} dentro do JSX para exibir o valor da prop.",
      ],
      verificacao: (codigo) => codigo.includes("function") && codigo.includes("nome") && codigo.includes("Olá"),
      solucao: `function Saudacao({ nome }) {
  return (
    <p>Olá, {nome}!</p>
  );
}

export default Saudacao;`,
      explicacao: "Criamos um componente funcional que desestrutura a prop 'nome' do parâmetro e a exibe dentro de um parágrafo usando expressão JSX {}.",
    },
  ],
  "2": [
    {
      id: "1",
      titulo: "Gerenciando Estado",
      enunciado: "Crie um componente `Contador` com um estado iniciado em 0. Adicione dois botões: 'Incrementar' (soma 1) e 'Decrementar' (subtrai 1). Exiba o valor atual do contador.",
      contexto: "Este exercício pratica o hook useState para gerenciar estado local em componentes funcionais.",
      dicas: [
        "Importe useState do React: import { useState } from 'react'",
        "useState retorna [valorAtual, funcaoDeAtualização].",
        "Use setCount(count + 1) para incrementar e setCount(count - 1) para decrementar.",
      ],
      verificacao: (codigo) => codigo.includes("useState") && codigo.includes("setCount") || codigo.includes("useState") && codigo.includes("set"),
      solucao: `import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
    </div>
  );
}

export default Contador;`,
      explicacao: "Usamos useState(0) para criar o estado 'count' com valor inicial 0. Os botões chamam setCount com o novo valor calculado a partir do valor atual.",
    },
  ],
  "3": [
    {
      id: "1",
      titulo: "Theme Provider",
      enunciado: "Crie um contexto `TemaContext` com valor padrão 'claro'. Crie um `TemaProvider` que armazene o tema em estado e o forneça via Context. Crie um componente `BotaoTema` que leia o contexto e alterne entre 'claro' e 'escuro'.",
      contexto: "Este exercício pratica a Context API para compartilhar estado global sem prop drilling.",
      dicas: [
        "Use createContext() para criar o contexto.",
        "Envolva os componentes com <TemaContext.Provider value={...}>.",
        "Use useContext(TemaContext) para consumir o valor.",
      ],
      verificacao: (codigo) => codigo.includes("createContext") && codigo.includes("Provider") && codigo.includes("useContext"),
      solucao: `import { createContext, useState, useContext } from 'react';

const TemaContext = createContext('claro');

function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro');
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}

function BotaoTema() {
  const { tema, setTema } = useContext(TemaContext);
  return (
    <button onClick={() => setTema(tema === 'claro' ? 'escuro' : 'claro')}>
      Tema atual: {tema}
    </button>
  );
}`,
      explicacao: "Criamos o contexto com createContext, fornecemos o valor com Provider e consumimos com useContext. O botão alterna o tema usando o operador ternário.",
    },
  ],
};

export default function ExercicioPage({ params }: { params: { slug: string; moduloId: string; exercicioId: string } }) {
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { toggleTopico, topicoConcluido } = useProgresso();

  const trilha = getTrilhaBySlug(params.slug);
  const trilhaModulos = getModulosBySlug(params.slug);
  const modulo = trilhaModulos.find((m) => m.id === params.moduloId);
  const exerciciosDoModulo = exerciciosPorModulo[params.moduloId] || exerciciosPorModulo["2"] || [];
  const exercicioIndex = Math.max(0, parseInt(params.exercicioId) - 1);
  const exercicio = exerciciosDoModulo[exercicioIndex] || exerciciosDoModulo[0];
  const topicoExercicio = modulo?.topicos.filter((t) => t.tipo === "exercicio")[exercicioIndex];
  const exercicioConcluido = topicoExercicio ? topicoConcluido(topicoExercicio) : false;

  // Navegação entre exercícios
  const exercicioAnterior = exercicioIndex > 0 ? exerciciosDoModulo[exercicioIndex - 1] : null;
  const exercicioProximo = exercicioIndex < exerciciosDoModulo.length - 1 ? exerciciosDoModulo[exercicioIndex + 1] : null;

  function handleVerify() {
    if (!exercicio) return;
    if (exercicio.verificacao(userCode)) {
      if (topicoExercicio) toggleTopico(topicoExercicio.id, true);
      setFeedback({ type: "success", message: "Excelente! Sua solução está correta. Continue para o próximo exercício." });
    } else {
      setFeedback({ type: "error", message: "Ainda não está certo. Revise o enunciado e tente novamente. Use as dicas se precisar." });
    }
  }

  function mostrarProximaDica() {
    setShowHint(true);
    if (hintIndex < (exercicio?.dicas.length ?? 1) - 1) {
      setHintIndex(hintIndex + 1);
    }
  }

  if (!exercicio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary mb-4">Exercício não encontrado.</p>
          <Link href={`/trilhas/${params.slug}`} className="text-primary hover:underline">Voltar para trilha</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href={`/trilhas/${params.slug}`} className="inline-flex items-center space-x-2 text-secondary hover:text-text mb-6">
          <ChevronLeft size={20} />
          <span>Voltar para {trilha?.nome || "trilha"}</span>
        </Link>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text">Exercício: {exercicio.titulo}</h1>
              {exercicioConcluido && (
                <p className="mt-1 text-sm text-success flex items-center gap-1.5">
                  <CheckCircle size={14} />
                  Exercício concluído
                </p>
              )}
            </div>
            <span className="text-sm text-secondary">
              {exercicioIndex + 1} de {exerciciosDoModulo.length}
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((exercicioIndex + 1) / exerciciosDoModulo.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold text-text mb-4">📝 Enunciado</h2>
              <p className="text-text text-sm leading-relaxed">{exercicio.enunciado}</p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-text mb-4">🎯 Contexto</h2>
              <p className="text-secondary text-sm">{exercicio.contexto}</p>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={mostrarProximaDica}
                  className="flex items-center space-x-2 text-primary hover:text-blue-400 transition-colors"
                >
                  <Lightbulb size={20} />
                  <span className="font-medium text-sm">
                    {showHint ? `Dica ${hintIndex + 1} de ${exercicio.dicas.length}` : "Ver Dica"}
                  </span>
                </button>
                {showHint && hintIndex < exercicio.dicas.length - 1 && (
                  <button onClick={mostrarProximaDica} className="text-xs text-secondary hover:text-text">
                    Próxima dica →
                  </button>
                )}
              </div>
              {showHint && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-text text-sm">{exercicio.dicas[hintIndex]}</p>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold text-text mb-4">💻 Sua Resposta</h2>
              <textarea
                value={userCode}
                onChange={(e) => { setUserCode(e.target.value); setFeedback(null); }}
                placeholder="// Escreva seu código aqui..."
                className="w-full h-64 bg-surface border border-card rounded-lg p-4 text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button variant="primary" onClick={handleVerify} className="flex-1">
                  <CheckCircle size={18} className="mr-2" />
                  Verificar
                </Button>
                <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
                  {showSolution ? "Ocultar" : "Ver"} Solução
                </Button>
              </div>
            </Card>

            {feedback && (
              <Callout
                type={feedback.type === "success" ? "success" : "error"}
                title={feedback.type === "success" ? "Correto!" : "Tente novamente"}
              >
                {feedback.message}
              </Callout>
            )}

            {showSolution && (
              <Card>
                <h2 className="text-xl font-semibold text-text mb-4">✅ Solução</h2>
                <pre className="bg-surface border border-card rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-text font-mono">{exercicio.solucao}</code>
                </pre>
                <div className="mt-4 p-4 bg-surface rounded-lg">
                  <h3 className="text-sm font-semibold text-text mb-2">Explicação:</h3>
                  <p className="text-secondary text-sm">{exercicio.explicacao}</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
          {exercicioAnterior ? (
            <Link href={`/trilhas/${params.slug}/modulos/${params.moduloId}/exercicios/${exercicioIndex}`}>
              <Button variant="ghost">
                <ChevronLeft size={20} className="mr-2" />
                Exercício Anterior
              </Button>
            </Link>
          ) : (
            <Link href={`/trilhas/${params.slug}/modulos/${params.moduloId}/conteudo`}>
              <Button variant="ghost">
                <ChevronLeft size={20} className="mr-2" />
                Voltar ao Conteúdo
              </Button>
            </Link>
          )}
          {exercicioProximo ? (
            <Link href={`/trilhas/${params.slug}/modulos/${params.moduloId}/exercicios/${exercicioIndex + 2}`}>
              <Button variant="primary">
                Próximo Exercício
                <ChevronLeft size={20} className="ml-2 rotate-180" />
              </Button>
            </Link>
          ) : (
            <Link href={`/trilhas/${params.slug}/modulos/${params.moduloId}/quiz`}>
              <Button variant="primary">
                Ir para o Quiz
                <ChevronLeft size={20} className="ml-2 rotate-180" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
