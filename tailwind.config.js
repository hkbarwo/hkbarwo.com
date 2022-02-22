module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      primary: '#caa846',
      secondary: '#34b1bf',
      'secondary-dark': '#268590',
      tertiary: '#F21365',
      'tertiary-light': '#FFA0A2',

      white: '#fff',
      black: '#000',
      
      'logo-black': '#1a1818',
      
      'gray-f4': '#f4f4f4',
      'gray-e5': '#e5e5e5',
      'gray-bc': '#bcbcbc',
      'gray-70': '#707070',
      'gray-3c': '#3c3c3c',
      'gray-24': '#242424',
    },
    fontFamily: {
      'sans': ['Noto Sans TC', 'sans-serif'],
      'serif': ['Noto Serif TC', 'serif'],
    },
    spacing: {
      '0': '0rem',
      '1': '1px',
      '2': '0.125rem',
      '4': '0.25rem',
      '8': '0.5rem',
      '10': '0.625rem',
      '12': '0.75rem',
      '14': '0.875rem',
      '18': '1.125rem',
      '16': '1rem',
      '20': '1.25rem',
      '22': '1.375rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '30': '1.875rem',
      '32': '2rem',
      '36': '2.25rem',
      '40': '2.5rem',
      '44': '2.75rem',
      '48': '3rem',
      '52': '3.25rem',
      '56': '3.5rem',
      '60': '3.75rem',
      '64': '4rem',
      '72': '4.5rem',
      '96': '6rem',
      '120': '7.5rem',
      '128': '8rem',
      'logo-sm': '140px',
      '150': '150px',
      'logo': '160px',
      '212': '212px',
    },
    fontSize: {
      '14': '0.875rem',
      '16': '1rem',
      '18': '1.125rem',
      '20': '1.25rem',
      '22': '1.375rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '32': '2rem',
      '36': '2.25rem',
    },
    letterSpacing: {
      normal: '0',
      wide: '.075em',
      wider: '.1em',
      widest: '.25em',
    },
    aspectRatio: {
      1: '1',
      3: '3',
      4: '4',
      9: '9',
      16: '16',
    },
    extend: {
      width: {
        '1/8': '12.5%',
      },
      minWidth: {
        '180': '11.25rem',
        '144': '144px',
      },
      maxWidth: {
        '180': '11.25rem',
        '480': '480px',
      },
      maxHeight: {
        '720': '720px',
        '1080': '1080px',
      },
      borderRadius: {
        '8': '8px',
      },
      backgroundImage: theme => ({
        'pattern-light': "url('/images/bg/pattern-light.svg')",
        'pattern-white': "url('/images/bg/pattern-white.svg')",
      }),
      transitionProperty: {
        'height': 'height',
      },
      boxShadow: {
        outline: '0 0 8px 0 rgba(0, 0, 0, 0.1)',
      },
      listStyleType: {
        'circle': 'circle',
      },
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
