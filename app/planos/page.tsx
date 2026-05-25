"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Check, Sparkles, Zap, Crown, ArrowLeft, Clock, Tag } from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Desconto por tempo limitado — 25%
const CUPONS: Record<string, { desconto: number; label: string }> = {
  "BETA25":    { desconto: 25, label: "25% de desconto — Oferta Beta" },
  "ESTUDACODE10": { desconto: 10, label: "10% de desconto — Bem-vindo!" },
  "DEV2026":   { desconto: 15, label: "15% de desconto — Dev 2026" },
};

// Desconto por tempo limitado — 25%
const DESCONTO = 0.25;

function CupomDesconto() {
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState<"idle" | "valido" | "invalido">("idle");
  const [cupomAtivo, setCupomAtivo] = useState<{ desconto: number; label: string } | null>(null);

  function aplicar() {
    const cupom = CUPONS[valor.trim().toUpperCase()];
    if (cupom) {
      setCupomAtivo(cupom);
      setStatus("valido");
    } else {
      setCupomAtivo(null);
      setStatus("invalido");
    }
  }

  function remover() {
    setValor("");
    setStatus("idle");
    setCupomAtivo(null);
  }

  return (
    <div className="mt-8 max-w-md mx-auto">
      <div className="flex items-center space-x-2 mb-3">
        <Tag size={16} className="text-secondary" />
        <span className="text-sm font-medium text-secondary">Tem um cupom de desconto?</span>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={valor}
          onChange={(e) => { setValor(e.target.value); setStatus("idle"); }}
          onKeyDown={(e) => e.key === "Enter" && aplicar()}
          placeholder="Digite seu cupom"
          disabled={status === "valido"}
          className={`flex-1 px-4 py-2.5 rounded-lg bg-surface border text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm uppercase tracking-wider ${
            status === "valido" ? "border-success/50 bg-success/5" :
            status === "invalido" ? "border-red-400/50" : "border-card"
          }`}
        />
        {status === "valido" ? (
          <Button variant="outline" size="sm" onClick={remover} className="border-red-400/30 text-red-400 hover:bg-red-400/10">
            Remover
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={aplicar}>
            Aplicar
          </Button>
        )}
      </div>
      {status === "valido" && cupomAtivo && (
        <p className="text-success text-xs mt-2 flex items-center space-x-1">
          <Check size={12} />
          <span>Cupom aplicado: {cupomAtivo.label}</span>
        </p>
      )}
      {status === "invalido" && (
        <p className="text-red-400 text-xs mt-2">Cupom inválido ou expirado.</p>
      )}
    </div>
  );
}

// Prazo da oferta: 48 horas a partir do primeiro acesso (salvo em localStorage)
const DURACAO_OFERTA_MS = 48 * 60 * 60 * 1000;

function getExpiracao(): number {
  if (typeof window === "undefined") return Date.now() + DURACAO_OFERTA_MS;
  const salvo = localStorage.getItem("estudacode:oferta_expira");
  if (salvo) return parseInt(salvo, 10);
  const expira = Date.now() + DURACAO_OFERTA_MS;
  localStorage.setItem("estudacode:oferta_expira", String(expira));
  return expira;
}

function useContador() {
  const [restante, setRestante] = useState({ horas: 0, minutos: 0, segundos: 0, expirado: false });

  useEffect(() => {
    const expiracao = getExpiracao();

    function calcular() {
      const diff = expiracao - Date.now();
      if (diff <= 0) {
        setRestante({ horas: 0, minutos: 0, segundos: 0, expirado: true });
        return;
      }
      const horas = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
      setRestante({ horas, minutos, segundos, expirado: false });
    }

    calcular();
    const id = setInterval(calcular, 1000);
    return () => clearInterval(id);
  }, []);

  return restante;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const planos = [
  {
    id: "gratis",
    nome: "Grátis",
    descricao: "Para experimentar a plataforma",
    preco: { mensal: 0, anual: 0 },
    precoOriginal: { mensal: 0, anual: 0 },
    icone: Sparkles,
    cor: "text-secondary",
    corBg: "bg-surface",
    corBorda: "border-card",
    destaque: false,
    temDesconto: false,
    cta: "Começar Grátis",
    href: "/cadastro",
    recursos: [
      "Demo de 1 trilha completa",
      "Exercícios da trilha demo",
      "Quiz da trilha demo",
      "Acesso ao dashboard",
    ],
    bloqueados: [
      "Todas as trilhas",
      "Projetos práticos",
      "Certificados",
      "Suporte prioritário",
    ],
  },
  {
    id: "pro",
    nome: "Pro",
    descricao: "Para quem quer aprender de verdade",
    preco: { mensal: 19, anual: 171 },       // anual com 25% de desconto: 228 * 0.75 = 171
    precoOriginal: { mensal: 19, anual: 228 },
    icone: Zap,
    cor: "text-primary",
    corBg: "bg-primary/5",
    corBorda: "border-primary",
    destaque: true,
    temDesconto: true,
    cta: "Assinar Pro",
    href: "/cadastro?plano=pro",
    recursos: [
      "Todas as trilhas desbloqueadas",
      "Todos os exercícios e quizzes",
      "Projetos práticos completos",
      "Certificados de conclusão",
      "Suporte prioritário",
      "Acesso a novos conteúdos",
    ],
    bloqueados: [],
  },
  {
    id: "vitalicio",
    nome: "Vitalício",
    descricao: "Pague uma vez, acesse para sempre",
    preco: { mensal: 224, anual: 224 },       // 299 * 0.75 = 224.25 ≈ 224
    precoOriginal: { mensal: 299, anual: 299 },
    icone: Crown,
    cor: "text-yellow-500",
    corBg: "bg-yellow-500/5",
    corBorda: "border-yellow-500/30",
    destaque: false,
    temDesconto: true,
    cta: "Comprar Acesso Vitalício",
    href: "/cadastro?plano=vitalicio",
    recursos: [
      "Tudo do plano Pro",
      "Acesso vitalício",
      "Atualizações futuras inclusas",
      "Certificados ilimitados",
      "Suporte VIP",
      "Acesso antecipado a novidades",
    ],
    bloqueados: [],
  },
];

export default function PlanosPage() {
  const [ciclo, setCiclo] = useState<"mensal" | "anual">("mensal");
  const contador = useContador();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Voltar */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors mb-10 text-sm"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o início</span>
          </Link>

          {/* Banner de oferta */}
          {!contador.expirado && (
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-2xl px-6 py-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-text font-semibold">Oferta por tempo limitado — 25% OFF</p>
                  <p className="text-secondary text-sm">Nos planos Anual e Vitalício. Aproveite antes que expire!</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Clock size={16} className="text-orange-400" />
                <div className="flex items-center space-x-1 font-mono text-lg font-bold">
                  <span className="bg-card px-2 py-1 rounded-lg text-orange-400">{pad(contador.horas)}</span>
                  <span className="text-orange-400">:</span>
                  <span className="bg-card px-2 py-1 rounded-lg text-orange-400">{pad(contador.minutos)}</span>
                  <span className="text-orange-400">:</span>
                  <span className="bg-card px-2 py-1 rounded-lg text-orange-400">{pad(contador.segundos)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Planos e Preços</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
              Invista no seu aprendizado
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Comece grátis com uma trilha demo e evolua quando estiver pronto.
            </p>
          </div>

          {/* Toggle mensal/anual */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${ciclo === "mensal" ? "text-text" : "text-secondary"}`}>
              Mensal
            </span>
            <button
              onClick={() => setCiclo(ciclo === "mensal" ? "anual" : "mensal")}
              className={`relative w-12 h-6 rounded-full transition-colors overflow-hidden ${
                ciclo === "anual" ? "bg-primary" : "bg-card"
              }`}
              aria-label="Alternar ciclo de cobrança"
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  ciclo === "anual" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${ciclo === "anual" ? "text-text" : "text-secondary"}`}>
              Anual
              <span className="ml-2 text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-semibold">
                -25%
              </span>
            </span>
          </div>

          {/* Cards de planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {planos.map((plano) => {
              const Icone = plano.icone;
              const ofertaAtiva = !contador.expirado && plano.temDesconto;

              // Preço exibido
              let precoExibido: string;
              let precoRiscado: string | null = null;
              let sufixo = "";
              let economia: string | null = null;

              if (plano.preco.mensal === 0) {
                precoExibido = "Grátis";
              } else if (plano.id === "vitalicio") {
                precoExibido = `R$ ${ofertaAtiva ? plano.preco.mensal : plano.precoOriginal.mensal}`;
                if (ofertaAtiva) precoRiscado = `R$ ${plano.precoOriginal.mensal}`;
                sufixo = "pagamento único";
                if (ofertaAtiva) economia = `Economize R$ ${plano.precoOriginal.mensal - plano.preco.mensal}`;
              } else {
                // Pro
                if (ciclo === "anual") {
                  const precoMes = ofertaAtiva
                    ? Math.round(plano.preco.anual / 12)
                    : Math.round(plano.precoOriginal.anual / 12);
                  const precoMesOriginal = Math.round(plano.precoOriginal.anual / 12);
                  precoExibido = `R$ ${precoMes}`;
                  if (ofertaAtiva) precoRiscado = `R$ ${precoMesOriginal}`;
                  sufixo = "/mês";
                  const totalAnual = ofertaAtiva ? plano.preco.anual : plano.precoOriginal.anual;
                  const totalOriginal = plano.precoOriginal.anual;
                  economia = ofertaAtiva
                    ? `R$ ${totalAnual}/ano — economize R$ ${totalOriginal - totalAnual}`
                    : `R$ ${totalOriginal}/ano`;
                } else {
                  precoExibido = `R$ ${plano.preco.mensal}`;
                  sufixo = "/mês";
                }
              }

              return (
                <div
                  key={plano.id}
                  className={`relative rounded-2xl border-2 p-6 flex flex-col ${plano.corBg} ${plano.corBorda} ${
                    plano.destaque ? "shadow-lg shadow-primary/10 md:scale-105" : ""
                  }`}
                >
                  {/* Badge destaque */}
                  {plano.destaque && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                        Mais popular
                      </span>
                    </div>
                  )}

                  {/* Badge oferta */}
                  {ofertaAtiva && (
                    <div className="absolute -top-3.5 right-4">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        🔥 25% OFF
                      </span>
                    </div>
                  )}

                  {/* Cabeçalho do plano */}
                  <div className="mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${plano.corBg} border ${plano.corBorda}`}>
                      <Icone size={20} className={plano.cor} />
                    </div>
                    <h2 className="text-xl font-bold text-text mb-1">{plano.nome}</h2>
                    <p className="text-secondary text-sm">{plano.descricao}</p>
                  </div>

                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      {precoRiscado && (
                        <span className="text-secondary line-through text-lg">{precoRiscado}</span>
                      )}
                      <span className="text-4xl font-bold text-text">{precoExibido}</span>
                      {sufixo && <span className="text-secondary text-sm">{sufixo}</span>}
                    </div>
                    {economia && (
                      <p className="text-xs text-success mt-1">{economia}</p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={plano.href} className="mb-6">
                    <Button
                      variant={plano.destaque ? "primary" : "outline"}
                      size="md"
                      className="w-full"
                    >
                      {plano.cta}
                    </Button>
                  </Link>

                  {/* Recursos */}
                  <ul className="space-y-2.5 flex-1">
                    {plano.recursos.map((r) => (
                      <li key={r} className="flex items-start space-x-2.5 text-sm">
                        <Check size={16} className="text-success flex-shrink-0 mt-0.5" />
                        <span className="text-text">{r}</span>
                      </li>
                    ))}
                    {plano.bloqueados.map((r) => (
                      <li key={r} className="flex items-start space-x-2.5 text-sm opacity-40">
                        <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center leading-none">—</span>
                        <span className="text-secondary line-through">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Garantia */}
          <p className="text-center text-secondary text-sm mt-10">
            Pagamentos processados com segurança via Stripe.
            Planos pagos têm <span className="text-text font-medium">7 dias de garantia</span> — cancele sem perguntas.
          </p>

          {/* Cupom de desconto */}
          <CupomDesconto />
        </div>
      </main>

      <Footer />
    </div>
  );
}
