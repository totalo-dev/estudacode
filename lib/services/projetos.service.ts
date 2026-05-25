import { projetos } from "@/data/projetos";
import type { Projeto } from "@/lib/types";

/** Retorna todos os projetos. Amanhã: return await api.get('/projetos') */
export function getProjetos(): Projeto[] {
  return projetos;
}

/** Retorna projeto pelo id ou undefined se não encontrado. */
export function getProjetoById(id: string): Projeto | undefined {
  return projetos.find((p) => p.id === id);
}

/** Busca projetos por texto (título ou descrição). */
export function buscarProjetos(query: string): Projeto[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return projetos.filter(
    (p) =>
      p.titulo.toLowerCase().includes(q) ||
      p.descricao.toLowerCase().includes(q)
  );
}

/** Projetos filtrados por dificuldade. */
export function getProjetosByDificuldade(dificuldade: string): Projeto[] {
  if (dificuldade === "todas") return projetos;
  return projetos.filter((p) => p.dificuldade === dificuldade);
}
