# 📋 Visão Geral do Projeto — EstudaCode

## 🎯 Objetivo

Plataforma premium de aprendizado de programação focada em **prática**, não em videoaulas. A experiência combina leitura estruturada, exercícios práticos, quizzes e projetos reais.

## 🌟 Diferenciais

1. **Sem videoaulas** — conteúdo baseado em texto e código, fácil de revisar
2. **Prática intensiva** — exercícios após cada conceito com feedback real
3. **Experiência premium** — design inspirado em Linear, Vercel e GitBook
4. **Progresso transparente** — métricas, badges e certificados
5. **Onboarding personalizado** — recomendação de trilha por nível e objetivo

## 🏗️ Arquitetura

### Frontend (Implementado)
- **Framework:** Next.js 14 com App Router
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS com CSS variables
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **SEO:** Metadata API, sitemap.ts, robots.ts
- **Segurança:** Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)

### Backend (A Implementar)
- **Opção recomendada:** Supabase (PostgreSQL + Auth + Storage)
- **Autenticação:** NextAuth.js ou Clerk
- **Pagamentos:** Stripe
- **Deploy:** Vercel

## 📊 Modelo de Dados

```typescript
Trilha       → id, slug, nome, descricao, dificuldade, duracaoEstimada, totalModulos, progresso, cor, icone
Modulo       → id, trilhaId, ordem, titulo, descricao, duracaoEstimada, concluido, topicos[]
Topico       → id, moduloId, tipo (conteudo|exercicio|quiz|projeto), titulo, ordem, concluido
Exercicio    → id, titulo, enunciado, contexto, dicas[], solucao, explicacao
QuizQuestion → id, pergunta, opcoes[], respostaCorreta, explicacao
Projeto      → id, titulo, descricao, objetivos[], requisitos[], dificuldade, checklist[], progresso
Badge        → id, nome, descricao, icone, conquistado, dataConquista?
UserProgress → trilhasEmAndamento, trilhasConcluidas, projetosConcluidos, exerciciosResolvidos, badges[]
```

## 📱 Páginas Implementadas (26+)

### Públicas
| Rota | Descrição |
|---|---|
| `/` | Landing page completa |
| `/login` | Login com e-mail e social |
| `/cadastro` | Cadastro com validação |
| `/recuperar-senha` | Recuperação de senha |
| `/onboarding` | Fluxo 3 etapas pós-cadastro |
| `/planos` | Planos com contador e cupons |
| `/blog` | Listagem de artigos |
| `/blog/[slug]` | Post individual |
| `/comunidade` | Discord, GitHub, X |
| `/documentacao` | Guias e FAQ |
| `/termos` | Termos de uso |
| `/privacidade` | Política de privacidade (LGPD) |

### Plataforma
| Rota | Descrição |
|---|---|
| `/dashboard` | Métricas e trilhas em andamento |
| `/trilhas` | Grid com filtros por dificuldade |
| `/trilhas/[slug]` | Trilha com módulos e certificado |
| `/trilhas/[slug]/modulos/[id]/conteudo` | Conteúdo com sidebar e TOC |
| `/trilhas/[slug]/modulos/[id]/exercicios/[id]` | Exercício com dicas |
| `/trilhas/[slug]/modulos/[id]/quiz` | Quiz com feedback |
| `/trilhas/[slug]/modulos/[id]/projeto` | Projeto com checklist |
| `/projetos` | Grid com filtros |
| `/projetos/[id]` | Projeto individual |
| `/perfil/[username]` | Perfil com upload de avatar |
| `/busca` | Busca global com URL |
| `/configuracoes` | 4 abas de configuração |
| `/certificado/[slug]` | Certificado visual |

## 🔄 Fluxo do Usuário

```
1. Visitante acessa landing page
   ↓
2. Clica em "Aprenda fazendo" → vê planos
   ↓
3. Clica em "Começar Agora" → cadastro
   ↓
4. Onboarding: objetivo → nível → trilha recomendada
   ↓
5. Acessa trilha → módulo → conteúdo
   ↓
6. Lê conteúdo → exercício → quiz → projeto
   ↓
7. Conclui trilha → recebe certificado
   ↓
8. Escolhe próxima trilha
```

## 💰 Modelo de Negócio

| Plano | Preço | Conteúdo |
|---|---|---|
| Grátis | R$ 0 | Demo de 1 trilha |
| Pro | R$ 19/mês ou R$ 171/ano | Todas as trilhas + certificados |
| Vitalício | R$ 224 (oferta) / R$ 299 | Acesso permanente + VIP |

Oferta por tempo limitado: 25% OFF nos planos Anual e Vitalício (contador de 48h).

## 📈 Métricas de Sucesso

- Taxa de conclusão de módulos
- Exercícios resolvidos por dia
- Taxa de acerto em quizzes
- Conversão Grátis → Pro
- Retenção D1, D7, D30

## 🚀 Roadmap

### Fase 1: MVP (Atual — Frontend Completo)
- [x] Design system e componentes
- [x] Todas as páginas
- [x] Dados mockados
- [x] SEO e segurança
- [x] Responsividade

### Fase 2: Backend Core
- [ ] Autenticação (Supabase + NextAuth)
- [ ] Persistência de progresso
- [ ] API de usuários

### Fase 3: Monetização
- [ ] Checkout Stripe
- [ ] Controle de acesso por plano
- [ ] Certificados dinâmicos

### Fase 4: Conteúdo
- [ ] 3 trilhas completas
- [ ] 50+ exercícios
- [ ] 20+ quizzes

### Fase 5: Comunidade
- [ ] Comentários por módulo
- [ ] Fórum de discussão
- [ ] Perfis públicos

## 🛠️ Stack Tecnológica Completa

### Frontend (Implementado)
- Next.js 14, React 18, TypeScript
- Tailwind CSS, Framer Motion, Lucide React
- Metadata API, sitemap.ts, robots.ts
- Security headers, CSS variables

### Backend (Sugerido)
- Supabase (PostgreSQL + Auth + Storage)
- NextAuth.js ou Clerk
- Stripe (pagamentos)
- Zod (validação)
- Upstash Redis (rate limiting)

### DevOps
- Vercel (hosting + CI/CD)
- GitHub Actions
- Sentry (monitoramento)

---

**Versão:** 1.1.0
**Última atualização:** Maio 2026
**Status:** Frontend completo — aguardando backend
