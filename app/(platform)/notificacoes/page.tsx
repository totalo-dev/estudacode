"use client";

import { Bell, CheckCircle2, Check, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { useNotificacoes } from "@/lib/contexts/NotificacoesContext";
import { useRouter } from "next/navigation";

export default function NotificacoesPage() {
  const { notificacoes, naoLidas, marcarComoLida, marcarTodasLidas } = useNotificacoes();
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Botão de retorno — topo */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-secondary hover:text-text transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Cabeçalho */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Bell className="text-primary" size={24} />
            Notificações
            {naoLidas > 0 && (
              <span className="ml-1 text-xs font-semibold bg-primary text-white px-2 py-0.5 rounded-full">
                {naoLidas}
              </span>
            )}
          </h1>
          <p className="text-secondary mt-1 text-sm">
            {naoLidas > 0
              ? `Você tem ${naoLidas} notificaç${naoLidas === 1 ? "ão não lida" : "ões não lidas"}`
              : "Tudo em dia — nenhuma notificação pendente"}
          </p>
        </div>

        {naoLidas > 0 && (
          <Button variant="outline" size="sm" onClick={marcarTodasLidas}>
            <Check size={14} className="mr-1.5" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {/* Lista */}
      <div className="bg-surface border border-card rounded-xl overflow-hidden divide-y divide-card">
        {notificacoes.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 transition-colors ${
              notif.lida ? "opacity-70 hover:bg-card" : "bg-primary/5 hover:bg-primary/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="mt-1.5 flex-shrink-0">
                  {notif.lida ? (
                    <CheckCircle2 size={16} className="text-success" />
                  ) : (
                    <span className="block w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm ${notif.lida ? "text-secondary" : "text-text"}`}>
                    {notif.titulo}
                  </h3>
                  <p className="text-secondary text-sm mt-0.5 leading-relaxed">{notif.descricao}</p>
                  <span className="text-xs text-secondary/70 mt-2 block">{notif.tempo}</span>
                </div>
              </div>

              {!notif.lida && (
                <button
                  onClick={() => marcarComoLida(notif.id)}
                  className="flex-shrink-0 text-xs text-primary hover:text-blue-400 transition-colors font-medium whitespace-nowrap mt-0.5"
                  aria-label={`Marcar "${notif.titulo}" como lida`}
                >
                  Marcar como lida
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Estado vazio */}
      {notificacoes.length === 0 && (
        <div className="text-center py-16">
          <Bell size={40} className="mx-auto text-secondary opacity-30 mb-3" />
          <p className="text-secondary text-sm">Nenhuma notificação ainda.</p>
        </div>
      )}

      {/* Botão de retorno — rodapé */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-secondary hover:text-text transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>
    </div>
  );
}
