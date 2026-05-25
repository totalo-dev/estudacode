import Breadcrumb from "@/components/navigation/Breadcrumb";
import TableOfContents from "@/components/navigation/TableOfContents";
import PaginationNavigation from "@/components/navigation/PaginationNavigation";
import Callout from "@/components/content/Callout";
import CodeBlock from "@/components/content/CodeBlock";
import ProgressBar from "@/components/progress/ProgressBar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { trilhas } from "@/data/trilhas";
import { modulos } from "@/data/modulos";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Conteúdo por tópico — será substituído por CMS/banco quando o backend existir
const conteudoPorTopico: Record<string, {
  titulo: string;
  intro: string;
  callout?: { tipo: "info" | "warning" | "success" | "error"; titulo: string; texto: string };
  topicos: string[];
  codigo?: string;
  linguagem?: string;
  conclusao: string;
}> = {
  // React Moderno
  "1-1": {
    titulo: "O que é React?",
    intro: "React é uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuário. Ela permite criar componentes reutilizáveis que gerenciam seu próprio estado.",
    callout: { tipo: "info", titulo: "Pré-requisitos", texto: "Antes de começar, certifique-se de ter conhecimento básico de JavaScript, HTML e CSS." },
    topicos: ["Componentes — blocos de construção da UI", "Props — dados passados entre componentes", "Estado (State) — dados que mudam ao longo do tempo", "Hooks — funções especiais do React"],
    codigo: `// Seu primeiro componente React
function OlaMundo() {
  return (
    <div>
      <h1>Olá, Mundo!</h1>
      <p>Este é meu primeiro componente React.</p>
    </div>
  );
}

export default OlaMundo;`,
    linguagem: "jsx",
    conclusao: "Agora você conhece os conceitos básicos do React. No próximo tópico, vamos explorar JSX e como criar componentes mais complexos.",
  },
  "1-2": {
    titulo: "JSX e Componentes",
    intro: "JSX é uma extensão de sintaxe do JavaScript que permite escrever HTML dentro do JavaScript. É a forma padrão de descrever a interface no React.",
    callout: { tipo: "info", titulo: "JSX não é HTML", texto: "Apesar de parecer HTML, JSX é transformado em chamadas JavaScript pelo compilador. Use className em vez de class, por exemplo." },
    topicos: ["JSX — sintaxe declarativa para UI", "Expressões JavaScript dentro de {}", "Componentes funcionais", "Composição de componentes"],
    codigo: `// JSX na prática
function Saudacao({ nome }) {
  const hora = new Date().getHours();
  const periodo = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="saudacao">
      <h2>{periodo}, {nome}!</h2>
      <p>São {hora}h agora.</p>
    </div>
  );
}`,
    linguagem: "jsx",
    conclusao: "Com JSX você consegue criar interfaces de forma declarativa e intuitiva. Pratique criando seus próprios componentes no exercício a seguir.",
  },
  "2-1": {
    titulo: "useState",
    intro: "O hook useState permite adicionar estado a componentes funcionais. Antes dos hooks, apenas componentes de classe podiam ter estado.",
    callout: { tipo: "info", titulo: "Regra dos Hooks", texto: "Sempre chame hooks no nível superior do componente — nunca dentro de loops, condicionais ou funções aninhadas." },
    topicos: ["Declarando estado com useState", "Lendo o valor do estado", "Atualizando o estado", "Estado com objetos e arrays"],
    codigo: `import { useState } from 'react';

function Contador() {
  // [valorAtual, funcaoDeAtualização] = useState(valorInicial)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
      <button onClick={() => setCount(0)}>
        Resetar
      </button>
    </div>
  );
}`,
    linguagem: "jsx",
    conclusao: "useState é o hook mais usado no React. Pratique com o exercício de gerenciamento de estado para fixar o conceito.",
  },
  "2-2": {
    titulo: "useEffect",
    intro: "O hook useEffect permite executar efeitos colaterais em componentes funcionais — como buscar dados, manipular o DOM ou configurar assinaturas.",
    callout: { tipo: "warning", titulo: "Cuidado com loops infinitos", texto: "Sempre especifique as dependências do useEffect. Um array vazio [] executa apenas na montagem. Sem array, executa em todo render." },
    topicos: ["Executando efeitos após o render", "Array de dependências", "Limpeza de efeitos (cleanup)", "Buscando dados com useEffect"],
    codigo: `import { useState, useEffect } from 'react';

function Relogio() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    // Configura o intervalo
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Cleanup: limpa o intervalo quando o componente desmonta
    return () => clearInterval(intervalo);
  }, []); // [] = executa só na montagem

  return <p>Hora atual: {hora.toLocaleTimeString()}</p>;
}`,
    linguagem: "jsx",
    conclusao: "useEffect é essencial para sincronizar componentes com sistemas externos. Pratique com o exercício de gerenciamento de estado.",
  },
  "3-1": {
    titulo: "Criando Contextos",
    intro: "A Context API resolve o problema de prop drilling — passar dados por muitos níveis de componentes. Com ela, você compartilha dados globalmente sem passar props manualmente.",
    callout: { tipo: "info", titulo: "Quando usar Context?", texto: "Use Context para dados verdadeiramente globais como tema, idioma ou usuário autenticado. Para estado local, prefira useState." },
    topicos: ["Criando um contexto com createContext", "Provider — fornecendo o valor", "Consumer — consumindo o valor", "Boas práticas de organização"],
    codigo: `import { createContext, useState } from 'react';

// 1. Cria o contexto
export const TemaContext = createContext('claro');

// 2. Provider — envolve os componentes que precisam do dado
export function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro');

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}`,
    linguagem: "jsx",
    conclusao: "Agora você sabe criar contextos. No próximo tópico, aprenderemos a consumi-los com o hook useContext.",
  },
};

// Fallback genérico para tópicos sem conteúdo específico
function getConteudo(moduloId: string, topicoIndex: number, tituloTopico: string) {
  const chave = `${moduloId}-${topicoIndex + 1}`;
  if (conteudoPorTopico[chave]) return conteudoPorTopico[chave];
  return {
    titulo: tituloTopico,
    intro: `Neste tópico você vai aprender sobre ${tituloTopico}. Acompanhe o conteúdo e pratique com os exercícios.`,
    topicos: ["Conceitos fundamentais", "Exemplos práticos", "Boas práticas", "Casos de uso reais"],
    codigo: `// Exemplo de código para ${tituloTopico}\nconsole.log("Olá, EstudaCode!");`,
    linguagem: "javascript",
    conclusao: `Você concluiu o tópico ${tituloTopico}. Continue para o próximo tópico para aprofundar seu conhecimento.`,
  };
}

export default function ConteudoPage({ params }: { params: { slug: string; moduloId: string } }) {
  const trilha = trilhas.find((t) => t.slug === params.slug);
  const trilhaModulos = modulos[params.slug] || [];
  const modulo = trilhaModulos.find((m) => m.id === params.moduloId);

  if (!trilha || !modulo) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <p className="text-secondary">Módulo não encontrado.</p>
          <Link href="/trilhas" className="text-primary hover:underline mt-4 block">Voltar para trilhas</Link>
        </div>
      </DashboardLayout>
    );
  }

  // Tópico de conteúdo (primeiro do tipo "conteudo")
  const topicosConteudo = modulo.topicos.filter((t) => t.tipo === "conteudo");
  const topicoAtual = topicosConteudo[0];
  const topicoIndex = modulo.topicos.findIndex((t) => t.id === topicoAtual?.id);
  const conteudo = getConteudo(params.moduloId, 0, topicoAtual?.titulo || modulo.titulo);

  // Navegação entre módulos
  const moduloIndex = trilhaModulos.findIndex((m) => m.id === params.moduloId);
  const moduloAnterior = trilhaModulos[moduloIndex - 1];
  const moduloProximo = trilhaModulos[moduloIndex + 1];

  // Progresso do módulo
  const concluidos = modulo.topicos.filter((t) => t.concluido).length;
  const progresso = Math.round((concluidos / modulo.topicos.length) * 100);

  const tocItems = [
    { id: "introducao", title: "Introdução", level: 1 },
    { id: "topicos", title: "Conceitos", level: 1 },
    { id: "exemplo", title: "Exemplo Prático", level: 2 },
    { id: "conclusao", title: "Conclusão", level: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar de módulos — oculta em mobile */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-surface border-r border-card p-6 overflow-y-auto flex-col md:left-64">
          <Link href={`/trilhas/${params.slug}`} className="flex items-center space-x-2 text-secondary hover:text-text mb-6">
            <ChevronLeft size={20} />
            <span className="text-sm">Voltar para trilha</span>
          </Link>

          <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-4">{trilha.nome}</h3>
          <ul className="space-y-1">
            {trilhaModulos.map((m, i) => (
              <li key={m.id}>
                <Link
                  href={`/trilhas/${params.slug}/modulos/${m.id}/conteudo`}
                  className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                    m.id === params.moduloId
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-secondary hover:text-text hover:bg-card"
                  }`}
                >
                  {i + 1}. {m.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 lg:ml-64 xl:mr-72 px-4 md:px-8 lg:px-16 py-8">
          {/* Breadcrumb mobile — link de volta */}
          <div className="lg:hidden mb-4">
            <Link href={`/trilhas/${params.slug}`} className="inline-flex items-center space-x-2 text-secondary hover:text-text text-sm">
              <ChevronLeft size={16} />
              <span>Voltar para {trilha.nome}</span>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Trilhas", href: "/trilhas" },
                { label: trilha.nome, href: `/trilhas/${params.slug}` },
                { label: modulo.titulo },
              ]}
            />

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
                  <li key={t} className="text-secondary">{t}</li>
                ))}
              </ul>

              {conteudo.codigo && (
                <>
                  <h3 id="exemplo" className="text-xl font-semibold text-text mt-8 mb-4">
                    Exemplo Prático
                  </h3>
                  <div className="my-6">
                    <CodeBlock code={conteudo.codigo} language={conteudo.linguagem || "javascript"} />
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

            <div className="mt-12">
              <PaginationNavigation
                previous={moduloAnterior ? {
                  title: moduloAnterior.titulo,
                  href: `/trilhas/${params.slug}/modulos/${moduloAnterior.id}/conteudo`,
                } : undefined}
                next={moduloProximo ? {
                  title: moduloProximo.titulo,
                  href: `/trilhas/${params.slug}/modulos/${moduloProximo.id}/conteudo`,
                } : undefined}
              />
            </div>
          </div>
        </main>

        {/* Table of Contents — só em telas xl+ */}
        <aside className="hidden xl:block fixed right-0 top-0 h-screen w-72 p-8 overflow-y-auto">
          <TableOfContents items={tocItems} activeId="introducao" />
        </aside>
      </div>
    </div>
  );
}
