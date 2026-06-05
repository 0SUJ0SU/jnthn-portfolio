import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      paper: "#F6F1E8",
      ink: "#2C2625",
      depth: "#3A3230",
      accent: "#DB293C",
      rust: "#A1110B",
      fill: "#A18F8B",
      gold: "#EEBF4F",
      sky: "#99C0E4",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
