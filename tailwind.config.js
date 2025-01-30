/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          win98: {
            bg: "#008080",
            text: "#000000",
            "border-lighter": "#ffffff",
            "border-light": "#dfdfdf",
            "border-dark": "#808080",
            "border-darker": "#000000",
            "title-bar": "#000080",
            "title-text": "#ffffff",
            "title-bar-inactive": "#808080",
            button: "#c0c0c0",
            "button-highlight": "#ffffff",
            "button-shadow": "#808080",
            menu: "#c0c0c0",
            "menu-hover": "#000080",
            "menu-text-hover": "#ffffff",
          },
        },
        boxShadow: {
          "win98-out": "inset 1px 1px #ffffff, inset -1px -1px #0a0a0a",
          "win98-in": "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a",
          "win98-border": "inset 1px 1px #dfdfdf, inset -1px -1px #808080",
        },
      },
    },
    plugins: [],
  };
  