/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "stone-bg": "url('/src/images/stone.png')",
      },
    },
  },
  plugins: [],
};
