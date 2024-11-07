/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'eerie-black': '#222222',
        'floral-white': '#FFFAF4'
      },
      fontFamily: {
        salo: ['salo-variable', 'sans-serif'],
        nicholas: ['nicholas', 'sans-serif'],
        "antarctican-mono": ['antarctican-mono', 'monospace']
      }
    },
  },
  plugins: [],
}
