import { notFound } from "next/navigation";
import { getTrilhaBySlug } from "@/lib/services/trilhas.service";
import { getModuloConteudo } from "@/lib/services/modulos.service";
import ModuleSidebar  from "./_components/ModuleSidebar";
import ArticleContent from "./_components/ArticleContent";
import ModuleTocAside from "./_components/ModuleTocAside";

const TOC_ITEMS = [
  { id: "introducao", title: "Introdução",     level: 1 },
  { id: "topicos",    title: "Conceitos",       level: 1 },
  { id: "exemplo",    title: "Exemplo Prático", level: 2 },
  { id: "conclusao",  title: "Conclusão",       level: 1 },
];

export default function ConteudoPage({
  params,
}: {
  params: { slug: string; moduloId: string };
}) {
  const trilha = getTrilhaBySlug(params.slug);
  const dados  = getModuloConteudo(params.slug, params.moduloId);

  if (!trilha || !dados) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <ModuleSidebar
          trilha={trilha}
          todosModulos={dados.listaModulos}
          moduloAtualId={params.moduloId}
        />
        <ArticleContent
          trilha={trilha}
          modulo={dados.modulo}
          conteudo={dados.conteudo}
moduloAnterior={dados.moduloAnterior}
          moduloProximo={dados.moduloProximo}
        />
        <ModuleTocAside items={TOC_ITEMS} />
      </div>
    </div>
  );
}
