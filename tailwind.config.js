/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./popup/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        darkBlue:"#0081A7",
        lightBlue:"#00AFB9",
        lightFace:"#FDFCDC",
        darkFace:"#FED9B7",
        orangish:"#F07167",
      }
    },
  },
  plugins: [],
}