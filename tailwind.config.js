/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        gameCard: "repeat(4, 150px)",
      },
      gridTemplateRows: {
        // Simple 16 column grid
        gameCard: "repeat(4, 150px)",
      },
    },
  },
  plugins: [],
};
