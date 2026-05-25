"use client";

import { useState, useEffect } from "react";
import type { PlanoUsuario } from "@/lib/types";

/**
 * Hook de autenticação mockado.
 *
 * Lê o cookie `estudacode-token` para saber se o usuário está logado e
 * o localStorage `estudacode:plano` para saber o plano atual.
 *
 * Quando o backend for implementado, substitua a leitura do cookie/localStorage
 * por uma chamada à API de sessão, mantendo a mesma interface.
 *
 * Planos disponíveis: "gratis" | "pro" | "vitalicio"
 * Para testar, abra o console e execute:
 *   localStorage.setItem("estudacode:plano", "pro")   // ou "vitalicio" / "gratis"
 *   location.reload()
 */

function lerPlano(): PlanoUsuario {
  if (typeof window === "undefined") return "gratis";
  const salvo = localStorage.getItem("estudacode:plano");
  if (salvo === "pro" || salvo === "vitalicio") return salvo;
  return "gratis";
}

function estaLogado(): boolean {
  if (typeof window === "undefined") return false;
  return document.cookie.includes("estudacode-token");
}

export interface AuthState {
  logado: boolean;
  plano: PlanoUsuario;
  isPro: boolean;
  isVitalicio: boolean;
  isFree: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    logado: false,
    plano: "gratis",
    isPro: false,
    isVitalicio: false,
    isFree: true,
  });

  useEffect(() => {
    const logado = estaLogado();
    const plano = logado ? lerPlano() : "gratis";

    setState({
      logado,
      plano,
      isPro: plano === "pro",
      isVitalicio: plano === "vitalicio",
      isFree: plano === "gratis",
    });
  }, []);

  return state;
}

/**
 * Retorna true se o plano do usuário tem acesso ao plano exigido.
 * Hierarquia: vitalicio ≥ pro ≥ gratis
 */
export function temAcesso(planoUsuario: PlanoUsuario, planoNecessario: PlanoUsuario): boolean {
  const hierarquia: Record<PlanoUsuario, number> = { gratis: 0, pro: 1, vitalicio: 2 };
  return hierarquia[planoUsuario] >= hierarquia[planoNecessario];
}
