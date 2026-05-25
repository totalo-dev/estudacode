"use client";

import { BookOpen, Code, CheckCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: BookOpen,
    title: "Escolha uma Trilha",
    description: "Selecione a trilha que corresponde aos seus objetivos de aprendizado",
    number: "01",
  },
  {
    icon: Code,
    title: "Pratique com Exercícios",
    description: "Resolva exercícios práticos e receba feedback instantâneo",
    number: "02",
  },
  {
    icon: CheckCircle,
    title: "Faça Quizzes",
    description: "Teste seu conhecimento e identifique áreas para melhorar",
    number: "03",
  },
  {
    icon: Rocket,
    title: "Construa Projetos",
    description: "Aplique tudo que aprendeu em projetos reais para seu portfólio",
    number: "04",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">
            Como funciona
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Um processo simples e eficaz para você dominar programação
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center">
                    <step.icon className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">{step.title}</h3>
                <p className="text-secondary">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
