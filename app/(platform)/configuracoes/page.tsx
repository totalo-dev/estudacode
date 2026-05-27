"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User, Lock, Bell, Trash2, CheckCircle, Eye, EyeOff, Camera, X, Upload, Download } from "lucide-react";
import Image from "next/image";
import { useAvatar } from "@/lib/hooks/useAvatar";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { logout } from "@/lib/auth/session";

type Aba = "perfil" | "senha" | "notificacoes" | "conta";

// ── Chaves de localStorage ────────────────────────────────────────────────────
const KEY_BIO   = "estudacode:bio";
const KEY_NOTIF = "estudacode:notificacoes";

function lerBio(): string {
  try { return localStorage.getItem(KEY_BIO) ?? ""; } catch { return ""; }
}

function salvarBio(bio: string) {
  try { localStorage.setItem(KEY_BIO, bio); } catch {}
}

type NotifState = { novosConteudos: boolean; lembretes: boolean; conquistas: boolean; newsletter: boolean };

const NOTIF_PADRAO: NotifState = { novosConteudos: true, lembretes: true, conquistas: true, newsletter: false };

function lerNotif(): NotifState {
  try {
    const raw = localStorage.getItem(KEY_NOTIF);
    return raw ? { ...NOTIF_PADRAO, ...JSON.parse(raw) } : NOTIF_PADRAO;
  } catch { return NOTIF_PADRAO; }
}

function salvarNotif(n: NotifState) {
  try { localStorage.setItem(KEY_NOTIF, JSON.stringify(n)); } catch {}
}

export default function ConfiguracoesPage() {
  const [abaAtiva, setAbaAtiva]   = useState<Aba>("perfil");
  const [salvo, setSalvo]         = useState(false);
  const { avatarUrl, setAvatarUrl } = useAvatar();
  const { nome: nomeCtx, email: emailCtx, username: usernameCtx, atualizarPerfil } = useAuthContext();

  // ── Perfil ──────────────────────────────────────────────────────────────────
  const [perfil, setPerfil] = useState({ nome: nomeCtx, email: emailCtx, bio: "", username: usernameCtx });

  useEffect(() => {
    setPerfil((p) => ({ ...p, nome: nomeCtx, email: emailCtx, username: usernameCtx, bio: lerBio() }));
  }, [nomeCtx, emailCtx, usernameCtx]);

  // ── Senha ───────────────────────────────────────────────────────────────────
  const [senha, setSenha] = useState({ atual: "", nova: "", confirmar: "" });
  const [showSenha, setShowSenha] = useState({ atual: false, nova: false, confirmar: false });
  const [erroSenha, setErroSenha] = useState("");
  const [senhaAtualizada, setSenhaAtualizada] = useState(false);

  // ── Notificações ────────────────────────────────────────────────────────────
  const [notif, setNotif] = useState<NotifState>(NOTIF_PADRAO);

  useEffect(() => { setNotif(lerNotif()); }, []);

  // ── Avatar modal ────────────────────────────────────────────────────────────
  const [modalAvatarAberto, setModalAvatarAberto] = useState(false);
  const [previewAvatar, setPreviewAvatar]         = useState<string | null>(null);
  const [arrastando, setArrastando]               = useState(false);
  const inputAvatarRef = useRef<HTMLInputElement>(null);

  function processarArquivoAvatar(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreviewAvatar(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  // ── Zona de perigo ──────────────────────────────────────────────────────────
  const [zonaPerigoLiberada, setZonaPerigoLiberada] = useState(false);
  const [senhaZona, setSenhaZona]                   = useState("");
  const [showSenhaZona, setShowSenhaZona]           = useState(false);
  const [erroSenhaZona, setErroSenhaZona]           = useState("");
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [emailExclusaoEnviado, setEmailExclusaoEnviado] = useState(false);

  // ── Feedback ────────────────────────────────────────────────────────────────
  function mostrarSalvo() {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  // ── Handlers ────────────────────────────────────────────────────────────────
  function handleSalvarPerfil(e: React.FormEvent) {
    e.preventDefault();
    atualizarPerfil({ nome: perfil.nome, email: perfil.email, username: perfil.username });
    salvarBio(perfil.bio);
    mostrarSalvo();
  }

  function handleSalvarSenha(e: React.FormEvent) {
    e.preventDefault();
    setErroSenha("");
    if (!senha.atual) { setErroSenha("Informe a senha atual."); return; }
    if (senha.nova.length < 8) { setErroSenha("A nova senha deve ter pelo menos 8 caracteres."); return; }
    if (senha.nova !== senha.confirmar) { setErroSenha("As senhas não coincidem."); return; }
    // Mock: simula atualização (backend substituirá)
    setSenha({ atual: "", nova: "", confirmar: "" });
    setSenhaAtualizada(true);
    setTimeout(() => setSenhaAtualizada(false), 3000);
  }

  function handleSalvarNotif(e: React.FormEvent) {
    e.preventDefault();
    salvarNotif(notif);
    mostrarSalvo();
  }

  function handleExportarDados() {
    const dados = {
      perfil: { nome: nomeCtx, email: emailCtx, username: usernameCtx, bio: lerBio() },
      notificacoes: lerNotif(),
      progresso: (() => { try { return JSON.parse(localStorage.getItem("estudacode:progresso") ?? "{}"); } catch { return {}; } })(),
      plano: localStorage.getItem("estudacode:plano") ?? "gratis",
      exportadoEm: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "estudacode-dados.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const abas: { id: Aba; label: string; icone: React.ElementType }[] = [
    { id: "perfil",        label: "Perfil",        icone: User  },
    { id: "senha",         label: "Senha",         icone: Lock  },
    { id: "notificacoes",  label: "Notificações",  icone: Bell  },
    { id: "conta",         label: "Conta",         icone: Trash2 },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Configurações</h1>
          <p className="text-secondary">Gerencie suas preferências e informações de conta</p>
        </div>

        {/* Abas */}
        <div className="flex space-x-1 bg-surface rounded-xl p-1 border border-card">
          {abas.map((aba) => {
            const Icone = aba.icone;
            return (
              <button key={aba.id} onClick={() => setAbaAtiva(aba.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  abaAtiva === aba.id ? "bg-card text-text shadow-sm" : "text-secondary hover:text-text"
                }`}
              >
                <Icone size={16} />
                <span className="hidden sm:inline">{aba.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback salvo */}
        {salvo && (
          <div className="flex items-center space-x-2 bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg text-sm">
            <CheckCircle size={16} /><span>Alterações salvas com sucesso.</span>
          </div>
        )}

        {/* ── ABA: Perfil ─────────────────────────────────────────────────────── */}
        {abaAtiva === "perfil" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-semibold text-text mb-6">Informações do Perfil</h2>
                <form onSubmit={handleSalvarPerfil} className="space-y-5">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden relative">
                        {avatarUrl ? <Image src={avatarUrl} alt="Avatar" fill className="object-cover" /> : (perfil.nome?.[0] ?? "U").toUpperCase()}
                      </div>
                      <button type="button" onClick={() => setModalAvatarAberto(true)}
                        className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Alterar foto">
                        <Camera size={18} className="text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-text font-medium text-sm">Foto de perfil</p>
                      <p className="text-secondary text-xs mt-0.5">PNG, JPG • Máx. 5MB</p>
                      <button type="button" onClick={() => setModalAvatarAberto(true)} className="text-xs text-primary hover:text-blue-400 transition-colors mt-1 font-medium">Alterar foto</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text">Nome completo</label>
                      <input type="text" value={perfil.nome} onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text">Username</label>
                      <input type="text" value={perfil.username} onChange={(e) => setPerfil({ ...perfil, username: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text">E-mail</label>
                    <input type="email" value={perfil.email} onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text">Bio</label>
                    <textarea value={perfil.bio} onChange={(e) => setPerfil({ ...perfil, bio: e.target.value })}
                      placeholder="Conte um pouco sobre você..." rows={3}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="md">Salvar alterações</Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Preview */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-sm font-semibold text-secondary mb-6 uppercase tracking-wider text-center">Preview do Perfil</h3>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative shadow-lg ring-4 ring-background">
                    {avatarUrl ? <Image src={avatarUrl} alt="Avatar" fill className="object-cover" /> : (perfil.nome?.[0] ?? "U").toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text break-words line-clamp-1">{perfil.nome || "Seu Nome"}</h2>
                    <p className="text-sm text-primary font-medium mt-1">@{perfil.username || "username"}</p>
                  </div>
                  <p className="text-sm text-secondary break-words line-clamp-3">{perfil.bio || "Sua bio aparecerá aqui..."}</p>
                  <div className="w-full pt-6 mt-2 border-t border-card flex justify-around text-center">
                    {["Trilhas", "Projetos", "Badges"].map((l) => (
                      <div key={l}><p className="text-lg font-bold text-text">—</p><p className="text-xs text-secondary mt-1">{l}</p></div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ── ABA: Senha ──────────────────────────────────────────────────────── */}
        {abaAtiva === "senha" && (
          <Card>
            <h2 className="text-xl font-semibold text-text mb-6">Alterar Senha</h2>
            {senhaAtualizada && (
              <div className="flex items-center space-x-2 bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg text-sm mb-5">
                <CheckCircle size={16} /><span>Senha atualizada com sucesso.</span>
              </div>
            )}
            <form onSubmit={handleSalvarSenha} className="space-y-5">
              {([
                { key: "atual" as const,     label: "Senha atual",          show: showSenha.atual,     toggle: () => setShowSenha((s) => ({ ...s, atual: !s.atual })) },
                { key: "nova" as const,      label: "Nova senha",           show: showSenha.nova,      toggle: () => setShowSenha((s) => ({ ...s, nova: !s.nova })) },
                { key: "confirmar" as const, label: "Confirmar nova senha", show: showSenha.confirmar, toggle: () => setShowSenha((s) => ({ ...s, confirmar: !s.confirmar })) },
              ]).map((campo) => (
                <div key={campo.key} className="space-y-1.5">
                  <label className="block text-sm font-medium text-text">{campo.label}</label>
                  <div className="relative">
                    <input type={campo.show ? "text" : "password"} value={senha[campo.key]}
                      onChange={(e) => { setSenha((s) => ({ ...s, [campo.key]: e.target.value })); setErroSenha(""); }}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-11 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    <button type="button" onClick={campo.toggle} aria-label={campo.show ? "Ocultar" : "Mostrar"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors">
                      {campo.show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}
              {erroSenha && (
                <p role="alert" className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-lg">{erroSenha}</p>
              )}
              <p className="text-secondary text-xs">Mínimo de 8 caracteres.</p>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="md">Atualizar senha</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── ABA: Notificações ───────────────────────────────────────────────── */}
        {abaAtiva === "notificacoes" && (
          <Card>
            <h2 className="text-xl font-semibold text-text mb-6">Preferências de Notificação</h2>
            <form onSubmit={handleSalvarNotif} className="space-y-4">
              {([
                { key: "novosConteudos" as const, label: "Novos conteúdos",      desc: "Avise quando novas trilhas ou módulos forem publicados" },
                { key: "lembretes"      as const, label: "Lembretes de estudo",  desc: "Receba lembretes para manter sua sequência de estudos" },
                { key: "conquistas"     as const, label: "Conquistas e badges",  desc: "Notificações quando conquistar uma nova badge" },
                { key: "newsletter"     as const, label: "Newsletter",           desc: "Dicas semanais de programação e novidades da plataforma" },
              ]).map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-card last:border-0">
                  <div>
                    <p className="text-text font-medium text-sm">{item.label}</p>
                    <p className="text-secondary text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <button type="button" role="switch" aria-checked={notif[item.key]}
                    onClick={() => setNotif((n) => ({ ...n, [item.key]: !n[item.key] }))}
                    aria-label={`${item.label} ${notif[item.key] ? "ativado" : "desativado"}`}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notif[item.key] ? "bg-primary" : "bg-card"}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notif[item.key] ? "left-[22px]" : "left-1"}`} />
                  </button>
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md">Salvar preferências</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── ABA: Conta ──────────────────────────────────────────────────────── */}
        {abaAtiva === "conta" && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-semibold text-text mb-2">Exportar dados</h2>
              <p className="text-secondary text-sm mb-4">
                Baixe um arquivo JSON com seu perfil, preferências de notificação e progresso nas trilhas.
              </p>
              <Button variant="outline" size="md" onClick={handleExportarDados}>
                <Download size={16} className="mr-2" />
                Baixar meus dados
              </Button>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Lock size={20} className="text-red-400" />
                Zona de perigo
              </h2>
              <p className="text-secondary text-sm mb-4">
                Excluir sua conta é permanente e irreversível. Para sua segurança, confirme sua senha para liberar esta ação.
              </p>

              {!zonaPerigoLiberada ? (
                <div className="bg-background/50 border border-card rounded-lg p-4 space-y-3">
                  <label className="block text-sm font-medium text-text">Digite sua senha para continuar</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input type={showSenhaZona ? "text" : "password"} value={senhaZona}
                        onChange={(e) => { setSenhaZona(e.target.value); setErroSenhaZona(""); }}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pr-11 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-transparent transition-all" />
                      <button type="button" onClick={() => setShowSenhaZona(!showSenhaZona)}
                        aria-label={showSenhaZona ? "Ocultar" : "Mostrar"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors">
                        {showSenhaZona ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <Button onClick={() => {
                      if (senhaZona.length >= 6) { setZonaPerigoLiberada(true); setErroSenhaZona(""); }
                      else { setErroSenhaZona("A senha deve ter pelo menos 6 caracteres."); }
                    }} variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                      Desbloquear
                    </Button>
                  </div>
                  {erroSenhaZona && <p className="text-red-400 text-xs">{erroSenhaZona}</p>}
                </div>
              ) : emailExclusaoEnviado ? (
                <div className="bg-success/10 border border-success/30 rounded-lg p-5 text-center">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3 text-success">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-success font-semibold text-lg mb-2">Quase lá...</h3>
                  <p className="text-secondary text-sm">Verifique sua caixa de entrada para confirmar a exclusão definitiva da sua conta.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm font-medium">Atenção: A zona de perigo está desbloqueada.</p>
                  </div>
                  <Button variant="outline" size="md"
                    className="border-red-400 bg-red-400 text-white hover:bg-red-500 hover:border-red-500 w-full sm:w-auto"
                    onClick={() => setShowModalConfirmacao(true)}>
                    <Trash2 size={16} className="mr-2" />
                    Excluir minha conta definitivamente
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* ── Modal: Confirmar exclusão ────────────────────────────────────────── */}
      {showModalConfirmacao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowModalConfirmacao(false)}>
          <div role="dialog" aria-modal="true"
            className="bg-surface border border-card rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-red-400/20 rounded-full flex items-center justify-center mx-auto text-red-400">
                <Trash2 size={28} />
              </div>
              <h2 className="text-xl font-semibold text-text">Você tem certeza?</h2>
              <p className="text-secondary text-sm">Todos os seus dados, trilhas e projetos serão perdidos permanentemente.</p>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowModalConfirmacao(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-card text-secondary hover:text-text hover:bg-card transition-colors text-sm font-medium">
                  Cancelar
                </button>
                <button onClick={() => { setShowModalConfirmacao(false); setEmailExclusaoEnviado(true); }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors text-sm font-medium">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Avatar ────────────────────────────────────────────────────── */}
      {modalAvatarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && (setModalAvatarAberto(false), setPreviewAvatar(null))}>
          <div role="dialog" aria-modal="true" className="bg-surface border border-card rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-card">
              <h2 className="text-lg font-semibold text-text">Alterar foto de perfil</h2>
              <button onClick={() => { setModalAvatarAberto(false); setPreviewAvatar(null); }}
                aria-label="Fechar" className="text-secondary hover:text-text transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/30">
                  {previewAvatar ? <Image src={previewAvatar} alt="Preview" fill className="object-cover" />
                    : avatarUrl ? <Image src={avatarUrl} alt="Avatar atual" fill className="object-cover" />
                    : <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold">{(perfil.nome?.[0] ?? "U").toUpperCase()}</div>}
                </div>
              </div>
              <div onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
                onDragLeave={() => setArrastando(false)}
                onDrop={(e) => { e.preventDefault(); setArrastando(false); const f = e.dataTransfer.files?.[0]; if (f) processarArquivoAvatar(f); }}
                onClick={() => inputAvatarRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${arrastando ? "border-primary bg-primary/10" : "border-card hover:border-primary/50 hover:bg-card/50"}`}>
                <Upload size={28} className="mx-auto text-secondary mb-3" />
                <p className="text-text text-sm font-medium mb-1">Arraste uma imagem ou clique para selecionar</p>
                <p className="text-secondary text-xs">PNG, JPG ou GIF • Máx. 5MB</p>
                <input ref={inputAvatarRef} type="file" accept="image/*"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) processarArquivoAvatar(f); }}
                  className="hidden" />
              </div>
              <div className="flex gap-3">
                {avatarUrl && (
                  <button onClick={() => { setAvatarUrl(null); setModalAvatarAberto(false); setPreviewAvatar(null); }}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">
                    Remover foto
                  </button>
                )}
                <button onClick={() => { setModalAvatarAberto(false); setPreviewAvatar(null); }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-card text-secondary hover:text-text hover:bg-card transition-colors text-sm font-medium">
                  Cancelar
                </button>
                <button onClick={() => { if (previewAvatar) setAvatarUrl(previewAvatar); setModalAvatarAberto(false); setPreviewAvatar(null); }}
                  disabled={!previewAvatar}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
