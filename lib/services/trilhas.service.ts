import { trilhas } from "@/data/trilhas";
import type { Trilha } from "@/lib/types";

/** Retorna todas as trilhas. Amanhã: return await api.get('/trilhas') */
export function getTrilhas(): Trilha[] {
  return trilhas;
}

/** Retorna trilha pelo slug ou undefined se não encontrada. */
export function getTrilhaBySlug(slug: string): Trilha | undefined {
  return trilhas.find((t) => t.slug === slug);
}

/** Trilhas com progresso iniciado mas não concluído. */
export function getTrilhasEmAndamento(): Trilha[] {
  return trilhas.filter((t) => t.progresso > 0 && t.progresso < 100);
}

/** Trilhas 100% concluídas. */
export function getTrilhasConcluidas(): Trilha[] {
  return trilhas.filter((t) => t.progresso === 100);
}

/** Trilhas filtradas por dificuldade. Retorna todas se filtro for "todas". */
export function getTrilhasByDificuldade(dificuldade: string): Trilha[] {
  if (dificuldade === "todas") return trilhas;
  return trilhas.filter((t) => t.dificuldade === dificuldade);
}

/** Busca trilhas por texto (nome ou descrição). */
export function buscarTrilhas(query: string): Trilha[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return trilhas.filter(
    (t) =>
      t.nome.toLowerCase().includes(q) ||
      t.descricao.toLowerCase().includes(q)
  );
}

/** Estatísticas agregadas para o dashboard. */
export function getDashboardStats() {
  const emAndamento = getTrilhasEmAndamento();
  const concluidas  = getTrilhasConcluidas();
  const progressoGeral =
    trilhas.length > 0
      ? Math.round(trilhas.reduce((acc, t) => acc + t.progresso, 0) / trilhas.length)
      : 0;

  return {
    progressoGeral,
    trilhasEmAndamento: emAndamento.length,
    trilhasConcluidas:  concluidas.length,
    projetosConcluidos: 8, // substituir por query real quando houver backend
  };
}
