# ⚡ Quick Start — EstudaCode

## 🚀 Instalação em 5 Minutos

```bash
git clone <repository-url>
cd "Site Curso"
npm install
npm run dev
# Abra http://localhost:3000
```

## 📱 Páginas para Explorar

### Landing e Auth
- `http://localhost:3000/` — Landing page
- `http://localhost:3000/login` — Login
- `http://localhost:3000/cadastro` — Cadastro
- `http://localhost:3000/onboarding` — Onboarding
- `http://localhost:3000/planos` — Planos e preços

### Plataforma
- `http://localhost:3000/dashboard` — Dashboard
- `http://localhost:3000/trilhas` — Trilhas
- `http://localhost:3000/trilhas/react-moderno` — Trilha React
- `http://localhost:3000/trilhas/react-moderno/modulos/1/conteudo` — Conteúdo
- `http://localhost:3000/trilhas/react-moderno/modulos/2/exercicios/1` — Exercício
- `http://localhost:3000/trilhas/react-moderno/modulos/2/quiz` — Quiz
- `http://localhost:3000/projetos` — Projetos
- `http://localhost:3000/busca?q=react` — Busca
- `http://localhost:3000/configuracoes` — Configurações
- `http://localhost:3000/certificado/react-moderno` — Certificado

### Conteúdo
- `http://localhost:3000/blog` — Blog
- `http://localhost:3000/comunidade` — Comunidade
- `http://localhost:3000/documentacao` — Documentação

## 🎨 Componentes Principais

```tsx
import Button from "@/components/ui/Button";
<Button variant="primary" size="lg">Clique</Button>

import Card from "@/components/ui/Card";
<Card hover><p>Conteúdo</p></Card>

import ProgressBar from "@/components/progress/ProgressBar";
<ProgressBar value={45} showLabel />

import CodeBlock from "@/components/content/CodeBlock";
<CodeBlock code="const x = 1;" language="javascript" />

import Callout from "@/components/content/Callout";
<Callout type="info" title="Dica">Texto aqui</Callout>
```

## 🎯 Tarefas Comuns

### Adicionar Nova Trilha
1. `data/trilhas.ts` — adicionar objeto da trilha
2. `data/modulos.ts` — adicionar módulos com tópicos
3. `app/(platform)/trilhas/[slug]/modulos/[id]/conteudo/page.tsx` — adicionar conteúdo no objeto `conteudoPorTopico`

### Criar Novo Componente
```tsx
// components/ui/MeuComponente.tsx
interface Props { className?: string }

export default function MeuComponente({ className }: Props) {
  return <div className={cn("classes", className)} />;
}
```

### Adicionar Nova Página
```tsx
// app/minha-pagina/page.tsx
export const metadata = { title: "Minha Página" };

export default function MinhaPagina() {
  return <main>Conteúdo</main>;
}
```

## 🐛 Problemas Comuns

```bash
# Porta em uso
npm run dev -- -p 3001

# Módulo não encontrado
Remove-Item -Recurse -Force node_modules, .next
npm install

# TypeScript error no VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

## 🎨 Cores Rápidas

```tsx
bg-background  // #0B1220 — fundo
bg-surface     // #111827 — superfícies
bg-card        // #1F2937 — cards
bg-primary     // #3B82F6 — ações
bg-success     // #10B981 — sucesso
text-text      // #F9FAFB — texto principal
text-secondary // #9CA3AF — texto secundário
```

## 📚 Documentação Completa

| Arquivo | Conteúdo |
|---|---|
| `README.md` | Visão geral e estrutura |
| `DEVELOPMENT.md` | Guia completo de desenvolvimento |
| `DESIGN_SYSTEM.md` | Cores, tipografia, componentes |
| `CONTENT_GUIDE.md` | Como criar trilhas e conteúdo |
| `PROJECT_OVERVIEW.md` | Visão estratégica e roadmap |
| `INSTALLATION.md` | Instalação detalhada |
| `FEATURES.md` | Lista completa de features |
| `SUMMARY.md` | Resumo executivo |
