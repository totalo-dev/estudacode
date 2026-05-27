"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Notificacao {
  id: number;
  titulo: string;
  descricao: string;
  tempo: string;
  lida: boolean;
}

interface NotificacoesContextValue {
  notificacoes: Notificacao[];
  naoLidas: number;
  marcarComoLida: (id: number) => void;
  marcarTodasLidas: () => void;
}

const notificacoesIniciais: Notificacao[] = [
  {
    id: 1,
    titulo: "Novo módulo liberado! 🎉",
    descricao: 'O módulo "React Hooks Avançados" já está disponível na sua trilha.',
    tempo: "Há 2 horas",
    lida: false,
  },
  {
    id: 2,
    titulo: "Lembrete de prática",
    descricao: "Você não faz exercícios há 3 dias. Que tal praticar hoje?",
    tempo: "Ontem",
    lida: false,
  },
  {
    id: 3,
    titulo: "Certificado disponível",
    descricao: "Parabéns! Você concluiu a trilha de Fundamentos.",
    tempo: "Há 2 dias",
    lida: true,
  },
  {
    id: 4,
    titulo: "Bem-vindo ao EstudaCode!",
    descricao: "Comece sua primeira trilha de estudos e acelere sua carreira.",
    tempo: "Há 1 semana",
    lida: true,
  },
];

const NotificacoesContext = createContext<NotificacoesContextValue>({
  notificacoes: notificacoesIniciais,
  naoLidas: 2,
  marcarComoLida: () => {},
  marcarTodasLidas: () => {},
});

export function NotificacoesProvider({ children }: { children: ReactNode }) {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(notificacoesIniciais);

  const marcarComoLida = useCallback((id: number) => {
    setNotificacoes((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  }, []);

  const marcarTodasLidas = useCallback(() => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  }, []);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <NotificacoesContext.Provider value={{ notificacoes, naoLidas, marcarComoLida, marcarTodasLidas }}>
      {children}
    </NotificacoesContext.Provider>
  );
}

export function useNotificacoes(): NotificacoesContextValue {
  return useContext(NotificacoesContext);
}
