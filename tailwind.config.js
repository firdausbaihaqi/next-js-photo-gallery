const plugin = require('tailwindcss/plugin');


module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "rgba(248, 113, 113, 1)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    plugin(({ addUtilities }) => {
      const columnCount = {
        '.col-count-1': {
          'column-count': '1'
        },
        '.col-count-2': {
          'column-count': '2'
        },
        '.col-count-3': {
          'column-count': '3'
        },
      }
      addUtilities(columnCount, ['responsive'])
    })
  ]
}
