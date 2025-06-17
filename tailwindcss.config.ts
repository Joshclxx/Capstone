import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6f040f",
        secondary: "#2f5215",
        tertiary: "#fccf55",
        white: "#f2f3f4",
        text: "#231f17",
        button: "#6189D4",
        highlight1: "#b24851",
        highlight2: "#6c9e47",
      },
    },
  },
  plugins: [],
};

export default config;
