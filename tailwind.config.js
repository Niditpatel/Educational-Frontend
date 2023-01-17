/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    screens: {
      sm: '420px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    container: {
      center: true
    },
    colors: {
      'primary': "#274472",
      'secondary': "#41729F",
      'light1': '#5885AF',
      'light2': '#C3E0E5',
      "white": '#fff',
      "black": '#000',
      "warning": '#daa544f1',
      "danger": '#eb5122e1',
      "success": '#60a55e'
    },
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}
