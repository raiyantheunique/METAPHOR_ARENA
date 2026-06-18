/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: '#DC143C',
        'dark-red': '#8B0000',
        gold: '#FFD700',
        dark: {
          50: '#1a1a1a',
          100: '#111111',
          200: '#0a0a0a',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
        'slide-right': 'slideRight 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220, 20, 60, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(220, 20, 60, 0)' },
        },
        slideRight: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      spacing: {
        '120': '30rem',
      }
    },
  },
  plugins: [],
};
