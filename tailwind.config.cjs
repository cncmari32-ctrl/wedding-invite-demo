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
        brand: {
          dark: '#0a0a0a',
          light: '#f5f5f0',
          accent: '#c8b49e', // Soft gold/champagne
        },
        tilda: {
          bg: '#f9f6f3',
          text: '#2d2b27',
          accent: '#8d7a6b',
          gold: '#c8b49e',
        }
      },
      height: {
        'svh': '100svh',
      }
    },
  },
  plugins: [],
}
