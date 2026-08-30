import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)", navy: "var(--navy)", blue: "var(--blue)", orange: "var(--orange)",
        paper: "var(--paper)", mist: "var(--mist)", line: "var(--line)", muted: "var(--muted)",
      },
      fontFamily: { sans: ["var(--font-manrope)", "sans-serif"] },
      boxShadow: { soft: "0 24px 80px rgba(8,27,55,.10)", card: "0 10px 40px rgba(8,27,55,.08)" },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};
export default config;
