import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Users, MessageSquare, Github, Twitter, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Comunidade",
};

const canais = [
  {
    icone: MessageSquare,
    nome: "Discord",
    descricao: "Tire dúvidas em tempo real, compartilhe projetos e conecte-se com outros alunos.",
    membros: "2.400+ membros",
    cor: "text-indigo-400",
    corBg: "bg-indigo-500/10",
    href: "https://discord.gg/estudacode",
    cta: "Entrar no Discord",
  },
  {
    icone: Github,
    nome: "GitHub",
    descricao: "Veja projetos de outros alunos, contribua com código e mostre seu portfólio.",
    membros: "800+ repositórios",
    cor: "text-text",
    corBg: "bg-surface",
    href: "https://github.com/estudacode",
    cta: "Ver no GitHub",
  },
  {
    icone: Twitter,
    nome: "X (Twitter)",
    descricao: "Acompanhe novidades, dicas rápidas e interaja com a comunidade dev.",
    membros: "1.200+ seguidores",
    cor: "text-text",
    corBg: "bg-surface",
    href: "https://x.com/estudacode",
    cta: "Seguir no X",
  },
];

const regras = [
  "Seja respeitoso com todos os membros",
  "Compartilhe conhecimento, não apenas dúvidas",
  "Evite spam e autopromoção excessiva",
  "Use os canais corretos para cada assunto",
  "Dê crédito quando usar código de outros",
];

export default function ComunidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Comunidade EstudaCode</h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Aprenda junto com milhares de desenvolvedores. Tire dúvidas, compartilhe projetos e cresça na carreira.
            </p>
          </div>

          {/* Canais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {canais.map((canal) => {
              const Icone = canal.icone;
              return (
                <Card key={canal.nome} className="flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${canal.corBg}`}>
                    <Icone size={24} className={canal.cor} />
                  </div>
                  <h2 className="text-xl font-semibold text-text mb-2">{canal.nome}</h2>
                  <p className="text-secondary text-sm mb-3 flex-1">{canal.descricao}</p>
                  <p className="text-xs text-secondary mb-4">{canal.membros}</p>
                  <a href={canal.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">
                      {canal.cta}
                      <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </a>
                </Card>
              );
            })}
          </div>

          {/* Regras */}
          <Card>
            <h2 className="text-xl font-semibold text-text mb-4">📋 Regras da Comunidade</h2>
            <ul className="space-y-2">
              {regras.map((regra, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-secondary">
                  <span className="text-primary font-semibold flex-shrink-0">{i + 1}.</span>
                  <span>{regra}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
