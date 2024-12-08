/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redAccent: "rgba(var(--redAccent))",
        textPrimary: "rgba(var(--textPrimary))",
        textSecondary: "rgba(var(--textSecondary))",
        bgPrimary: "rgba(var(--bgPrimary))",
        bgGradient: "rgba(var(--bgGradient))",
        bgSecondary: "rgba(var(--bgSecondary))",
        buttonBgGray: "rgba(var(--buttonBgGray))",
        button: "rgba(var(--button))",
        stars: "rgba(var(--stars))",
      },
    },
  },
  plugins: [],
};
