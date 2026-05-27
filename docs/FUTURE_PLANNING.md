# 🔭 Planejamento Futuro — EstudaCode

> Estado base: Frontend v1.2.0 completo, arquitetura refatorada.  
> Este documento detalha as próximas fases de evolução do produto.

---

## Índice

1. [Fase 2 — Backend Core](#fase-2--backend-core)
2. [Fase 3 — Monetização](#fase-3--monetização)
3. [Fase 4 — Conteúdo](#fase-4--conteúdo)
4. [Fase 5 — Comunidade](#fase-5--comunidade)
5. [Fase 6 — Crescimento](#fase-6--crescimento)
6. [Decisões Técnicas Pendentes](#decisões-técnicas-pendentes)
7. [Dívida Técnica Prioritária](#dívida-técnica-prioritária)
8. [Estimativas](#estimativas)

---

## Fase 2 — Backend Core

**Objetivo:** Fazer o produto funcionar de verdade — autenticação, progresso real e dados por usuário.

### 2.1 Autenticação

**Decisão recomendada:** Clerk (setup mais rápido, OAuth pronto, UI integrada) ou NextAuth.js (mais controle, open source).

**O que mudar no frontend após autenticação:**
- `DashboardLayout` — avatar e username reais via sessão
- `Sidebar` — link `/perfil/[username]` com username real
- `CertificadoPage` — nome do usuário no certificado
- Redirecionar `/login` e `/cadastro` para o provider escolhido
- Proteger rotas do grupo `(platform)` com middleware (já existe `middleware.ts`)

**Entregáveis:**
- [ ] Provider de autenticação configurado (Clerk ou NextAuth.js)
- [ ] Middleware protegendo todas as rotas de `(platform)/`
- [ ] Hook `useUser()` expondo `{ id, name, email, avatar }`
- [ ] Logout funcional no popup de perfil do DashboardLayout

---

### 2.2 Banco de Dados (Supabase)

**Schema mínimo para MVP:**

```sql
-- Usuários (gerenciado pelo Auth, mas com campos extras)
users (
  id          uuid PRIMARY KEY,
  username    text UNIQUE,
  full_name   text,
  avatar_url  text,
  plan        text DEFAULT 'free',   -- free | pro | lifetime
  created_at  timestamptz DEFAULT now()
)

-- Progresso por tópico
user_progress (
  user_id     uuid REFERENCES users(id),
  topico_id   text,
  concluido   boolean DEFAULT false,
  updated_at  timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, topico_id)
)

-- Trilhas em andamento
user_trilhas (
  user_id    uuid REFERENCES users(id),
  trilha_id  text,
  iniciada_em timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, trilha_id)
)
```

**Entregáveis:**
- [ ] Supabase project configurado
- [ ] Migrations versionadas em `supabase/migrations/`
- [ ] Row Level Security (RLS) em todas as tabelas
- [ ] `.env.example` criado (ver INF-03 em SUGGESTIONS.md)
- [ ] `lib/supabase.ts` — client configurado

---

### 2.3 Persistência de Progresso

O hook `useProgresso` já tem a interface preparada para essa migração:

```typescript
// Antes (localStorage)
localStorage.setItem(`topico-${id}`, JSON.stringify(concluido));

// Depois (Supabase) — mesma interface para os componentes
await supabase
  .from("user_progress")
  .upsert({ user_id, topico_id: id, concluido });
```

**Entregáveis:**
- [ ] `lib/hooks/useProgresso.ts` migrado para Supabase
- [ ] Loading state no botão "Marcar como concluído" do `ArticleContent`
- [ ] Fallback para localStorage se usuário não autenticado (modo demo)
- [ ] `getDashboardStats()` no service layer lendo do banco real

---

## Fase 3 — Monetização

**Objetivo:** Gerar receita com controle de acesso por plano.

### 3.1 Checkout Stripe

**Fluxo:**
```
Usuário clica "Assinar Pro" na /planos
  → Cria Checkout Session no Stripe (via API Route)
  → Redireciona para stripe.com/checkout
  → Webhook /api/stripe/webhook recebe o evento
  → Atualiza users.plan no Supabase
  → Redireciona para /dashboard com mensagem de sucesso
```

**API Routes necessárias:**
```
POST /api/stripe/checkout   → cria session
POST /api/stripe/webhook    → processa eventos (payment_intent.succeeded, customer.subscription.*)
GET  /api/stripe/portal     → abre portal de gerenciamento
```

**Entregáveis:**
- [ ] `.env.example` com `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- [ ] `app/api/stripe/` com as 3 routes
- [ ] Página `/planos` chamando a API real
- [ ] Middleware verificando `users.plan` antes de liberar conteúdo premium
- [ ] Página `/obrigado` pós-checkout

---

### 3.2 Controle de Acesso por Plano

```typescript
// middleware.ts — verificar plano antes de liberar conteúdo
const ROTAS_PREMIUM = [
  /^\/trilhas\/(?!fundamentos-web)/,  // todas as trilhas exceto a gratuita
  /^\/certificado\//,
];
```

**Entregáveis:**
- [ ] Middleware com verificação de plano
- [ ] `useUserPlan()` hook expondo `{ plan, isPro, isLifetime }`
- [ ] Lock visual nos cards de trilhas premium para usuários free
- [ ] Banner de upgrade em `/trilhas/[slug]` para usuários free

---

### 3.3 Certificados Dinâmicos

**Substituir a prévia visual por geração real:**

```typescript
// app/api/certificado/[slug]/route.ts
// Verifica se o usuário concluiu 100% da trilha antes de emitir

// app/(platform)/certificado/[slug]/page.tsx
// Nome real do usuário (do banco)
// ID único persistido no banco
// Data real de conclusão
```

**Entregáveis:**
- [ ] Tabela `user_certificates` no banco
- [ ] API Route que valida conclusão e cria o certificado
- [ ] `CertificadoPage` lendo dados reais
- [ ] URL única e verificável por empregadores

---

## Fase 4 — Conteúdo

**Objetivo:** Conteúdo suficiente para reter usuários e justificar assinatura.

### 4.1 Prioridade de Trilhas

| Trilha | Status | Módulos alvo |
|---|---|---|
| Fundamentos Web | 🟡 Parcial | 8 módulos completos |
| React Moderno | 🟡 Parcial (1 módulo completo) | 10 módulos |
| TypeScript Avançado | 🔴 Dados mockados | 8 módulos |
| Node.js Backend | 🔴 Dados mockados | 10 módulos |
| Next.js Fullstack | 🔴 Dados mockados | 12 módulos |
| Design Systems | 🔴 Dados mockados | 6 módulos |

### 4.2 Por Módulo Completo, precisa de:

```
data/conteudo.ts      → ConteudoTopico (intro, topicos, código, conclusão)
data/exercicios.ts    → 2-3 exercícios com solução e explicação
data/quizzes.ts       → 5-10 questões com feedback por questão
```

**Meta mínima para lançamento:**
- [ ] 2 trilhas com 100% dos módulos preenchidos
- [ ] 30+ exercícios com solução
- [ ] 50+ questões de quiz

---

### 4.3 Estrutura de Conteúdo

**Padrão por tópico de conteúdo (`data/conteudo.ts`):**

```typescript
"trilha-moduloId": {
  titulo:    "Título do conteúdo",
  intro:     "Parágrafo de introdução (2-3 linhas)",
  callout:   { tipo: "info", titulo: "Dica", texto: "..." },  // opcional
  topicos:   ["Conceito 1", "Conceito 2", "Conceito 3"],
  codigo:    `// Exemplo prático comentado`,
  linguagem: "javascript",
  conclusao: "Resumo do que foi aprendido (2-3 linhas)",
}
```

---

## Fase 5 — Comunidade

**Objetivo:** Retenção e network entre alunos.

### 5.1 Comentários por Módulo

```typescript
// Schema
comments (
  id          uuid PRIMARY KEY,
  user_id     uuid REFERENCES users(id),
  modulo_id   text,
  content     text,
  created_at  timestamptz DEFAULT now(),
  parent_id   uuid REFERENCES comments(id)  -- para replies
)
```

**UI:** seção abaixo do `ArticleContent` com lista de comentários + formulário. Moderação via Supabase RLS.

### 5.2 Fórum

**Opção A (rápida):** Embed do Discord na `/comunidade`  
**Opção B (integrada):** Fórum próprio com categorias por trilha  
**Recomendação:** começar com Discord (opção A) e evoluir conforme volume

### 5.3 Perfis Públicos

- [ ] `/perfil/[username]` lendo dados reais (badges, trilhas concluídas, projetos)
- [ ] Opção de perfil público/privado
- [ ] Link de compartilhamento no certificado apontando para o perfil

---

## Fase 6 — Crescimento

**Objetivo:** Aquisição e retenção em escala.

### 6.1 SEO de Conteúdo

- [ ] JSON-LD `Course` e `Article` em todas as páginas de trilha e blog
- [ ] Blog com conteúdo real (artigos técnicos, tutoriais)
- [ ] `generateStaticParams` para pré-renderizar trilhas em build time
- [ ] Open Graph images dinâmicas com `@vercel/og` para cada trilha

### 6.2 Analytics

- [ ] PostHog ou Mixpanel para eventos de produto
- [ ] Funil de conversão: visitante → cadastro → onboarding → primeiro módulo → Pro
- [ ] Dashboard de métricas no admin
- [ ] Sentry para monitoramento de erros

### 6.3 Performance

- [ ] `next/font/google` para Inter (zero layout shift)
- [ ] `dynamic()` com `{ ssr: false }` para componentes pesados (CodeBlock, ProgressRing)
- [ ] `minimumCacheTTL: 60` em `next.config.js` para imagens
- [ ] ISR (`revalidate`) nas páginas de trilha quando conteúdo vier do banco

### 6.4 PWA

- [ ] `next-pwa` para instalação mobile
- [ ] Service Worker para conteúdo offline
- [ ] Push notifications para lembretes de estudo

### 6.5 Internacionalização

- [ ] `next-intl` para suporte a inglês (mercado internacional)
- [ ] Tradução da UI
- [ ] Conteúdo em inglês (plano longo prazo)

---

## Decisões Técnicas Pendentes

| Decisão | Opções | Recomendação | Prazo |
|---|---|---|---|
| Auth provider | Clerk vs NextAuth.js | **Clerk** (mais rápido, melhor DX) | Fase 2 |
| Banco de dados | Supabase vs PlanetScale vs Neon | **Supabase** (Auth + Storage integrados) | Fase 2 |
| Pagamentos | Stripe vs Paddle | **Stripe** (mais documentação, melhor suporte BR) | Fase 3 |
| Monitoramento | Sentry vs Highlight | **Sentry** (mais maduro) | Fase 2 |
| Analytics | PostHog vs Mixpanel vs Amplitude | **PostHog** (open source, self-host possível) | Fase 6 |
| Email transacional | Resend vs SendGrid | **Resend** (feito para Next.js, melhor DX) | Fase 2 |

---

## Dívida Técnica Prioritária

Bugs e melhorias confirmados que devem ser resolvidos antes do lançamento público (ver detalhes em `SUGGESTIONS.md`):

| Prioridade | Item | Esforço |
|---|---|---|
| 🔴 | BUG-01: `EmptyState` sem prop `icon` em `/busca` | 5 min |
| 🔴 | BUG-03: Botões do quiz sem onClick | 30 min |
| 🔴 | BUG-04: Filtros de trilhas/projetos não funcionam | 1h |
| 🟡 | BUG-02: Busca no header sem funcionalidade | 30 min |
| 🟡 | UX-01: Layout de conteúdo quebra em mobile | 3h |
| 🟡 | COD-01: Dados de quiz/exercício hardcoded nas páginas | 2h |
| 🟢 | INF-02: Revisar CSP para produção | Médio |
| 🟢 | INF-03: Criar `.env.example` | 15 min |

**Total estimado para zerar a dívida crítica + alta:** ~8 horas

---

## Estimativas

| Fase | Escopo | Estimativa |
|---|---|---|
| Dívida técnica (bugs + UX) | 8 itens críticos/altos | 1-2 semanas |
| Fase 2 — Backend Core | Auth + Supabase + Progresso | 4-6 semanas |
| Fase 3 — Monetização | Stripe + Controle de acesso | 2-3 semanas |
| Fase 4 — Conteúdo | 2 trilhas completas | 4-8 semanas (conteúdo) |
| Fase 5 — Comunidade | Comentários + Perfis | 3-4 semanas |
| Fase 6 — Crescimento | SEO + Analytics + PWA | ongoing |

**Estimativa para MVP monetizável (Fases 2 + 3):** ~2-3 meses com 1 dev

---

**Criado em:** Maio 2026  
**Versão base:** 1.2.0  
**Próxima revisão:** Após conclusão da Fase 2
