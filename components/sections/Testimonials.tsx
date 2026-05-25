"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Card from "@/components/ui/Card";

const depoimentos = [
  {
    nome: "Lucas Ferreira",
    cargo: "Frontend Developer @ Nubank",
    avatar: "LF",
    cor: "from-blue-500 to-blue-700",
    nota: 5,
    texto:
      "Aprendi React de verdade aqui. Outros cursos me ensinavam a copiar código, a EstudaCode me ensinou a pensar como desenvolvedor. Em 3 meses consegui meu primeiro emprego.",
  },
  {
    nome: "Ana Paula Costa",
    cargo: "Desenvolvedora Fullstack Freelancer",
    avatar: "AC",
    cor: "from-purple-500 to-purple-700",
    nota: 5,
    texto:
      "A trilha de TypeScript é incrível. Os exercícios são desafiadores do jeito certo — não são fáceis demais nem impossíveis. Finalmente entendi generics depois de anos tentando.",
  },
  {
    nome: "Rafael Mendes",
    cargo: "Estudante de Ciência da Computação",
    avatar: "RM",
    cor: "from-green-500 to-green-700",
    nota: 5,
    texto:
      "Tentei várias plataformas antes. O diferencial aqui é não ter videoaula — você é obrigado a escrever código desde o início. Meu portfólio cresceu muito em pouco tempo.",
  },
  {
    nome: "Camila Souza",
    cargo: "UX Designer migrando para Dev",
    avatar: "CS",
    cor: "from-pink-500 to-pink-700",
    nota: 5,
    texto:
      "Comecei do zero com a trilha de Fundamentos Web. A progressão é muito bem pensada. Hoje já consigo implementar meus próprios designs sem depender de ninguém.",
  },
  {
    nome: "Diego Alves",
    cargo: "Backend Dev aprendendo Frontend",
    avatar: "DA",
    cor: "from-orange-500 to-orange-700",
    nota: 5,
    texto:
      "Já sabia Node.js mas precisava aprender React. A trilha foi direta ao ponto, sem enrolação. Os projetos práticos são exatamente o que você vai encontrar no mercado.",
  },
  {
    nome: "Mariana Lima",
    cargo: "Desenvolvedora Júnior @ iFood",
    avatar: "ML",
    cor: "from-teal-500 to-teal-700",
    nota: 5,
    texto:
      "O sistema de badges me manteve motivada. Cada módulo concluído dá aquela sensação de progresso real. Em 4 meses fui de iniciante a contratada.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">
            Quem já está aprendendo
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Desenvolvedores reais que transformaram suas carreiras com a EstudaCode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {depoimentos.map((d, index) => (
            <motion.div
              key={d.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col">
                {/* Estrelas */}
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: d.nota }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Texto */}
                <p className="text-secondary text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{d.texto}&rdquo;
                </p>

                {/* Autor */}
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${d.cor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {d.avatar}
                  </div>
                  <div>
                    <p className="text-text font-semibold text-sm">{d.nome}</p>
                    <p className="text-secondary text-xs">{d.cargo}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Estatística social */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-secondary text-sm">
            Junte-se a{" "}
            <span className="text-text font-semibold">+2.000 desenvolvedores</span>{" "}
            que já estão aprendendo na prática
          </p>
        </motion.div>
      </div>
    </section>
  );
}
