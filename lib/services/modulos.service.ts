import { modulos } from "@/data/modulos";
import { getConteudo } from "@/data/conteudo";
import type { Modulo } from "@/lib/types";

/** Retorna todos os módulos de uma trilha. */
export function getModulosBySlug(slug: string): Modulo[] {
  return modulos[slug] ?? [];
}

/** Retorna um módulo específico pelo id. */
export function getModuloById(slug: string, moduloId: string): Modulo | undefined {
  return getModulosBySlug(slug).find((m) => m.id === moduloId);
}

/**
 * Retorna todos os dados necessários para a page de conteúdo do módulo.
 * Retorna null se trilha ou módulo não forem encontrados.
 */
export function getModuloConteudo(slug: string, moduloId: string) {
  const listaModulos = getModulosBySlug(slug);
  const modulo       = listaModulos.find((m) => m.id === moduloId);
  if (!modulo) return null;

  const moduloIndex  = listaModulos.findIndex((m) => m.id === moduloId);
  const topicoAtual  = modulo.topicos.find((t) => t.tipo === "conteudo");
  const conteudo     = getConteudo(moduloId, 0, topicoAtual?.titulo ?? modulo.titulo);
  const concluidos   = modulo.topicos.filter((t) => t.concluido).length;

  return {
    modulo,
    listaModulos,
    moduloAnterior: listaModulos[moduloIndex - 1] as Modulo | undefined,
    moduloProximo:  listaModulos[moduloIndex + 1] as Modulo | undefined,
    conteudo,
    progresso: modulo.topicos.length > 0
      ? Math.round((concluidos / modulo.topicos.length) * 100)
      : 0,
  };
}
