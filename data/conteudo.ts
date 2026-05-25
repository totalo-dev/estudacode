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
