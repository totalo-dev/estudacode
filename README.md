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
│   ├── sitemap.ts                    # Sitemap automático com trilhas dinâmicas
│   ├── robots.ts                     # Robots.txt
│   ├── globals.css                   # Reset + Tailwind + CSS variables de tema
│   ├── login/
│   ├── cadastro/
│   ├── recuperar-senha/
│   ├── onboarding/
│   ├── planos/
│   ├── blog/
│   ├── comunidade/
│   ├── documentacao/
│   ├── termos/
│   ├── privacidade/
│   └── (platform)/                   # Rotas autenticadas
│       ├── dashboard/
│       ├── trilhas/
│       │   └── [slug]/
│       │       └── modulos/
│       │           └── [moduloId]/
│       │               └── conteudo/
│       │                   ├── page.tsx          # Server Component enxuto (44 linhas)
│       │                   └── _components/      # Co-location: componentes desta rota
│       │                       ├── ArticleContent.tsx  # Client — progresso via useProgresso
│       │                       ├── ModuleSidebar.tsx   # Server
│       │                       └── ModuleTocAside.tsx  # Server
│       ├── projetos/
│       ├── perfil/[username]/
│       ├── busca/
│       ├── configuracoes/
│       └── certificado/[slug]/
│
├── components/
│   ├── layout/     # Navbar, Sidebar, Footer, DashboardLayout + index.ts
│   ├── cards/      # TrilhaCard, ProjectCard, BadgeCard, StatsCard + index.ts
│   ├── content/    # CodeBlock, Callout + index.ts
│   ├── navigation/ # Breadcrumb, TableOfContents, PaginationNavigation + index.ts
│   ├── progress/   # ProgressBar, ProgressRing + index.ts
│   ├── sections/   # Hero, Benefits, HowItWorks, Testimonials + index.ts
│   └── ui/         # Button, Badge, Card, EmptyState + index.ts
│
├── data/
│   ├── trilhas.ts      # Dados mockados de trilhas
│   ├── modulos.ts      # Dados mockados de módulos
│   ├── projetos.ts     # Dados mockados de projetos
│   ├── exercicios.ts   # Dados de exercícios
│   ├── quizzes.ts      # Dados de quizzes
│   └── conteudo.ts     # ConteudoTopico + getConteudo()
│
├── lib/
│   ├── types.ts
│   ├── utils.ts
│   ├── hooks/
│   │   └── useProgresso.ts        # Progresso persistido em localStorage
│   └── services/                  # Service Layer — única porta de acesso aos dados
│       ├── trilhas.service.ts     # getTrilhas, getTrilhaBySlug, getDashboardStats...
│       ├── modulos.service.ts     # getModulosBySlug, getModuloConteudo...
│       └── projetos.service.ts    # getProjetos, getProjetoById...
│
└── public/
    └── favicon_io/
```

## 🏗️ Arquitetura

### Service Layer
Todas as páginas importam dados exclusivamente via `lib/services/`. O `data/` nunca é acessado diretamente pelas páginas — facilitando a troca por chamadas reais ao backend no futuro.

```tsx
// ✅ Correto
import { getTrilhas } from "@/lib/services/trilhas.service";

// ❌ Evitar
import { trilhas } from "@/data/trilhas";
```

### Barrel Exports
Cada pasta de `components/` tem um `index.ts`. Use sempre o caminho curto:

```tsx
// ✅ Correto
import { Button, Badge } from "@/components/ui";

// ❌ Verboso (ainda funciona)
import Button from "@/components/ui/Button";
```

### Co-location
Componentes usados por apenas uma rota vivem em `_components/` dentro da própria rota:

```
app/(platform)/trilhas/[slug]/modulos/[moduloId]/conteudo/
├── page.tsx
└── _components/
    ├── ArticleContent.tsx
    ├── ModuleSidebar.tsx
    └── ModuleTocAside.tsx
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
cd estudacode
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
- `/dashboard` — Métricas data-driven, trilhas em andamento, atividades recentes
- `/trilhas` — Grid com filtros por dificuldade
- `/trilhas/[slug]` — Trilha com módulos, progresso e link para certificado
- `/trilhas/[slug]/modulos/[id]/conteudo` — Conteúdo com sidebar, TOC e progresso real
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
3. **Persistência de progresso** — API Routes + banco (interface `useProgresso` já preparada)
4. **Checkout** — Stripe
5. **Certificados dinâmicos** — Geração com dados reais do usuário

## 👨‍💻 Desenvolvido por

EstudaCode Team
