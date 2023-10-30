/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },

        'card-blue': '#1f8cff',
        'card-red': '#ce1411',
        'card-orange': '#d37a05',
        'card-pink': '#da0cda',
        'color-green': "#aee67f",
        'off-white': '#F5F5F5'
      },
    },
  },
  plugins: [],
}
