/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "stone-bg": "url('/src/images/stone.png')",
        "scroll-bg": "url('/src/images/scrollbg.png')",
        "card-bg": "url('/src/images/cardBG.png')",
      },
      fontFamily: {
        titles: ["KC Obra Letra", "sans-serif"],
      },
    },
  },
  plugins: [],
};
