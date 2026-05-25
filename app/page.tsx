import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import TrilhaCard from "@/components/cards/TrilhaCard";
import { trilhas } from "@/data/trilhas";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text mb-4">
              Trilhas Disponíveis
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Escolha sua trilha e comece a aprender hoje mesmo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {trilhas.slice(0, 6).map((trilha) => (
              <TrilhaCard key={trilha.id} trilha={trilha} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/trilhas">
              <Button variant="outline" size="lg">
                Ver Todas as Trilhas
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-secondary mb-8">
            Junte-se a milhares de desenvolvedores que já estão aprendendo na prática
          </p>
          <Link href="/cadastro">
            <Button variant="primary" size="lg" className="group">
              Começar Agora Gratuitamente
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
