# 🎓 EstudaCode — Plataforma de Aprendizado

Uma plataforma premium de aprendizado de programação baseada em conteúdo escrito, projetos práticos, exercícios e quizzes. Inspirada em Notion, GitBook, Roadmap.sh, Codecademy e FreeCodeCamp.

## ✨ Características

- 🎯 **Trilhas Estruturadas** - Caminhos de aprendizado organizados do básico ao avançado
- 💻 **Exercícios Práticos** - Resolva problemas reais com feedback instantâneo
- 📝 **Quizzes Interativos** - Teste seus conhecimentos e acompanhe seu progresso
- 🚀 **Projetos Reais** - Construa projetos para seu portfólio
- 📊 **Dashboard Completo** - Acompanhe sua evolução com métricas detalhadas
- 🏆 **Sistema de Badges** - Conquiste badges conforme progride
- 🌙 **Dark Mode Nativo** - Design moderno e profissional
- 📱 **Totalmente Responsivo** - Sidebar com drawer mobile, layouts adaptados
- 🔍 **Busca Global** - Busca em tempo real com parâmetro de URL
- 🎓 **Certificados** - Página de certificado visual por trilha concluída
- 💳 **Planos e Preços** - Freemium com contador de oferta e cupons
- 🧭 **Onboarding** - Fluxo de boas-vindas com seleção de trilha

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária com CSS variables
- **Framer Motion** - Animações suaves
- **Lucide Icons** - Ícones modernos

## 📁 Estrutura do Projeto

```
estudacode/
├── app/
│   ├── layout.tsx                    # Root layout (metadata, SEO, ícones)
│   ├── page.tsx                      # Landing page pública
│   ├── not-found.tsx                 # Página 404 customizada
│   ├── sitemap.ts                    # Sitemap automático
│   ├── robots.ts                     # Robots.txt
│   ├── globals.css                   # Reset + Tailwind + CSS variables de tema
│   ├── login/                        # Página de login
│   ├── cadastro/                     # Página de cadastro
│   ├── recuperar-senha/              # Recuperação de senha
│   ├── onboarding/                   # Fluxo de boas-vindas pós-cadastro
│   ├── planos/                       # Planos e preços com contador e cupons
│   ├── blog/                         # Listagem e posts individuais do blog
│   ├── comunidade/                   # Página de comunidade
│   ├── documentacao/                 # Documentação e FAQ
│   ├── termos/                       # Termos de uso
│   ├── privacidade/                  # Política de privacidade
│   └── (platform)/                   # Rotas autenticadas
│       ├── dashboard/
│       ├── trilhas/
│       ├── projetos/
│       ├── perfil/[username]/
│       ├── busca/
│       ├── configuracoes/
│       └── certificado/[slug]/
│
├── components/
│   ├── layout/     # Navbar, Sidebar (drawer mobile), Footer, DashboardLayout
│   ├── cards/      # TrilhaCard, ProjectCard, BadgeCard
│   ├── content/    # CodeBlock, Callout
│   ├── navigation/ # Breadcrumb, TableOfContents, PaginationNavigation
│   ├── progress/   # ProgressBar, ProgressRing
│   ├── sections/   # Hero, Benefits, HowItWorks, Testimonials
│   └── ui/         # Button, Badge, Card, EmptyState
│
├── data/           # Dados mockados (trilhas, módulos, projetos)
├── lib/
│   ├── types.ts
│   ├── utils.ts
│   └── hooks/useProgresso.ts   # Progresso persistido em localStorage
└── public/
    └── favicon_io/             # Ícones da plataforma
```

## 🎨 Paleta de Cores

```css
--color-background: #0B1220
--color-surface:    #111827
--color-card:       #1F2937
--color-primary:    #3B82F6
--color-success:    #10B981
--color-text:       #F9FAFB
--color-secondary:  #9CA3AF
```

## 🚀 Como Executar

```bash
cd "Site Curso"
npm install
npm run dev
```

Acesse **http://localhost:3000**

## 📄 Páginas Implementadas

### Públicas
- `/` — Landing page (Hero, Benefits, HowItWorks, Testimonials, Trilhas, CTA)
- `/login` — Login com e-mail/senha e social (Google, GitHub, Facebook, X)
- `/cadastro` — Cadastro com validação e social login
- `/recuperar-senha` — Recuperação de senha
- `/onboarding` — Fluxo de 3 etapas pós-cadastro
- `/planos` — Planos Grátis/Pro/Vitalício com contador de oferta e cupons
- `/blog` — Listagem de artigos
- `/blog/[slug]` — Post individual com conteúdo real
- `/comunidade` — Discord, GitHub, X e regras
- `/documentacao` — Guias e FAQ
- `/termos` — Termos de uso
- `/privacidade` — Política de privacidade (LGPD)

### Plataforma (autenticadas)
- `/dashboard` — Métricas, trilhas em andamento, atividades recentes
- `/trilhas` — Grid com filtros por dificuldade
- `/trilhas/[slug]` — Trilha com módulos, progresso e link para certificado
- `/trilhas/[slug]/modulos/[id]/conteudo` — Conteúdo com sidebar e TOC
- `/trilhas/[slug]/modulos/[id]/exercicios/[id]` — Exercício com dicas progressivas
- `/trilhas/[slug]/modulos/[id]/quiz` — Quiz com feedback e tela de resultado
- `/trilhas/[slug]/modulos/[id]/projeto` — Projeto com checklist interativo
- `/projetos` — Grid com filtros por status e dificuldade
- `/projetos/[id]` — Projeto com checklist
- `/perfil/[username]` — Perfil com upload de avatar
- `/busca` — Busca global com parâmetro de URL
- `/configuracoes` — Perfil, senha, notificações, conta
- `/certificado/[slug]` — Certificado visual com impressão/compartilhamento

## 🎯 Próximos Passos (requer backend)

1. **Autenticação** — NextAuth.js ou Clerk
2. **Banco de dados** — Supabase (PostgreSQL + Auth + Storage)
3. **Persistência de progresso** — API Routes + banco
4. **Checkout** — Stripe
5. **Certificados dinâmicos** — Geração com dados reais do usuário

## 👨‍💻 Desenvolvido por

EstudaCode Team
