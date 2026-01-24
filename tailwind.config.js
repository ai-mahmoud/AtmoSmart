/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        atmo: {
          green: '#10b981', // emerald-500
          dark: '#064e3b', // emerald-900
          blue: '#0ea5e9', // sky-500
          slate: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}