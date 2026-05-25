# 📚 Guia de Conteúdo — EstudaCode

Como criar e estruturar conteúdo educacional na plataforma.

---

## Estrutura de Conteúdo

```
Trilha
  └── Módulo
        ├── Tópico: conteudo   → /trilhas/[slug]/modulos/[id]/conteudo
        ├── Tópico: exercicio  → /trilhas/[slug]/modulos/[id]/exercicios/[id]
        ├── Tópico: quiz       → /trilhas/[slug]/modulos/[id]/quiz
        └── Tópico: projeto    → /projetos/[id]
```

---

## Criando uma Trilha

Adicione em `data/trilhas.ts`:

```typescript
import { Trilha } from "@/lib/types";

{
  id: "7",                          // ID único
  slug: "python-basico",            // URL-friendly, único
  nome: "Python Básico",            // Nome exibido
  descricao: "Aprenda Python do zero com projetos práticos.",
  dificuldade: "iniciante",         // "iniciante" | "intermediario" | "avancado"
  duracaoEstimada: "45h",           // Estimativa total
  totalModulos: 8,                  // Deve bater com os módulos criados
  progresso: 0,                     // 0 a 100 (mockado)
  cor: "#F59E0B",                   // Cor de destaque (hex)
  icone: "🐍",                      // Emoji representativo
}
```

### Slugs das trilhas existentes

| Slug | Trilha |
|---|---|
| `fundamentos-web` | Fundamentos Web |
| `react-moderno` | React Moderno |
| `typescript-avancado` | TypeScript Avançado |
| `nextjs-fullstack` | Next.js Full Stack |
| `nodejs-backend` | Node.js Backend |
| `design-systems` | Design Systems |

---

## Criando Módulos

Adicione em `data/modulos.ts` usando o slug da trilha como chave:

```typescript
"python-basico": [
  {
    id: "py-1",                     // ID único (prefixo + número)
    trilhaId: "python-basico",      // Deve bater com o slug
    ordem: 1,                       // Ordem de exibição
    titulo: "Introdução ao Python",
    descricao: "Variáveis, tipos e operadores básicos",
    duracaoEstimada: "4h",
    concluido: false,
    topicos: [
      {
        id: "py-1-1",
        moduloId: "py-1",
        tipo: "conteudo",           // "conteudo" | "exercicio" | "quiz" | "projeto"
        titulo: "O que é Python?",
        ordem: 1,
        concluido: false,
      },
      {
        id: "py-1-2",
        moduloId: "py-1",
        tipo: "conteudo",
        titulo: "Variáveis e Tipos",
        ordem: 2,
        concluido: false,
      },
      {
        id: "py-1-3",
        moduloId: "py-1",
        tipo: "exercicio",
        titulo: "Calculadora Simples",
        ordem: 3,
        concluido: false,
      },
      {
        id: "py-1-4",
        moduloId: "py-1",
        tipo: "quiz",
        titulo: "Quiz: Python Básico",
        ordem: 4,
        concluido: false,
      },
    ],
  },
]
```

### Tipos de Tópico

| Tipo | Rota gerada | Descrição |
|---|---|---|
| `conteudo` | `/modulos/[id]/conteudo` | Leitura com CodeBlock e Callout |
| `exercicio` | `/modulos/[id]/exercicios/[id]` | Editor de código com validação |
| `quiz` | `/modulos/[id]/quiz` | Múltipla escolha com feedback |
| `projeto` | `/projetos/[id]` | Checklist de desenvolvimento |

---

## Escrevendo Conteúdo (página de conteúdo)

A página `conteudo/page.tsx` usa componentes React diretamente. Estrutura recomendada:

```tsx
<article className="prose prose-invert max-w-none">
  <h1 id="introducao" className="text-4xl font-bold text-text mb-4">
    Título do Módulo
  </h1>

  <p className="text-lg text-secondary mb-8">
    Parágrafo introdutório explicando o que será aprendido.
  </p>

  {/* Pré-requisito */}
  <Callout type="info" title="Pré-requisitos">
    Conhecimento necessário antes de começar.
  </Callout>

  <h2 id="conceito-1" className="text-2xl font-bold text-text mt-12 mb-4">
    Conceito Principal
  </h2>

  <p className="text-text mb-4">Explicação do conceito...</p>

  {/* Exemplo de código */}
  <CodeBlock code={`// código aqui`} language="javascript" />

  {/* Dica */}
  <Callout type="success" title="Dica">
    Dica prática para o aluno.
  </Callout>

  <h2 id="conclusao" className="text-2xl font-bold text-text mt-12 mb-4">
    Conclusão
  </h2>

  <p className="text-text mb-4">Resumo do que foi aprendido.</p>
</article>
```

### Tipos de Callout

```tsx
<Callout type="info" title="Informação">Contexto adicional</Callout>
<Callout type="warning" title="Atenção">Algo importante a notar</Callout>
<Callout type="success" title="Dica">Boas práticas</Callout>
<Callout type="error" title="Erro Comum">O que evitar</Callout>
```

### Table of Contents

Atualize o array `tocItems` na página para refletir os `id` dos headings:

```typescript
const tocItems = [
  { id: "introducao", title: "Introdução", level: 1 },
  { id: "conceito-1", title: "Conceito Principal", level: 1 },
  { id: "exemplo", title: "Exemplo Prático", level: 2 },
  { id: "conclusao", title: "Conclusão", level: 1 },
];
```

---

## Criando Exercícios

A página de exercício (`exercicios/[exercicioId]/page.tsx`) tem:

- **Enunciado** — o que o aluno deve fazer
- **Contexto** — por que isso é importante
- **Dica** — hint progressivo (toggle)
- **Editor** — textarea para o código
- **Verificação** — lógica de validação
- **Solução** — código correto com explicação

### Lógica de validação atual

```typescript
const handleVerify = () => {
  if (userCode.includes("useState")) {
    setFeedback({ type: "success", message: "Correto!" });
  } else {
    setFeedback({ type: "error", message: "Tente novamente." });
  }
};
```

Para exercícios futuros, adapte a condição de validação conforme o exercício.

---

## Criando Quizzes

A página de quiz (`quiz/page.tsx`) usa um array de questões local:

```typescript
const questions = [
  {
    id: 1,
    pergunta: "Qual é a sintaxe correta para...?",
    opcoes: [
      "Opção A",
      "Opção B",   // ← respostaCorreta: 1 (índice 0-based)
      "Opção C",
      "Opção D",
    ],
    respostaCorreta: 1,
    explicacao: "Explicação de por que B é correto.",
  },
];
```

### Boas práticas para quizzes

- 4 opções por questão
- 1 resposta claramente correta
- Explicação que ensina, não apenas confirma
- Misture questões conceituais e práticas
- Evite pegadinhas — o objetivo é reforçar aprendizado

---

## Criando Projetos

Adicione em `data/projetos.ts`:

```typescript
{
  id: "4",
  titulo: "Blog com Next.js",
  descricao: "Crie um blog completo com Next.js, Markdown e deploy na Vercel.",
  objetivos: [
    "Praticar rotas dinâmicas do Next.js",
    "Trabalhar com arquivos Markdown",
    "Fazer deploy na Vercel",
  ],
  requisitos: [
    "Página inicial com lista de posts",
    "Página individual de post",
    "Suporte a Markdown",
    "Deploy funcional",
  ],
  dificuldade: "intermediario",
  checklist: [
    { id: "1", texto: "Configurar projeto Next.js", concluido: false },
    { id: "2", texto: "Criar estrutura de posts em Markdown", concluido: false },
    { id: "3", texto: "Implementar página de listagem", concluido: false },
    { id: "4", texto: "Implementar página individual", concluido: false },
    { id: "5", texto: "Fazer deploy na Vercel", concluido: false },
  ],
  progresso: 0,
}
```

### Projetos existentes

| ID | Título | Dificuldade |
|---|---|---|
| `1` | Todo App com React | iniciante |
| `2` | Dashboard Analytics | intermediário |
| `3` | E-commerce com Next.js | avançado |

---

## Checklist de Qualidade

Antes de publicar conteúdo, verifique:

### Trilha
- [ ] Slug único e URL-friendly (sem acentos, espaços ou maiúsculas)
- [ ] `totalModulos` bate com os módulos criados em `data/modulos.ts`
- [ ] Ícone emoji representativo
- [ ] Dificuldade correta

### Módulo
- [ ] IDs únicos (use prefixo da trilha: `py-1`, `py-2`)
- [ ] `trilhaId` bate com o slug da trilha
- [ ] Tópicos em ordem lógica
- [ ] Pelo menos 1 tópico de cada tipo relevante

### Conteúdo
- [ ] IDs nos headings para o ToC funcionar
- [ ] `tocItems` atualizado
- [ ] CodeBlock com linguagem correta
- [ ] Callouts usados para destacar informações importantes
- [ ] PaginationNavigation com links corretos

### Exercício
- [ ] Enunciado claro e objetivo
- [ ] Dica útil sem entregar a solução
- [ ] Lógica de validação adequada
- [ ] Solução com explicação didática

### Quiz
- [ ] Mínimo de 5 questões
- [ ] Explicações que ensinam
- [ ] `respostaCorreta` com índice correto (0-based)

### Projeto
- [ ] Checklist com tarefas granulares e acionáveis
- [ ] Objetivos de aprendizado claros
- [ ] Requisitos funcionais específicos
