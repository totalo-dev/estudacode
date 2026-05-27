# ✅ TODO — Front-end EstudaCode

> Tarefas pendentes de front-end. Itens que dependem de backend estão marcados com 🔌.
> Última atualização: Mai 2026

---

## 🔴 Bugs

- [x] `app/(platform)/projetos/page.tsx` — variável `projetos` não importada (já corrigido: usa `todosProjetos`)
- [x] `components/layout/Sidebar.tsx` — botão "Sair" não limpava cookie (corrigido via `logout()` de `lib/auth/session.ts`)

---

## 🟠 Fluxos quebrados / incompletos

- [x] `app/login/page.tsx` — botões de login social com `onClick` e loading state
- [x] `app/cadastro/page.tsx` — botões sociais com ícones (Google, GitHub, Facebook, X)
- [x] `app/cadastro/page.tsx` — lê `?plano=` da URL e exibe banner do plano selecionado
- [x] `app/(platform)/notificacoes/page.tsx` — usa `DashboardLayout`, marcar lida individual e em massa
- [x] `app/(platform)/trilhas/page.tsx` — seção Demo separada das Pro, cadeado nas bloqueadas
- [x] `app/(platform)/certificado/[slug]/page.tsx` — bloqueia acesso se progresso < 100%
- [ ] `app/(platform)/onboarding/page.tsx` — seleções de objetivo e nível não são salvas 🔌

---

## 🟡 Dados hardcoded que devem ser dinâmicos

- [x] Nome/email do usuário — resolvido via `AuthContext` (persiste em localStorage)
- [x] Dashboard — saudação usa primeiro nome real do usuário
- [x] Perfil — exibe nome e username do `AuthContext`
- [x] Certificado — exibe nome real do usuário
- [x] Configurações — formulário inicializado com dados reais, salva via `atualizarPerfil`
- [ ] Dashboard — "Atividades Recentes" ainda é array estático inline 🔌
- [ ] `getDashboardStats()` — `projetosConcluidos` hardcoded como 8 🔌
- [ ] Perfil — estatísticas hardcoded (47 exercícios, 12 quizzes, 7 dias, 3 projetos, 127h, 2 badges) 🔌
- [ ] Perfil — array `badges` fixo (2 conquistadas, 4 não) 🔌
- [ ] Perfil — array `recentActivity` fixo com 4 atividades 🔌
- [ ] Perfil — `ProgressRing` com `value={45}` fixo 🔌
- [ ] Certificado — data de conclusão sempre `new Date()` (não a data real) 🔌
- [ ] Certificado — ID gerado com `Math.random()`, muda a cada render 🔌
- [ ] Notificações — array duplicado entre `DashboardLayout` e `notificacoes/page.tsx` 🔌
- [ ] Conteúdo de módulo — TOC hardcoded; conteúdo real só para ~12 tópicos, demais usam fallback

---

## 🟡 Funcionalidades sem ação (botões mortos)

- [x] `configuracoes/page.tsx` aba Perfil — salva nome/email/username no `AuthContext` e localStorage
- [x] `configuracoes/page.tsx` aba Senha — campos controlados com validação e feedback de sucesso
- [x] `configuracoes/page.tsx` aba Notificações — toggles persistem no localStorage
- [x] `configuracoes/page.tsx` aba Conta — botão exportar gera `estudacode-dados.json` real
- [x] `projetos/[id]/page.tsx` — checklist auto-salva no localStorage a cada toggle
- [x] `comunidade/page.tsx` — links reais (Discord, GitHub, X)
- [x] `onboarding/page.tsx` — salva objetivo, nível e trilha no localStorage ao concluir
- [ ] Certificado — botão "Baixar PDF" chama `window.print()`, não gera PDF real 🔌

---

## 🟢 Componentes / contextos faltando

- [x] `lib/contexts/AuthContext.tsx` — criado, conectado em Dashboard, Perfil, Certificado, Configurações, DashboardLayout
- [x] `app/(platform)/suporte/page.tsx` — criado e na Sidebar
- [x] `app/(platform)/suporte-vip/page.tsx` — criado e na Sidebar (condicional ao plano)
- [x] `lib/contexts/NotificacoesContext.tsx` — estado de notificações centralizado, sincroniza dropdown e página
- [x] Certificado — ID gerado uma vez e salvo no localStorage por slug (estável entre renders)
- [x] Certificado — logo corrigido para `web-app-manifest-192x192.png`
- [ ] `app/(platform)/layout.tsx` — layout compartilhado para o grupo `(platform)`
- [ ] Editor de código real nos exercícios — substituir `<textarea>` por Monaco Editor ou CodeMirror

---

## 🔵 Conteúdo incompleto

- [ ] Blog — 5 de 6 posts sem conteúdo real (exibem "Artigo em breve")
- [ ] Trilha Demo — módulos existem em `data/modulos.ts` mas exercícios/quizzes sem dados reais
- [ ] Exercícios — hardcoded por `moduloId` inline nas páginas; mover para `data/` e criar serviço
- [ ] Quizzes — hardcoded por `moduloId` inline nas páginas; mover para `data/` e criar serviço
- [ ] Conteúdo de tópicos — apenas ~12 tópicos têm conteúdo real em `data/conteudo.ts`; demais usam fallback genérico

---

## ⚪ Melhorias de UX

- [x] `busca/page.tsx` — debounce de 300ms na atualização da URL
- [x] `notificacoes/page.tsx` — marcar como lida individual e em massa
- [x] `configuracoes/page.tsx` — modal de upload de avatar inline
- [x] `planos/page.tsx` — toggle mensal/anual substituído por seletor de abas (sem overflow)
- [x] `TrilhaCard` — badge "Grátis" (verde) para demo, "Pro" (azul) para pagas
- [x] `planos/page.tsx` — botão Vitalício com gradiente dourado e ícone Crown
- [x] `projetos/[id]/page.tsx` — checklist persistindo no localStorage (sem backend)
- [x] `onboarding/page.tsx` — salvar preferências no localStorage

---

## 🔌 Aguardando Backend

- [ ] Autenticação real (NextAuth.js ou Clerk + Supabase)
- [ ] Persistência de progresso via API
- [ ] Dados reais do perfil (stats, badges, atividade)
- [ ] Checkout Stripe (planos Pro e Vitalício)
- [ ] Notificações reais
- [ ] Exportação de dados da conta
- [ ] Geração de certificados com data e ID reais
- [ ] Upload de avatar para storage (S3/Supabase Storage)
- [ ] Envio de e-mails (confirmação de cadastro, recuperação de senha)
