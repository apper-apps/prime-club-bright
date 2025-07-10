/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          600: '#4B5563',
          700: '#374151',
          900: '#111827',
        },
        teal: {
          500: '#14B8A6',
          600: '#0D9488',
        },
        cyan: {
          500: '#06B6D4',
          600: '#0891B2',
        },
        rose: {
          500: '#F43F5E',
          600: '#E11D48',
        },
        pink: {
          500: '#EC4899',
          600: '#DB2777',
        },
        violet: {
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        purple: {
          500: '#A855F7',
          600: '#9333EA',
        },
        sky: {
          500: '#0EA5E9',
          600: '#0284C7',
        },
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        orange: {
          500: '#F97316',
          600: '#EA580C',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(20, 184, 166, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}