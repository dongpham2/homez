/* eslint-disable import/no-extraneous-dependencies, global-require */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      textColor: {
        default: 'var(--text-color-default)',
      },
      colors: {
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border-gray))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        orange: {
          DEFAULT: 'var(--orange-primary)',
          primary: 'var(--orange-primary)',
        },
        gray: {
          DEFAULT: 'var(--gray-primary)',
          primary: 'var(--gray-primary)',
        },
        red: {
          DEFAULT: 'var(--red-primary)',
          primary: 'var(--red-primary)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        violet: {
          DEFAULT: 'var(--violet-primary)',
          primary: 'var(--violet-primary)',
        },
        ghost: {
          DEFAULT: 'var(--ghost-primary)',
          primary: 'var(--ghost-primary)',
        },
        black: {
          DEFAULT: 'var(--black-primary)',
          primary: 'var(--black-primary)',
          secondary: 'var(--black-secondary)',
        },
        navbar: {
          DEFAULT: 'rgba(var(--navbar-background))',
          primary: 'rgba(var(--navbar-background))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        10: '0.625rem',
      },
      height: {
        15: '3.75rem',
      },
      padding: {
        7.5: '1.875rem',
        25: '6.25rem',
        15: '3.75rem',
      },
      margin: {
        15: '3.75rem',
      },
      gap: {
        15: '3.75rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        linear: 'linear-gradient(var(--linear-gradient-background))',
      },
      backgroundColor: {
        opacity: 'rgba(var(--opacity-background))',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('tailwindcss-rfs')],
}
