"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { PlanoUsuario } from "@/lib/types";

/**
 * AuthContext — contexto de usuário autenticado (mock).
 *
 * Fonte de dados:
 *   - Cookie `estudacode-token`  → indica se está logado
 *   - localStorage `estudacode:plano` → plano atual
 *   - localStorage `estudacode:user`  → nome e email salvos no cadastro/configurações
 *
 * Quando o backend existir, substitua `carregarUsuario` por uma chamada
 * à API de sessão (ex: /api/me), mantendo a mesma interface do contexto.
 */

export interface AuthUser {
  nome: string;
  email: string;
  username: string;
  plano: PlanoUsuario;
  logado: boolean;
  isPro: boolean;
  isVitalicio: boolean;
  isFree: boolean;
}

interface AuthContextValue extends AuthUser {
  /** Atualiza nome/email localmente (persiste no localStorage) */
  atualizarPerfil: (dados: Partial<Pick<AuthUser, "nome" | "email" | "username">>) => void;
}

const DEFAULTS: AuthUser = {
  nome: "Usuário",
  email: "usuario@email.com",
  username: "usuario",
  plano: "gratis",
  logado: false,
  isPro: false,
  isVitalicio: false,
  isFree: true,
};

function lerPlano(): PlanoUsuario {
  try {
    const v = localStorage.getItem("estudacode:plano");
    if (v === "pro" || v === "vitalicio") return v;
  } catch {}
  return "gratis";
}

function lerUser(): Pick<AuthUser, "nome" | "email" | "username"> {
  try {
    const raw = localStorage.getItem("estudacode:user");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { nome: DEFAULTS.nome, email: DEFAULTS.email, username: DEFAULTS.username };
}

function estaLogado(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("estudacode-token");
}

const AuthContext = createContext<AuthContextValue>({
  ...DEFAULTS,
  atualizarPerfil: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(DEFAULTS);

  useEffect(() => {
    const logado = estaLogado();
    if (!logado) {
      setUser({ ...DEFAULTS, logado: false });
      return;
    }

    const plano = lerPlano();
    const { nome, email, username } = lerUser();

    setUser({
      nome,
      email,
      username,
      plano,
      logado: true,
      isPro: plano === "pro",
      isVitalicio: plano === "vitalicio",
      isFree: plano === "gratis",
    });
  }, []);

  const atualizarPerfil = useCallback(
    (dados: Partial<Pick<AuthUser, "nome" | "email" | "username">>) => {
      setUser((prev) => {
        const novo = { ...prev, ...dados };
        try {
          localStorage.setItem(
            "estudacode:user",
            JSON.stringify({ nome: novo.nome, email: novo.email, username: novo.username })
          );
        } catch {}
        return novo;
      });
    },
    []
  );

  return (
    <AuthContext.Provider value={{ ...user, atualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  return useContext(AuthContext);
}
