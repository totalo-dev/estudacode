/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Impede que o site seja carregado em iframes (proteção contra clickjacking)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Impede que o browser faça MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Controla informações de referrer enviadas em requisições
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Força HTTPS por 1 ano (habilitar apenas em produção com HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Restringe acesso a APIs sensíveis do browser
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy — ajuste as origens conforme necessário
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval necessário para Next.js dev; remover em prod se possível
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        // Aplica os headers de segurança em todas as rotas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Compressão de resposta HTTP
  compress: true,

  // Otimização de imagens
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Remove o header X-Powered-By que expõe a stack
  poweredByHeader: false,
};

module.exports = nextConfig;
