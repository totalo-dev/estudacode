import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Termos de Uso",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors mb-10 text-sm">
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Link>

          <h1 className="text-4xl font-bold text-text mb-2">Termos de Uso</h1>
          <p className="text-secondary text-sm mb-12">Última atualização: Maio de 2026</p>

          <div className="space-y-10 text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-text mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar ou usar a plataforma EstudaCode, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize a plataforma.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">2. Descrição do Serviço</h2>
              <p>A EstudaCode é uma plataforma educacional de programação que oferece trilhas de aprendizado, exercícios práticos, quizzes e projetos. O conteúdo é disponibilizado em planos gratuito e pagos.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">3. Conta de Usuário</h2>
              <p className="mb-3">Para acessar recursos da plataforma, você deve criar uma conta. Você é responsável por:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Manter a confidencialidade da sua senha</li>
                <li>Todas as atividades realizadas com sua conta</li>
                <li>Notificar imediatamente sobre uso não autorizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">4. Uso Aceitável</h2>
              <p className="mb-3">Você concorda em não:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Compartilhar credenciais de acesso com terceiros</li>
                <li>Reproduzir ou distribuir o conteúdo da plataforma sem autorização</li>
                <li>Usar a plataforma para fins ilegais ou prejudiciais</li>
                <li>Tentar acessar áreas restritas do sistema</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">5. Propriedade Intelectual</h2>
              <p>Todo o conteúdo da EstudaCode — incluindo textos, exercícios, quizzes e código — é protegido por direitos autorais. O acesso não transfere propriedade sobre o conteúdo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">6. Pagamentos e Reembolsos</h2>
              <p>Planos pagos têm garantia de 7 dias. Cancelamentos dentro deste prazo resultam em reembolso integral. Após 7 dias, não há reembolso proporcional.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">7. Limitação de Responsabilidade</h2>
              <p>A EstudaCode não garante que o uso da plataforma resultará em emprego ou renda específica. O aprendizado depende do esforço e dedicação de cada usuário.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">8. Alterações nos Termos</h2>
              <p>Podemos atualizar estes termos periodicamente. Notificaremos usuários sobre mudanças significativas por e-mail. O uso continuado após as alterações constitui aceitação.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">9. Contato</h2>
              <p>Dúvidas sobre estes termos? Entre em contato: <span className="text-primary">contato@estudacode.com.br</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
