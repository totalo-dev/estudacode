import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center space-x-2 text-secondary hover:text-text transition-colors mb-10 text-sm">
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Link>

          <h1 className="text-4xl font-bold text-text mb-2">Política de Privacidade</h1>
          <p className="text-secondary text-sm mb-12">Última atualização: Maio de 2026</p>

          <div className="space-y-10 text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-text mb-3">1. Dados que Coletamos</h2>
              <p className="mb-3">Coletamos os seguintes dados ao usar a EstudaCode:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-text">Dados de cadastro:</strong> nome, e-mail e senha (criptografada)</li>
                <li><strong className="text-text">Dados de uso:</strong> trilhas acessadas, exercícios resolvidos, progresso</li>
                <li><strong className="text-text">Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo</li>
                <li><strong className="text-text">Dados de pagamento:</strong> processados pelo Stripe — não armazenamos dados de cartão</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">2. Como Usamos seus Dados</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fornecer e melhorar a plataforma</li>
                <li>Personalizar sua experiência de aprendizado</li>
                <li>Enviar comunicações sobre seu progresso (se autorizado)</li>
                <li>Processar pagamentos e emitir certificados</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">3. Compartilhamento de Dados</h2>
              <p>Não vendemos seus dados. Compartilhamos apenas com:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li><strong className="text-text">Stripe</strong> — processamento de pagamentos</li>
                <li><strong className="text-text">Provedores de autenticação</strong> — Google, GitHub (se usar login social)</li>
                <li><strong className="text-text">Autoridades legais</strong> — quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">4. Seus Direitos (LGPD)</h2>
              <p className="mb-3">Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar exclusão da conta e dados</li>
                <li>Exportar seus dados</li>
                <li>Revogar consentimento de comunicações</li>
              </ul>
              <p className="mt-3">Para exercer esses direitos, acesse Configurações ou envie e-mail para <span className="text-primary">privacidade@estudacode.com.br</span>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">5. Cookies</h2>
              <p>Usamos cookies essenciais para autenticação e preferências. Não usamos cookies de rastreamento de terceiros para publicidade.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">6. Segurança</h2>
              <p>Adotamos medidas técnicas para proteger seus dados: HTTPS, senhas criptografadas com bcrypt, headers de segurança e acesso restrito ao banco de dados.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text mb-3">7. Contato</h2>
              <p>Dúvidas sobre privacidade: <span className="text-primary">privacidade@estudacode.com.br</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
