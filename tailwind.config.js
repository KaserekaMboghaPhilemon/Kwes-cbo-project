/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#004d40',
        'safety-orange': '#ff6d00',
        'deep-navy': '#001a33',
        'ngo-cream': '#FDFBF7',
        primary: '#004d40',
        secondary: '#ff6d00',
        neutral: '#f9fafb',
        text: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
      keyframes: {
        'slow-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255,109,0,0.55)' },
          '50%':      { transform: 'scale(1.04)', boxShadow: '0 0 0 12px rgba(255,109,0,0)' },
        },
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'slow-pulse': 'slow-pulse 2.4s ease-in-out infinite',
        'soft-bounce': 'soft-bounce 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}