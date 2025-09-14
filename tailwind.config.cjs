/*******************************************************
 * Tailwind Config - Zoro Epic Site
 ******************************************************/
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        zoro: {
          50: '#edfff7',
          100: '#c9ffe8',
          200: '#92ffd2',
            300: '#58f6b5',
          400: '#27d07d',
          500: '#0fa865',
          600: '#068453',
          700: '#056844',
          800: '#064f36',
          900: '#043024',
          950: '#021c15'
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow-green': '0 0 20px -2px rgba(39,208,125,0.55)',
      },
      backgroundImage: {
        'radial-accent': 'radial-gradient(circle at 30% 20%, rgba(39,208,125,0.15), transparent 60%)'
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(6px)' }
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 rgba(39,208,125,0)' },
          '50%': { boxShadow: '0 0 20px -2px rgba(39,208,125,0.55)' }
        }
      }
    }
  },
  plugins: []
};
