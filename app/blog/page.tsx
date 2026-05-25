import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata = {
  title: "Blog",
};

const posts = [
  {
    slug: "react-hooks-guia-completo",
    titulo: "Guia Completo de React Hooks em 2026",
    descricao: "Aprenda todos os hooks do React — useState, useEffect, useContext, useReducer e mais — com exemplos práticos e casos de uso reais.",
    categoria: "React",
    tempo: "8 min",
    data: "20 Mai 2026",
    cor: "bg-blue-500/10 text-blue-400",
  },
  {
    slug: "typescript-generics-na-pratica",
    titulo: "TypeScript Generics na Prática",
    descricao: "Entenda generics de uma vez por todas com exemplos do mundo real. Do básico ao avançado, sem enrolação.",
    categoria: "TypeScript",
    tempo: "6 min",
    data: "15 Mai 2026",
    cor: "bg-purple-500/10 text-purple-400",
  },
  {
    slug: "nextjs-server-components",
    titulo: "Server Components: O que Mudou no Next.js 14",
    descricao: "Entenda a diferença entre Server e Client Components, quando usar cada um e como isso afeta a performance da sua aplicação.",
    categoria: "Next.js",
    tempo: "10 min",
    data: "10 Mai 2026",
    cor: "bg-yellow-500/10 text-yellow-400",
  },
  {
    slug: "css-grid-vs-flexbox",
    titulo: "CSS Grid vs Flexbox: Quando Usar Cada Um",
    descricao: "A dúvida mais comum de quem está aprendendo CSS. Veja a diferença prática com exemplos visuais e saiba quando aplicar cada técnica.",
    categoria: "CSS",
    tempo: "5 min",
    data: "5 Mai 2026",
    cor: "bg-pink-500/10 text-pink-400",
  },
  {
    slug: "nodejs-api-rest-boas-praticas",
    titulo: "Boas Práticas para APIs REST com Node.js",
    descricao: "Estrutura de pastas, validação, tratamento de erros, autenticação e documentação — tudo que você precisa para uma API profissional.",
    categoria: "Node.js",
    tempo: "12 min",
    data: "1 Mai 2026",
    cor: "bg-green-500/10 text-green-400",
  },
  {
    slug: "como-montar-portfolio-dev",
    titulo: "Como Montar um Portfólio que Impressiona Recrutadores",
    descricao: "Dicas práticas de quem já contratou desenvolvedores: o que colocar, o que evitar e como apresentar seus projetos da melhor forma.",
    categoria: "Carreira",
    tempo: "7 min",
    data: "25 Abr 2026",
    cor: "bg-orange-500/10 text-orange-400",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Blog</h1>
            <p className="text-xl text-secondary">Artigos práticos sobre desenvolvimento web, carreira e tecnologia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.cor}`}>
                      {post.categoria}
                    </span>
                    <div className="flex items-center space-x-1 text-secondary text-xs">
                      <Clock size={12} />
                      <span>{post.tempo}</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold text-text mb-2 flex-1">{post.titulo}</h2>
                  <p className="text-secondary text-sm mb-4 line-clamp-2">{post.descricao}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-secondary text-xs">{post.data}</span>
                    <span className="text-primary text-sm flex items-center space-x-1 hover:space-x-2 transition-all">
                      <span>Ler</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
