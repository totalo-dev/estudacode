"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { Bell, Search, User, Settings, LogOut, BookOpen, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useAvatar } from "@/lib/hooks/useAvatar";
import { logout } from "@/lib/auth/session";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [buscaValor, setBuscaValor] = useState("");
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const { avatarUrl } = useAvatar();
  
  const [listaNotificacoes, setListaNotificacoes] = useState([
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
      lida: true,
    },
    {
      id: 3,
      titulo: "Certificado disponível",
      descricao: "Parabéns! Você concluiu a trilha de Fundamentos.",
      tempo: "Há 2 dias",
      lida: true,
    }
  ]);

  const temNaoLida = listaNotificacoes.some(n => !n.lida);

  const marcarTodasLidas = () => {
    setListaNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
  };

  const perfilRef = useRef<HTMLDivElement>(null);
  const notificacoesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fecha o popup ao clicar fora
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (perfilRef.current && !perfilRef.current.contains(e.target as Node)) {
        setPerfilAberto(false);
      }
    }
    if (perfilAberto) {
      document.addEventListener("mousedown", handleClickFora);
    }
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [perfilAberto]);

  // Fecha o popup de notificações ao clicar fora
  useEffect(() => {
    function handleClickForaNotificacoes(e: MouseEvent) {
      if (notificacoesRef.current && !notificacoesRef.current.contains(e.target as Node)) {
        setNotificacoesAberto(false);
      }
    }
    if (notificacoesAberto) {
      document.addEventListener("mousedown", handleClickForaNotificacoes);
    }
    return () => document.removeEventListener("mousedown", handleClickForaNotificacoes);
  }, [notificacoesAberto]);

  // Fecha popups ao pressionar Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPerfilAberto(false);
        setNotificacoesAberto(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Redireciona busca ao pressionar Enter
  function handleBusca(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && buscaValor.trim()) {
      router.push(`/busca?q=${encodeURIComponent(buscaValor.trim())}`);
      setBuscaValor("");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Desktop: ml-64 | Mobile: sem margem (sidebar é drawer) */}
      <div className="md:ml-64">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-surface">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">

            {/* Espaço para o botão hamburger no mobile */}
            <div className="w-10 md:hidden" />

            {/* Busca — oculta em mobile, visível em md+ */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                <input
                  type="text"
                  value={buscaValor}
                  onChange={(e) => setBuscaValor(e.target.value)}
                  onKeyDown={handleBusca}
                  placeholder="Buscar trilhas, projetos... (Enter para buscar)"
                  className="w-full bg-surface border border-card rounded-lg pl-10 pr-4 py-2 text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Busca mobile */}
              <Link href="/busca" className="md:hidden p-2 text-secondary hover:text-text transition-colors" aria-label="Buscar">
                <Search size={20} />
              </Link>

              {/* Notificações */}
              <div className="relative" ref={notificacoesRef}>
                <button
                  onClick={() => setNotificacoesAberto((v) => !v)}
                  className="relative p-2 text-secondary hover:text-text transition-colors"
                  aria-label="Notificações"
                  aria-expanded={notificacoesAberto}
                >
                  <Bell size={20} />
                  {/* Ponto indicativo de notificação não lida */}
                  {temNaoLida && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>

                {/* Dropdown de Notificações */}
                {notificacoesAberto && (
                  <div className="absolute right-0 top-12 w-80 bg-surface border border-card rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-card flex items-center justify-between">
                      <span className="text-text font-semibold">Notificações</span>
                      {temNaoLida && (
                        <button onClick={marcarTodasLidas} className="text-xs text-primary hover:text-blue-400 transition-colors">
                          Marcar todas lidas
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {listaNotificacoes.map((notif) => (
                        <div key={notif.id} className={`px-4 py-3 border-b border-card hover:bg-card transition-colors cursor-pointer ${notif.lida ? 'opacity-70' : 'bg-primary/5'}`}>
                          <p className="text-sm text-text font-medium flex items-center gap-2">
                            {!notif.lida && <span className="w-2 h-2 rounded-full bg-primary inline-block shrink-0" />}
                            <span className={notif.lida ? "ml-4" : ""}>{notif.titulo}</span>
                          </p>
                          <p className="text-xs text-secondary mt-1 ml-4">{notif.descricao}</p>
                          <p className="text-xs text-secondary mt-2 ml-4">{notif.tempo}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-card p-2">
                      <Link href="/notificacoes" onClick={() => setNotificacoesAberto(false)} className="block w-full text-center text-sm text-primary hover:text-blue-400 transition-colors py-1">
                        Ver todas
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar + Popup */}
              <div className="relative" ref={perfilRef}>
                <button
                  onClick={() => setPerfilAberto((v) => !v)}
                  aria-label="Menu do perfil"
                  aria-expanded={perfilAberto}
                  className="flex items-center space-x-2 group"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-transparent group-hover:ring-primary/50 transition-all text-sm overflow-hidden relative">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      "U"
                    )}
                  </div>
                </button>

                {/* Dropdown */}
                {perfilAberto && (
                  <div className="absolute right-0 top-12 w-64 bg-surface border border-card rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">

                    <div className="px-4 py-4 border-b border-card">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden relative">
                          {avatarUrl ? (
                            <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                          ) : (
                            "U"
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-text font-semibold truncate">Usuário</p>
                          <p className="text-secondary text-xs truncate">usuario@email.com</p>
                        </div>
                      </div>
                    </div>

                    <nav className="py-2">
                      <Link href="/perfil/usuario" onClick={() => setPerfilAberto(false)} className="flex items-center justify-between px-4 py-2.5 text-secondary hover:text-text hover:bg-card transition-colors group">
                        <div className="flex items-center space-x-3">
                          <User size={16} />
                          <span className="text-sm font-medium">Meu Perfil</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link href="/trilhas" onClick={() => setPerfilAberto(false)} className="flex items-center justify-between px-4 py-2.5 text-secondary hover:text-text hover:bg-card transition-colors group">
                        <div className="flex items-center space-x-3">
                          <BookOpen size={16} />
                          <span className="text-sm font-medium">Minhas Trilhas</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <Link href="/configuracoes" onClick={() => setPerfilAberto(false)} className="flex items-center justify-between px-4 py-2.5 text-secondary hover:text-text hover:bg-card transition-colors group">
                        <div className="flex items-center space-x-3">
                          <Settings size={16} />
                          <span className="text-sm font-medium">Configurações</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </nav>

                    <div className="border-t border-card" />
                    <div className="py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPerfilAberto(false);
                          logout();
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                      >
                        <LogOut size={16} />
                        <span className="text-sm font-medium">Sair</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
