"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Tema = "dark" | "light";

interface TemaContextType {
  tema: Tema;
  toggleTema: () => void;
}

const TemaContext = createContext<TemaContextType>({
  tema: "dark",
  toggleTema: () => {},
});

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>("dark");

  // Carrega preferência salva ou usa preferência do sistema
  useEffect(() => {
    const salvo = localStorage.getItem("estudacode:tema") as Tema | null;
    if (salvo === "light" || salvo === "dark") {
      aplicarTema(salvo);
      setTema(salvo);
    } else {
      const prefereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;
      const inicial: Tema = prefereClaro ? "light" : "dark";
      aplicarTema(inicial);
      setTema(inicial);
    }
  }, []);

  function aplicarTema(t: Tema) {
    const html = document.documentElement;
    if (t === "light") {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
  }

  const toggleTema = useCallback(() => {
    setTema((atual) => {
      const novo: Tema = atual === "dark" ? "light" : "dark";
      aplicarTema(novo);
      localStorage.setItem("estudacode:tema", novo);
      return novo;
    });
  }, []);

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
