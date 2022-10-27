/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '700px',
      'md': '1024px',
      'lg': '1350px',
      'xl': '1650px',
      'msm': {'max': '700px'},
      'mmd': {'max': '1024px'},
      'mlg': {'max': '1200px'}
    },

    extend: {},
  },
  plugins: [],
}
