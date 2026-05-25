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
interface EmptyStateProps {
  icon?: LucideIcon;
  ...
}
```

---

### BUG-02 — Busca no header do `DashboardLayout` não funciona

**Status:** 🔴 Não corrigido  
**Arquivo:** `components/layout/DashboardLayout.tsx`  
**Severidade:** Média — cria expectativa falsa para o usuário

**Solução — Redirecionar para `/busca` ao pressionar Enter:**
```tsx
const router = useRouter();

<input
  type="text"
  placeholder="Buscar trilhas, projetos..."
  onKeyDown={(e) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      router.push(`/busca?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
    }
  }}
/>
```

---

### BUG-03 — Botões "Finalizar Quiz", "Revisar Respostas" e "Continuar Aprendendo" sem ação

**Status:** 🔴 Não corrigido  
**Arquivo:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/quiz/page.tsx`  
**Severidade:** Média — fluxo do usuário quebrado ao terminar o quiz

**Solução mínima:**
```tsx
<Button variant="primary" onClick={() => router.push(`/trilhas/${params.slug}`)}>
  Finalizar Quiz
</Button>
<Button variant="outline" onClick={() => { setCurrentQuestion(0); setReviewMode(true); }}>
  Revisar Respostas
</Button>
```

---

### BUG-04 — Filtros de dificuldade em `/trilhas` e `/projetos` são puramente visuais

**Status:** 🔴 Não corrigido  
**Arquivos:** `app/(platform)/trilhas/page.tsx` · `app/(platform)/projetos/page.tsx`  
**Severidade:** Média — UX enganosa

**Solução:**
```tsx
"use client";
const [filtro, setFiltro] = useState<"todas" | Difficulty>("todas");
const trilhasFiltradas = filtro === "todas" ? getTrilhas() : getTrilhasByDificuldade(filtro);
```

---

## 2. Funcionalidades Incompletas

---

### INC-01 — Página de módulo (`/trilhas/[slug]/modulos/[id]`) não existe

**Status:** 🔴 Não iniciado  
**Arquivo a criar:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/page.tsx`

**Sugestão de conteúdo:**
- Título e descrição do módulo
- Lista de tópicos com status (concluído/pendente)
- Botão "Começar" ou "Continuar"
- Progresso do módulo

---

### INC-02 — Busca não lê parâmetro `q` da URL

**Status:** 🔴 Não iniciado  
**Arquivo:** `app/(platform)/busca/page.tsx`

**Solução:**
```tsx
const searchParams = useSearchParams();
const [query, setQuery] = useState(searchParams.get("q") ?? "");

useEffect(() => {
  const timeout = setTimeout(() => {
    router.replace(`/busca?q=${encodeURIComponent(query)}`, { scroll: false });
  }, 300);
  return () => clearTimeout(timeout);
}, [query]);
```

---

### INC-03 — Sino de notificações sem dropdown

**Status:** 🔴 Não iniciado  
**Arquivo:** `components/layout/DashboardLayout.tsx`

**Solução mínima:** Remover o badge vermelho até a feature ser implementada.

---

### INC-04 — Avatar e username no header/sidebar são hardcoded

**Status:** 🔴 Não iniciado  
**Arquivos:** `components/layout/DashboardLayout.tsx` · `components/layout/Sidebar.tsx`  
**Solução:** Contexto de usuário ou hook de sessão após integração com NextAuth/Clerk.

---

## 3. Melhorias de UX

---

### UX-01 — Layout de conteúdo quebra em mobile

**Status:** 🔴 Não iniciado  
**Arquivo:** `app/(platform)/trilhas/[slug]/modulos/[moduloId]/conteudo/_components/ArticleContent.tsx`  
**Impacto:** Alto — é a página mais usada da plataforma

**Solução:**
- Sidebar esquerda: colapsável com hamburger em mobile
- ToC direita: mover para dentro do artigo em mobile
- Usar `lg:ml-64 xl:mr-72` como breakpoints (já aplicado no `main` do ArticleContent)

---

### UX-02 — Página de perfil ignora o `username` da URL

**Status:** 🔴 Não iniciado  
**Arquivo:** `app/(platform)/perfil/[username]/page.tsx`

---

### UX-03 — Indicador de progresso ausente na Sidebar

**Status:** 🔴 Não iniciado  
**Arquivo:** `components/layout/Sidebar.tsx`

---

### UX-04 — Sem feedback visual ao copiar código no `CodeBlock`

**Status:** 🔴 Não verificado  
**Arquivo:** `components/content/CodeBlock.tsx`

---

## 4. Qualidade de Código

---

### COD-01 — Dados de exercícios e quiz hardcoded nas páginas

**Status:** 🔴 Não iniciado  
**Arquivos:** `exercicios/[exercicioId]/page.tsx` · `quiz/page.tsx`

**Solução — criar `data/exercicios.ts` e `data/quizzes.ts`** e expor via serviço.

---

### COD-02 — `robots.ts` e `sitemap.ts` ausentes

**Status:** ✅ Concluído  
`app/sitemap.ts` e `app/robots.ts` implementados e funcionando.

---

### COD-03 — Dados mockados acoplados às páginas

**Status:** ✅ Concluído — Maio 2026  
Service Layer implementado em `lib/services/`. Todas as 14 páginas da plataforma importam exclusivamente via serviços. Nenhuma importação direta de `data/` nas páginas (verificado com grep).

---

### COD-04 — `Difficulty` type duplicado em `utils.ts`

**Status:** 🔴 Não iniciado  
**Arquivo:** `lib/utils.ts`

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

**Status:** ✅ Concluído — ver COD-02.

---

### INF-02 — CSP bloqueia recursos em produção

**Status:** 🟡 Atenção necessária antes do deploy  
**Arquivo:** `next.config.js`

O CSP atual usa `'unsafe-inline'` e `'unsafe-eval'`. Antes de ir para produção:
- Remover `'unsafe-eval'`
- Adicionar nonces ou hashes para scripts inline
- Testar com `Content-Security-Policy-Report-Only` antes de enforçar

---

### INF-03 — Sem variáveis de ambiente configuradas

**Status:** 🔴 Não iniciado  
**Impacto:** Bloqueante para qualquer integração com backend

**Criar `.env.example`:**
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

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

## 6. Funcionalidades Futuras

---

### FUT-01 — Autenticação real

**Status:** 🔴 Não iniciado · **Esforço:** Alto · **Impacto:** Muito Alto

**Recomendação:** Clerk (mais rápido) ou NextAuth.js (mais controle).

---

### FUT-02 — Persistência de progresso

**Status:** 🔴 Não iniciado · **Esforço:** Alto · **Impacto:** Muito Alto

O hook `useProgresso` já tem a interface preparada — basta substituir localStorage por chamadas à API.

---

### FUT-03 — Modo de revisão do quiz

**Status:** 🔴 Não iniciado · **Esforço:** Baixo · **Impacto:** Médio

A estrutura de estado já suporta — falta renderizar em modo read-only (ver BUG-03).

---

### FUT-04 — Página de overview do módulo

**Status:** 🔴 Não iniciado — ver INC-01.

---

### FUT-05 — Busca com URL params

**Status:** 🔴 Não iniciado — ver INC-02.

---

## 7. Resumo por Prioridade

### 🔴 Crítico — Corrigir antes de qualquer release

| ID | Descrição | Arquivo | Esforço |
|---|---|---|---|
| BUG-01 | `EmptyState` sem prop `icon` obrigatória | `busca/page.tsx` | 5 min |
| BUG-03 | Botões do quiz sem `onClick` | `quiz/page.tsx` | 30 min |
| BUG-04 | Filtros de trilhas/projetos não funcionam | `trilhas/page.tsx`, `projetos/page.tsx` | 1h |

### 🟡 Alta — Impacto direto na experiência

| ID | Descrição | Arquivo | Esforço |
|---|---|---|---|
| BUG-02 | Busca no header sem funcionalidade | `DashboardLayout.tsx` | 30 min |
| INC-02 | Busca não usa URL params | `busca/page.tsx` | 1h |
| INC-03 | Sino de notificações com badge falso | `DashboardLayout.tsx` | 15 min |
| UX-01 | Layout de conteúdo quebra em mobile | `ArticleContent.tsx` | 3h |
| COD-01 | Dados de quiz/exercício hardcoded nas páginas | `quiz/page.tsx`, `exercicios/page.tsx` | 2h |

### 🟢 Média — Qualidade e completude

| ID | Descrição | Arquivo | Esforço |
|---|---|---|---|
| INC-01 | Página de overview do módulo ausente | criar `modulos/[id]/page.tsx` | 2h |
| INC-04 | Avatar/username hardcoded | `DashboardLayout.tsx`, `Sidebar.tsx` | 1h |
| UX-02 | Perfil ignora `username` da URL | `perfil/[username]/page.tsx` | 30 min |
| UX-03 | Sem progresso na Sidebar | `Sidebar.tsx` | 1h |
| COD-04 | Tipo `Difficulty` não usado em `utils.ts` | `lib/utils.ts` | 15 min |
| INF-02 | Revisar CSP para produção | `next.config.js` | Médio |
| INF-03 | Sem `.env.example` | raiz do projeto | 15 min |

### ✅ Resolvidos

| ID | Descrição | Resolvido em |
|---|---|---|
| COD-02 | `robots.ts` e `sitemap.ts` ausentes | Fase 1 |
| COD-03 | Dados mockados acoplados às páginas | Maio 2026 — Service Layer |

### 🔵 Futuro — Evolução do produto

| ID | Descrição | Esforço |
|---|---|---|
| FUT-01 | Autenticação real (NextAuth.js ou Clerk) | Alto |
| FUT-02 | Persistência de progresso (Supabase) | Alto |
| FUT-03 | Modo de revisão do quiz | Baixo |

---

**Criado em:** Maio 2026  
**Última atualização:** Maio 2026  
**Sincronizado com:** Estado real do código-fonte
