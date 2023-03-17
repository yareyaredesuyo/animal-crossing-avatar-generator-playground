module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    // themes: false,
    // themes: ["light", "black"],
    // themes: ["cupcake", "night"],
    themes: [
      "light",
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          "base-content": "#f8f8f2",
        },
      },
    ],
  },  
}
