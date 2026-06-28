/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        tilda: {
          bg: '#f9f6f3',      // Warm cream background
          text: '#2d2b27',    // Deep olive/charcoal text
          accent: '#8d7a6b',  // Soft vintage gold/brown accent
          gold: '#c8b49e',
        }
      }
    },
  },
  plugins: [],
}
