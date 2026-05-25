import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import CodeBlock from "@/components/content/CodeBlock";
import Callout from "@/components/content/Callout";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<string, {
  titulo: string;
  descricao: string;
  categoria: string;
  tempo: string;
  data: string;
  cor: string;
  conteudo: React.ReactNode;
}> = {
  "react-hooks-guia-completo": {
    titulo: "Guia Completo de React Hooks em 2026",
    descricao: "Aprenda todos os hooks do React — useState, useEffect, useContext, useReducer e mais — com exemplos práticos e casos de uso reais.",
    categoria: "React",
    tempo: "8 min",
    data: "20 Mai 2026",
    cor: "bg-blue-500/10 text-blue-400",
    conteudo: null,
  },
  "typescript-generics-na-pratica": {
    titulo: "TypeScript Generics na Prática",
    descricao: "Entenda generics de uma vez por todas com exemplos do mundo real. Do básico ao avançado, sem enrolação.",
    categoria: "TypeScript",
    tempo: "6 min",
    data: "15 Mai 2026",
    cor: "bg-purple-500/10 text-purple-400",
    conteudo: null,
  },
  "nextjs-server-components": {
    titulo: "Server Components: O que Mudou no Next.js 14",
    descricao: "Entenda a diferença entre Server e Client Components, quando usar cada um e como isso afeta a performance da sua aplicação.",
    categoria: "Next.js",
    tempo: "10 min",
    data: "10 Mai 2026",
    cor: "bg-yellow-500/10 text-yellow-400",
    conteudo: null,
  },
  "css-grid-vs-flexbox": {
    titulo: "CSS Grid vs Flexbox: Quando Usar Cada Um",
    descricao: "A dúvida mais comum de quem está aprendendo CSS. Veja a diferença prática com exemplos visuais e saiba quando aplicar cada técnica.",
    categoria: "CSS",
    tempo: "5 min",
    data: "5 Mai 2026",
    cor: "bg-pink-500/10 text-pink-400",
    conteudo: null,
  },
  "nodejs-api-rest-boas-praticas": {
    titulo: "Boas Práticas para APIs REST com Node.js",
    descricao: "Estrutura de pastas, validação, tratamento de erros, autenticação e documentação — tudo que você precisa para uma API profissional.",
    categoria: "Node.js",
    tempo: "12 min",
    data: "1 Mai 2026",
    cor: "bg-green-500/10 text-green-400",
    conteudo: null,
  },
  "como-montar-portfolio-dev": {
    titulo: "Como Montar um Portfólio que Impressiona Recrutadores",
    descricao: "Dicas práticas de quem já contratou desenvolvedores: o que colocar, o que evitar e como apresentar seus projetos da melhor forma.",
    categoria: "Carreira",
    tempo: "7 min",
    data: "25 Abr 2026",
    cor: "bg-orange-500/10 text-orange-400",
    conteudo: null,
  },
};

// Conteúdo completo do post mais popular como exemplo
const conteudoReactHooks = (
  <article className="space-y-6 text-secondary leading-relaxed">
    <p className="text-lg text-text">
      Os hooks revolucionaram o React em 2019 e continuam sendo a base de qualquer aplicação moderna. Neste guia, vamos cobrir todos os hooks essenciais com exemplos práticos.
    </p>

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">useState — Gerenciando Estado Local</h2>
    <p>O hook mais usado. Permite adicionar estado a componentes funcionais.</p>
    <CodeBlock language="jsx" code={`import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}`} />

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">useEffect — Efeitos Colaterais</h2>
    <p>Usado para sincronizar componentes com sistemas externos: APIs, timers, subscriptions.</p>
    <Callout type="warning" title="Atenção">
      Sempre especifique as dependências. Um array vazio [] executa apenas na montagem. Sem array, executa em todo render.
    </Callout>
    <CodeBlock language="jsx" code={`import { useState, useEffect } from 'react';

function Usuario({ id }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(\`/api/usuarios/\${id}\`)
      .then(r => r.json())
      .then(setUsuario);
  }, [id]); // Re-executa quando id muda

  if (!usuario) return <p>Carregando...</p>;
  return <p>{usuario.nome}</p>;
}`} />

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">useContext — Estado Global</h2>
    <p>Consome valores de um Context sem prop drilling.</p>
    <CodeBlock language="jsx" code={`import { useContext } from 'react';
import { TemaContext } from './TemaContext';

function Botao() {
  const { tema, toggleTema } = useContext(TemaContext);

  return (
    <button onClick={toggleTema}>
      Tema atual: {tema}
    </button>
  );
}`} />

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">useReducer — Estado Complexo</h2>
    <p>Alternativa ao useState para lógica de estado mais complexa, similar ao Redux.</p>
    <CodeBlock language="jsx" code={`import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incrementar': return { count: state.count + 1 };
    case 'decrementar': return { count: state.count - 1 };
    case 'resetar':     return { count: 0 };
    default: return state;
  }
}

function Contador() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'incrementar' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrementar' })}>-</button>
      <button onClick={() => dispatch({ type: 'resetar' })}>Reset</button>
    </div>
  );
}`} />

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">useMemo e useCallback — Performance</h2>
    <p>Evitam recálculos e recriações desnecessárias em renders.</p>
    <CodeBlock language="jsx" code={`import { useMemo, useCallback } from 'react';

function Lista({ itens, onSelecionar }) {
  // Recalcula apenas quando itens muda
  const itensFiltrados = useMemo(
    () => itens.filter(i => i.ativo),
    [itens]
  );

  // Recria apenas quando onSelecionar muda
  const handleClick = useCallback(
    (id) => onSelecionar(id),
    [onSelecionar]
  );

  return itensFiltrados.map(item => (
    <div key={item.id} onClick={() => handleClick(item.id)}>
      {item.nome}
    </div>
  ));
}`} />

    <Callout type="info" title="Dica de Performance">
      Não use useMemo e useCallback em tudo — só quando há cálculos pesados ou quando componentes filhos dependem de referência estável.
    </Callout>

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">useRef — Referências e Valores Mutáveis</h2>
    <CodeBlock language="jsx" code={`import { useRef, useEffect } from 'react';

function InputFoco() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Foca no input ao montar
  }, []);

  return <input ref={inputRef} placeholder="Foco automático" />;
}`} />

    <h2 className="text-2xl font-bold text-text mt-10 mb-4">Conclusão</h2>
    <p>
      Dominar hooks é essencial para escrever React moderno. Comece com useState e useEffect, depois avance para useContext e useReducer conforme a complexidade do projeto crescer.
    </p>
    <p>
      Quer praticar? Acesse a trilha <strong className="text-text">React Moderno</strong> na EstudaCode e resolva os exercícios de hooks.
    </p>
  </article>
);

// Conteúdo genérico para os outros posts
function conteudoGenerico(post: { titulo: string; descricao: string; categoria: string }) {
  return (
    <article className="space-y-6 text-secondary leading-relaxed">
      <p className="text-lg text-text">{post.descricao}</p>
      <Callout type="info" title="Artigo em breve">
        Este artigo completo está sendo escrito pela equipe EstudaCode. Volte em breve para ler o conteúdo completo sobre {post.categoria}.
      </Callout>
      <p>
        Enquanto isso, explore as trilhas da plataforma para aprender {post.categoria} na prática com exercícios e projetos reais.
      </p>
    </article>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: "Post não encontrado" };
  return {
    title: post.titulo,
    description: post.descricao,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  const slugs = Object.keys(posts);
  const idx = slugs.indexOf(params.slug);
  const anterior = idx > 0 ? slugs[idx - 1] : null;
  const proximo = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  const conteudo = params.slug === "react-hooks-guia-completo"
    ? conteudoReactHooks
    : conteudoGenerico(post);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Voltar */}
          <Link href="/blog" className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors mb-10 text-sm">
            <ArrowLeft size={16} />
            <span>Voltar para o Blog</span>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.cor} mb-4 inline-block`}>
              {post.categoria}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-4 leading-tight">
              {post.titulo}
            </h1>
            <p className="text-secondary text-lg mb-6">{post.descricao}</p>
            <div className="flex items-center space-x-4 text-secondary text-sm">
              <div className="flex items-center space-x-1.5">
                <Calendar size={14} />
                <span>{post.data}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock size={14} />
                <span>{post.tempo} de leitura</span>
              </div>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-t border-card mb-10" />

          {/* Conteúdo */}
          {conteudo}

          {/* Divisor */}
          <div className="border-t border-card mt-12 mb-8" />

          {/* Navegação entre posts */}
          <div className="flex justify-between gap-4">
            {anterior ? (
              <Link href={`/blog/${anterior}`} className="flex items-center space-x-2 text-secondary hover:text-text transition-colors text-sm group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Post anterior</span>
              </Link>
            ) : <div />}
            {proximo ? (
              <Link href={`/blog/${proximo}`} className="flex items-center space-x-2 text-secondary hover:text-text transition-colors text-sm group">
                <span>Próximo post</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center">
            <p className="text-text font-semibold mb-2">Quer praticar o que aprendeu?</p>
            <p className="text-secondary text-sm mb-4">Acesse as trilhas da EstudaCode e aprenda {post.categoria} com exercícios reais.</p>
            <Link href="/trilhas" className="inline-flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              <span>Ver Trilhas</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
