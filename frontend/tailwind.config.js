/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        kelly: ["Kelly Slab", "cursive"],
      },
      colors:{
        primary: "#121618",
        secondary: "#0796EF",
      },
    },
  },
  plugins: [],
}