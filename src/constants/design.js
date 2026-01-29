// Sonnix App Design System
// Unified spacing, typography, and component patterns

import { colors, shadows } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
    color: colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    color: colors.text,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: colors.text,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.text,
  },
  // Body
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.textSecondary,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.text,
  },
  // Small
  small: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.textTertiary,
  },
  smallBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.textSecondary,
  },
  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: colors.textMuted,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: colors.textTertiary,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 999,
};

export const cardStyles = {
  default: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
  },
  elevated: {
    backgroundColor: colors.cardElevated,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.large,
  },
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.large,
  },
};

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.medium,
  },
  primaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondary: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  outline: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
};

export const inputStyles = {
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  placeholder: {
    color: colors.textMuted,
  },
};

export default {
  spacing,
  typography,
  borderRadius,
  cardStyles,
  buttonStyles,
  inputStyles,
};


