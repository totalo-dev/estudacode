"use client";

import { Sun, Moon } from "lucide-react";
import { useTema } from "@/lib/contexts/TemaContext";

interface TemaToggleProps {
  className?: string;
}

export default function TemaToggle({ className = "" }: TemaToggleProps) {
  const { tema, toggleTema } = useTema();

  return (
    <button
      onClick={toggleTema}
      aria-label={tema === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      title={tema === "dark" ? "Modo claro" : "Modo escuro"}
      className={`relative p-2 rounded-lg text-secondary hover:text-text hover:bg-surface transition-colors ${className}`}
    >
      {tema === "dark" ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
