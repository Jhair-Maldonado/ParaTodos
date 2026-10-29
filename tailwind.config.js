/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: "color-mix(in srgb, var(--color-primary) calc(<alpha-value> * 100%), transparent)",
        primaryHover: "color-mix(in srgb, var(--color-primary-hover) calc(<alpha-value> * 100%), transparent)",
        onPrimary: "color-mix(in srgb, var(--color-on-primary) calc(<alpha-value> * 100%), transparent)",
        secondary: "color-mix(in srgb, var(--color-secondary) calc(<alpha-value> * 100%), transparent)",
        background: "color-mix(in srgb, var(--color-background) calc(<alpha-value> * 100%), transparent)",
        surface: "color-mix(in srgb, var(--color-surface) calc(<alpha-value> * 100%), transparent)",
        surfaceHover: "color-mix(in srgb, var(--color-surface-hover) calc(<alpha-value> * 100%), transparent)",
        text: "color-mix(in srgb, var(--color-text) calc(<alpha-value> * 100%), transparent)",
        textMuted: "color-mix(in srgb, var(--color-text-muted) calc(<alpha-value> * 100%), transparent)",
        border: "color-mix(in srgb, var(--color-border) calc(<alpha-value> * 100%), transparent)",
        borderStrong: "color-mix(in srgb, var(--color-border-strong) calc(<alpha-value> * 100%), transparent)",
        success: "color-mix(in srgb, var(--color-success) calc(<alpha-value> * 100%), transparent)",
        error: "color-mix(in srgb, var(--color-error) calc(<alpha-value> * 100%), transparent)",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'premium': '0 20px 40px -15px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.35s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
