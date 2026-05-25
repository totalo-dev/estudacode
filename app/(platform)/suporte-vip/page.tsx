import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import { Crown, Zap, MessageCircle, Mail, Video, Clock, CheckCircle } from "lucide-react";

const canais = [
  {
    icone: MessageCircle,
    titulo: "Chat Prioritário",
    descricao: "Acesso ao canal VIP no Discord com resposta garantida em até 4 horas úteis.",
    cta: "Entrar no canal VIP",
    href: "#",
    cor: "text-indigo-400",
    corBg: "bg-indigo-500/10",
    badge: "Resposta em 4h",
  },
  {
    icone: Mail,
    titulo: "E-mail VIP",
    descricao: "Fila prioritária de e-mail. Sua dúvida vai para o topo da fila de atendimento.",
    cta: "vip@estudacode.com",
    href: "mailto:vip@estudacode.com",
    cor: "text-yellow-500",
    corBg: "bg-yellow-500/10",
    badge: "Fila prioritária",
  },
  {
    icone: Video,
    titulo: "Sessão ao Vivo",
    descricao: "Agende uma sessão de 30 minutos com um instrutor para resolver dúvidas complexas.",
    cta: "Agendar sessão",
    href: "#",
    cor: "text-success",
    corBg: "bg-success/10",
    badge: "30 min / mês",
  },
];

const beneficios = [
  "Resposta garantida em até 4 horas úteis",
  "Canal exclusivo no Discord",
  "1 sessão ao vivo por mês com instrutor",
  "Revisão de código personalizada",
  "Acesso antecipado a novos conteúdos",
  "Badge exclusiva de membro VIP no perfil",
];

export default function SuporteVipPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Cabeçalho */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <Crown size={24} className="text-yellow-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-text">Suporte VIP</h1>
              <span className="text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2.5 py-0.5 rounded-full">
                Pro & Vitalício
              </span>
            </div>
            <p className="text-secondary">Atendimento prioritário exclusivo para assinantes Pro e Vitalício.</p>
          </div>
        </div>

        {/* Canais VIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {canais.map((canal) => {
            const Icone = canal.icone;
            return (
              <Card key={canal.titulo} className="flex flex-col relative overflow-hidden">
                {/* Badge */}
                <span className="absolute top-3 right-3 text-xs font-semibold bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/20">
                  {canal.badge}
                </span>

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${canal.corBg}`}>
                  <Icone size={20} className={canal.cor} />
                </div>
                <h2 className="text-base font-semibold text-text mb-1">{canal.titulo}</h2>
                <p className="text-secondary text-sm mb-4 flex-1">{canal.descricao}</p>
                <a
                  href={canal.href}
                  target={canal.href.startsWith("http") ? "_blank" : undefined}
                  rel={canal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <Zap size={13} />
                  {canal.cta}
                </a>
              </Card>
            );
          })}
        </div>

        {/* SLA */}
        <div className="flex items-center gap-3 px-4 py-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl text-sm text-secondary">
          <Clock size={16} className="text-yellow-500 flex-shrink-0" />
          <span>SLA VIP: <span className="text-text font-medium">resposta em até 4 horas úteis</span> via chat e e-mail. Sessões ao vivo disponíveis de seg a sex, das 9h às 18h.</span>
        </div>

        {/* Benefícios */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Seus benefícios VIP</h2>
          <Card>
            <ul className="space-y-3">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-text">{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
