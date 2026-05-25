import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Todas as cores leem das CSS variables — mudam automaticamente com o tema
        background: "var(--color-background)",
        surface:    "var(--color-surface)",
        card:       "var(--color-card)",
        primary:    "var(--color-primary)",
        success:    "var(--color-success)",
        text:       "var(--color-text)",
        secondary:  "var(--color-secondary)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
