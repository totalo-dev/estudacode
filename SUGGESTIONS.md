# 💡 Sugestões de Melhoria — EstudaCode

> Documento sincronizado com o estado real do projeto em **Maio 2026**.
> Cada item foi verificado diretamente no código-fonte antes de ser registrado.
> Legenda de status: 🔴 Não iniciado · 🟡 Parcial · ✅ Concluído

---

## Índice

1. [Bugs Confirmados](#1-bugs-confirmados)
2. [Funcionalidades Incompletas](#2-funcionalidades-incompletas)
3. [Melhorias de UX](#3-melhorias-de-ux)
4. [Qualidade de Código](#4-qualidade-de-código)
5. [Infraestrutura e SEO](#5-infraestrutura-e-seo)
6. [Funcionalidades Futuras](#6-funcionalidades-futuras)
7. [Resumo por Prioridade](#7-resumo-por-prioridade)

---

## 1. Bugs Confirmados

Problemas verificados no código que causam comportamento incorreto ou erro de TypeScript.

---

### BUG-01 — `EmptyState` chamado sem a prop obrigatória `icon`

**Status:** 🔴 Não corrigido
**Arquivo:** `app/(platform)/busca/page.tsx` (linha ~107)
**Severidade:** Alta — erro de TypeScript em tempo de compilação

**Problema:**
O componente `EmptyState` define `icon` como prop obrigatória (`icon: LucideIcon`), mas a página de busca o chama sem passar essa prop:

```tsx
// ❌ Como está — falta a prop icon
<EmptyState
  title="Nenhum resultado"
  description={`Não encontramos nada para "${query}". Tente outros termos.`}
/>
```

**Solução A — Passar o ícone na chamada:**
```tsx
import { SearchX } from "lucide-react";

<EmptyState
  icon={SearchX}
  title="Nenhum resultado"
  description={`Não encontramos nada para "${query}". Tente outros termos.`}
/>
```

**Solução B — Tornar `icon` opcional no componente:**
```tsx
// components/ui/EmptyState.tsx
interface EmptyStateProps {
  icon?: LucideIcon; // opcional
  ...
}

export default function EmptyState({ icon: Icon, ... }: EmptyStateProps) {
  return (
    <div ...>
      {Icon && (
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
          <Icon className="text-secondary" size={32} />
        </div>
      )}
      ...
    </div>
  );
}
```

---

### BUG-02 — Busca no header do `DashboardLayout` não funciona

**Status:** 🔴 Não corrigido
**Arquivo:** `components/layout/DashboardLayout.tsx` (linha ~18)
**Severidade:** Média — cria expectativa falsa para o usuário

**Problema:**
O campo de busca no header está presente em todas as páginas da plataforma, mas não tem nenhum handler — digitar qualquer coisa não faz nada.

```tsx
// ❌ Como está — input sem funcionalidade
<input
  type="text"
  placeholder="Buscar trilhas, projetos..."
  className="..."
/>
```

**Solução — Redirecionar para `/busca` ao pressionar Enter:**
```tsx
"use client"; // já tem
import { useRouter } from "next/navigation";

const router = useRouter();

<input
  type="text"
  placeholder="Buscar trilhas, projetos..."
  onKeyDown={(e) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      router.push(`/busca?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
    }
  }}
  className="..."
/>
```

> Requer também que a página `/busca` leia o parâmetro `q` da URL (ver SUG-07).

---

### BUG-03 — Botões "Finalizar Quiz", "Revisar Respostas" e "Continuar Aprendendo" sem ação

**Status:** 🔴 Não corrigido
**Arquivo:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/quiz/page.tsx` (linhas ~100–115)
**Severidade:** Média — fluxo do usuário quebrado ao terminar o quiz

**Problema:**
Três botões na tela de resultado do quiz não têm `onClick` definido:

```tsx
// ❌ Como está
<Button variant="primary">Finalizar Quiz</Button>
<Button variant="outline">Revisar Respostas</Button>
<Button variant="primary">Continuar Aprendendo</Button>
```

**Solução mínima:**
```tsx
// Finalizar Quiz — redirecionar para a trilha
<Button variant="primary" onClick={() => router.push(`/trilhas/${params.slug}`)}>
  Finalizar Quiz
</Button>

// Revisar Respostas — resetar para questão 0 em modo leitura
const [reviewMode, setReviewMode] = useState(false);
<Button variant="outline" onClick={() => { setCurrentQuestion(0); setReviewMode(true); }}>
  Revisar Respostas
</Button>

// Continuar Aprendendo — redirecionar para próximo tópico
<Button variant="primary" onClick={() => router.push(`/trilhas/${params.slug}`)}>
  Continuar Aprendendo
</Button>
```

---

### BUG-04 — Filtros de dificuldade em `/trilhas` e `/projetos` são puramente visuais

**Status:** 🔴 Não corrigido
**Arquivos:** `app/(platform)/trilhas/page.tsx` · `app/(platform)/projetos/page.tsx`
**Severidade:** Média — UX enganosa; o usuário clica e nada acontece

**Problema:**
Os badges de filtro são elementos estáticos sem estado ou handler:

```tsx
// ❌ Como está — sem interatividade
<Badge variant="primary">Todas</Badge>
<Badge variant="default">Iniciante</Badge>
```

**Solução para `/trilhas`:**
```tsx
"use client";
import { useState } from "react";
import { Difficulty } from "@/lib/types";

type Filtro = "todas" | Difficulty;

export default function TrilhasPage() {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const trilhasFiltradas = filtro === "todas"
    ? trilhas
    : trilhas.filter(t => t.dificuldade === filtro);

  const opcoes: { label: string; value: Filtro }[] = [
    { label: "Todas", value: "todas" },
    { label: "Iniciante", value: "iniciante" },
    { label: "Intermediário", value: "intermediario" },
    { label: "Avançado", value: "avancado" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center space-x-4">
        {opcoes.map(({ label, value }) => (
          <button key={value} onClick={() => setFiltro(value)}>
            <Badge variant={filtro === value ? "primary" : "default"}>
              {label}
            </Badge>
          </button>
        ))}
      </div>
      <div className="grid ...">
        {trilhasFiltradas.map(trilha => <TrilhaCard key={trilha.id} trilha={trilha} />)}
      </div>
    </DashboardLayout>
  );
}
```

> Aplicar lógica equivalente em `/projetos` (filtros: Todos, Em Andamento, Concluídos).

---

## 2. Funcionalidades Incompletas

Páginas e componentes que existem mas têm partes não implementadas.

---

### INC-01 — Página de módulo (`/trilhas/[slug]/modulos/[id]`) não existe

**Status:** 🔴 Não iniciado
**Arquivo a criar:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/page.tsx`
**Impacto:** Médio — sem essa página, não há overview do módulo antes de entrar no conteúdo

**Situação atual:**
A rota `/trilhas/[slug]/modulos/[id]` não tem `page.tsx`. Se o usuário acessar essa URL diretamente, o Next.js retorna 404.

**Sugestão de conteúdo:**
- Título e descrição do módulo
- Lista de tópicos com status (concluído/pendente)
- Botão "Começar" ou "Continuar"
- Progresso do módulo

---

### INC-02 — Busca não lê parâmetro `q` da URL

**Status:** 🔴 Não iniciado
**Arquivo:** `app/(platform)/busca/page.tsx`
**Impacto:** Médio — impossível compartilhar ou bookmarkar uma busca

**Situação atual:**
A busca usa `useState` local. A URL `/busca` nunca muda, independente do que for digitado.

**Solução com `searchParams`:**
```tsx
// app/(platform)/busca/page.tsx
import { useSearchParams, useRouter } from "next/navigation";

const searchParams = useSearchParams();
const router = useRouter();
const [query, setQuery] = useState(searchParams.get("q") ?? "");

// Atualizar URL ao digitar (debounced)
useEffect(() => {
  const timeout = setTimeout(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.replace(`/busca?${params.toString()}`, { scroll: false });
  }, 300);
  return () => clearTimeout(timeout);
}, [query, router]);
```

---

### INC-03 — Sino de notificações sem dropdown

**Status:** 🔴 Não iniciado
**Arquivo:** `components/layout/DashboardLayout.tsx`
**Impacto:** Baixo — mas o badge vermelho cria expectativa

**Situação atual:**
```tsx
<button aria-label="Notificações">
  <Bell size={20} />
  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
</button>
```
O badge vermelho indica notificação pendente, mas clicar não faz nada.

**Solução mínima:** Remover o badge até a funcionalidade ser implementada.
**Solução completa:** Dropdown com lista de notificações mockadas.

---

### INC-04 — Avatar e username no header/sidebar são hardcoded

**Status:** 🔴 Não iniciado
**Arquivos:** `components/layout/DashboardLayout.tsx` · `components/layout/Sidebar.tsx`
**Impacto:** Baixo agora, alto após autenticação

**Situação atual:**
```tsx
// DashboardLayout.tsx — inicial hardcoded
<div ...>U</div>

// Sidebar.tsx — username hardcoded
{ name: "Perfil", href: "/perfil/usuario", icon: User }
```

**Solução:** Criar um contexto de usuário ou usar o hook de sessão do NextAuth/Clerk após integração.

---

## 3. Melhorias de UX

Itens que funcionam, mas a experiência pode ser melhorada.

---

### UX-01 — Layout de conteúdo quebra em mobile

**Status:** 🔴 Não iniciado
**Arquivo:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/conteudo/page.tsx`
**Impacto:** Alto — a página de conteúdo é a mais importante da plataforma

**Situação atual:**
O layout usa `ml-64 mr-80` fixos, o que quebra em telas menores que ~1200px. A sidebar de módulos e o ToC ficam sobrepostos ao conteúdo.

**Solução:**
- Sidebar esquerda: colapsável com botão hamburger em mobile
- ToC direita: mover para dentro do conteúdo (abaixo do título) em mobile
- Usar breakpoints: `lg:ml-64 lg:mr-80` com fallback para tela cheia

---

### UX-02 — Página de perfil ignora o `username` da URL

**Status:** 🔴 Não iniciado
**Arquivo:** `app/(platform)/perfil/[username]/page.tsx`
**Impacto:** Baixo agora, mas inconsistente

**Situação atual:**
O parâmetro `params.username` é recebido mas nunca usado. A página sempre exibe "Usuário" independente da URL.

**Solução mínima:**
```tsx
export default function PerfilPage({ params }: { params: { username: string } }) {
  // Usar params.username para exibir o nome
  <h1>{params.username}</h1>
}
```

---

### UX-03 — Indicador de progresso ausente na Sidebar

**Status:** 🔴 Não iniciado
**Arquivo:** `components/layout/Sidebar.tsx`
**Impacto:** Médio — motivação visual constante para o aluno

**Sugestão:**
Abaixo de cada trilha em andamento na sidebar, exibir uma mini ProgressBar. Referência: Codecademy, Khan Academy.

```tsx
// Exemplo de item com progresso
<Link href="/trilhas/react-moderno">
  <span>React Moderno</span>
  <div className="w-full bg-card rounded-full h-1 mt-1">
    <div className="bg-primary h-1 rounded-full" style={{ width: "45%" }} />
  </div>
</Link>
```

---

### UX-04 — Sem feedback visual ao copiar código no `CodeBlock`

**Status:** 🔴 Não verificado
**Arquivo:** `components/content/CodeBlock.tsx`
**Impacto:** Baixo

**Sugestão:**
Após clicar em "Copiar", trocar o ícone/texto para "Copiado!" por 2 segundos antes de voltar ao estado original.

---

## 4. Qualidade de Código

Itens que não afetam o usuário diretamente, mas impactam manutenibilidade.

---

### COD-01 — Dados de exercícios e quiz hardcoded nas páginas

**Status:** 🔴 Não iniciado
**Arquivos:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/exercicios/[exercicioId]/page.tsx` · `quiz/page.tsx`
**Impacto:** Alto para escalabilidade de conteúdo

**Situação atual:**
As questões do quiz e os dados do exercício estão declarados diretamente dentro dos componentes de página, fora do padrão do projeto (que usa `data/`).

**Solução — criar `data/exercicios.ts` e `data/quizzes.ts`:**
```typescript
// data/quizzes.ts
import { QuizQuestion } from "@/lib/types";

export const quizzes: Record<string, QuizQuestion[]> = {
  "react-moderno-2": [ // chave: slug-trilha + moduloId
    {
      id: "1",
      pergunta: "O que o hook useState retorna?",
      opcoes: [...],
      respostaCorreta: 1,
      explicacao: "...",
    },
  ],
};
```

---

### COD-02 — `robots.ts` e `sitemap.ts` não existem

**Status:** 🔴 Não iniciado
**Localização:** `app/robots.ts` · `app/sitemap.ts`
**Impacto:** Alto para SEO em produção

**Situação atual:**
O `SUMMARY.md` anterior mencionava esses arquivos como implementados, mas eles **não existem** no projeto. Verificado com `Test-Path`.

**Solução:**
```typescript
// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://estudacode.com.br/sitemap.xml",
  };
}

// app/sitemap.ts
import { MetadataRoute } from "next";
import { trilhas } from "@/data/trilhas";

export default function sitemap(): MetadataRoute.Sitemap {
  const trilhaRoutes = trilhas.map(t => ({
    url: `https://estudacode.com.br/trilhas/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: "https://estudacode.com.br", priority: 1 },
    { url: "https://estudacode.com.br/trilhas", priority: 0.9 },
    { url: "https://estudacode.com.br/projetos", priority: 0.8 },
    ...trilhaRoutes,
  ];
}
```

---

### COD-03 — Páginas de plataforma são Server Components mas usam dados mockados síncronos

**Status:** 🟡 Aceitável agora, problema futuro
**Impacto:** Médio — ao migrar para backend, precisará de refatoração

**Situação atual:**
Páginas como `dashboard/page.tsx` e `trilhas/page.tsx` são Server Components que importam dados diretamente de `data/`. Isso é correto para o protótipo, mas ao integrar com Supabase, precisarão de `async/await` e tratamento de loading/error states.

**Sugestão:** Criar funções de acesso a dados em `lib/` que hoje retornam os dados mockados e futuramente farão fetch:
```typescript
// lib/data.ts
import { trilhas } from "@/data/trilhas";
import { Trilha } from "./types";

export async function getTrilhas(): Promise<Trilha[]> {
  // Futuramente: return supabase.from("trilhas").select("*")
  return trilhas;
}
```

---

### COD-04 — `Difficulty` type duplicado em `utils.ts`

**Status:** 🔴 Não iniciado
**Arquivo:** `lib/utils.ts`
**Impacto:** Baixo

**Situação atual:**
As funções `getDifficultyColor` e `getDifficultyLabel` usam cast manual `as keyof typeof colors` em vez de usar o tipo `Difficulty` já definido em `lib/types.ts`.

**Solução:**
```typescript
import { Difficulty } from "./types";

export function getDifficultyColor(difficulty: Difficulty): string {
  const colors: Record<Difficulty, string> = {
    iniciante: "text-success",
    intermediario: "text-primary",
    avancado: "text-orange-500",
  };
  return colors[difficulty] ?? "text-secondary";
}
```

---

## 5. Infraestrutura e SEO

---

### INF-01 — `robots.ts` e `sitemap.ts` ausentes

> Ver **COD-02** — mesmo item, listado aqui por relevância de SEO.

---

### INF-02 — CSP bloqueia recursos em produção

**Status:** 🟡 Atenção necessária antes do deploy
**Arquivo:** `next.config.js`
**Impacto:** Alto em produção

**Situação atual:**
O CSP atual usa `'unsafe-inline'` e `'unsafe-eval'` para scripts. O comentário no código já avisa:
```js
"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval necessário para Next.js dev; remover em prod se possível
```

**Ação necessária antes do deploy:**
- Remover `'unsafe-eval'` em produção
- Adicionar nonces ou hashes para scripts inline
- Testar com `Content-Security-Policy-Report-Only` antes de enforçar

---

### INF-03 — Sem variáveis de ambiente configuradas

**Status:** 🔴 Não iniciado
**Impacto:** Bloqueante para qualquer integração com backend

**Situação atual:**
Não existe `.env.local` nem `.env.example` no projeto. Ao integrar autenticação ou banco de dados, as variáveis precisarão ser documentadas.

**Sugestão:** Criar `.env.example` (sem valores reais) para documentar as variáveis necessárias:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# NextAuth.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

---

## 6. Funcionalidades Futuras

Itens que não existem ainda e representam evolução do produto.

---

### FUT-01 — Autenticação real

**Status:** 🔴 Não iniciado
**Esforço:** Alto
**Impacto:** Muito Alto — sem isso, a plataforma não tem valor real

**Situação atual:**
As páginas de login, cadastro e recuperação de senha têm UI completa com `setTimeout` simulando a chamada. Os comentários no código indicam: *"Autenticação será implementada com NextAuth.js ou Clerk"*.

**Recomendação:** Clerk é a opção mais rápida (componentes prontos, OAuth configurado em minutos). NextAuth.js oferece mais controle mas requer mais configuração.

---

### FUT-02 — Persistência de progresso

**Status:** 🔴 Não iniciado
**Esforço:** Alto
**Impacto:** Muito Alto

O progresso hoje é hardcoded nos dados mockados (`progresso: 45` em `data/trilhas.ts`). Sem persistência, o aluno perde todo o progresso ao recarregar a página.

---

### FUT-03 — Modo de revisão do quiz

**Status:** 🔴 Não iniciado
**Esforço:** Baixo
**Impacto:** Médio

Após finalizar o quiz, o botão "Revisar Respostas" existe mas não faz nada (ver BUG-03). A estrutura de estado já suporta revisão — falta apenas renderizar todas as questões em modo read-only com as respostas marcadas.

---

### FUT-04 — `sitemap.ts` e `robots.ts`

> Ver **COD-02**.

---

### FUT-05 — Página de overview do módulo

> Ver **INC-01**.

---

### FUT-06 — Busca com URL params

> Ver **INC-02**.

---

## 7. Resumo por Prioridade

### 🔴 Crítico — Corrigir antes de qualquer release

| ID | Descrição | Arquivo | Esforço |
|---|---|---|---|
| BUG-01 | `EmptyState` sem prop `icon` obrigatória | `busca/page.tsx` | 5 min |
| BUG-03 | Botões do quiz sem `onClick` | `quiz/page.tsx` | 30 min |
| BUG-04 | Filtros de trilhas/projetos não funcionam | `trilhas/page.tsx`, `projetos/page.tsx` | 1h |
| COD-02 | `robots.ts` e `sitemap.ts` ausentes | `app/` | 30 min |

### 🟡 Alta — Impacto direto na experiência

| ID | Descrição | Arquivo | Esforço |
|---|---|---|---|
| BUG-02 | Busca no header sem funcionalidade | `DashboardLayout.tsx` | 30 min |
| INC-02 | Busca não usa URL params | `busca/page.tsx` | 1h |
| INC-03 | Sino de notificações com badge falso | `DashboardLayout.tsx` | 15 min |
| UX-01 | Layout de conteúdo quebra em mobile | `conteudo/page.tsx` | 3h |
| COD-01 | Dados de quiz/exercício hardcoded nas páginas | `quiz/page.tsx`, `exercicios/page.tsx` | 2h |

### 🟢 Média — Qualidade e completude

| ID | Descrição | Arquivo | Esforço |
|---|---|---|---|
| INC-01 | Página de overview do módulo ausente | criar `modulos/[id]/page.tsx` | 2h |
| INC-04 | Avatar/username hardcoded | `DashboardLayout.tsx`, `Sidebar.tsx` | 1h |
| UX-02 | Perfil ignora `username` da URL | `perfil/[username]/page.tsx` | 30 min |
| UX-03 | Sem progresso na Sidebar | `Sidebar.tsx` | 1h |
| COD-03 | Dados mockados acoplados às páginas | `lib/data.ts` (criar) | 2h |
| COD-04 | Tipo `Difficulty` não usado em `utils.ts` | `lib/utils.ts` | 15 min |
| INF-03 | Sem `.env.example` | raiz do projeto | 15 min |

### 🔵 Futuro — Evolução do produto

| ID | Descrição | Esforço |
|---|---|---|
| FUT-01 | Autenticação real (NextAuth.js ou Clerk) | Alto |
| FUT-02 | Persistência de progresso (Supabase) | Alto |
| FUT-03 | Modo de revisão do quiz | Baixo |
| INF-02 | Revisar CSP para produção | Médio |

---

**Criado em:** Maio 2026
**Sincronizado com:** Estado real do código-fonte (verificado arquivo a arquivo)
**Próxima revisão:** Após implementação dos itens críticos
