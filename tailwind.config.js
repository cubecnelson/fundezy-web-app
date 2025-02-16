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
        'fundezy-red': '#e60000', // Slightly darker red for better contrast
      },
      boxShadow: {
        'google': '0 1px 6px 0 rgba(32,33,36,0.28)',
        'google-hover': '0 1px 1px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}