# 📋 Visão Geral do Projeto — EstudaCode

## 🎯 Objetivo

Plataforma premium de aprendizado de programação focada em **prática**, não em videoaulas. A experiência combina leitura estruturada, exercícios práticos, quizzes e projetos reais.

## 🌟 Diferenciais

1. **Sem videoaulas** — conteúdo baseado em texto e código, fácil de revisar
2. **Prática intensiva** — exercícios após cada conceito com feedback real
3. **Experiência premium** — design inspirado em Linear, Vercel e GitBook
4. **Progresso transparente** — métricas, badges e certificados
5. **Onboarding personalizado** — recomendação de trilha por nível e objetivo
6. **Controle de acesso por plano** — Trilha Demo (grátis), trilhas completas (Pro/Vitalício)

## 🏗️ Arquitetura

### Frontend (Implementado)

- **Framework:** Next.js 14 com App Router
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS com CSS variables
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **SEO:** Metadata API, sitemap.ts, robots.ts
- **Segurança:** Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)

### Camadas da Aplicação

```
Páginas (app/)
    ↓ importam de
Service Layer (lib/services/)
    ↓ importa de
Data Layer (data/)     ←  substituir por Supabase/API no backend
```

**Regra:** páginas nunca importam de `data/` diretamente — sempre via `lib/services/`.

### Autenticação (Mock)

```
Cookie `estudacode-token`  →  middleware.ts (proteção de rotas)
localStorage `estudacode:plano`  →  useAuth + AuthContext (plano do usuário)
localStorage `estudacode:user`   →  AuthContext (nome, email, username)
localStorage `estudacode:progresso`  →  useProgresso (progresso de tópicos/módulos)
localStorage `estudacode-avatar`     →  useAvatar (foto de perfil)
```

Quando o backend existir, substituir leituras de localStorage/cookie por chamadas à API, mantendo as mesmas interfaces dos hooks e contextos.

### Controle de Acesso por Plano

```
PlanoUsuario: "gratis" | "pro" | "vitalicio"
Hierarquia: vitalicio ≥ pro ≥ gratis

Trilha Demo  →  planoNecessario: "gratis"  (acesso livre)
Demais trilhas → planoNecessario: "pro"    (bloqueadas para free)

useAuth()       →  hook leve para componentes que só precisam do plano
useAuthContext() →  contexto completo (nome, email, plano, atualizarPerfil)
temAcesso(planoUsuario, planoNecessario) → boolean
```

### Padrões Adotados

| Padrão | Onde aplicado |
|---|---|
| Service Layer / Repository | `lib/services/*.service.ts` |
| Co-location | `_components/` por rota |
| Barrel Export | `index.ts` em cada pasta de `components/` |
| Single Source of Truth | `useProgresso` lido apenas no componente que o usa |
| Data-driven UI | `STAT_ITEMS[]` no dashboard, sem markup repetido |
| AuthContext | `lib/contexts/AuthContext.tsx` — dados do usuário em toda a plataforma |

### Backend (A Implementar)

- **Opção recomendada:** Supabase (PostgreSQL + Auth + Storage)
- **Autenticação:** NextAuth.js ou Clerk
- **Pagamentos:** Stripe
- **Deploy:** Vercel

## 📊 Modelo de Dados

```typescript
PlanoUsuario → "gratis" | "pro" | "vitalicio"

Trilha       → id, slug, nome, descricao, dificuldade, duracaoEstimada,
               totalModulos, progresso, cor, icone, planoNecessario
Modulo       → id, trilhaId, ordem, titulo, descricao, duracaoEstimada, concluido, topicos[]
Topico       → id, moduloId, tipo (conteudo|exercicio|quiz|projeto), titulo, ordem, concluido
ConteudoTopico → titulo, intro, callout?, topicos[], codigo?, linguagem?, conclusao
Exercicio    → id, titulo, enunciado, contexto, dicas[], solucao, explicacao
QuizQuestion → id, pergunta, opcoes[], respostaCorreta, explicacao
Projeto      → id, titulo, descricao, objetivos[], requisitos[], dificuldade, checklist[], progresso
Badge        → id, nome, descricao, icone, conquistado, dataConquista?
AuthUser     → nome, email, username, plano, logado, isPro, isVitalicio, isFree
```

## 📱 Páginas Implementadas (28+)

### Públicas
| Rota | Descrição | Status |
|---|---|---|
| `/` | Landing page completa | ✅ |
| `/login` | Login com e-mail e social (4 provedores) | ✅ |
| `/cadastro` | Cadastro com validação, social e `?plano=` | ✅ |
| `/recuperar-senha` | Recuperação de senha | ✅ |
| `/onboarding` | Fluxo 3 etapas pós-cadastro | ✅ |
| `/planos` | Planos com seletor mensal/anual, contador e cupons | ✅ |
| `/blog` | Listagem de artigos | ✅ |
| `/blog/[slug]` | Post individual | ✅ |
| `/comunidade` | Discord, GitHub, X | ✅ |
| `/documentacao` | Guias e FAQ | ✅ |
| `/termos` | Termos de uso | ✅ |
| `/privacidade` | Política de privacidade (LGPD) | ✅ |

### Plataforma
| Rota | Descrição | Status |
|---|---|---|
| `/dashboard` | Métricas data-driven, saudação com nome real | ✅ |
| `/trilhas` | Demo separada das Pro, cadeado nas bloqueadas | ✅ |
| `/trilhas/[slug]` | Trilha com módulos e certificado | ✅ |
| `/trilhas/[slug]/modulos/[id]/conteudo` | Conteúdo com sidebar, TOC e progresso real | ✅ |
| `/trilhas/[slug]/modulos/[id]/exercicios/[id]` | Exercício com dicas | ✅ |
| `/trilhas/[slug]/modulos/[id]/quiz` | Quiz com feedback | ✅ |
| `/trilhas/[slug]/modulos/[id]/projeto` | Projeto com checklist | ✅ |
| `/projetos` | Grid com filtros | ✅ |
| `/projetos/[id]` | Projeto individual | ✅ |
| `/perfil/[username]` | Perfil com nome real e upload de avatar | ✅ |
| `/busca` | Busca global com debounce e URL | ✅ |
| `/configuracoes` | 4 abas, persiste perfil no AuthContext | ✅ |
| `/certificado/[slug]` | Certificado com nome real, bloqueado se < 100% | ✅ |
| `/notificacoes` | Lista com marcar lida individual e em massa | ✅ |
| `/suporte` | Canais de suporte + FAQ | ✅ |
| `/suporte-vip` | Suporte prioritário (Pro/Vitalício) | ✅ |

## 🔄 Fluxo do Usuário

```
1. Visitante acessa landing page
   ↓
2. Clica em "Aprenda fazendo" → vê planos
   ↓
3. Clica em "Começar Agora" → cadastro (plano pré-selecionado via ?plano=)
   ↓
4. Onboarding: objetivo → nível → trilha recomendada
   ↓
5. Acessa trilhas → Demo (grátis) ou Pro (plano pago)
   ↓
6. Módulo → conteúdo → exercício → quiz → projeto
   ↓
7. Progresso salvo no localStorage (futuro: API)
   ↓
8. Conclui trilha (100%) → certificado desbloqueado
   ↓
9. Suporte via Sidebar (Suporte ou Suporte VIP conforme plano)
```

## 💰 Modelo de Negócio

| Plano | Preço | Conteúdo |
|---|---|---|
| Grátis | R$ 0 | Trilha Demo (2 módulos) |
| Pro | R$ 19/mês ou R$ 171/ano | Todas as 6 trilhas + certificados + Suporte VIP |
| Vitalício | R$ 224 (oferta) / R$ 299 | Acesso permanente + VIP + novidades antecipadas |

Oferta por tempo limitado: 25% OFF nos planos Anual e Vitalício (contador de 48h).

## 🚀 Roadmap

### Fase 1: MVP (✅ Concluída)
- [x] Design system e componentes (40+)
- [x] Todas as páginas (28+)
- [x] Dados mockados
- [x] SEO e segurança
- [x] Responsividade

### Fase 1.5: Arquitetura (✅ Concluída — Maio 2026)
- [x] Service Layer (`lib/services/`)
- [x] Co-location com `_components/`
- [x] Barrel exports por pasta de componentes
- [x] `useProgresso` com interface pronta para API
- [x] Dashboard data-driven com `StatsCard`
- [x] `data/conteudo.ts` extraído

### Fase 1.6: Auth Mock + UX (✅ Concluída — Maio 2026)
- [x] `AuthContext` com nome, email, plano, `atualizarPerfil`
- [x] `useAuth` para controle de acesso por plano
- [x] `lib/auth/session.ts` com `logout()` correto
- [x] Trilha Demo separada das trilhas Pro
- [x] Cadeado nas trilhas bloqueadas + CTA de upgrade
- [x] Badges "Grátis" e "Pro" nos cards de trilha
- [x] Certificado bloqueado se progresso < 100%
- [x] Suporte e Suporte VIP na Sidebar (condicional ao plano)
- [x] Botões sociais com `onClick` no login e cadastro
- [x] Cadastro lê `?plano=` e exibe banner do plano
- [x] Debounce na busca, modal de avatar nas configurações
- [x] Notificações com marcar lida individual e em massa

### Fase 2: Backend Core
- [ ] Autenticação real (Supabase + NextAuth)
- [ ] Persistência de progresso via API
- [ ] API de usuários e perfis

### Fase 3: Monetização
- [ ] Checkout Stripe
- [ ] Controle de acesso por plano via backend
- [ ] Certificados com data e ID reais

### Fase 4: Conteúdo
- [ ] 3 trilhas completas (todos os tópicos com conteúdo real)
- [ ] 50+ exercícios
- [ ] 20+ quizzes

### Fase 5: Comunidade
- [ ] Comentários por módulo
- [ ] Fórum de discussão
- [ ] Perfis públicos

---

**Versão:** 1.6.0
**Última atualização:** Maio 2026
**Status:** Frontend completo com auth mock e controle de acesso — aguardando backend
