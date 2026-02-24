import { createTokens } from 'tamagui'

export const tokens = createTokens({
  color: {
    primary: '#6366F1',
    secondary: '#14B8A6',
    background: '#FFFFFF',
    backgroundDark: '#111827',
    text: '#111827',
    textDark: '#FFFFFF',
  },

  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  size: {
    sm: 32,
    md: 40,
    lg: 48,
  },

  radius: {
    sm: 6,
    md: 12,
    lg: 20,
  },
})