import Link from "next/link";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationNavigationProps {
  previous?: {
    title: string;
    href: string;
  };
  next?: {
    title: string;
    href: string;
  };
}

export default function PaginationNavigation({ previous, next }: PaginationNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-8 border-t border-surface">
      {previous ? (
        <Link href={previous.href} className="flex-1">
          <Button variant="ghost" className="group">
            <ChevronLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-secondary">Anterior</div>
              <div className="text-sm font-medium">{previous.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      
      {next ? (
        <Link href={next.href} className="flex-1 flex justify-end">
          <Button variant="ghost" className="group">
            <div className="text-right">
              <div className="text-xs text-secondary">Próximo</div>
              <div className="text-sm font-medium">{next.title}</div>
            </div>
            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
