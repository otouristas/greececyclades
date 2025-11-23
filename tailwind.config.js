/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E2E48',
          50: '#E8ECF2',
          100: '#D1D9E5',
          200: '#A3B3CB',
          300: '#758DB1',
          400: '#476797',
          500: '#1E2E48', // Main color
          600: '#18253A',
          700: '#121C2C',
          800: '#0C121E',
          900: '#060910',
        },
        secondary: {
          DEFAULT: '#E3D7C3',
          50: '#F9F6F1',
          100: '#F3EDE3',
          200: '#E7DBC7',
          300: '#E3D7C3', // Secondary color
          400: '#D7C7A7',
          500: '#CBB78B',
          600: '#BFA76F',
          700: '#B39753',
          800: '#A78737',
          900: '#8B6F1F',
        },
        'sifnos-deep-blue': '#1E2E48',
        'sifnos-beige': '#E3D7C3',
        'sifnos-turquoise': '#40E0D0',
        accent: '#FF6B35',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      animation: {
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        'subtle-zoom': {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.15)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
