/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "wox-bg": "url('/wox-bg.jpeg')",
        "main-bg": "url('/abstract.jpg')",
      },
      fontFamily: {
        Monstserrat: ["Montserrat", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
