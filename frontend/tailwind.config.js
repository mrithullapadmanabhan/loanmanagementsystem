/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '95': '36px',
      },
      width: {
        '95': '36px',
      },
      colors: {
        default: '#171717',
        'prim': "#7C3AED",
        'subtext': "#737373",
        'subtext2': "#404040",
        "font_primary": "#171717",
        "border_color": "#E5E5E5",
        "gray_bg": "#f5f5f5"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        DEFAULT: 400,
        '100': 100,
        '200': 200,
        '300': 300,
        '500': 500,
        '600': 600,
        '700': 700,
        '800': 800,
        '900': 900,
      },
    },
  },
  plugins: [],
}
