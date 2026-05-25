import TableOfContents from "@/components/navigation/TableOfContents";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ModuleTocAsideProps {
  items: TocItem[];
}

export default function ModuleTocAside({ items }: ModuleTocAsideProps) {
  return (
    <aside className="hidden xl:block fixed right-0 top-0 h-screen w-72 p-8 overflow-y-auto">
      <TableOfContents items={items} activeId="introducao" />
    </aside>
  );
}
