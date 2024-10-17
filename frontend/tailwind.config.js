/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 5px rgba(255,255, 255, 0.75)",
          "0 0px 10px rgba(255, 255,255, 0.6)"
        ]
      }
    },
  },
  plugins: [],
}

