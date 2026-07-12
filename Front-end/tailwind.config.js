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
        surface: {
          DEFAULT: '#0a0e13',
          alt: '#0d1219',
          elevated: '#131a22',
          card: '#141b23',
        },
      },
      boxShadow: {
        card: '0 30px 80px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03) inset',
        'glow-emerald': '0 8px 24px -6px rgba(16,185,129,0.35)',
        'glow-emerald-lg': '0 10px 34px -6px rgba(16,185,129,0.5)',
        'glow-indigo': '0 8px 24px -6px rgba(99,102,241,0.35)',
        'glow-indigo-lg': '0 10px 34px -6px rgba(99,102,241,0.5)',
      },
      keyframes: {
        'drift-a': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, 20px)' },
        },
        'drift-b': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-25px, -25px)' },
        },
        scan: {
          '0%': { left: '-30%' },
          '50%': { left: '100%' },
          '100%': { left: '-30%' },
        },
      },
      animation: {
        'drift-a': 'drift-a 16s ease-in-out infinite',
        'drift-b': 'drift-b 18s ease-in-out infinite',
        scan: 'scan 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}