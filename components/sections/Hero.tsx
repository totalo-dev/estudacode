"use client";

import Button from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/planos"
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">Aprenda fazendo</span>
            <ArrowRight size={14} />
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
            Aprenda Programação
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Através de Projetos Reais
            </span>
          </h1>
          
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Domine desenvolvimento web com trilhas estruturadas, exercícios práticos e projetos do mundo real. Sem videoaulas, apenas código.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cadastro">
              <Button variant="primary" size="lg" className="group">
                Começar Agora
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/trilhas">
              <Button variant="outline" size="lg">
                Ver Trilhas
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center flex-wrap gap-6 md:gap-8 text-sm text-secondary">
            <div>
              <div className="text-2xl font-bold text-text">50+</div>
              <div>Projetos</div>
            </div>
            <div className="w-px h-12 bg-surface" />
            <div>
              <div className="text-2xl font-bold text-text">200+</div>
              <div>Exercícios</div>
            </div>
            <div className="w-px h-12 bg-surface" />
            <div>
              <div className="text-2xl font-bold text-text">10+</div>
              <div>Trilhas</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
