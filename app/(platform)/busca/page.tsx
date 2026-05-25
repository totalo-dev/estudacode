import { Suspense } from "react";
import { Search } from "lucide-react";
import BuscaContent from "./_components/BuscaContent";

function BuscaFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-secondary">
        <Search size={32} className="opacity-40 animate-pulse" />
        <p className="text-sm">Carregando busca...</p>
      </div>
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense fallback={<BuscaFallback />}>
      <BuscaContent />
    </Suspense>
  );
}
