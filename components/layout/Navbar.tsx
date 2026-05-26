"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { Menu, X, Search, User, Settings, LogOut, BookOpen, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAvatar } from "@/lib/hooks/useAvatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const perfilRef = useRef<HTMLDivElement>(null);
  const { avatarUrl } = useAvatar();

  useEffect(() => {
    // Checa se o usuário tem o cookie de autenticação mockada
    if (document.cookie.includes("estudacode-token")) {
      setIsLoggedIn(true);
    }
  }, []);

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
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon_io/web-app-manifest-192x192.png" alt="EstudaCode" width={32} height={32} className="object-contain" />
            <span className="text-xl font-bold text-text">EstudaCode</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/trilhas" className="text-secondary hover:text-text transition-colors">
              Trilhas
            </Link>
            <Link href="/projetos" className="text-secondary hover:text-text transition-colors">
              Projetos
            </Link>
            <Link href="/planos" className="text-secondary hover:text-text transition-colors">
              Planos
            </Link>
            <Link href="/dashboard" className="text-secondary hover:text-text transition-colors">
              Dashboard
            </Link>
            <Link href="/busca" className="text-secondary hover:text-text transition-colors" aria-label="Buscar">
              <Search size={18} />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard" className="text-sm font-medium text-secondary hover:text-text transition-colors">
                  Acessar Plataforma
                </Link>
                <div className="relative" ref={perfilRef}>
                  <button
                    onClick={() => setPerfilAberto((v) => !v)}
                    aria-label="Menu do perfil"
                    aria-expanded={perfilAberto}
                    className="flex items-center space-x-2 group focus:outline-none"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-transparent group-hover:ring-primary/50 transition-all text-sm overflow-hidden relative">
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
                          <div className="min-w-0 text-left">
                            <p className="text-text font-semibold truncate">Usuário</p>
                            <p className="text-secondary text-xs truncate">usuario@email.com</p>
                          </div>
                        </div>
                      </div>

                      <nav className="py-2 flex flex-col">
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
                          onClick={() => { 
                            setPerfilAberto(false); 
                            document.cookie = "estudacode-token=; path=/; max-age=0";
                            window.location.href = "/login";
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
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button variant="primary" size="sm">
                    Começar Agora
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <button
            className="md:hidden text-text"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-card">
          <div className="px-4 py-4 space-y-3">
            <Link href="/trilhas" className="block text-secondary hover:text-text transition-colors">
              Trilhas
            </Link>
            <Link href="/projetos" className="block text-secondary hover:text-text transition-colors">
              Projetos
            </Link>
            <Link href="/planos" className="block text-secondary hover:text-text transition-colors">
              Planos
            </Link>
            <Link href="/dashboard" className="block text-secondary hover:text-text transition-colors">
              Dashboard
            </Link>
            <div className="pt-3 space-y-2">
              {isLoggedIn ? (
                <Link href="/dashboard" className="block">
                  <Button variant="primary" size="sm" className="w-full">
                    Acessar Plataforma
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/cadastro" className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      Começar Agora
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
