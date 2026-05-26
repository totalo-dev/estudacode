import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/favicon_io/web-app-manifest-192x192.png" alt="EstudaCode" width={32} height={32} className="object-contain" />
              <span className="text-xl font-bold text-text">EstudaCode</span>
            </div>
            <p className="text-secondary text-sm">
              Aprenda programação através de projetos reais e exercícios práticos.
            </p>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link href="/trilhas" className="text-secondary hover:text-text text-sm transition-colors">Trilhas</Link></li>
              <li><Link href="/projetos" className="text-secondary hover:text-text text-sm transition-colors">Projetos</Link></li>
              <li><Link href="/dashboard" className="text-secondary hover:text-text text-sm transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link href="/documentacao" className="text-secondary hover:text-text text-sm transition-colors">Documentação</Link></li>
              <li><Link href="/blog" className="text-secondary hover:text-text text-sm transition-colors">Blog</Link></li>
              <li><Link href="/comunidade" className="text-secondary hover:text-text text-sm transition-colors">Comunidade</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-text transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-text transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-text transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-text transition-colors" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-card text-center text-secondary text-sm">
          <p>&copy; 2026 EstudaCode. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
