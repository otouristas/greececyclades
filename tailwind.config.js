/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // =====================================================
      // PREMIUM COLOR PALETTE (CSS Variables for Theming)
      // =====================================================
      colors: {
        // Base semantic colors (light mode defaults)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#E8ECF2',
          100: '#D1D9E5',
          200: '#A3B3CB',
          300: '#758DB1',
          400: '#476797',
          500: '#1E2E48',
          600: '#18253A',
          700: '#121C2C',
          800: '#0C121E',
          900: '#060910',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#F9F6F1',
          100: '#F3EDE3',
          200: '#E7DBC7',
          300: '#E3D7C3',
          400: '#D7C7A7',
          500: '#CBB78B',
          600: '#BFA76F',
          700: '#B39753',
          800: '#A78737',
          900: '#8B6F1F',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          light: 'hsl(var(--accent-light))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },

        // Cyclades brand colors
        cyclades: {
          'deep-blue': '#1E2E48',
          'beige': '#E3D7C3',
          'turquoise': '#40E0D0',
          'sea-blue': '#0891B2',
          'sand': '#F5F0E8',
          'sunset': '#F97316',
          'caldera': '#0f2744',
        },

        // Utility colors
        'accent-gold': '#C9A961',
        'trust-green': '#10B981',
        'urgent-orange': '#F59E0B',
        'error-red': '#EF4444',

        // Dark theme specific
        'dark-bg': '#0a1628',
        'dark-card': '#0f2744',
        'dark-border': '#1e3a5f',
      },

      // =====================================================
      // PREMIUM TYPOGRAPHY
      // =====================================================
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },

      // =====================================================
      // PREMIUM SHADOWS
      // =====================================================
      boxShadow: {
        'elegant': '0 4px 20px -2px rgba(30, 46, 72, 0.1), 0 2px 8px -2px rgba(30, 46, 72, 0.06)',
        'elegant-lg': '0 8px 30px -4px rgba(30, 46, 72, 0.15), 0 4px 12px -4px rgba(30, 46, 72, 0.08)',
        'elegant-xl': '0 20px 50px -10px rgba(30, 46, 72, 0.2), 0 10px 20px -5px rgba(30, 46, 72, 0.1)',
        'glow': '0 0 20px rgba(64, 224, 208, 0.3)',
        'glow-lg': '0 0 40px rgba(64, 224, 208, 0.4)',
        'glow-gold': '0 0 20px rgba(201, 169, 97, 0.3)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'card-hover': '0 20px 40px -15px rgba(30, 46, 72, 0.25)',
        'dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 8px 30px -4px rgba(0, 0, 0, 0.4)',
      },

      // =====================================================
      // BORDER RADIUS
      // =====================================================
      borderRadius: {
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // =====================================================
      // PREMIUM ANIMATIONS (15+ Keyframes)
      // =====================================================
      keyframes: {
        // Basic fades
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },

        // Slides
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },

        // Floating effects
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },

        // Particles & ambient
        'particle': {
          '0%': { opacity: '0', transform: 'translateY(100vh) scale(0)' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-100vh) scale(1)' }
        },

        // Pulse effects
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },

        // Shimmer & loading
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },

        // Scale effects
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        },

        // Bounces
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },

        // Scroll indicator
        'scroll-indicator': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(8px)' }
        },

        // Blob animation (existing)
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        },

        // Subtle zoom (existing)
        'subtle-zoom': {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.15)' }
        },

        // Accordion
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },

        // Spin variations
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },

        // Gradient shift
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },

        // Typewriter cursor
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
      },

      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-down': 'fade-down 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'particle': 'particle 10s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'scale-up': 'scale-up 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.5s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin-slow 3s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'blink': 'blink 1s step-end infinite',
      },

      // =====================================================
      // SPACING & SIZING
      // =====================================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // =====================================================
      // BACKDROP BLUR
      // =====================================================
      backdropBlur: {
        xs: '2px',
      },

      // =====================================================
      // CUSTOM SCREENS
      // =====================================================
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },

      // =====================================================
      // CUSTOM GRADIENTS (via backgroundImage)
      // =====================================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyclades-gradient': 'linear-gradient(135deg, #1E2E48 0%, #0f2744 50%, #0a1628 100%)',
        'sunset-gradient': 'linear-gradient(180deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)',
        'sea-gradient': 'linear-gradient(180deg, #0891B2 0%, #06B6D4 50%, #22D3EE 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
