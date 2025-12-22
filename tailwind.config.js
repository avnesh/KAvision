/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007BFF', 
        'primary-dark': '#0056b3', 
        'accent': '#28A745', 
        'accent-dark': '#1e7e34', 
        'qa-dark': '#212529', 
        'qa-light': '#F8F9FA', 
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
    },
  },
  plugins: [],
}