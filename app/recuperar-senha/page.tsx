"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!email.includes("@")) {
      setErro("Informe um e-mail válido para receber o link.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEnviado(true);
    }, 1500);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">

        {/* Voltar */}
        <Link
          href="/login"
          className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          <span>Voltar para o login</span>
        </Link>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mb-8 hover:opacity-80 transition-opacity">
          <Image src="/favicon_io/android-chrome-192x192.png" alt="EstudaCode" width={32} height={32} className="object-contain" />
          <span className="text-xl font-bold text-text">EstudaCode</span>
        </Link>

        {!enviado ? (
          <>
            {/* Cabeçalho */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-text mb-2">Recuperar senha</h1>
              <p className="text-secondary">
                Informe seu e-mail e enviaremos um link para você criar uma nova senha.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-text">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErro(""); }}
                  placeholder="seu@email.com"
                  aria-invalid={erro ? true : undefined}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {erro && (
                <p role="alert" className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-lg">
                  {erro}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Enviando...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Mail size={18} />
                    <span>Enviar link de recuperação</span>
                  </span>
                )}
              </Button>
            </form>
          </>
        ) : (
          /* Estado de sucesso */
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle size={32} className="text-success" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-text mb-3">E-mail enviado</h2>
            <p className="text-secondary mb-2">
              Enviamos um link de recuperação para
            </p>
            <p className="text-text font-medium mb-8">{email}</p>
            <p className="text-secondary text-sm mb-8">
              Verifique sua caixa de entrada e a pasta de spam. O link expira em 30 minutos.
            </p>
            <Link href="/login">
              <Button variant="outline" size="md" className="w-full">
                Voltar para o login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
