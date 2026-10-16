/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0b0b0c',
        'brand-surface': '#141517',
        'brand-emerald': '#0f3d2e',
        'brand-volt': '#c7ff3a',
      },
      fontFamily: {
        sans: ['"Google Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Google Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Google Sans"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'volt-glow': '0 0 25px -5px rgba(199, 255, 58, 0.35)',
        'volt-glow-lg': '0 0 40px -5px rgba(199, 255, 58, 0.45)',
        'emerald-glow': '0 0 30px -5px rgba(15, 61, 46, 0.6)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
