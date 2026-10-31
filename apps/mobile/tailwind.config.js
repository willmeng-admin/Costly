/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // COSTLY brand colors
        navy: '#0B1F3A',
        'primary-blue': '#246BFF',
        cyan: '#16BFEF',
        canvas: '#F3F6FA',
        surface: '#FFFFFF',
        'subtle-surface': '#F8FAFD',
        // Text
        'text-primary': '#102544',
        'text-secondary': '#5F7392',
        'text-tertiary': '#8A9AB0',
        'text-inverse': '#FFFFFF',
        'text-disabled': '#A7B3C4',
        // Border
        'border-default': '#E1E9F3',
        'border-strong': '#246BFF',
        // State
        success: '#16885D',
        warning: '#B87512',
        error: '#C93636',
        disabled: '#A7B3C4',
        // Legacy dark surface (kept for backward compat with existing screens)
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          900: '#0c4a6e',
        },
        'dark-surface': {
          base: '#090A0F',
          card: '#12141C',
          elevated: '#1A1D27',
          border: '#262A38',
        },
      },
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '24px',
        pill: '999px',
      },
      spacing: {
        '1': 4,
        '2': 8,
        '3': 12,
        '4': 16,
        '5': 20,
        '6': 24,
        '8': 32,
        '10': 40,
        '12': 48,
        '13': 52,
        '16': 64,
      },
      fontSize: {
        'display': [36, { lineHeight: 42, fontWeight: '600' }],
        'heading-xl': [26, { lineHeight: 32, fontWeight: '700' }],
        'heading-lg': [23, { lineHeight: 28, fontWeight: '700' }],
        'heading-md': [19, { lineHeight: 24, fontWeight: '600' }],
        'body-lg': [16, { lineHeight: 24 }],
        'body-md': [14, { lineHeight: 21 }],
        'body-sm': [12, { lineHeight: 18 }],
        'label': [13, { lineHeight: 18, fontWeight: '600' }],
        'button': [15, { lineHeight: 20, fontWeight: '600' }],
        'metric': [34, { lineHeight: 40, fontWeight: '700' }],
        'overline': [11, { lineHeight: 16, fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};
