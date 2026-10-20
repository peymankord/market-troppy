import type { Config } from 'tailwindcss';
import rtl from 'tailwindcss-rtl';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    },
    extend: {
      colors: {
        // سرمه‌ای تیره (اصلی)
        navy: {
          DEFAULT: '#0F172A',
          50: '#F0F4FA',
          100: '#DCE4F0',
          200: '#B8C7DE',
          300: '#8BA3C7',
          400: '#5F7EAC',
          500: '#3E5B8C',
          600: '#2A4370',
          700: '#1C3157',
          800: '#15223F',
          900: '#0F172A',
          950: '#080D1A',
        },
        // فیروزه‌ای (اکسنت)
        teal: {
          DEFAULT: '#14B8A6',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
        mist: '#F8FAFC', // خاکستری روشن
      },
      fontFamily: {
        vazir: ['var(--font-vazir)', 'Tahoma', 'sans-serif'],
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(15, 23, 42, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 12px 48px -12px rgba(15, 23, 42, 0.14)',
        glow: '0 0 40px -8px rgba(20, 184, 166, 0.45)',
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.8)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'float-y': 'float-y 5s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        marquee: 'marquee 30s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.4,0,.2,1) infinite',
      },
    },
  },
  plugins: [rtl],
};

export default config;
