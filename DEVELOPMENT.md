# 🛠️ Guia de Desenvolvimento — EstudaCode

## Configuração Inicial

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### Instalação

```bash
git clone <repository-url>
cd "Site Curso"
npm install
npm run dev
```

Acesse `http://localhost:3000`

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # ESLint
```

## Estrutura de Arquivos

### Convenções de Nomenclatura
- **Componentes:** PascalCase — `Button.tsx`, `TrilhaCard.tsx`
- **Utilitários:** camelCase — `utils.ts`, `types.ts`
- **Rotas:** kebab-case — `/trilhas/[slug]`

### Organização de Imports

```tsx
// 1. Externos
import { useState } from "react";
import Link from "next/link";

// 2. Componentes
import Button from "@/components/ui/Button";

// 3. Dados/utils
import { trilhas } from "@/data/trilhas";
import { cn } from "@/lib/utils";

// 4. Tipos
import type { Trilha } from "@/lib/types";
```

## Criando Novos Componentes

```tsx
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
}

export default function Component({ className }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* Conteúdo */}
    </div>
  );
}
```

## Trabalhando com Dados

### Adicionando Nova Trilha

`data/trilhas.ts`:
```typescript
{
  id: "7",
  slug: "nova-trilha",
  nome: "Nova Trilha",
  descricao: "Descrição da trilha",
  dificuldade: "intermediario",
  duracaoEstimada: "50h",
  totalModulos: 10,
  progresso: 0,
  cor: "#3B82F6",
  icone: "🚀",
}
```

`data/modulos.ts`:
```typescript
"nova-trilha": [
  {
    id: "1",
    trilhaId: "nova-trilha",
    ordem: 1,
    titulo: "Módulo 1",
    descricao: "Descrição",
    duracaoEstimada: "5h",
    concluido: false,
    topicos: [
      { id: "1-1", moduloId: "1", tipo: "conteudo", titulo: "Tópico 1", ordem: 1, concluido: false },
      { id: "1-2", moduloId: "1", tipo: "exercicio", titulo: "Exercício 1", ordem: 2, concluido: false },
      { id: "1-3", moduloId: "1", tipo: "quiz", titulo: "Quiz 1", ordem: 3, concluido: false },
    ]
  }
]
```

## Estilização

### Cores (CSS Variables)

```tsx
bg-background   // #0B1220 — fundo principal
bg-surface      // #111827 — superfícies elevadas
bg-card         // #1F2937 — cards
bg-primary      // #3B82F6 — ações primárias
bg-success      // #10B981 — sucesso
text-text       // #F9FAFB — texto principal
text-secondary  // #9CA3AF — texto secundário
```

### Classes Condicionais

```tsx
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-class"
)}>
```

## Rotas

```
/                                           → Landing page
/login                                      → Login
/cadastro                                   → Cadastro
/recuperar-senha                            → Recuperar senha
/onboarding                                 → Onboarding pós-cadastro
/planos                                     → Planos e preços
/blog                                       → Blog
/blog/[slug]                                → Post individual
/comunidade                                 → Comunidade
/documentacao                               → Documentação
/termos                                     → Termos de uso
/privacidade                                → Política de privacidade
/dashboard                                  → Dashboard
/trilhas                                    → Lista de trilhas
/trilhas/[slug]                             → Trilha individual
/trilhas/[slug]/modulos/[id]/conteudo       → Conteúdo
/trilhas/[slug]/modulos/[id]/exercicios/[id]→ Exercício
/trilhas/[slug]/modulos/[id]/quiz           → Quiz
/trilhas/[slug]/modulos/[id]/projeto        → Projeto do módulo
/projetos                                   → Lista de projetos
/projetos/[id]                              → Projeto individual
/perfil/[username]                          → Perfil
/busca                                      → Busca global (?q=termo)
/configuracoes                              → Configurações
/certificado/[slug]                         → Certificado da trilha
```

## SEO

### Metadata por página

```tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Título da Página",
    description: "Descrição específica",
  };
}
```

O `layout.tsx` raiz define o template `"%s | EstudaCode"` — basta retornar o título.

### Sitemap e Robots

- `app/sitemap.ts` — gerado automaticamente, inclui trilhas dinâmicas
- `app/robots.ts` — bloqueia `/dashboard`, `/perfil`, `/configuracoes`, `/onboarding`, `/busca`

### JSON-LD (dados estruturados)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: trilha.nome,
      description: trilha.descricao,
      provider: { "@type": "Organization", name: "EstudaCode" },
    }),
  }}
/>
```

## Segurança

### Security Headers (`next.config.js`)

| Header | Proteção |
|---|---|
| `X-Frame-Options: SAMEORIGIN` | Clickjacking |
| `X-Content-Type-Options: nosniff` | MIME sniffing |
| `Strict-Transport-Security` | Força HTTPS 1 ano |
| `Permissions-Policy` | Câmera, microfone, geolocalização |
| `Content-Security-Policy` | Origens de scripts e recursos |
| `Referrer-Policy` | Dados de referrer |

`poweredByHeader: false` — não expõe a stack.

### Boas práticas ao adicionar backend

- Variáveis de ambiente: nunca use `NEXT_PUBLIC_` para secrets
- Validação: use `zod` em todos os formulários e API Routes
- Rate limiting: `@upstash/ratelimit` com Redis
- Autenticação: NextAuth.js ou Clerk
- Queries: sempre parametrizadas, nunca concatenação de strings SQL

## Hook de Progresso

```tsx
import { useProgresso } from "@/lib/hooks/useProgresso";

function MeuComponente() {
  const { toggleTopico, topicosConcluido, calcularProgresso } = useProgresso();

  // Marcar tópico como concluído
  toggleTopico("topico-id", true);

  // Verificar se está concluído
  const concluido = topicosConcluido("topico-id", false);

  // Calcular progresso de uma lista
  const pct = calcularProgresso(["id1", "id2", "id3"]);
}
```

Quando o backend existir, substitua as leituras/escritas do localStorage por chamadas à API mantendo a mesma interface.

## Animações

```tsx
import { motion } from "framer-motion";

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Stagger em lista
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
))}
```

## Boas Práticas

1. Use `"use client"` apenas quando necessário (useState, useEffect, eventos)
2. Importe de `@/` para paths absolutos
3. Use `cn()` para merge de classes Tailwind
4. Sempre defina tipos para props
5. Evite `any` — use tipos do `lib/types.ts`

## Deploy

### Vercel (Recomendado)
1. Conecte o repositório GitHub
2. Vercel detecta Next.js automaticamente
3. Deploy automático em cada push para main

### Build Local
```bash
npm run build
npm run start
```

## Troubleshooting

### Erro: Module not found
```bash
Remove-Item -Recurse -Force node_modules, .next
npm install
```

### Porta em uso
```bash
npm run dev -- -p 3001
```

### TypeScript error no VS Code
`Ctrl+Shift+P` → "TypeScript: Restart TS Server"

## Próximas Features (requer backend)

### Alta prioridade
- [ ] Autenticação (NextAuth.js ou Clerk)
- [ ] Supabase — banco + auth + storage
- [ ] Persistência de progresso via API
- [ ] Checkout Stripe

### Média prioridade
- [ ] Dashboard com dados reais
- [ ] Perfil com dados reais
- [ ] Certificados gerados dinamicamente
- [ ] Notificações funcionais

### Baixa prioridade
- [ ] Sistema de comentários por módulo
- [ ] Fórum da comunidade
- [ ] PWA
- [ ] Internacionalização
