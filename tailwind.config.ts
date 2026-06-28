import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light editorial palette
        ivory: '#FCF9F2',
        cream: '#F6EEDD',
        sand: '#EFE5D3',
        blush: '#F4E7E2',
        white: '#FFFFFF',
        ink: '#23201B',
        'ink-soft': '#6E665A',
        muted: '#8A8275',
        gold: '#C9A84C',
        'gold-deep': '#8C6A22',
        'gold-light': '#E2C572',
        emerald: '#0C3A2E',
        'emerald-light': '#16493A',
        garnet: '#8E2C44',
        // legacy aliases (so any lingering classes still resolve)
        primary: '#0C3A2E',
        'primary-light': '#16493A',
        charcoal: '#23201B',
        'cream-dark': '#EFE5D3',
        'accent-red': '#8E2C44',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-naskh)', 'serif'],
      },
      fontSize: {
        // Fluid type — scales from small phones (floor) up to desktop (ceiling).
        'display-xl': ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.85rem, 4.8vw, 3.5rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        'heading-xl': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.15' }],
        'heading-lg': ['clamp(1.5rem, 3.2vw, 2.25rem)', { lineHeight: '1.2' }],
        'heading-md': ['clamp(1.35rem, 2.6vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      maxWidth: {
        content: '1440px',
      },
      spacing: {
        section: '80px',
        'section-sm': '48px',
      },
      letterSpacing: {
        luxe: '0.2em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #A8893A 100%)',
        'dark-fade': 'linear-gradient(180deg, rgba(12,58,46,0) 0%, rgba(12,58,46,0.85) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
