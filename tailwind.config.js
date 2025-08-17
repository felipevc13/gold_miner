/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./app/**/*.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        dark: '#171717',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: true,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  important: true
}
