/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'base-green': '#002323',
      'light-green': '#E2EBC1',
      'pink': '#EF5657',
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui', 'Roboto'],
      'mono': ['ui-monospace', 'Consolas'],
      'roboto-bold': ['Roboto', 'sans-serif', 'black'],
    },
    fontWeight: {
      normal: '500',
      bold: '700',
      black: '900',
    },
    extend: {
      backgroundColor: {
        'default': '#002323',
    },
  },
  plugins: [],
  }
}