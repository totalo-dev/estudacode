"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User, Lock, Bell, Trash2, CheckCircle, Eye, EyeOff, Camera } from "lucide-react";
import Image from "next/image";
import { useAvatar } from "@/lib/hooks/useAvatar";

type Aba = "perfil" | "senha" | "notificacoes" | "conta";

export default function ConfiguracoesPage() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("perfil");
  const [salvo, setSalvo] = useState(false);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const { avatarUrl } = useAvatar();

  // Zona de perigo
  const [zonaPerigoLiberada, setZonaPerigoLiberada] = useState(false);
  const [senhaZona, setSenhaZona] = useState("");
  const [showSenhaZona, setShowSenhaZona] = useState(false);
  const [erroSenhaZona, setErroSenhaZona] = useState("");
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [emailExclusaoEnviado, setEmailExclusaoEnviado] = useState(false);

  // Perfil
  const [perfil, setPerfil] = useState({ nome: "Usuário", email: "usuario@email.com", bio: "", username: "usuario" });

  // Notificações
  const [notif, setNotif] = useState({
    novosConteudos: true,
    lembretes: true,
    conquistas: true,
    newsletter: false,
  });

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    // Persistência será implementada com o backend
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  const abas: { id: Aba; label: string; icone: React.ElementType }[] = [
    { id: "perfil", label: "Perfil", icone: User },
    { id: "senha", label: "Senha", icone: Lock },
    { id: "notificacoes", label: "Notificações", icone: Bell },
    { id: "conta", label: "Conta", icone: Trash2 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Configurações</h1>
          <p className="text-secondary">Gerencie suas preferências e informações de conta</p>
        </div>

        <div className="flex space-x-1 bg-surface rounded-xl p-1 border border-card">
          {abas.map((aba) => {
            const Icone = aba.icone;
            return (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  abaAtiva === aba.id
                    ? "bg-card text-text shadow-sm"
                    : "text-secondary hover:text-text"
                }`}
              >
                <Icone size={16} />
                <span className="hidden sm:inline">{aba.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback de salvo */}
        {salvo && (
          <div className="flex items-center space-x-2 bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg text-sm">
            <CheckCircle size={16} />
            <span>Alterações salvas com sucesso.</span>
          </div>
        )}

        {/* ABA: Perfil */}
        {abaAtiva === "perfil" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Formulário */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-semibold text-text mb-6">Informações do Perfil</h2>
                <form onSubmit={handleSalvar} className="space-y-5">

                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden relative">
                        {avatarUrl ? (
                          <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                        ) : (
                          "U"
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => { window.location.href = "/perfil/usuario"; }}
                        className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Alterar foto"
                      >
                        <Camera size={18} className="text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-text font-medium text-sm">Foto de perfil</p>
                      <p className="text-secondary text-xs mt-0.5">PNG, JPG • Máx. 5MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text">Nome completo</label>
                      <input
                        type="text"
                        value={perfil.nome}
                        onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text">Username</label>
                      <input
                        type="text"
                        value={perfil.username}
                        onChange={(e) => setPerfil({ ...perfil, username: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text">E-mail</label>
                    <input
                      type="email"
                      value={perfil.email}
                      onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text">Bio</label>
                    <textarea
                      value={perfil.bio}
                      onChange={(e) => setPerfil({ ...perfil, bio: e.target.value })}
                      placeholder="Conte um pouco sobre você..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="md">Salvar alterações</Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Preview Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="text-sm font-semibold text-secondary mb-6 uppercase tracking-wider text-center">Preview do Perfil</h3>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative shadow-lg ring-4 ring-background">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      "U"
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text break-words line-clamp-1">{perfil.nome || "Seu Nome"}</h2>
                    <p className="text-sm text-primary font-medium mt-1">@{perfil.username || "username"}</p>
                  </div>
                  <p className="text-sm text-secondary break-words line-clamp-3">
                    {perfil.bio || "Sua bio aparecerá aqui. Conte um pouco sobre você..."}
                  </p>
                  <div className="w-full pt-6 mt-2 border-t border-card flex justify-around text-center">
                    <div>
                      <p className="text-lg font-bold text-text">0</p>
                      <p className="text-xs text-secondary mt-1">Trilhas</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-text">0</p>
                      <p className="text-xs text-secondary mt-1">Projetos</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-text">0</p>
                      <p className="text-xs text-secondary mt-1">Badges</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        )}

        {/* ABA: Senha */}
        {abaAtiva === "senha" && (
          <Card>
            <h2 className="text-xl font-semibold text-text mb-6">Alterar Senha</h2>
            <form onSubmit={handleSalvar} className="space-y-5">
              {[
                { label: "Senha atual", show: showSenhaAtual, toggle: () => setShowSenhaAtual(!showSenhaAtual) },
                { label: "Nova senha", show: showNovaSenha, toggle: () => setShowNovaSenha(!showNovaSenha) },
                { label: "Confirmar nova senha", show: showConfirmar, toggle: () => setShowConfirmar(!showConfirmar) },
              ].map((campo) => (
                <div key={campo.label} className="space-y-1.5">
                  <label className="block text-sm font-medium text-text">{campo.label}</label>
                  <div className="relative">
                    <input
                      type={campo.show ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-11 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={campo.toggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors"
                      aria-label={campo.show ? "Ocultar" : "Mostrar"}
                    >
                      {campo.show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-secondary text-xs">Mínimo de 8 caracteres.</p>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="md">Atualizar senha</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ABA: Notificações */}
        {abaAtiva === "notificacoes" && (
          <Card>
            <h2 className="text-xl font-semibold text-text mb-6">Preferências de Notificação</h2>
            <form onSubmit={handleSalvar} className="space-y-4">
              {[
                { key: "novosConteudos" as const, label: "Novos conteúdos", desc: "Avise quando novas trilhas ou módulos forem publicados" },
                { key: "lembretes" as const, label: "Lembretes de estudo", desc: "Receba lembretes para manter sua sequência de estudos" },
                { key: "conquistas" as const, label: "Conquistas e badges", desc: "Notificações quando conquistar uma nova badge" },
                { key: "newsletter" as const, label: "Newsletter", desc: "Dicas semanais de programação e novidades da plataforma" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-card last:border-0">
                  <div>
                    <p className="text-text font-medium text-sm">{item.label}</p>
                    <p className="text-secondary text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotif({ ...notif, [item.key]: !notif[item.key] })}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      notif[item.key] ? "bg-primary" : "bg-card"
                    }`}
                    aria-label={`${item.label} ${notif[item.key] ? "ativado" : "desativado"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      notif[item.key] ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md">Salvar preferências</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ABA: Conta */}
        {abaAtiva === "conta" && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-semibold text-text mb-2">Exportar dados</h2>
              <p className="text-secondary text-sm mb-4">Baixe uma cópia de todos os seus dados de progresso e atividade.</p>
              <Button variant="outline" size="md">Solicitar exportação</Button>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Lock size={20} className="text-red-400" />
                Zona de perigo
              </h2>
              <p className="text-secondary text-sm mb-4">
                Excluir sua conta é uma ação permanente e irreversível. Todos os seus dados, progresso e conquistas serão apagados. Para sua segurança, confirme sua senha para liberar esta ação.
              </p>
              
              {!zonaPerigoLiberada ? (
                <div className="bg-background/50 border border-card rounded-lg p-4 space-y-3">
                  <label className="block text-sm font-medium text-text">Digite sua senha para continuar</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type={showSenhaZona ? "text" : "password"}
                        value={senhaZona}
                        onChange={(e) => {
                          setSenhaZona(e.target.value);
                          setErroSenhaZona("");
                        }}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pr-11 rounded-lg bg-background border border-card text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSenhaZona(!showSenhaZona)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors"
                        aria-label={showSenhaZona ? "Ocultar" : "Mostrar"}
                      >
                        {showSenhaZona ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <Button 
                      onClick={() => {
                        if (senhaZona.length >= 6) {
                          setZonaPerigoLiberada(true);
                          setErroSenhaZona("");
                        } else {
                          setErroSenhaZona("A senha deve ter pelo menos 6 caracteres.");
                        }
                      }}
                      variant="outline" 
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      Desbloquear
                    </Button>
                  </div>
                  {erroSenhaZona && <p className="text-red-400 text-xs">{erroSenhaZona}</p>}
                </div>
              ) : emailExclusaoEnviado ? (
                <div className="bg-success/10 border border-success/30 rounded-lg p-5 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3 text-success">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-success font-semibold text-lg mb-2">Quase lá...</h3>
                  <p className="text-secondary text-sm">
                    Acabamos de enviar um e-mail com as instruções finais. Verifique sua caixa de entrada para confirmar a exclusão definitiva da sua conta.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm font-medium">Atenção: A zona de perigo está desbloqueada.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="md"
                    className="border-red-400 bg-red-400 text-white hover:bg-red-500 hover:border-red-500 w-full sm:w-auto"
                    onClick={() => setShowModalConfirmacao(true)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir minha conta definitivamente
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Modal Confirmação Exclusão */}
      {showModalConfirmacao && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowModalConfirmacao(false)}
        >
          <div className="bg-surface border border-card rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-red-400/20 rounded-full flex items-center justify-center mx-auto text-red-400">
                <Trash2 size={28} />
              </div>
              <h2 className="text-xl font-semibold text-text">Você tem certeza?</h2>
              <p className="text-secondary text-sm">
                Tem certeza que deseja continuar com a exclusão da conta? Todos os seus dados, trilhas e projetos serão perdidos permanentemente.
              </p>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModalConfirmacao(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-card text-secondary hover:text-text hover:bg-card transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowModalConfirmacao(false);
                    setEmailExclusaoEnviado(true);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors text-sm font-medium"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
