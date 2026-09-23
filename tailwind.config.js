/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/**/*.html", "./includes/**/*.html", "./js/**/*.js"],
  corePlugins: {
    preflight: false // Désactive le reset Tailwind pour ne pas écraser style.css
  },
  theme: {
    extend: {
      colors: {
        'neon-blue':   '#00d9ff',
        'neon-violet': '#7b2cbf',
        'neon-green':  '#00ff88',
        'dark-bg':     '#050816',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    }
  },
  plugins: [],
};
