import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { BookOpen, Code2, Zap, Settings, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Documentação",
};

const secoes = [
  {
    icone: Zap,
    titulo: "Início Rápido",
    descricao: "Crie sua conta, escolha uma trilha e comece a aprender em menos de 5 minutos.",
    links: [
      { label: "Criar conta gratuita", href: "/cadastro" },
      { label: "Explorar trilhas", href: "/trilhas" },
      { label: "Ver planos", href: "/planos" },
    ],
  },
  {
    icone: BookOpen,
    titulo: "Trilhas de Aprendizado",
    descricao: "Entenda como as trilhas funcionam, como acompanhar seu progresso e como aproveitar ao máximo.",
    links: [
      { label: "Como funcionam as trilhas", href: "/trilhas" },
      { label: "Tipos de conteúdo", href: "/trilhas" },
      { label: "Sistema de progresso", href: "/dashboard" },
    ],
  },
  {
    icone: Code2,
    titulo: "Exercícios e Quizzes",
    descricao: "Saiba como usar o editor de código, interpretar feedback e aproveitar as dicas progressivas.",
    links: [
      { label: "Como resolver exercícios", href: "/trilhas" },
      { label: "Sistema de dicas", href: "/trilhas" },
      { label: "Quizzes e pontuação", href: "/trilhas" },
    ],
  },
  {
    icone: Settings,
    titulo: "Conta e Configurações",
    descricao: "Gerencie seu perfil, preferências de notificação, senha e dados da conta.",
    links: [
      { label: "Editar perfil", href: "/configuracoes" },
      { label: "Alterar senha", href: "/configuracoes" },
      { label: "Notificações", href: "/configuracoes" },
    ],
  },
];

const faq = [
  {
    pergunta: "O plano gratuito tem limite de tempo?",
    resposta: "Não. O plano gratuito dá acesso permanente à trilha demo, sem prazo de expiração.",
  },
  {
    pergunta: "Posso cancelar o plano Pro a qualquer momento?",
    resposta: "Sim. Você pode cancelar quando quiser. Planos têm garantia de 7 dias para reembolso integral.",
  },
  {
    pergunta: "Os certificados são reconhecidos pelo mercado?",
    resposta: "Os certificados da EstudaCode atestam a conclusão das trilhas. Muitas empresas valorizam certificados de plataformas práticas, especialmente quando acompanhados de projetos no portfólio.",
  },
  {
    pergunta: "Posso acessar em dispositivos móveis?",
    resposta: "Sim. A plataforma é totalmente responsiva e funciona em smartphones e tablets.",
  },
  {
    pergunta: "Como funciona o suporte?",
    resposta: "Plano gratuito: comunidade no Discord. Plano Pro: suporte prioritário por e-mail. Plano Vitalício: suporte VIP.",
  },
];

export default function DocumentacaoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Documentação</h1>
            <p className="text-xl text-secondary">Tudo que você precisa saber para aproveitar ao máximo a EstudaCode.</p>
          </div>

          {/* Seções */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {secoes.map((secao) => {
              const Icone = secao.icone;
              return (
                <Card key={secao.titulo} className="flex flex-col">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icone size={20} className="text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-text">{secao.titulo}</h2>
                  </div>
                  <p className="text-secondary text-sm mb-4">{secao.descricao}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {secao.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-sm text-primary hover:text-blue-400 transition-colors"
                        >
                          <ArrowRight size={13} />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <Card key={item.pergunta}>
                  <h3 className="text-text font-semibold mb-2">{item.pergunta}</h3>
                  <p className="text-secondary text-sm">{item.resposta}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
