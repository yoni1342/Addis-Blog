module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        Jose: ["Josefin Sans, serif"],
        Lora: ["Lora, serif"],
        VarelaRound: ["Varela Round "],
        Roboto: ['Roboto']
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
