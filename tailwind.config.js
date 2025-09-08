/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./app/**/*.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./error.vue",
    "./nuxt.config.{js,ts}",
    "./node_modules/@nuxtjs/tailwindcss/dist/runtime/components/*.js"
  ],
  theme: {
    extend: {
      colors: {
        dark: '#171717',
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: true,
  }
}
