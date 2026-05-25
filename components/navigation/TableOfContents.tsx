"use client";

import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
}

export default function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
    <nav className="sticky top-24 space-y-2">
      <h3 className="text-sm font-semibold text-text mb-4">Nesta Página</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm py-1 border-l-2 pl-3 transition-colors",
                activeId === item.id
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-text hover:border-secondary"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
