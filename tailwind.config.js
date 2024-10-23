/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*{html,js}","./scripts/loadproducts.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}