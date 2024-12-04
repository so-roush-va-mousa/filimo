/** @type {import('tailwindcss').Config} */
export default {

  content: [ 
   "./index.html",
    "./public/js/main.js",
],
  theme: {
    extend: {
      colors :{
        
      },
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
}

