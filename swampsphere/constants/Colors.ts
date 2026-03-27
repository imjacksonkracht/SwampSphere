export const Colors = {
  ufBlue: '#003087',
  ufOrange: '#FA4616',
  background: '#F5F7FA',
  cardWhite: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#555F6D',
  textMuted: '#9AA5B4',
  success: '#22C55E',
  warning: '#F59E0B',
  registered: '#003087',
  registerNow: '#FA4616',
} as const;

export const Typography = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  display: 32,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

const ThemeColors = {
  light: {
    text: Colors.textPrimary,
    background: Colors.background,
    tint: Colors.ufBlue,
    tabIconDefault: Colors.textMuted,
    tabIconSelected: Colors.ufOrange,
  },
  dark: {
    text: Colors.cardWhite,
    background: Colors.textPrimary,
    tint: Colors.ufOrange,
    tabIconDefault: Colors.textMuted,
    tabIconSelected: Colors.ufOrange,
  },
} as const;

export default ThemeColors;
