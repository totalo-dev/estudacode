# 🎨 Design System — EstudaCode

## Filosofia

Design minimalista e focado, inspirado em Linear, Vercel e GitBook. Dark mode nativo, sem modo claro. Atenção aos detalhes: espaçamento generoso, tipografia clara, feedback visual consistente.

---

## 🎨 Paleta de Cores

Definida em `tailwind.config.ts` como tokens customizados:

```typescript
colors: {
  background: "#0B1220",  // Fundo principal da aplicação
  surface:    "#111827",  // Superfícies secundárias (sidebar, header)
  card:       "#1F2937",  // Cards e containers
  primary:    "#3B82F6",  // Azul — ações primárias, links, destaques
  success:    "#10B981",  // Verde — conclusão, sucesso, progresso
  text:       "#F9FAFB",  // Texto principal
  secondary:  "#9CA3AF",  // Texto secundário, placeholders
}
```

### Uso das Cores

| Token | Uso |
|---|---|
| `background` | `bg-background` — fundo de todas as páginas |
| `surface` | `bg-surface` — sidebar, header, inputs |
| `card` | `bg-card` — cards, bordas, separadores |
| `primary` | `text-primary`, `bg-primary` — botões, links ativos, badges |
| `success` | `text-success`, `bg-success/10` — conclusão, feedback positivo |
| `text` | `text-text` — todo texto principal |
| `secondary` | `text-secondary` — subtítulos, labels, placeholders |

### Cores Adicionais (Tailwind padrão)
- `text-orange-500` — dificuldade avançada, projetos
- `text-purple-500` — horas de estudo
- `text-red-500` — erros, respostas incorretas
- `text-yellow-500` — badges especiais

---

## 📝 Tipografia

Fonte: **Inter** (via `fontFamily.sans` no Tailwind)

```typescript
fontFamily: {
  sans: ["Inter", "sans-serif"],
}
```

### Escala de Tamanhos

| Classe | Uso |
|---|---|
| `text-xs` | Labels, datas, metadados |
| `text-sm` | Texto secundário, descrições curtas |
| `text-base` | Texto de corpo padrão |
| `text-lg` | Subtítulos menores |
| `text-xl` | Títulos de seção dentro de cards |
| `text-2xl` | Títulos de seção de página |
| `text-3xl` | Títulos de página (h1) |
| `text-4xl` | Títulos de landing page |

### Pesos
- `font-medium` — labels, navegação
- `font-semibold` — subtítulos
- `font-bold` — títulos principais

---

## 📐 Espaçamento

Base de 4px (padrão Tailwind). Valores mais usados no projeto:

| Classe | Valor | Uso |
|---|---|---|
| `p-4` | 16px | Padding interno de cards pequenos |
| `p-6` | 24px | Padding padrão de cards |
| `p-8` | 32px | Padding de seções e layouts |
| `space-y-4` | 16px | Espaço entre itens de lista |
| `space-y-6` | 24px | Espaço entre seções |
| `space-y-8` | 32px | Espaço entre blocos maiores |
| `gap-6` | 24px | Gap padrão em grids |
| `mb-2` | 8px | Espaço após títulos |
| `mb-4` | 16px | Espaço após subtítulos |

---

## 🧩 Componentes UI

### Button

```tsx
// Variantes
<Button variant="primary">Ação principal</Button>
<Button variant="secondary">Ação secundária</Button>
<Button variant="ghost">Ação sutil</Button>
<Button variant="outline">Ação com borda</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio (padrão)</Button>
<Button size="lg">Grande</Button>

// Estados
<Button disabled>Desabilitado</Button>
<Button type="submit">Submit</Button>
```

Implementado com `forwardRef` para compatibilidade com bibliotecas de formulário.

### Card

```tsx
<Card>Conteúdo padrão</Card>
<Card hover>Com hover effect (border + shadow azul)</Card>
<Card className="p-4">Padding customizado</Card>
```

### Badge

```tsx
<Badge variant="default">Padrão</Badge>
<Badge variant="primary">Primário</Badge>
<Badge variant="success">Sucesso</Badge>
<Badge variant="secondary">Secundário</Badge>
```

### EmptyState

```tsx
<EmptyState
  icon={Search}
  title="Nenhum resultado"
  description="Tente outros termos."
  action={{ label: "Limpar", onClick: () => {} }}
/>
```

---

## 🔄 Animações

Biblioteca: **Framer Motion**

### Padrões de Animação

```tsx
// Fade in ao montar
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Stagger em listas
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  animate="show"
>

// Hover scale
<motion.div whileHover={{ scale: 1.02 }}>
```

### Transições CSS (Tailwind)
- `transition-colors` — mudanças de cor (hover em links e botões)
- `transition-all duration-200` — transições gerais de cards
- `transition-all` — formulários e inputs

---

## 📐 Layout

### DashboardLayout
- Sidebar fixa: `w-64` (256px) à esquerda
- Header sticky: `h-16` com backdrop blur
- Conteúdo: `ml-64 p-8`

### Conteúdo (GitBook-style)
- Sidebar esquerda: `w-64` fixa
- Conteúdo central: `ml-64 mr-80 px-16 py-8`
- ToC direita: `w-80` fixa

### Grids
```css
/* Cards de trilhas/projetos */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Stats do dashboard */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6

/* Exercício (enunciado + editor) */
grid-cols-1 lg:grid-cols-2 gap-6
```

---

## 🎯 Padrões de Interação

### Hover States
- Links de navegação: `text-secondary hover:text-text`
- Cards com `hover` prop: `hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10`
- Botões: variante define o hover (ex: `hover:bg-blue-600`)

### Focus States
- Inputs: `focus:ring-2 focus:ring-primary focus:border-transparent`
- Botões: `focus:ring-2 focus:ring-primary focus:ring-offset-2`

### Disabled States
- `disabled:opacity-50 disabled:cursor-not-allowed`

### Loading States
- Spinner SVG animado com `animate-spin`
- Botão desabilitado durante loading

---

## 📱 Responsividade

| Breakpoint | Largura | Comportamento |
|---|---|---|
| Mobile | < 640px | 1 coluna, menu hamburger |
| sm | 640px+ | — |
| md | 768px+ | 2 colunas, menu desktop |
| lg | 1024px+ | 3 colunas, sidebar visível |
| xl | 1280px+ | Layout completo |

### Sidebar
- Desktop (md+): fixa à esquerda, sempre visível
- Mobile: oculta; Navbar tem menu hamburger

---

## ♿ Acessibilidade

- `aria-label` em botões sem texto visível (toggle senha, notificações, busca)
- `aria-hidden="true"` em SVGs decorativos
- `autoComplete` correto em todos os campos de formulário
- `type="button"` explícito em botões dentro de forms
- Focus states visíveis em todos os elementos interativos
- Landmarks semânticos: `<nav>`, `<main>`, `<aside>`, `<footer>`
- Contraste adequado com tokens de cor definidos

> ⚠️ Validação completa de acessibilidade requer testes manuais com leitores de tela.
