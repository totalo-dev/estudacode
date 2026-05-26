"use client";

import { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import BadgeCard from "@/components/cards/BadgeCard";
import ProgressRing from "@/components/progress/ProgressRing";
import { Trophy, Target, CheckCircle, Code, Calendar, Camera, X, Upload } from "lucide-react";
import Image from "next/image";
import { useAvatar } from "@/lib/hooks/useAvatar";
import { useAuthContext } from "@/lib/contexts/AuthContext";

const badges = [
  { id: "1", nome: "Primeiro Passo", descricao: "Completou o primeiro módulo", icone: "🎯", conquistado: true, dataConquista: "15 Mai 2026" },
  { id: "2", nome: "Maratonista", descricao: "7 dias seguidos estudando", icone: "🔥", conquistado: true, dataConquista: "18 Mai 2026" },
  { id: "3", nome: "Mestre React", descricao: "Completou trilha de React", icone: "⚛️", conquistado: false },
  { id: "4", nome: "100 Exercícios", descricao: "Resolveu 100 exercícios", icone: "💯", conquistado: false },
  { id: "5", nome: "Construtor", descricao: "Completou 5 projetos", icone: "🏗️", conquistado: false },
  { id: "6", nome: "Expert", descricao: "Completou trilha avançada", icone: "🚀", conquistado: false },
];

const recentActivity = [
  { tipo: "trilha", titulo: "Completou 'Hooks Avançados'", data: "Há 2 horas", icone: CheckCircle, cor: "text-success" },
  { tipo: "exercicio", titulo: "Resolveu 5 exercícios de useState", data: "Há 5 horas", icone: Code, cor: "text-primary" },
  { tipo: "projeto", titulo: "Iniciou 'Todo App com React'", data: "Ontem", icone: Target, cor: "text-orange-500" },
  { tipo: "badge", titulo: "Conquistou badge 'Maratonista'", data: "2 dias atrás", icone: Trophy, cor: "text-yellow-500" },
];

export default function PerfilPage() {
  const { avatarUrl, setAvatarUrl } = useAvatar();
  const { nome, username } = useAuthContext();
  const [modalAberto, setModalAberto] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [arrastando, setArrastando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function processarArquivo(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processarArquivo(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setArrastando(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processarArquivo(file);
  }

  function handleConfirmar() {
    if (preview) {
      setAvatarUrl(preview);
      // Quando o backend existir: fazer upload aqui e salvar a URL retornada
    }
    setModalAberto(false);
    setPreview(null);
  }

  function handleCancelar() {
    setModalAberto(false);
    setPreview(null);
  }

  function handleRemover() {
    setAvatarUrl(null);
    setModalAberto(false);
    setPreview(null);
  }

  return (
    <>
      <div className="space-y-8">
        <Card>
          <div className="flex flex-col sm:flex-row items-start gap-6">

            {/* Avatar interativo */}
            <div className="relative group flex-shrink-0 mx-auto sm:mx-0">
              <button
                onClick={() => setModalAberto(true)}
                aria-label="Alterar foto de perfil"
                className="relative w-24 h-24 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Foto de perfil" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    {(nome?.[0] ?? "U").toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={22} className="text-white" />
                </div>
              </button>
              <button
                onClick={() => setModalAberto(true)}
                aria-label="Alterar foto de perfil"
                className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background hover:bg-blue-600 transition-colors"
              >
                <Camera size={13} className="text-white" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">{nome}</h1>
              <p className="text-secondary mb-4 text-sm">@{username} • Desenvolvedor em formação • Membro desde Mai 2026</p>

              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-text">2</div>
                  <div className="text-secondary">Trilhas Ativas</div>
                </div>
                <div className="w-px h-10 bg-surface hidden sm:block" />
                <div>
                  <div className="text-2xl font-bold text-text">8</div>
                  <div className="text-secondary">Projetos</div>
                </div>
                <div className="w-px h-10 bg-surface hidden sm:block" />
                <div>
                  <div className="text-2xl font-bold text-text">127</div>
                  <div className="text-secondary">Horas</div>
                </div>
                <div className="w-px h-10 bg-surface hidden sm:block" />
                <div>
                  <div className="text-2xl font-bold text-text">2</div>
                  <div className="text-secondary">Badges</div>
                </div>
              </div>
            </div>

            <div className="mx-auto sm:mx-0">
              <ProgressRing value={45} size={100} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text mb-4">Estatísticas</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondary text-sm mb-1">Exercícios Resolvidos</p>
                      <p className="text-3xl font-bold text-text">47</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Code className="text-primary" size={24} />
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondary text-sm mb-1">Quizzes Completos</p>
                      <p className="text-3xl font-bold text-text">12</p>
                    </div>
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-success" size={24} />
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondary text-sm mb-1">Sequência Atual</p>
                      <p className="text-3xl font-bold text-text">7 dias</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Calendar className="text-orange-500" size={24} />
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondary text-sm mb-1">Projetos Concluídos</p>
                      <p className="text-3xl font-bold text-text">3</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Trophy className="text-purple-500" size={24} />
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text mb-4">Badges Conquistadas</h2>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text mb-4">Atividade Recente</h2>
            <Card>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-surface flex items-center justify-center flex-shrink-0 ${activity.cor}`}>
                      <activity.icone size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text text-sm">{activity.titulo}</p>
                      <p className="text-secondary text-xs">{activity.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de troca de avatar */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleCancelar()}
        >
          <div className="bg-surface border border-card rounded-2xl w-full max-w-md shadow-2xl">

            {/* Header do modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-card">
              <h2 className="text-lg font-semibold text-text">Alterar foto de perfil</h2>
              <button
                onClick={handleCancelar}
                aria-label="Fechar"
                className="text-secondary hover:text-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Preview */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/30">
                  {preview ? (
                    <Image src={preview} alt="Preview" fill className="object-cover" />
                  ) : avatarUrl ? (
                    <Image src={avatarUrl} alt="Avatar atual" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                      U
                    </div>
                  )}
                </div>
              </div>

              {/* Área de drop */}
              <div
                onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
                onDragLeave={() => setArrastando(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  arrastando
                    ? "border-primary bg-primary/10"
                    : "border-card hover:border-primary/50 hover:bg-surface"
                }`}
              >
                <Upload size={28} className="mx-auto text-secondary mb-3" />
                <p className="text-text text-sm font-medium mb-1">
                  Arraste uma imagem ou clique para selecionar
                </p>
                <p className="text-secondary text-xs">PNG, JPG ou GIF • Máx. 5MB</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Ações */}
              <div className="flex gap-3">
                {avatarUrl && (
                  <button
                    onClick={handleRemover}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium"
                  >
                    Remover foto
                  </button>
                )}
                <button
                  onClick={handleCancelar}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-card text-secondary hover:text-text hover:bg-card transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmar}
                  disabled={!preview}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
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
