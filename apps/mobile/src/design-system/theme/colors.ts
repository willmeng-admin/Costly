/**
 * COSTLY Design System — Color Tokens
 * Source of truth: design.md
 * These values are estimated from design screenshots. Verify against Figma source before final production polish.
 */
export const colors = {
  brand: {
    navy: '#0B1F3A',
    blue: '#246BFF',
    cyan: '#16BFEF',
  },
  background: {
    canvas: '#F3F6FA',
  },
  surface: {
    default: '#FFFFFF',
    subtle: '#F8FAFD',
  },
  text: {
    primary: '#102544',
    secondary: '#5F7392',
    tertiary: '#8A9AB0',
    inverse: '#FFFFFF',
    disabled: '#A7B3C4',
  },
  border: {
    default: '#E1E9F3',
    strong: '#246BFF',
  },
  state: {
    success: '#16885D',
    warning: '#B87512',
    error: '#C93636',
    disabled: '#A7B3C4',
  },
  overlay: {
    scrim: 'rgba(11, 31, 58, 0.42)',
  },
} as const;

export type Colors = typeof colors;
