/**
 * COSTLY Design System — Typography Tokens
 */
import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  display: { fontSize: 36, fontWeight: '600', lineHeight: 42, letterSpacing: 0.5 },
  headingXl: { fontSize: 26, fontWeight: '700', lineHeight: 32 },
  headingLg: { fontSize: 23, fontWeight: '700', lineHeight: 28 },
  headingMd: { fontSize: 19, fontWeight: '600', lineHeight: 24 },
  bodyLg: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyMd: { fontSize: 14, fontWeight: '400', lineHeight: 21 },
  bodySm: { fontSize: 12, fontWeight: '400', lineHeight: 18 },
  label: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  button: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  metric: { fontSize: 34, fontWeight: '700', lineHeight: 40 },
  overline: { fontSize: 11, fontWeight: '600', lineHeight: 16, letterSpacing: 0.6 },
};

export type TypographyKey = keyof typeof typography;
