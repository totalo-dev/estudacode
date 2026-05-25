"use client";

import { Suspense, useState, type ElementType } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Crown, Eye, EyeOff, Sparkles, UserPlus, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

type PlanoParam = "gratis" | "pro" | "vitalicio";

const PLANO_INFO: Record<PlanoParam, { label: string; icon: ElementType; cor: string; corBg: string; corBorda: string }> = {
  gratis: { label: "Grátis", icon: Sparkles, cor: "text-secondary", corBg: "bg-surface", corBorda: "border-card" },
  pro: { label: "Pro", icon: Zap, cor: "text-primary", corBg: "bg-primary/10", corBorda: "border-primary/40" },
  vitalicio: { label: "Vitalício", icon: Crown, cor: "text-yellow-500", corBg: "bg-yellow-500/10", corBorda: "border-yellow-500/40" },
};

function normalizarPlano(plano: string | null): PlanoParam {
  return plano === "pro" || plano === "vitalicio" ? plano : "gratis";
}

function CadastroForm() {
  const searchParams = useSearchParams();
  const planoParam = normalizarPlano(searchParams.get("plano"));
  const plano = PLANO_INFO[planoParam];
  const PlanoIcon = plano.icon;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [cadastrado, setCadastrado] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", password: "", confirm: "" });
  const [erro, setErro] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  function finalizarCadastro() {
    document.cookie = "estudacode-token=user123; path=/; max-age=86400";
    localStorage.setItem("estudacode:plano", planoParam);
    setCadastrado(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (form.nome.trim().length < 3) {
      setErro("Informe seu nome completo.");
      return;
    }
    if (!form.email.includes("@")) {
      setErro("Informe um e-mail válido.");
      return;
    }
    if (form.password !== form.confirm) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      finalizarCadastro();
    }, 1000);
  }

  function handleSocialCadastro(provider: string) {
    setErro("");
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      setForm((atual) => ({ ...atual, nome: atual.nome || `Usuário ${provider}` }));
      finalizarCadastro();
    }, 900);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors mb-8 text-sm">
          <ArrowLeft size={16} />
          <span>Voltar para o início</span>
        </Link>

        <Link href="/" className="flex items-center space-x-2 mb-8 hover:opacity-80 transition-opacity">
          <Image src="/favicon_io/web-app-manifest-192x192.png" alt="EstudaCode" width={32} height={32} className="object-contain" />
          <span className="text-xl font-bold text-text">EstudaCode</span>
        </Link>

        {!cadastrado ? (
          <>
            {planoParam !== "gratis" && (
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-6 ${plano.corBg} ${plano.corBorda}`} role="status">
                <PlanoIcon size={18} className={plano.cor} />
                <div>
                  <p className="text-text text-sm font-semibold">Plano {plano.label} selecionado</p>
                  <p className="text-secondary text-xs">O checkout real será conectado na próxima etapa.</p>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-text mb-2">Crie sua conta</h1>
              <p className="text-secondary">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-primary hover:underline">Faça login</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="nome" className="block text-sm font-medium text-text">Nome completo</label>
                <input id="nome" name="nome" type="text" autoComplete="name" required value={form.nome} onChange={handleChange} placeholder="Seu nome" className="w-full px-4 py-2.5 rounded-lg bg-surface border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-text">E-mail</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder="seu@email.com" className="w-full px-4 py-2.5 rounded-lg bg-surface border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-text">Senha</label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres" className="w-full px-4 py-2.5 pr-11 rounded-lg bg-surface border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm" className="block text-sm font-medium text-text">Confirmar senha</label>
                <div className="relative">
                  <input id="confirm" name="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password" required value={form.confirm} onChange={handleChange} placeholder="Repita a senha" className="w-full px-4 py-2.5 pr-11 rounded-lg bg-surface border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? "Ocultar confirmação" : "Mostrar confirmação"} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {erro && (
                <p id="cadastro-erro" role="alert" className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-lg">
                  {erro}
                </p>
              )}

              <Button type="submit" variant="primary" size="lg" disabled={isLoading || !!socialLoading} className="w-full">
                {isLoading ? "Criando conta..." : (
                  <span className="flex items-center space-x-2">
                    <UserPlus size={18} />
                    <span>Criar conta {planoParam !== "gratis" ? `- Plano ${plano.label}` : "gratuita"}</span>
                  </span>
                )}
              </Button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-card" />
              <span className="px-4 text-sm text-secondary">ou cadastre-se com</span>
              <div className="flex-1 border-t border-card" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["Google", "GitHub"].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => handleSocialCadastro(provider)}
                  disabled={isLoading || !!socialLoading}
                  className="flex items-center justify-center px-4 py-2.5 rounded-lg border border-card bg-surface text-text hover:bg-card transition-colors text-sm font-medium disabled:opacity-60"
                  aria-label={`Cadastrar com ${provider}`}
                >
                  {socialLoading === provider ? "Conectando..." : provider}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8" role="status">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle size={32} className="text-success" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-text mb-3">Conta criada!</h2>
            <p className="text-secondary mb-2">Bem-vindo à EstudaCode, <span className="text-text font-medium">{form.nome || "dev"}</span>.</p>
            <p className="text-secondary text-sm mb-8">Plano ativo: <span className={plano.cor}>{plano.label}</span>.</p>
            <Link href="/onboarding">
              <Button variant="primary" size="lg" className="w-full">Começar minha jornada</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-background" />}>
      <CadastroForm />
    </Suspense>
  );
}
