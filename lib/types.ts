export type Difficulty = "iniciante" | "intermediario" | "avancado";

export interface Trilha {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  dificuldade: Difficulty;
  duracaoEstimada: string;
  totalModulos: number;
  progresso: number;
  cor: string;
  icone: string;
}

export interface Modulo {
  id: string;
  trilhaId: string;
  ordem: number;
  titulo: string;
  descricao: string;
  duracaoEstimada: string;
  concluido: boolean;
  topicos: Topico[];
}

export interface Topico {
  id: string;
  moduloId: string;
  tipo: "conteudo" | "exercicio" | "quiz" | "projeto";
  titulo: string;
  ordem: number;
  concluido: boolean;
}

export interface Exercicio {
  id: string;
  titulo: string;
  enunciado: string;
  contexto: string;
  dicas: string[];
  solucao: string;
  explicacao: string;
}

export interface QuizQuestion {
  id: string;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  objetivos: string[];
  requisitos: string[];
  dificuldade: Difficulty;
  checklist: ChecklistItem[];
  progresso: number;
}

export interface ChecklistItem {
  id: string;
  texto: string;
  concluido: boolean;
}

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  conquistado: boolean;
  dataConquista?: string;
}

export interface UserProgress {
  trilhasEmAndamento: number;
  trilhasConcluidas: number;
  projetosConcluidos: number;
  exerciciosResolvidos: number;
  quizzesCompletos: number;
  badges: Badge[];
  progressoGeral: number;
}
