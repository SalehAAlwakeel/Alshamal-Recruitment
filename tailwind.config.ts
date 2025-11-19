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
        primary: {
          50: "#e6e6f5",
          100: "#cccceb",
          200: "#9999d7",
          300: "#6666c3",
          400: "#3333af",
          500: "#25259b",
          600: "#19197f",
          700: "#131366",
          800: "#0d0d4d",
          900: "#070733",
        },
      },
    },
  },
  plugins: [],
};
export default config;

