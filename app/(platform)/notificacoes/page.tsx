import { Bell, CheckCircle2 } from "lucide-react";

export default function NotificacoesPage() {
  const todasNotificacoes = [
    {
      id: 1,
      titulo: "Novo módulo liberado! 🎉",
      descricao: "O módulo \"React Hooks Avançados\" já está disponível na sua trilha.",
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
    },
    {
      id: 4,
      titulo: "Bem-vindo ao EstudaCode!",
      descricao: "Comece sua primeira trilha de estudos e acelere sua carreira.",
      tempo: "Há 1 semana",
      lida: true,
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Bell className="text-primary" size={24} />
            Todas as Notificações
          </h1>
          <p className="text-secondary mt-1">Acompanhe seus alertas e novidades da plataforma.</p>
        </div>
      </div>

      <div className="bg-surface border border-card rounded-xl overflow-hidden">
        {todasNotificacoes.map((notif) => (
          <div key={notif.id} className={`p-5 border-b border-card last:border-b-0 hover:bg-card transition-colors ${notif.lida ? 'opacity-80' : 'bg-primary/5'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-text font-medium flex items-center gap-2">
                  {!notif.lida && <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block shrink-0" />}
                  {notif.titulo}
                </h3>
                <p className="text-secondary mt-1">{notif.descricao}</p>
                <span className="text-xs text-primary mt-2 block">{notif.tempo}</span>
              </div>
              {notif.lida && (
                <CheckCircle2 size={18} className="text-success shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
