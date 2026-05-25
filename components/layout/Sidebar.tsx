"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, FolderKanban, User, LogOut, Menu, X, HelpCircle, Crown } from "lucide-react";
import Image from "next/image";
import { logout } from "@/lib/auth/session";
import { useAuth } from "@/lib/hooks/useAuth";

const navigationBase = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trilhas", href: "/trilhas", icon: BookOpen },
  { name: "Projetos", href: "/projetos", icon: FolderKanban },
  { name: "Perfil", href: "/perfil/usuario", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [aberta, setAberta] = useState(false);
  const { isPro, isVitalicio } = useAuth();
  const isPremium = isPro || isVitalicio;

  const conteudo = (
    <>
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setAberta(false)}>
          <Image src="/favicon_io/web-app-manifest-192x192.png" alt="EstudaCode" width={32} height={32} className="object-contain" />
          <span className="text-xl font-bold text-text">EstudaCode</span>
        </Link>
        <button
          className="md:hidden text-secondary hover:text-text"
          onClick={() => setAberta(false)}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigationBase.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setAberta(false)}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-secondary hover:text-text hover:bg-card"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

        {/* Separador de suporte */}
        <div className="pt-2 pb-1">
          <p className="px-4 text-xs font-semibold text-secondary/50 uppercase tracking-wider">Suporte</p>
        </div>

        {/* Suporte — todos os planos */}
        <Link
          href="/suporte"
          onClick={() => setAberta(false)}
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
            pathname === "/suporte"
              ? "bg-primary/10 text-primary"
              : "text-secondary hover:text-text hover:bg-card"
          )}
        >
          <HelpCircle size={20} />
          <span className="font-medium">Suporte</span>
        </Link>

        {/* Suporte VIP — apenas Pro e Vitalício */}
        {isPremium && (
          <Link
            href="/suporte-vip"
            onClick={() => setAberta(false)}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              pathname === "/suporte-vip"
                ? "bg-yellow-500/10 text-yellow-500"
                : "text-secondary hover:text-text hover:bg-card"
            )}
          >
            <Crown size={20} className={pathname === "/suporte-vip" ? "text-yellow-500" : ""} />
            <span className="font-medium">Suporte VIP</span>
            <span className="ml-auto text-xs font-semibold bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded-full border border-yellow-500/20">
              VIP
            </span>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-card">
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-secondary hover:text-text hover:bg-card transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Botão hamburger — só aparece em mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-card rounded-lg text-text"
        onClick={() => setAberta(true)}
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay mobile */}
      {aberta && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setAberta(false)}
        />
      )}

      {/* Sidebar desktop — sempre visível */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-surface border-r border-card flex-col z-30">
        {conteudo}
      </aside>

      {/* Sidebar mobile — drawer deslizante */}
      <aside
        className={cn(
          "md:hidden fixed left-0 top-0 h-screen w-64 bg-surface border-r border-card flex flex-col z-50 transition-transform duration-300",
          aberta ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {conteudo}
      </aside>
    </>
  );
}
