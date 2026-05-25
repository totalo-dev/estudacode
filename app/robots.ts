import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/perfil/",
          "/configuracoes",
          "/onboarding",
          "/busca",
        ],
      },
    ],
    sitemap: "https://estudacode.com.br/sitemap.xml",
  };
}
