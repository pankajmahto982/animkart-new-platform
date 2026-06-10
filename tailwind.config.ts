import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#24523c",
        leaf: "#3f8f5f",
        field: "#f3f7ec",
        ink: "#17231d",
        saffron: "#f59e0b",
        clay: "#b65d2a"
      },
      boxShadow: {
        soft: "0 16px 50px rgba(23, 35, 29, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
