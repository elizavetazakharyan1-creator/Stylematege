/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F7F7F8',
          100: '#EEEFF2',
          200: '#D9DBE0',
          300: '#B4B8C0',
          400: '#828894',
          500: '#565B66',
          600: '#3A3E47',
          700: '#272A31',
          800: '#17191E',
          900: '#0A0B0E',
        },
        electric: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        hot: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Noto Sans Georgian"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(10,11,14,0.08)',
        glow: '0 0 24px -4px rgba(59,130,246,0.45)',
        glowPink: '0 0 24px -4px rgba(236,72,153,0.45)',
        card: '0 8px 30px -6px rgba(10,11,14,0.12)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pop': 'pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        pulseSoft: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pop: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
