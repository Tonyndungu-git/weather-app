/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/rippleui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("rippleui")],
  };
  module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/rippleui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          spin: 'spin 1s linear infinite', // Custom spin animation
        },
      },
    },
    plugins: [require("rippleui")],
  };
  