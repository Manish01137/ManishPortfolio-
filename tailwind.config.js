/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          900: '#07070C',
          800: '#0A0A12',
          700: '#101019',
          600: '#16161F'
        },
        ink: {
          50: '#F5F5F7',
          200: '#C9C9D4',
          400: '#8B8B9C',
          600: '#5A5A6A'
        },
        brand: {
          violet: '#7C3AED',
          cyan: '#06B6D4',
          pink: '#EC4899',
          gold: '#F5C26B'
        }
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(180deg, transparent, #07070C 80%)',
        'mesh': 'radial-gradient(at 20% 10%, rgba(124,58,237,0.18), transparent 50%), radial-gradient(at 80% 30%, rgba(6,182,212,0.14), transparent 50%), radial-gradient(at 50% 90%, rgba(236,72,153,0.10), transparent 50%)'
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        }
      }
    }
  },
  plugins: []
}
