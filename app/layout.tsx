import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EstudaCode — Aprenda Programação na Prática",
    template: "%s | EstudaCode",
  },
  description:
    "Plataforma de aprendizado de programação baseada em projetos reais, exercícios práticos e quizzes. Aprenda HTML, CSS, JavaScript, React, TypeScript e muito mais.",
  keywords: [
    "aprender programação",
    "curso de programação",
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "desenvolvimento web",
    "trilhas de aprendizado",
    "exercícios de programação",
  ],
  authors: [{ name: "EstudaCode" }],
  creator: "EstudaCode",
  metadataBase: new URL("https://estudacode.com.br"),
  icons: {
    icon: [
      { url: "/favicon_io/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon_io/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/favicon_io/site.webmanifest" },
      { rel: "icon", url: "/favicon_io/web-app-manifest-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/favicon_io/web-app-manifest-512x512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://estudacode.com.br",
    siteName: "EstudaCode",
    title: "EstudaCode — Aprenda Programação na Prática",
    description:
      "Plataforma de aprendizado de programação baseada em projetos reais, exercícios práticos e quizzes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EstudaCode — Aprenda Programação na Prática",
    description:
      "Plataforma de aprendizado de programação baseada em projetos reais, exercícios práticos e quizzes.",
    creator: "@estudacode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
