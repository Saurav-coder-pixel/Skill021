/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C63FF',
          50: '#F0EFFF',
          100: '#E1DFFE',
          200: '#C3BFFD',
          300: '#A59FFC',
          400: '#877FFB',
          500: '#6C63FF',
          600: '#4A40EE',
          700: '#3530D4',
          800: '#2520AA',
          900: '#181480',
        },
        teal: {
          DEFAULT: '#00BFA6',
          50: '#E0FAF7',
          100: '#B3F2EC',
          200: '#80E8DF',
          300: '#4DDDD2',
          400: '#26D3C7',
          500: '#00BFA6',
          600: '#009E8A',
          700: '#007D6E',
          800: '#005C52',
          900: '#003B35',
        },
        brand: {
          bg: '#F8F9FF',
          card: '#FFFFFF',
          hero: '#EEF0FF',
          text: '#1A1A2E',
          muted: '#6B7280',
          border: '#E5E7EB',
          dark: {
            bg: '#0F0F1A',
            card: '#1A1A2E',
            hero: '#13132A',
            text: '#F1F1FF',
            muted: '#9CA3AF',
            border: '#2A2A3D',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(108,99,255,0.12)',
        'glow': '0 0 40px rgba(108,99,255,0.15)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #EEF0FF 0%, #F8F9FF 100%)',
        'hero-dark': 'linear-gradient(135deg, #0F0F1A 0%, #13132A 100%)',
        'violet-teal': 'linear-gradient(135deg, #6C63FF 0%, #00BFA6 100%)',
        'card-gradient': 'linear-gradient(135deg, #6C63FF 0%, #8B83FF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
