"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle, Circle, ExternalLink, Github, Trophy } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/progress/ProgressBar";
import { trilhas } from "@/data/trilhas";
import { modulos } from "@/data/modulos";

// Projetos por módulo — será substituído por banco de dados
const projetosPorModulo: Record<string, {
  titulo: string;
  descricao: string;
  objetivos: string[];
  requisitos: { id: string; texto: string }[];
  recursos: { label: string; href: string }[];
  dificuldade: "iniciante" | "intermediario" | "avancado";
}> = {
  "3": {
    titulo: "App com Context API",
    descricao: "Construa uma aplicação React completa que utiliza Context API para gerenciar estado global. O app deve ter tema claro/escuro, carrinho de compras ou lista de favoritos compartilhada entre componentes.",
    objetivos: [
      "Aplicar Context API em um projeto real",
      "Gerenciar estado global sem prop drilling",
      "Criar Provider e Consumer reutilizáveis",
      "Combinar múltiplos contextos",
    ],
    requisitos: [
      { id: "1", texto: "Criar pelo menos 2 contextos diferentes" },
      { id: "2", texto: "Implementar Provider com useState" },
      { id: "3", texto: "Consumir contexto com useContext em 3+ componentes" },
      { id: "4", texto: "Adicionar toggle de tema (claro/escuro)" },
      { id: "5", texto: "Persistir preferências no localStorage" },
      { id: "6", texto: "Código organizado em pastas (contexts/, components/)" },
    ],
    recursos: [
      { label: "Documentação Context API", href: "https://react.dev/reference/react/createContext" },
      { label: "useContext Hook", href: "https://react.dev/reference/react/useContext" },
    ],
    dificuldade: "intermediario",
  },
  "fw-4": {
    titulo: "Landing Page Completa",
    descricao: "Crie uma landing page responsiva do zero usando HTML, CSS Grid e Flexbox. A página deve ter seções de hero, features, depoimentos e footer, funcionando perfeitamente em mobile e desktop.",
    objetivos: [
      "Dominar CSS Grid e Flexbox",
      "Criar layouts responsivos com media queries",
      "Aplicar boas práticas de HTML semântico",
      "Otimizar para mobile-first",
    ],
    requisitos: [
      { id: "1", texto: "Seção hero com CTA" },
      { id: "2", texto: "Grid de features (3 colunas no desktop, 1 no mobile)" },
      { id: "3", texto: "Seção de depoimentos" },
      { id: "4", texto: "Footer com links" },
      { id: "5", texto: "Responsivo em mobile (< 768px)" },
      { id: "6", texto: "HTML semântico (header, main, section, footer)" },
    ],
    recursos: [
      { label: "CSS Grid Guide", href: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
      { label: "Flexbox Guide", href: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
    ],
    dificuldade: "iniciante",
  },
  "ts-3": {
    titulo: "SDK Tipado",
    descricao: "Desenvolva um SDK TypeScript para consumir uma API pública (como JSONPlaceholder ou PokeAPI). O SDK deve ser completamente tipado, com generics, utility types e tratamento de erros.",
    objetivos: [
      "Criar tipos complexos com generics",
      "Usar utility types (Partial, Pick, Omit, etc.)",
      "Implementar tratamento de erros tipado",
      "Documentar com JSDoc",
    ],
    requisitos: [
      { id: "1", texto: "Interface para todos os recursos da API" },
      { id: "2", texto: "Função genérica de fetch tipada" },
      { id: "3", texto: "Tipo de erro customizado" },
      { id: "4", texto: "Uso de pelo menos 3 utility types" },
      { id: "5", texto: "Testes básicos com exemplos de uso" },
      { id: "6", texto: "README com documentação" },
    ],
    recursos: [
      { label: "TypeScript Utility Types", href: "https://www.typescriptlang.org/docs/handbook/utility-types.html" },
      { label: "JSONPlaceholder API", href: "https://jsonplaceholder.typicode.com/" },
    ],
    dificuldade: "avancado",
  },
  "nj-3": {
    titulo: "App Full Stack com Next.js",
    descricao: "Construa uma aplicação full stack usando Next.js App Router, Server Actions e um banco de dados. O app deve ter CRUD completo de pelo menos um recurso.",
    objetivos: [
      "Usar Server Actions para mutações",
      "Implementar Route Handlers para API",
      "Integrar banco de dados com Prisma",
      "Aplicar validação com Zod",
    ],
    requisitos: [
      { id: "1", texto: "Pelo menos 1 Server Action funcional" },
      { id: "2", texto: "CRUD completo (criar, ler, atualizar, deletar)" },
      { id: "3", texto: "Validação de dados com Zod" },
      { id: "4", texto: "Loading e error states" },
      { id: "5", texto: "Deploy na Vercel" },
      { id: "6", texto: "README com instruções de setup" },
    ],
    recursos: [
      { label: "Server Actions Docs", href: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" },
      { label: "Prisma Getting Started", href: "https://www.prisma.io/docs/getting-started" },
    ],
    dificuldade: "avancado",
  },
  "nb-3": {
    titulo: "API REST com Autenticação",
    descricao: "Desenvolva uma API REST completa com Node.js, Express e Prisma. A API deve ter autenticação JWT, CRUD de usuários e pelo menos um recurso protegido.",
    objetivos: [
      "Implementar autenticação JWT",
      "Criar middleware de autorização",
      "Usar Prisma com PostgreSQL",
      "Documentar endpoints",
    ],
    requisitos: [
      { id: "1", texto: "Registro e login com JWT" },
      { id: "2", texto: "Middleware de autenticação" },
      { id: "3", texto: "CRUD de pelo menos 1 recurso protegido" },
      { id: "4", texto: "Validação com Zod" },
      { id: "5", texto: "Tratamento de erros centralizado" },
      { id: "6", texto: "Documentação dos endpoints (README ou Swagger)" },
    ],
    recursos: [
      { label: "JWT.io", href: "https://jwt.io/" },
      { label: "Express.js Docs", href: "https://expressjs.com/" },
    ],
    dificuldade: "intermediario",
  },
  "ds-3": {
    titulo: "Design System Completo",
    descricao: "Crie um design system do zero com React, Tailwind CSS e Storybook. O sistema deve ter tokens de design, componentes documentados e um guia de uso.",
    objetivos: [
      "Definir tokens de design (cores, tipografia, espaçamento)",
      "Criar componentes com variantes usando CVA",
      "Documentar com Storybook",
      "Publicar no npm (opcional)",
    ],
    requisitos: [
      { id: "1", texto: "Pelo menos 8 componentes (Button, Input, Card, Badge, etc.)" },
      { id: "2", texto: "Variantes com class-variance-authority" },
      { id: "3", texto: "Stories no Storybook para cada componente" },
      { id: "4", texto: "Tema customizável via CSS variables" },
      { id: "5", texto: "Acessibilidade (ARIA, focus states)" },
      { id: "6", texto: "README com guia de instalação e uso" },
    ],
    recursos: [
      { label: "Storybook Docs", href: "https://storybook.js.org/docs" },
      { label: "class-variance-authority", href: "https://cva.style/docs" },
    ],
    dificuldade: "avancado",
  },
};

const difficultyLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const difficultyVariant: Record<string, "default" | "primary" | "success"> = {
  iniciante: "success",
  intermediario: "primary",
  avancado: "default",
};

export default function ProjetoModuloPage({ params }: { params: { slug: string; moduloId: string } }) {
  const trilha = trilhas.find((t) => t.slug === params.slug);
  const trilhaModulos = modulos[params.slug] || [];
  const modulo = trilhaModulos.find((m) => m.id === params.moduloId);
  const projeto = projetosPorModulo[params.moduloId];

  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [concluido, setConcluido] = useState(false);

  const requisitos = projeto?.requisitos || [];
  const totalMarcados = requisitos.filter((r) => checklist[r.id]).length;
  const progresso = requisitos.length > 0 ? Math.round((totalMarcados / requisitos.length) * 100) : 0;

  function toggleItem(id: string) {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  if (!projeto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-secondary mb-4">Projeto não encontrado.</p>
          <Link href={`/trilhas/${params.slug}`} className="text-primary hover:underline">
            Voltar para trilha
          </Link>
        </div>
      </div>
    );
  }

  if (concluido) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
            <Trophy size={36} className="text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Projeto Concluído!</h1>
          <p className="text-secondary mb-8">{projeto.titulo} — {trilha?.nome}</p>
          <div className="bg-surface border border-card rounded-2xl p-6 mb-8">
            <p className="text-secondary text-sm">
              Parabéns! Você completou todos os requisitos do projeto. Adicione ao seu portfólio e compartilhe com a comunidade.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <Link href={`/trilhas/${params.slug}`}>
              <Button variant="primary" size="lg" className="w-full">
                Voltar para a Trilha
              </Button>
            </Link>
            <Link href="/projetos">
              <Button variant="outline" size="md" className="w-full">
                Ver Todos os Projetos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Voltar */}
        <Link href={`/trilhas/${params.slug}`} className="inline-flex items-center space-x-2 text-secondary hover:text-text mb-6 text-sm">
          <ChevronLeft size={20} />
          <span>Voltar para {trilha?.nome || "trilha"}</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge variant={difficultyVariant[projeto.dificuldade]}>
              {difficultyLabel[projeto.dificuldade]}
            </Badge>
            <span className="text-secondary text-sm">{modulo?.titulo}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">🏗️ {projeto.titulo}</h1>
          <p className="text-secondary leading-relaxed">{projeto.descricao}</p>
        </div>

        {/* Progresso */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text">Progresso do Projeto</span>
            <span className="text-sm text-secondary">{totalMarcados}/{requisitos.length} requisitos</span>
          </div>
          <ProgressBar value={progresso} showLabel />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">

            {/* Objetivos */}
            <Card>
              <h2 className="text-xl font-semibold text-text mb-4">🎯 Objetivos de Aprendizado</h2>
              <ul className="space-y-2">
                {projeto.objetivos.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm">
                    <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{obj}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Checklist de requisitos */}
            <Card>
              <h2 className="text-xl font-semibold text-text mb-4">✅ Requisitos</h2>
              <p className="text-secondary text-sm mb-4">Marque cada requisito conforme for implementando:</p>
              <ul className="space-y-3">
                {requisitos.map((req) => (
                  <li key={req.id}>
                    <button
                      onClick={() => toggleItem(req.id)}
                      className="flex items-start space-x-3 w-full text-left group"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors ${
                        checklist[req.id]
                          ? "bg-success border-success"
                          : "border-card group-hover:border-primary"
                      }`}>
                        {checklist[req.id] && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm transition-colors ${
                        checklist[req.id] ? "text-secondary line-through" : "text-text"
                      }`}>
                        {req.texto}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {progresso === 100 && (
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setConcluido(true)}
                  >
                    <Trophy size={18} className="mr-2" />
                    Marcar Projeto como Concluído
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Coluna lateral */}
          <div className="space-y-6">

            {/* Recursos */}
            <Card>
              <h2 className="text-lg font-semibold text-text mb-4">📚 Recursos Úteis</h2>
              <ul className="space-y-2">
                {projeto.recursos.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-primary hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>{r.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Dicas */}
            <Card>
              <h2 className="text-lg font-semibold text-text mb-3">💡 Dicas</h2>
              <ul className="space-y-2 text-sm text-secondary">
                <li>• Comece pelo mais simples e vá incrementando</li>
                <li>• Faça commits frequentes no Git</li>
                <li>• Consulte a documentação oficial quando travar</li>
                <li>• Compartilhe seu progresso na comunidade</li>
              </ul>
            </Card>

            {/* Compartilhar */}
            <Card>
              <h2 className="text-lg font-semibold text-text mb-3">🚀 Compartilhar</h2>
              <p className="text-secondary text-xs mb-3">Quando terminar, compartilhe seu projeto:</p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <Github size={16} className="mr-2" />
                  Publicar no GitHub
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
