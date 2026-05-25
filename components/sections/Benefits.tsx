"use client";

import Card from "@/components/ui/Card";
import { Code2, Target, TrendingUp, Award, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Code2,
    title: "Aprenda Fazendo",
    description: "Nada de videoaulas intermináveis. Aprenda escrevendo código real desde o primeiro dia.",
  },
  {
    icon: Target,
    title: "Trilhas Estruturadas",
    description: "Siga um caminho claro do básico ao avançado com conteúdo cuidadosamente organizado.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhe seu Progresso",
    description: "Veja sua evolução em tempo real com métricas detalhadas e badges de conquistas.",
  },
  {
    icon: Award,
    title: "Projetos Reais",
    description: "Construa projetos que você pode adicionar ao seu portfólio e mostrar para empresas.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com outros desenvolvedores, compartilhe soluções e aprenda junto.",
  },
  {
    icon: Zap,
    title: "Feedback Instantâneo",
    description: "Receba feedback imediato nos exercícios e quizzes para acelerar seu aprendizado.",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">
            Por que escolher nossa plataforma?
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Uma experiência de aprendizado projetada para desenvolvedores que querem resultados reais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">{benefit.title}</h3>
                <p className="text-secondary">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
