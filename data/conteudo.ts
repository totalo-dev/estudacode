// Conteúdo por tópico — será substituído por CMS/banco quando o backend existir
// Chave: "{moduloId}-{ordemTopico}" (ex: "1-1", "2-2")

export type ConteudoTopico = {
  titulo: string;
  intro: string;
  callout?: {
    tipo: "info" | "warning" | "success" | "error";
    titulo: string;
    texto: string;
  };
  topicos: string[];
  codigo?: string;
  linguagem?: string;
  conclusao: string;
};

export const conteudoPorTopico: Record<string, ConteudoTopico> = {
  // Trilha Demo
  "demo-1-1": {
    titulo: "Como estudar por trilhas",
    intro:
      "A EstudaCode organiza o aprendizado em pequenas etapas: leia o conceito, pratique em seguida e confirme o entendimento com um quiz ou projeto.",
    callout: {
      tipo: "success",
      titulo: "Ritmo recomendado",
      texto:
        "Estude em blocos curtos de 25 a 40 minutos e sempre finalize marcando seu progresso. Isso ajuda o dashboard a mostrar o próximo passo.",
    },
    topicos: [
      "Comece pelo conteúdo para entender o objetivo da aula",
      "Use o exercício para transformar leitura em prática",
      "Revise o feedback antes de avançar",
      "Feche ciclos pequenos em vez de acumular tópicos abertos",
    ],
    codigo: `const rotina = [
  "ler o conteúdo",
  "resolver o exercício",
  "fazer o quiz",
  "marcar progresso",
];

console.log(rotina.join(" -> "));`,
    linguagem: "javascript",
    conclusao:
      "Agora você conhece o fluxo principal. No próximo passo, monte seu primeiro plano de estudo e veja o progresso aparecer na plataforma.",
  },

  "demo-2-1": {
    titulo: "Do conceito ao projeto",
    intro:
      "Projetos servem para juntar várias habilidades em uma entrega pequena, verificável e fácil de melhorar. Nesta demo, a meta é criar uma página simples de apresentação.",
    callout: {
      tipo: "info",
      titulo: "Projeto pequeno também conta",
      texto:
        "Um bom mini projeto tem escopo claro: uma tela, um objetivo e poucos requisitos bem feitos.",
    },
    topicos: [
      "Defina o objetivo antes de escrever código",
      "Quebre o projeto em requisitos pequenos",
      "Valide visual, responsividade e leitura",
      "Publique ou salve uma versão final para comparar sua evolução",
    ],
    codigo: `<main>
  <section>
    <h1>Olá, eu sou João</h1>
    <p>Estou aprendendo desenvolvimento web com projetos práticos.</p>
    <a href="mailto:joao@email.com">Entrar em contato</a>
  </section>
</main>`,
    linguagem: "html",
    conclusao:
      "Com um escopo pequeno, fica mais fácil terminar, revisar e evoluir. Agora avance para o projeto da demo.",
  },

  // Fundamentos Web
  "fw-1-1": {
    titulo: "Estrutura do HTML",
    intro:
      "HTML é a estrutura da página. Ele define títulos, textos, links, imagens, formulários e regiões semânticas que o navegador e leitores de tela conseguem entender.",
    callout: {
      tipo: "info",
      titulo: "Semântica importa",
      texto:
        "Tags como header, main, section e footer descrevem o papel do conteúdo. Isso melhora acessibilidade, SEO e manutenção.",
    },
    topicos: [
      "Documento HTML começa com doctype, html, head e body",
      "Head concentra metadados, título e links de assets",
      "Body contém a interface visível",
      "Tags semânticas comunicam intenção, não apenas aparência",
    ],
    codigo: `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Minha primeira página</title>
  </head>
  <body>
    <header>Meu site</header>
    <main>
      <h1>Bem-vindo</h1>
      <p>Esta é a estrutura base de uma página HTML.</p>
    </main>
  </body>
</html>`,
    linguagem: "html",
    conclusao:
      "Uma boa estrutura HTML deixa a página mais clara para pessoas, navegadores e ferramentas. A próxima etapa aprofunda as tags semânticas.",
  },

  "fw-2-1": {
    titulo: "Seletores e Especificidade",
    intro:
      "CSS seleciona elementos HTML e aplica estilos. Para manter o código previsível, é essencial entender como seletores competem entre si.",
    callout: {
      tipo: "warning",
      titulo: "Evite brigar com o CSS",
      texto:
        "Quando a especificidade fica alta demais, pequenos ajustes exigem seletores cada vez mais complexos. Prefira classes simples e reutilizáveis.",
    },
    topicos: [
      "Seletores de elemento afetam todas as tags daquele tipo",
      "Classes são boas para estilos reutilizáveis",
      "IDs têm especificidade alta e devem ser usados com cuidado",
      "A regra mais específica vence quando há conflito",
    ],
    codigo: `.card {
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.card-destaque {
  border-color: #3b82f6;
  background: #eff6ff;
}`,
    linguagem: "css",
    conclusao:
      "Use seletores simples e nomes claros. Isso torna o CSS mais fácil de revisar, reaproveitar e evoluir.",
  },

  "fw-3-1": {
    titulo: "Variáveis e Tipos",
    intro:
      "JavaScript permite guardar valores em variáveis e trabalhar com tipos como string, number, boolean, array e object.",
    callout: {
      tipo: "info",
      titulo: "Use const por padrão",
      texto:
        "Declare com const quando o valor não precisa ser reatribuído. Use let apenas quando a variável realmente mudar.",
    },
    topicos: [
      "String representa texto",
      "Number representa valores numéricos",
      "Boolean representa verdadeiro ou falso",
      "Objetos agrupam dados relacionados",
    ],
    codigo: `const nome = "Ana";
const idade = 24;
const estudando = true;

const perfil = {
  nome,
  idade,
  estudando,
};

console.log(perfil.nome);`,
    linguagem: "javascript",
    conclusao:
      "Variáveis bem nomeadas deixam o código mais legível. A próxima aula usa esses valores dentro de funções.",
  },

  "fw-4-1": {
    titulo: "CSS Grid",
    intro:
      "CSS Grid é ideal para layouts em duas dimensões, controlando linhas e colunas com precisão sem depender de hacks.",
    callout: {
      tipo: "success",
      titulo: "Grid para estrutura",
      texto:
        "Use Grid para a estrutura principal da página e Flexbox para alinhar itens dentro de componentes menores.",
    },
    topicos: [
      "grid-template-columns define as colunas",
      "gap controla o espaço entre itens",
      "repeat e minmax ajudam na responsividade",
      "Auto-fit cria grids flexíveis com pouco CSS",
    ],
    codigo: `.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}`,
    linguagem: "css",
    conclusao:
      "Com Grid, você cria layouts responsivos com menos código e mais previsibilidade. Em seguida, combine isso com media queries.",
  },

  // React Moderno
  "1-1": {
    titulo: "O que é React?",
    intro:
      "React é uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuário. Ela permite criar componentes reutilizáveis que gerenciam seu próprio estado.",
    callout: {
      tipo: "info",
      titulo: "Pré-requisitos",
      texto:
        "Antes de começar, certifique-se de ter conhecimento básico de JavaScript, HTML e CSS.",
    },
    topicos: [
      "Componentes — blocos de construção da UI",
      "Props — dados passados entre componentes",
      "Estado (State) — dados que mudam ao longo do tempo",
      "Hooks — funções especiais do React",
    ],
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
    conclusao:
      "Agora você conhece os conceitos básicos do React. No próximo tópico, vamos explorar JSX e como criar componentes mais complexos.",
  },

  "1-2": {
    titulo: "JSX e Componentes",
    intro:
      "JSX é uma extensão de sintaxe do JavaScript que permite escrever HTML dentro do JavaScript. É a forma padrão de descrever a interface no React.",
    callout: {
      tipo: "info",
      titulo: "JSX não é HTML",
      texto:
        "Apesar de parecer HTML, JSX é transformado em chamadas JavaScript pelo compilador. Use className em vez de class, por exemplo.",
    },
    topicos: [
      "JSX — sintaxe declarativa para UI",
      "Expressões JavaScript dentro de {}",
      "Componentes funcionais",
      "Composição de componentes",
    ],
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
    conclusao:
      "Com JSX você consegue criar interfaces de forma declarativa e intuitiva. Pratique criando seus próprios componentes no exercício a seguir.",
  },

  "2-1": {
    titulo: "useState",
    intro:
      "O hook useState permite adicionar estado a componentes funcionais. Antes dos hooks, apenas componentes de classe podiam ter estado.",
    callout: {
      tipo: "info",
      titulo: "Regra dos Hooks",
      texto:
        "Sempre chame hooks no nível superior do componente — nunca dentro de loops, condicionais ou funções aninhadas.",
    },
    topicos: [
      "Declarando estado com useState",
      "Lendo o valor do estado",
      "Atualizando o estado",
      "Estado com objetos e arrays",
    ],
    codigo: `import { useState } from 'react';

function Contador() {
  // [valorAtual, funcaoDeAtualização] = useState(valorInicial)
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
      <button onClick={() => setCount(0)}>Resetar</button>
    </div>
  );
}`,
    linguagem: "jsx",
    conclusao:
      "useState é o hook mais usado no React. Pratique com o exercício de gerenciamento de estado para fixar o conceito.",
  },

  "2-2": {
    titulo: "useEffect",
    intro:
      "O hook useEffect permite executar efeitos colaterais em componentes funcionais — como buscar dados, manipular o DOM ou configurar assinaturas.",
    callout: {
      tipo: "warning",
      titulo: "Cuidado com loops infinitos",
      texto:
        "Sempre especifique as dependências do useEffect. Um array vazio [] executa apenas na montagem. Sem array, executa em todo render.",
    },
    topicos: [
      "Executando efeitos após o render",
      "Array de dependências",
      "Limpeza de efeitos (cleanup)",
      "Buscando dados com useEffect",
    ],
    codigo: `import { useState, useEffect } from 'react';

function Relogio() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Cleanup: limpa o intervalo quando o componente desmonta
    return () => clearInterval(intervalo);
  }, []); // [] = executa só na montagem

  return <p>Hora atual: {hora.toLocaleTimeString()}</p>;
}`,
    linguagem: "jsx",
    conclusao:
      "useEffect é essencial para sincronizar componentes com sistemas externos. Pratique com o exercício de gerenciamento de estado.",
  },

  "3-1": {
    titulo: "Criando Contextos",
    intro:
      "A Context API resolve o problema de prop drilling — passar dados por muitos níveis de componentes. Com ela, você compartilha dados globalmente sem passar props manualmente.",
    callout: {
      tipo: "info",
      titulo: "Quando usar Context?",
      texto:
        "Use Context para dados verdadeiramente globais como tema, idioma ou usuário autenticado. Para estado local, prefira useState.",
    },
    topicos: [
      "Criando um contexto com createContext",
      "Provider — fornecendo o valor",
      "Consumer — consumindo o valor",
      "Boas práticas de organização",
    ],
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
    conclusao:
      "Agora você sabe criar contextos. No próximo tópico, aprenderemos a consumi-los com o hook useContext.",
  },
};

/** Retorna o conteúdo de um tópico. Usa fallback genérico se não houver conteúdo específico. */
export function getConteudo(
  moduloId: string,
  topicoIndex: number,
  tituloTopico: string
): ConteudoTopico {
  const chave = `${moduloId}-${topicoIndex + 1}`;
  if (conteudoPorTopico[chave]) return conteudoPorTopico[chave];

  return {
    titulo: tituloTopico,
    intro: `Neste tópico você vai aprender sobre ${tituloTopico}. Acompanhe o conteúdo e pratique com os exercícios.`,
    topicos: [
      "Conceitos fundamentais",
      "Exemplos práticos",
      "Boas práticas",
      "Casos de uso reais",
    ],
    codigo: `// Exemplo de código para ${tituloTopico}\nconsole.log("Olá, EstudaCode!");`,
    linguagem: "javascript",
    conclusao: `Você concluiu o tópico ${tituloTopico}. Continue para o próximo tópico para aprofundar seu conhecimento.`,
  };
}
