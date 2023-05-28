/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {},
    screens: {
      "_sm": {
        max: "640px",
      },
      "_md": {
        max: "768px",
      },
      "_lg": {
        max: "1200px",
      },
      "sm": {
        min: "640px",
      },
      "md": {
        min: "768px",
      },
      "lg": {
        min: "1200px",
      },
    },
  },
  plugins: [],
}
