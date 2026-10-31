import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1F33", 50: "#F5F7FA", 100: "#E5EAF1", 200: "#C5CFDE", 700: "#1C3554", 800: "#142640", 900: "#0F1F33", 950: "#0A1626" },
        ivory: { DEFAULT: "#F8F5F0", 50: "#FDFBF8", 100: "#F8F5F0", 200: "#EDE6DA", 300: "#DCD0BB" },
        gold: { DEFAULT: "#B8935A", 50: "#FAF6EE", 100: "#F3EAD5", 200: "#E5D2A8", 400: "#C7A574", 500: "#B8935A", 600: "#9E7B45", 700: "#7A5E36" },
        charcoal: "#1A1A1A",
        stone: { 50: "#FAFAF9", 100: "#F5F5F4", 200: "#E7E5E4", 300: "#D6D3D1", 400: "#A8A29E", 500: "#78716C", 600: "#57534E", 700: "#44403C", 800: "#292524", 900: "#1C1917" },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.4em",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 1s ease-out both",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
