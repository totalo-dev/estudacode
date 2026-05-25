import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import { MessageCircle, Mail, BookOpen, ExternalLink, Clock } from "lucide-react";
import Link from "next/link";

const canais = [
  {
    icone: MessageCircle,
    titulo: "Discord da Comunidade",
    descricao: "Tire dúvidas com outros alunos e instrutores em tempo real.",
    cta: "Entrar no Discord",
    href: "#",
    cor: "text-indigo-400",
    corBg: "bg-indigo-500/10",
  },
  {
    icone: Mail,
    titulo: "E-mail de Suporte",
    descricao: "Envie sua dúvida por e-mail. Respondemos em até 48 horas úteis.",
    cta: "suporte@estudacode.com",
    href: "mailto:suporte@estudacode.com",
    cor: "text-primary",
    corBg: "bg-primary/10",
  },
  {
    icone: BookOpen,
    titulo: "Documentação",
    descricao: "Consulte guias, tutoriais e respostas para as dúvidas mais comuns.",
    cta: "Ver documentação",
    href: "/documentacao",
    cor: "text-success",
    corBg: "bg-success/10",
  },
];

const faqs = [
  {
    pergunta: "Como acompanho meu progresso nas trilhas?",
    resposta: "Acesse o Dashboard para ver um resumo do seu progresso geral, ou entre em cada trilha para ver o avanço módulo a módulo.",
  },
  {
    pergunta: "Posso acessar o conteúdo offline?",
    resposta: "Atualmente o conteúdo é acessado online. O suporte a PWA e modo offline está no nosso roadmap.",
  },
  {
    pergunta: "Como obtenho meu certificado?",
    resposta: "Ao concluir 100% de uma trilha, o certificado fica disponível automaticamente em /certificado/[slug-da-trilha].",
  },
  {
    pergunta: "Posso cancelar meu plano a qualquer momento?",
    resposta: "Sim. Planos pagos têm 7 dias de garantia e podem ser cancelados sem perguntas.",
  },
];

export default function SuportePage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Suporte</h1>
          <p className="text-secondary">Como podemos ajudar? Escolha o canal mais adequado para sua dúvida.</p>
        </div>

        {/* Canais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {canais.map((canal) => {
            const Icone = canal.icone;
            return (
              <Card key={canal.titulo} className="flex flex-col">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${canal.corBg}`}>
                  <Icone size={20} className={canal.cor} />
                </div>
                <h2 className="text-base font-semibold text-text mb-1">{canal.titulo}</h2>
                <p className="text-secondary text-sm mb-4 flex-1">{canal.descricao}</p>
                <a
                  href={canal.href}
                  target={canal.href.startsWith("http") ? "_blank" : undefined}
                  rel={canal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-blue-400 transition-colors"
                >
                  {canal.cta}
                  <ExternalLink size={13} />
                </a>
              </Card>
            );
          })}
        </div>

        {/* Tempo de resposta */}
        <div className="flex items-center gap-3 px-4 py-3 bg-surface border border-card rounded-xl text-sm text-secondary">
          <Clock size={16} className="text-secondary flex-shrink-0" />
          <span>Tempo médio de resposta por e-mail: <span className="text-text font-medium">até 48 horas úteis</span>. Para respostas mais rápidas, use o Discord.</span>
        </div>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Perguntas frequentes</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <Card key={faq.pergunta}>
                <h3 className="text-text font-medium text-sm mb-1.5">{faq.pergunta}</h3>
                <p className="text-secondary text-sm leading-relaxed">{faq.resposta}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA upgrade */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="text-text font-semibold mb-1">Quer suporte prioritário?</p>
          <p className="text-secondary text-sm mb-4">Usuários Pro e Vitalício têm acesso ao Suporte VIP com resposta em até 4 horas.</p>
          <Link
            href="/planos"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Ver planos
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
