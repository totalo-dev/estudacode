"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/progress/ProgressBar";
import { ChevronLeft, CheckCircle, XCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getModulosBySlug } from "@/lib/services/modulos.service";
import { useProgresso } from "@/lib/hooks/useProgresso";

// Quizzes por módulo — será substituído por banco de dados
const quizzesPorModulo: Record<string, {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}[]> = {
  "demo-1": [
    {
      pergunta: "Qual é o melhor próximo passo depois de ler uma aula?",
      opcoes: ["Pular para outra trilha", "Praticar o conceito", "Fechar a plataforma", "Trocar o tema"],
      respostaCorreta: 1,
      explicacao: "A prática logo após a leitura ajuda a fixar o conteúdo e revela dúvidas cedo.",
    },
    {
      pergunta: "Para que serve marcar progresso?",
      opcoes: ["Apenas mudar a cor da tela", "Ajudar o app a indicar continuidade", "Bloquear módulos", "Apagar respostas"],
      respostaCorreta: 1,
      explicacao: "O progresso permite continuar de onde parou e acompanhar evolução no dashboard.",
    },
  ],
  "1": [
    {
      pergunta: "O que é um componente React?",
      opcoes: ["Um arquivo CSS", "Uma função que retorna JSX", "Um banco de dados", "Um servidor web"],
      respostaCorreta: 1,
      explicacao: "Componentes React são funções JavaScript que retornam JSX — a descrição da interface.",
    },
    {
      pergunta: "O que são props no React?",
      opcoes: ["Variáveis globais", "Dados passados de pai para filho", "Funções do servidor", "Estilos CSS"],
      respostaCorreta: 1,
      explicacao: "Props (propriedades) são dados passados de um componente pai para um componente filho, tornando os componentes reutilizáveis.",
    },
    {
      pergunta: "Qual a diferença entre JSX e HTML?",
      opcoes: ["São idênticos", "JSX usa className em vez de class", "HTML é mais moderno", "JSX não suporta eventos"],
      respostaCorreta: 1,
      explicacao: "JSX é similar ao HTML mas com diferenças: usa className (não class), camelCase para eventos (onClick), e permite expressões JavaScript com {}.",
    },
  ],
  "2": [
    {
      pergunta: "O que o hook useState retorna?",
      opcoes: ["Um objeto com value e setValue", "Um array com o valor atual e uma função para atualizá-lo", "Apenas o valor atual", "Uma Promise"],
      respostaCorreta: 1,
      explicacao: "useState retorna um array com dois elementos: [valorAtual, funcaoParaAtualizar]. Usamos desestruturação para capturá-los.",
    },
    {
      pergunta: "Qual é a sintaxe correta para usar useState?",
      opcoes: ["const count = useState(0)", "const [count] = useState(0)", "const [count, setCount] = useState(0)", "const {count, setCount} = useState(0)"],
      respostaCorreta: 2,
      explicacao: "Usamos desestruturação de array: const [valor, setValor] = useState(valorInicial).",
    },
    {
      pergunta: "Quando o useEffect com array vazio [] é executado?",
      opcoes: ["Em todo re-render", "Apenas na montagem do componente", "Apenas na desmontagem", "Nunca"],
      respostaCorreta: 1,
      explicacao: "useEffect com [] como dependências executa apenas uma vez, quando o componente é montado — equivalente ao componentDidMount de classes.",
    },
    {
      pergunta: "Para que serve a função de cleanup no useEffect?",
      opcoes: ["Limpar o localStorage", "Cancelar efeitos ao desmontar o componente", "Resetar o estado", "Limpar o cache"],
      respostaCorreta: 1,
      explicacao: "A função retornada pelo useEffect é chamada quando o componente desmonta, permitindo cancelar timers, assinaturas e outros efeitos.",
    },
  ],
  "3": [
    {
      pergunta: "Qual problema a Context API resolve?",
      opcoes: ["Performance de renderização", "Prop drilling — passar dados por muitos níveis", "Requisições HTTP", "Estilização de componentes"],
      respostaCorreta: 1,
      explicacao: "A Context API resolve o prop drilling: a necessidade de passar props manualmente por vários níveis de componentes.",
    },
    {
      pergunta: "Como se consome um contexto em um componente funcional?",
      opcoes: ["this.context", "useContext(MeuContexto)", "Context.get()", "props.context"],
      respostaCorreta: 1,
      explicacao: "Em componentes funcionais, usamos o hook useContext(NomeDoContexto) para acessar o valor do contexto mais próximo.",
    },
  ],
};

// Fallback genérico
const quizGenerico = [
  {
    pergunta: "Qual é a principal vantagem de usar TypeScript?",
    opcoes: ["Código mais rápido", "Tipagem estática que previne erros", "Menos linhas de código", "Melhor estilização"],
    respostaCorreta: 1,
    explicacao: "TypeScript adiciona tipagem estática ao JavaScript, permitindo detectar erros em tempo de desenvolvimento antes de executar o código.",
  },
  {
    pergunta: "O que é um componente reutilizável?",
    opcoes: ["Um componente que só pode ser usado uma vez", "Um componente que pode ser usado em múltiplos lugares", "Um componente sem props", "Um componente com estado global"],
    respostaCorreta: 1,
    explicacao: "Componentes reutilizáveis são projetados para funcionar em diferentes contextos, recebendo dados via props.",
  },
];

export default function QuizPage({ params }: { params: { slug: string; moduloId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [respostas, setRespostas] = useState<{ correta: boolean }[]>([]);
  const { toggleTopico } = useProgresso();

  const trilha = getTrilhaBySlug(params.slug);
  const trilhaModulos = getModulosBySlug(params.slug);
  const modulo = trilhaModulos.find((m) => m.id === params.moduloId);
  const questions = quizzesPorModulo[params.moduloId] || quizGenerico;
  const topicoQuiz = modulo?.topicos.find((t) => t.tipo === "quiz");

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.respostaCorreta;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const percentualAcerto = Math.round((score / questions.length) * 100);

  // Próximo módulo para navegação
  const moduloIndex = trilhaModulos.findIndex((m) => m.id === params.moduloId);
  const proximoModulo = trilhaModulos[moduloIndex + 1];

  function handleAnswer() {
    if (selectedAnswer === null) return;
    const correto = selectedAnswer === question.respostaCorreta;
    if (correto) setScore((s) => s + 1);
    setRespostas((r) => [...r, { correta: correto }]);
    setShowFeedback(true);
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      if (topicoQuiz) toggleTopico(topicoQuiz.id, true);
      setFinalizado(true);
    }
  }

  if (finalizado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Trophy size={36} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Quiz Concluído!</h1>
          <p className="text-secondary mb-8">{modulo?.titulo || "Módulo"} — {trilha?.nome}</p>

          <div className="bg-surface border border-card rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold text-text mb-2">{score}/{questions.length}</div>
            <p className="text-secondary mb-4">{percentualAcerto}% de acerto</p>
            <ProgressBar value={percentualAcerto} />
            <p className="text-sm text-secondary mt-4">
              {percentualAcerto >= 80
                ? "🎉 Excelente! Você dominou este módulo."
                : percentualAcerto >= 60
                ? "👍 Bom trabalho! Revise os tópicos que errou."
                : "📚 Continue estudando. Revise o conteúdo e tente novamente."}
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            {proximoModulo && (
              <Link href={`/trilhas/${params.slug}/modulos/${proximoModulo.id}/conteudo`}>
                <Button variant="primary" size="lg" className="w-full">
                  Próximo Módulo: {proximoModulo.titulo}
                </Button>
              </Link>
            )}
            <Link href={`/trilhas/${params.slug}`}>
              <Button variant="outline" size="md" className="w-full">
                Voltar para a Trilha
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/trilhas/${params.slug}`} className="inline-flex items-center space-x-2 text-secondary hover:text-text mb-6">
          <ChevronLeft size={20} />
          <span>Voltar para trilha</span>
        </Link>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text">Quiz: {modulo?.titulo || "Módulo"}</h1>
              <p className="text-secondary text-sm mt-1">{trilha?.nome}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-text">{score}/{respostas.length}</div>
              <div className="text-sm text-secondary">Pontuação</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-secondary mb-2">
            <span>Questão {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-text mb-6">{question.pergunta}</h2>

          <div className="space-y-3 mb-6">
            {question.opcoes.map((opcao, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && setSelectedAnswer(index)}
                disabled={showFeedback}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all text-sm",
                  selectedAnswer === index && !showFeedback && "border-primary bg-primary/10",
                  selectedAnswer !== index && !showFeedback && "border-card hover:border-secondary",
                  showFeedback && index === question.respostaCorreta && "border-success bg-success/10",
                  showFeedback && selectedAnswer === index && index !== question.respostaCorreta && "border-red-500 bg-red-500/10",
                  showFeedback && selectedAnswer !== index && index !== question.respostaCorreta && "border-card opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-text">{opcao}</span>
                  {showFeedback && index === question.respostaCorreta && <CheckCircle className="text-success flex-shrink-0" size={18} />}
                  {showFeedback && selectedAnswer === index && index !== question.respostaCorreta && <XCircle className="text-red-500 flex-shrink-0" size={18} />}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={cn(
              "p-4 rounded-lg mb-6 text-sm",
              isCorrect ? "bg-success/10 border border-success/20" : "bg-red-500/10 border border-red-500/20"
            )}>
              <div className="flex items-start space-x-3">
                {isCorrect
                  ? <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={18} />
                  : <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />}
                <div>
                  <p className={cn("font-semibold mb-1", isCorrect ? "text-success" : "text-red-500")}>
                    {isCorrect ? "Correto!" : "Incorreto"}
                  </p>
                  <p className="text-text">{question.explicacao}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            {!showFeedback ? (
              <Button variant="primary" onClick={handleAnswer} disabled={selectedAnswer === null}>
                Confirmar Resposta
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
