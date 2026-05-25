import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Trilha, Modulo } from "@/lib/types";

interface ModuleSidebarProps {
  trilha: Trilha;
  todosModulos: Modulo[];
  moduloAtualId: string;
}

export default function ModuleSidebar({
  trilha,
  todosModulos,
  moduloAtualId,
}: ModuleSidebarProps) {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-surface border-r border-card p-6 overflow-y-auto flex-col md:left-64">
      <Link
        href={`/trilhas/${trilha.slug}`}
        className="flex items-center space-x-2 text-secondary hover:text-text mb-6"
      >
        <ChevronLeft size={20} />
        <span className="text-sm">Voltar para trilha</span>
      </Link>

      <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
        {trilha.nome}
      </h3>

      <ul className="space-y-1">
        {todosModulos.map((m, i) => (
          <li key={m.id}>
            <Link
              href={`/trilhas/${trilha.slug}/modulos/${m.id}/conteudo`}
              className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                m.id === moduloAtualId
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-secondary hover:text-text hover:bg-card"
              }`}
            >
              {i + 1}. {m.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
