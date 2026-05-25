import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowLeft, Home, BookOpen, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 mb-16 hover:opacity-80 transition-opacity">
        <Image src="/favicon_io/android-chrome-192x192.png" alt="EstudaCode" width={32} height={32} className="object-contain" />
        <span className="text-xl font-bold text-text">EstudaCode</span>
      </Link>

      {/* Número 404 */}
      <div className="relative mb-8 select-none">
        <span className="text-[10rem] md:text-[14rem] font-black leading-none bg-gradient-to-br from-primary/20 to-primary/5 bg-clip-text text-transparent">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">🔍</span>
        </div>
      </div>

      {/* Mensagem */}
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-3 text-center">
        Página não encontrada
      </h1>
      <p className="text-secondary text-center max-w-md mb-10">
        A página que você está procurando não existe ou foi movida. Verifique o endereço ou volte para o início.
      </p>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home size={18} className="mr-2" />
            Ir para o Início
          </Button>
        </Link>
        <Link href="/trilhas">
          <Button variant="outline" size="lg">
            <BookOpen size={18} className="mr-2" />
            Ver Trilhas
          </Button>
        </Link>
        <Link href="/busca">
          <Button variant="ghost" size="lg">
            <Search size={18} className="mr-2" />
            Buscar
          </Button>
        </Link>
      </div>

      {/* Links rápidos */}
      <div className="text-center">
        <p className="text-secondary text-sm mb-3">Ou acesse diretamente:</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Projetos", href: "/projetos" },
            { label: "Planos", href: "/planos" },
            { label: "Blog", href: "/blog" },
            { label: "Comunidade", href: "/comunidade" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
