/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './layout/**/*.{js,jsx}',
    './shared/**/*.{js,jsx}',
    './styles/**/*.{js,jsx}',
    './utils/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#16A34A',
        red: '#DC143C',
        yellow: '#E2E22E',
      },
    },
  },
  plugins: [],
};
