/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'google-blue': '#4285f4',
        'google-red': '#ea4335',
        'google-yellow': '#fbbc05',
        'google-green': '#34a853',
        'google-gray': '#5f6368',
        'google-bg': '#ffffff',
        'google-hover': '#f8f9fa',
        'google-border': '#dadce0',
        'fundezy-red': '#e60000', // Main brand red
        'fundezy-red-dark': '#cc0000', // Darker red for hover states
        'fundezy-red-light': '#ff1a1a', // Lighter red for accents
      },
      boxShadow: {
        'google': '0 1px 6px 0 rgba(32,33,36,0.28)',
        'google-hover': '0 1px 1px rgba(0,0,0,0.1)',
        'glow-red': '0 0 20px rgba(230, 0, 0, 0.3)',
        'glow-red-lg': '0 0 40px rgba(230, 0, 0, 0.3)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.05\"><circle cx=\"30\" cy=\"30\" r=\"1\"/></g></g></svg>')",
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px)', opacity: '0.6' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(230, 0, 0, 0.2), 0 0 10px rgba(230, 0, 0, 0.2), 0 0 15px rgba(230, 0, 0, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(230, 0, 0, 0.4), 0 0 20px rgba(230, 0, 0, 0.4), 0 0 30px rgba(230, 0, 0, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}