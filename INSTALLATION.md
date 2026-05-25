# 📦 Guia de Instalação — EstudaCode

## Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** 9.0 ou superior
- **Git**

```bash
node --version  # v18+
npm --version   # 9+
git --version
```

## Instalação

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd "Site Curso"
```

### 2. Instale as Dependências

```bash
npm install
```

Dependências instaladas:
- `next` — Framework React
- `react` & `react-dom` — Biblioteca React
- `typescript` — Tipagem estática
- `tailwindcss` — Framework CSS
- `framer-motion` — Animações
- `lucide-react` — Ícones
- `clsx` & `tailwind-merge` — Utilitários CSS

### 3. Execute o Servidor

```bash
npm run dev
```

Acesse `http://localhost:3000`

## Comandos Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint
npx tsc --noEmit     # Verificar tipos TypeScript
```

## Estrutura Após Instalação

```
Site Curso/
├── node_modules/        # Dependências
├── .next/               # Build (gerado automaticamente)
├── app/                 # Páginas Next.js
├── components/          # Componentes React
├── data/                # Dados mockados
├── lib/                 # Utilitários e hooks
├── public/
│   └── favicon_io/      # Ícones da plataforma
├── package.json
├── tailwind.config.ts
├── next.config.js       # Security headers + otimizações
└── tsconfig.json
```

## Problemas Comuns

### Erro: "Cannot find module"
```bash
# PowerShell
Remove-Item -Recurse -Force node_modules, .next
npm install
```

### Porta 3000 em uso
```bash
npm run dev -- -p 3001
```

### Erro de TypeScript no VS Code
`Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Build falha com erro de memória
```bash
# Windows
set NODE_OPTIONS=--max_old_space_size=4096 && npm run build
```

## Configuração do Editor (VS Code)

Extensões recomendadas:
1. **Tailwind CSS IntelliSense** — autocomplete de classes
2. **ES7+ React/Redux snippets** — snippets React
3. **Prettier** — formatação automática
4. **ESLint** — linting em tempo real

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Variáveis de Ambiente

Para funcionalidades futuras (autenticação, banco de dados), crie `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# NextAuth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# OAuth (opcional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

**Importante:** Nunca commite `.env.local` no Git — já está no `.gitignore`.

## Verificação da Instalação

- [ ] `npm run dev` inicia sem erros
- [ ] `http://localhost:3000` abre a landing page
- [ ] Navegação funciona (Trilhas, Planos, Blog)
- [ ] Sem erros no console do navegador
- [ ] Hot reload funciona ao editar um arquivo

## Deploy

### Vercel (Recomendado)
1. Push para GitHub
2. Conecte no [vercel.com](https://vercel.com)
3. Deploy automático em cada push

### Build Local
```bash
npm run build
npm run start
```
