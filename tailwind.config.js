/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./app/**/*.tsx", "./themes/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    g: ({ theme }) => theme("spacing")
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({ g: value => ({ gap: value }) }, { values: theme("g") })
    })
  ]
}
