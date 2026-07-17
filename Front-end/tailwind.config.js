/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#07070e',
          2: '#0c0c18',
          3: '#11111f',
          4: '#181828',
          5: '#20203a',
        },
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        'form': '0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px -16px rgba(0,0,0,0.9)',
        'btn': '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset',
        'btn-violet': '0 4px 24px -4px rgba(109,40,217,0.6), 0 1px 0 rgba(255,255,255,0.12) inset',
        'btn-violet-hover': '0 8px 32px -4px rgba(109,40,217,0.75), 0 1px 0 rgba(255,255,255,0.15) inset',
        'input-focus': '0 0 0 3px rgba(139,92,246,0.2)',
        'glow-violet': '0 0 60px -10px rgba(109,40,217,0.5)',
      },
      keyframes: {
        'mesh-1': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(5%, -8%) scale(1.1)' },
        },
        'mesh-2': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(-6%, 6%) scale(0.95)' },
        },
        'mesh-3': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(4%, 5%) scale(1.05)' },
          '66%': { transform: 'translate(-3%, -4%) scale(0.98)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'strength-fill': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'mesh-1': 'mesh-1 20s ease-in-out infinite',
        'mesh-2': 'mesh-2 24s ease-in-out infinite',
        'mesh-3': 'mesh-3 18s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'spin-slow': 'spin-slow 14s linear infinite',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}