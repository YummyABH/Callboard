const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-500': '#546b85',
        'blue-600': '#47476b',
        'blue-700': '#363652',
        'color-app': `var(--color-app)`,
        'input-border': `var(--input-border)`,
        'black-299': `var(--black-299)`,
        'black-300': `var(--black-300)`,
        'black-301': `var(--black-301)`,
        'black-380': '#272727',
        'black-381': '#2d2d2d',
        'black-390': '#232327',
        'black-391': '#292935',
        'black-400': `var(--black-400)`,
        'black-401': '#252528',
        'black-500': `var(--black-500)`,
        'black-700': '#121212',
        'gradient-from': `var(--gradient-from)`,
        'gradient-to': `var(--gradient-to)`,
        'gray-300': '#d4d4d4',
        'gray-400': '#EBEBEBA3',
        'gray-500': `var(--gray-500)`,
        'gray-600': `var(--gray-600)`,
        'gray-700': `var(--gray-700)`,
        'gray-800': `var(--gray-800)`,
        'gray-900': `var(--gray-900)`,
        'gray-901': `var(--gray-901)`,
        'blue-400': '#2d69ff',
        'green-200': `var(--green-200)`,
        'green-300': `var(--green-300)`,
        'green-400': `var(--green-400)`,
        'green-500': `var(--green-500)`,
        'yellow-400': '#e0b703',
        'yellow-500': '#b59f32',
        'yellow-600': '#8c7c27',
        'black-60': '#00000060',
        'dark-700': '#242424',
        'red-666': `var(--red-666)`,
        'red-light': '#ff002f',
        'red-custom-300': '#e4002b',
        'bg-body': `var(--bg-body)`,
        'bg-custom-50': `var(--bg-custom-50)`,
        'bg-custom-100': `var(--bg-custom-100)`,
        'bg-custom-200': `var(--bg-custom-200)`,
        'bg-custom-300': `var(--bg-custom-300)`,
        'bg-custom-400': `var(--bg-custom-400)`,
        'bg-custom-500': `var(--bg-custom-500)`,
        'bg-custom-600': `var(--bg-custom-600)`,
        'bg-red-600': `var(--bg-red-600)`,
        'bg-page-dark': '#242424',
        'black-900': `var(--black-900)`,
        'hover-light': `var(--hover-light)`,
        'hover-custom-100': `var(--hover-custom-100)`,
        'hover-custom-200': `var(--hover-custom-200)`,
        'hover-custom-500': `var(--hover-custom-500)`,
        'border-submenu': `var(--border-submenu)`,
        'border-custom-200': `var(--border-custom-200)`,
        'border-custom-300': `var(--border-custom-300)`,
        'border-custom-400': `var(--border-custom-400)`,
        'border-custom-500': `var(--border-custom-500)`,
        'border-custom-600': `var(--border-custom-600)`,
        'text-custom': `var(--text-custom)`,
        'text-custom-300': `var(--text-custom-300)`,
        'text-custom-500': `var(--text-custom-500)`,
        'text-custom-600': `var(--text-custom-600)`,
        'gray-light': '#3c3a3a',
        'form-gray': `var(--form-gray)`,
        'glow-button': `var(--glow-button)`,
        'white-light': '#b0b0b0',
        'white-theme': `var(--white-theme)`
      },
      height: {
        custom: 'calc(50vh + 96px)'
      },
      minHeight: {
        custom: 'calc(100vh)'
      },
      fontSize: {
        custom: 'calc(1.4rem + .3vw)'
      },
      textShadow: {
        '4xl': ['0 0 10px white', '0 0 40px white']
      },
      boxShadow: {
        '3xl': '0 12.5px 25px -12px rgba(0, 0, 0, 0.8)',
        '3xl-white': '0 12.5px 25px -12px rgba(255, 255, 255, 0.2)'
      },
      backgroundImage: {
        'custom-radial-gradient': 'radial-gradient(white, transparent, transparent)'
      },
      gridAutoColumns: {
        '1fr': 'minmax(100px, 1fr)'
      },
      gridAutoRows: {
        '1fr': 'minmax(100px, 1fr)'
      }
    }
  },
  plugins: [
    plugin(
      function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value
            })
          },
          { values: theme('textShadow') }
        )
      },
      function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            // map to bg-radient-[*]
            'bg-radient': (value) => ({
              'background-image': `radial-gradient(${value},var(--tw-gradient-stops))`
            })
          },
          { values: theme('radialGradients') }
        )
      }
    )
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
}
