# ✅ TODO — Front-end EstudaCode

> Tarefas pendentes de front-end. Itens que dependem de backend estão marcados com 🔌.

---

## 🔴 Bugs

- [ ] `app/(platform)/projetos/page.tsx` — variável `projetos` usada na contagem de dificuldade não está importada (quebra em runtime)
- [ ] `components/layout/Sidebar.tsx` — botão "Sair" não limpa o cookie `estudacode-token`, causando loop de redirecionamento pelo middleware

---

## 🟠 Fluxos quebrados / incompletos

- [ ] `app/login/page.tsx` — botões de login social (Google, GitHub, Facebook, X) sem `onClick`
- [ ] `app/cadastro/page.tsx` — botões de cadastro social (Google, GitHub) sem `onClick`
- [ ] `app/cadastro/page.tsx` — parâmetro `?plano=pro` e `?plano=vitalicio` na URL é ignorado; cadastro não pré-seleciona o plano
- [ ] `app/(platform)/notificacoes/page.tsx` — não usa `DashboardLayout`; renderiza sem sidebar e header da plataforma
- [ ] `app/(platform)/certificado/[slug]/page.tsx` — acessível sem ter concluído a trilha; qualquer URL funciona
- [ ] `app/(platform)/trilhas/page.tsx` — separar seção "Trilha Demo" das trilhas Pro/Vitalício com controle de acesso via `useAuth`
- [ ] `app/(platform)/trilhas/page.tsx` — trilhas bloqueadas devem exibir cadeado e CTA de upgrade (integrar `TrilhaCard` com prop `bloqueada`)

---

## 🟡 Dados hardcoded que devem ser dinâmicos

- [ ] Nome "Usuário" e email "usuario@email.com" hardcoded em `DashboardLayout`, `Sidebar`, `Perfil` e `Certificado` — aguarda `AuthContext`
- [ ] Dashboard — "Atividades Recentes" é array estático inline; deve vir do histórico real do usuário
- [ ] Dashboard — saudação "Bem-vindo de volta!" não usa o nome real do usuário
- [ ] `getDashboardStats()` — `projetosConcluidos: 8` hardcoded no serviço
- [ ] Perfil — todas as estatísticas hardcoded (47 exercícios, 12 quizzes, 7 dias de sequência, 3 projetos, 127 horas, 2 badges)
- [ ] Perfil — array `badges` fixo (2 conquistadas, 4 não)
- [ ] Perfil — array `recentActivity` fixo com 4 atividades
- [ ] Perfil — `ProgressRing` com `value={45}` fixo
- [ ] Certificado — nome do aluno fixo "Usuário EstudaCode"
- [ ] Certificado — data de conclusão sempre `new Date()` (data atual, não a real)
- [ ] Certificado — ID gerado com `Math.random()`, muda a cada render
- [ ] Notificações — array de 4 notificações estático inline; duplicado entre `DashboardLayout` e `notificacoes/page.tsx`
- [ ] Conteúdo de módulo — `TOC_ITEMS` hardcoded com 4 itens fixos, não gerado a partir do conteúdo real

---

## 🟡 Funcionalidades sem ação (botões mortos)

- [ ] `configuracoes/page.tsx` aba Perfil — `handleSalvar` não persiste nada 🔌
- [ ] `configuracoes/page.tsx` aba Senha — campos não são controlados (sem `value`/`onChange`); submit não faz nada 🔌
- [ ] `configuracoes/page.tsx` aba Notificações — toggles funcionam localmente mas não persistem no reload 🔌
- [ ] `configuracoes/page.tsx` aba Conta — botão "Solicitar exportação" sem `onClick` 🔌
- [ ] `configuracoes/page.tsx` aba Conta — fluxo de exclusão de conta completo visualmente mas sem ação real 🔌
- [ ] `projetos/[id]/page.tsx` — botão "Salvar Progresso" sem `onClick`
- [ ] `projetos/[id]/page.tsx` — checklist perde estado ao recarregar (só em React state)
- [ ] `onboarding/page.tsx` — seleções de objetivo e nível não são salvas em lugar nenhum
- [ ] `comunidade/page.tsx` — links do Discord, GitHub e Twitter apontam para `#`
- [ ] Certificado — botão "Baixar PDF" chama `window.print()`, não gera PDF real 🔌

---

## 🟢 Componentes / contextos faltando

- [ ] `lib/contexts/AuthContext.tsx` — criar contexto de usuário autenticado (nome, email, plano, avatar) para eliminar os hardcodes espalhados
- [ ] `lib/contexts/NotificacoesContext.tsx` — centralizar estado de notificações entre `DashboardLayout` e `notificacoes/page.tsx`
- [ ] `app/(platform)/layout.tsx` — criar layout compartilhado para o grupo `(platform)` para evitar importar `DashboardLayout` em cada página
- [ ] `app/(platform)/suporte/page.tsx` — página de Suporte para todos os planos (criada mas não adicionada à Sidebar)
- [ ] `app/(platform)/suporte-vip/page.tsx` — página de Suporte VIP para Pro e Vitalício (criada mas não adicionada à Sidebar)
- [ ] `components/layout/Sidebar.tsx` — adicionar links de Suporte e Suporte VIP condicionais ao plano do usuário
- [ ] Editor de código real nos exercícios — substituir `<textarea>` simples por Monaco Editor ou CodeMirror

---

## 🔵 Conteúdo incompleto

- [ ] Blog — 5 de 6 posts sem conteúdo real (exibem "Artigo em breve")
- [ ] Trilha Demo — criar módulos e conteúdo real em `data/modulos.ts` para o slug `trilha-demo`
- [ ] Exercícios e quizzes — hardcoded por `moduloId` inline nas páginas; mover para `data/` e criar serviço

---

## ⚪ Melhorias de UX

- [x] `busca/page.tsx` — adicionar debounce na atualização da URL (atualmente atualiza a cada keystroke)
- [x] `notificacoes/page.tsx` — adicionar botão "Marcar como lida" individual e "Marcar todas como lidas"
- [x] `configuracoes/page.tsx` — botão de câmera no avatar deve abrir modal de upload inline (igual ao perfil), não redirecionar para `/perfil/usuario`
- [x] Configurações preview do perfil — "0 Trilhas", "0 Projetos", "0 Badges" hardcoded; deve refletir dados reais
- [x] Planos — página de cadastro deve ler `?plano=` e pré-selecionar o plano correspondente
