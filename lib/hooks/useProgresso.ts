"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Persiste o progresso do aluno no localStorage.
 * Chave: "estudacode:progresso"
 *
 * Estrutura salva:
 * {
 *   topicos: { [topicoId]: boolean },
 *   modulos: { [moduloId]: boolean },
 * }
 *
 * Quando o backend for implementado, substitua as leituras/escritas
 * do localStorage por chamadas à API, mantendo a mesma interface.
 */

interface ProgressoState {
  topicos: Record<string, boolean>;
  modulos: Record<string, boolean>;
}

const STORAGE_KEY = "estudacode:progresso";

function carregarProgresso(): ProgressoState {
  if (typeof window === "undefined") return { topicos: {}, modulos: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { topicos: {}, modulos: {} };
  } catch {
    return { topicos: {}, modulos: {} };
  }
}

function salvarProgresso(estado: ProgressoState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch {
    // localStorage indisponível (modo privado, storage cheio, etc.)
  }
}

export function useProgresso() {
  const [progresso, setProgresso] = useState<ProgressoState>({ topicos: {}, modulos: {} });

  // Carrega do localStorage na montagem
  useEffect(() => {
    setProgresso(carregarProgresso());
  }, []);

  /** Marca ou desmarca um tópico como concluído */
  const toggleTopico = useCallback((topicoId: string, concluido: boolean) => {
    setProgresso((prev) => {
      const novo = {
        ...prev,
        topicos: { ...prev.topicos, [topicoId]: concluido },
      };
      salvarProgresso(novo);
      return novo;
    });
  }, []);

  /** Marca ou desmarca um módulo como concluído */
  const toggleModulo = useCallback((moduloId: string, concluido: boolean) => {
    setProgresso((prev) => {
      const novo = {
        ...prev,
        modulos: { ...prev.modulos, [moduloId]: concluido },
      };
      salvarProgresso(novo);
      return novo;
    });
  }, []);

  /** Retorna se um tópico está concluído (localStorage tem prioridade sobre o dado mockado) */
  const topicosConcluido = useCallback(
    (topicoId: string, fallback = false): boolean => {
      return progresso.topicos[topicoId] ?? fallback;
    },
    [progresso]
  );

  /** Retorna se um módulo está concluído */
  const moduloConcluido = useCallback(
    (moduloId: string, fallback = false): boolean => {
      return progresso.modulos[moduloId] ?? fallback;
    },
    [progresso]
  );

  /** Calcula o progresso percentual de uma lista de tópicos */
  const calcularProgresso = useCallback(
    (topicoIds: string[], fallbacks: boolean[] = []): number => {
      if (topicoIds.length === 0) return 0;
      const concluidos = topicoIds.filter((id, i) =>
        progresso.topicos[id] ?? fallbacks[i] ?? false
      ).length;
      return Math.round((concluidos / topicoIds.length) * 100);
    },
    [progresso]
  );

  /** Limpa todo o progresso salvo */
  const limparProgresso = useCallback(() => {
    const vazio = { topicos: {}, modulos: {} };
    setProgresso(vazio);
    salvarProgresso(vazio);
  }, []);

  return {
    progresso,
    toggleTopico,
    toggleModulo,
    topicosConcluido,
    moduloConcluido,
    calcularProgresso,
    limparProgresso,
  };
}
