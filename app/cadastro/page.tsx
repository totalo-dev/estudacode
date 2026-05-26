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
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialCadastro("Google")}
                disabled={isLoading || !!socialLoading}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-card bg-surface text-text hover:bg-card transition-colors text-sm font-medium disabled:opacity-60"
                aria-label="Cadastrar com Google"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>{socialLoading === "Google" ? "Conectando..." : "Google"}</span>
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleSocialCadastro("GitHub")}
                disabled={isLoading || !!socialLoading}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-card bg-surface text-text hover:bg-card transition-colors text-sm font-medium disabled:opacity-60"
                aria-label="Cadastrar com GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>{socialLoading === "GitHub" ? "Conectando..." : "GitHub"}</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialCadastro("Facebook")}
                disabled={isLoading || !!socialLoading}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-card bg-surface text-text hover:bg-card transition-colors text-sm font-medium disabled:opacity-60"
                aria-label="Cadastrar com Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
                <span>{socialLoading === "Facebook" ? "Conectando..." : "Facebook"}</span>
              </button>

              {/* X (Twitter) */}
              <button
                type="button"
                onClick={() => handleSocialCadastro("X")}
                disabled={isLoading || !!socialLoading}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-card bg-surface text-text hover:bg-card transition-colors text-sm font-medium disabled:opacity-60"
                aria-label="Cadastrar com X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>{socialLoading === "X" ? "Conectando..." : "X"}</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-secondary">
              Ao criar uma conta, você concorda com os{" "}
              <Link href="/termos" className="hover:text-text underline underline-offset-2">Termos de Uso</Link>{" "}
              e a{" "}
              <Link href="/privacidade" className="hover:text-text underline underline-offset-2">Política de Privacidade</Link>.
            </p>
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
