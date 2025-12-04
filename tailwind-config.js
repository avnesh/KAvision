// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.html", // Scans all HTML files in subdirectories
  ],
  theme: {
    extend: {
      colors: {
        'ka-blue': '#1e3a8a',
        'ka-green': '#059669',
        'ka-light': '#f3f4f6',
        'ka-dark': '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}