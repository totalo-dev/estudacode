import { MetadataRoute } from "next";
import { getTrilhas } from "@/lib/services/trilhas.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://estudacode.com.br";

  const trilhaRoutes = getTrilhas().map((t) => ({
    url: `${base}/trilhas/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogSlugs = [
    "react-hooks-guia-completo",
    "typescript-generics-na-pratica",
    "nextjs-server-components",
    "css-grid-vs-flexbox",
    "nodejs-api-rest-boas-praticas",
    "como-montar-portfolio-dev",
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: base,                      priority: 1.0, changeFrequency: "weekly"  as const },
    { url: `${base}/planos`,          priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/trilhas`,         priority: 0.9, changeFrequency: "weekly"  as const },
    { url: `${base}/projetos`,        priority: 0.8, changeFrequency: "weekly"  as const },
    { url: `${base}/blog`,            priority: 0.7, changeFrequency: "weekly"  as const },
    { url: `${base}/comunidade`,      priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/documentacao`,    priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/termos`,          priority: 0.3, changeFrequency: "yearly"  as const },
    { url: `${base}/privacidade`,     priority: 0.3, changeFrequency: "yearly"  as const },
    ...trilhaRoutes,
    ...blogRoutes,
  ];
}
