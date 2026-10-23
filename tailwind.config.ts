import type { Config } from 'tailwindcss';

/**
 * Design tokens for Visio Solutions Inc.
 * Theme-aware neutrals are driven by CSS custom properties (RGB channels) defined
 * in src/app/globals.css so light/dark themes share one utility surface. Brand and
 * semantic colors are fixed hex values (Tailwind still derives opacity variants).
 * See DESIGN_SYSTEM.md for the full rationale and contrast notes.
 */
const withChannel = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware neutrals (defined as channels in globals.css)
        background: withChannel('--background'),
        surface: withChannel('--surface'),
        'surface-subtle': withChannel('--surface-subtle'),
        'surface-raised': withChannel('--surface-raised'),
        border: withChannel('--border'),
        foreground: withChannel('--foreground'),
        'muted-foreground': withChannel('--muted-foreground'),
        'subtle-foreground': withChannel('--subtle-foreground'),

        // Fixed brand palette
        navy: {
          DEFAULT: '#0B1220',
          surface: '#111A2E',
        },
        brand: {
          DEFAULT: '#2563EB', // Intelligent Blue
          hover: '#1D4ED8',
          bright: '#3B82F6',
          50: '#EFF5FF',
          100: '#DBE8FE',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        teal: {
          DEFAULT: '#0F9F9A',
          soft: '#DDF7F5',
          cyan: '#0891B2',
        },
        highlight: {
          DEFAULT: '#F59E0B',
        },
        // Deep surface that stays dark in both themes (hero, spotlight bands, footer).
        ink: {
          DEFAULT: '#060816',
          raised: '#0D1226',
          line: '#1E2748',
        },
        // Vivid brand spectrum. Decorative: fills, glows, gradients, icon tiles.
        // Text that needs a hue uses `pillar-*` / `.text-spectrum` instead.
        spectrum: {
          blue: '#2563EB',
          sky: '#0EA5E9',
          cyan: '#06B6D4',
          violet: '#7C3AED',
          indigo: '#4F46E5',
          magenta: '#DB2777',
          rose: '#E11D48',
          orange: '#F97316',
          amber: '#F59E0B',
          teal: '#0D9488',
          emerald: '#10B981',
        },
        // One signature hue per capability, theme-aware so it is AA as text.
        pillar: {
          ai: withChannel('--pillar-ai'),
          software: withChannel('--pillar-software'),
          security: withChannel('--pillar-security'),
          growth: withChannel('--pillar-growth'),
        },
        // Theme-aware interactive accent (brand-as-text). Brand stays fixed for
        // button backgrounds; accent adapts so text meets AA in light and dark.
        accent: withChannel('--accent'),
        // Semantic status colors (theme-aware for AA on both surfaces)
        success: withChannel('--success'),
        warning: withChannel('--warning'),
        error: withChannel('--error'),
        info: withChannel('--info'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Mobile minimums stay modest so long headlines do not dominate a phone screen.
        display: ['clamp(2.15rem, 5vw, 4.6rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        h1: ['clamp(2.05rem, 4.2vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.85rem, 3.2vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        h3: ['clamp(1.4rem, 2vw, 2rem)', { lineHeight: '1.18', letterSpacing: '-0.01em' }],
        h4: ['1.25rem', { lineHeight: '1.3' }],
        'body-lg': ['clamp(1.1rem, 1.5vw, 1.3rem)', { lineHeight: '1.6' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        section: 'clamp(4rem, 8vw, 8rem)',
        'section-sm': 'clamp(3rem, 5vw, 5rem)',
      },
      maxWidth: {
        content: '1200px',
        wide: '1280px',
        prose: '720px',
      },
      borderRadius: {
        control: '8px',
        input: '10px',
        card: '20px',
        feature: '28px',
      },
      backgroundImage: {
        spectrum: 'linear-gradient(100deg, #2563EB 0%, #7C3AED 35%, #DB2777 68%, #F97316 100%)',
        'spectrum-soft':
          'linear-gradient(100deg, rgba(37,99,235,.14) 0%, rgba(124,58,237,.14) 35%, rgba(219,39,119,.14) 68%, rgba(249,115,22,.14) 100%)',
      },
      boxShadow: {
        nav: '0 1px 0 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.05)',
        card: '0 1px 2px 0 rgb(16 24 40 / 0.04), 0 4px 16px -4px rgb(16 24 40 / 0.08)',
        'card-hover': '0 2px 4px 0 rgb(16 24 40 / 0.06), 0 12px 28px -6px rgb(16 24 40 / 0.14)',
        float: '0 8px 40px -8px rgb(16 24 40 / 0.24)',
        focus: '0 0 0 3px rgb(37 99 235 / 0.35)',
        glow: '0 10px 40px -10px rgb(124 58 237 / 0.55), 0 4px 18px -6px rgb(37 99 235 / 0.45)',
        'glow-lg':
          '0 30px 80px -20px rgb(124 58 237 / 0.45), 0 12px 40px -12px rgb(219 39 119 / 0.35)',
        lift: '0 1px 2px rgb(11 16 36 / 0.04), 0 22px 48px -24px rgb(11 16 36 / 0.22)',
      },
      transitionTimingFunction: {
        natural: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-16' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'orbit-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s var(--ease-natural, ease-out) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'orbit-slow': 'orbit-spin 70s linear infinite',
        'orbit-reverse': 'orbit-spin 50s linear infinite reverse',
        'glow-pulse': 'glow-pulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
