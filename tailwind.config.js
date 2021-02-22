module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#caa846',
      secondary: '#6fcdd4',

      white: '#fff',
      black: '#000',
      
      'logo-black': '#1a1818',
      
      'gray-f4': '#f4f4f4',
      'gray-3c': '#3c3c3c',
      'gray-24': '#242424',
    },
    fontFamily: {
      'sans': ['Noto Sans TC', 'sans-serif'],
      'serif': ['Noto Serif TC', 'serif'],
    },
    spacing: {
      '0': '0rem',
      '2': '0.125rem',
      '4': '0.25rem',
      '8': '0.5rem',
      '10': '0.625rem',
      '12': '0.75rem',
      '16': '1rem',
      '20': '1.25rem',
      '22': '1.375rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '32': '2rem',
      '36': '2.25rem',
      '40': '2.5rem',
      '48': '3rem',
      '60': '3.75rem',
      '72': '4.5rem',
      '96': '6rem',
    },
    fontSize: {
      '14': '0.875rem',
      '16': '1rem',
      '18': '1.125rem',
      '22': '1.375rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '36': '2.25rem',
    },
    letterSpacing: {
      normal: '0',
      wide: '.1em',
      widest: '.25em',
    },
    aspectRatio: {
      1: '1',
    },
    extend: {
      minWidth: {
        '180': '11.25rem',
      },
      backgroundImage: theme => ({
        'pattern-light': "url('/images/bg/pattern-light.svg')",
        'pattern-white': "url('/images/bg/pattern-white.svg')",
      })
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      translate: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
