# EstudaCode

Plataforma de aprendizado de programação focada em prática — trilhas com conteúdo escrito, exercícios, quizzes e projetos reais.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** · **Framer Motion** · **Lucide React**

## Estrutura

```
├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── (platform)/         # Rotas autenticadas (dashboard, trilhas, projetos...)
│   ├── blog/
│   ├── planos/
│   └── ...                 # Demais páginas públicas
├── components/             # Componentes reutilizáveis
│   ├── cards/
│   ├── content/
│   ├── layout/
│   ├── navigation/
│   ├── progress/
│   ├── sections/
│   └── ui/
├── data/                   # Dados mockados (trilhas, módulos, projetos, conteúdo)
├── lib/
│   ├── auth/               # Sessão e logout
│   ├── contexts/           # AuthContext, NotificacoesContext
│   ├── hooks/              # useProgresso, useAuth, useAvatar
│   ├── services/           # Service layer — única porta de acesso aos dados
│   ├── types.ts
│   └── utils.ts
├── public/
│   └── favicon_io/
└── docs/                   # Documentação do projeto
```

## Início rápido

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`

## Planos

| Plano | Acesso |
|---|---|
| Grátis | Trilha Demo |
| Pro | Todas as trilhas + certificados |
| Vitalício | Acesso permanente + Suporte VIP |

## Documentação

Toda a documentação está em [`/docs`](./docs):

- [`DEVELOPMENT.md`](./docs/DEVELOPMENT.md) — guia de desenvolvimento e convenções
- [`DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — cores, componentes e tokens
- [`PROJECT_OVERVIEW.md`](./docs/PROJECT_OVERVIEW.md) — arquitetura e roadmap
- [`TODO.md`](./docs/TODO.md) — tarefas pendentes

## Próximos passos (requer backend)

- Autenticação real (Supabase + NextAuth.js ou Clerk)
- Persistência de progresso via API
- Checkout Stripe
- Dados reais do perfil e certificados
