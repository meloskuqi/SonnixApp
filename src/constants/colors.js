// Sonnix App Color Palette
// Main colors - centered around crimson red theme

export const colors = {
  // Primary Colors - Main Theme
  primary: '#A20031',          // Main crimson red
  primaryDark: '#811433',      // Dark crimson
  primaryLight: '#C14E4C',     // Warm red
  
  // Background Colors
  background: '#211F20',       // Very dark charcoal / near-black
  backgroundDark: '#0D0D0D',   // Pure black for deeper contrast
  card: '#2E1C22',            // Very dark charcoal card background
  cardElevated: '#3A2329',    // Slightly lighter for elevated cards
  
  // Supporting Colors (use sparingly)
  deepWine: '#501529',        // Deep wine accent
  mutedRed: '#A6213E',        // Muted red for secondary elements
  softOrange: '#DB916A',      // Soft orange for highlights
  paleApricot: '#EAC492',     // Pale apricot for subtle accents
  warmBeige: '#EBD8B6',       // Warm beige for light accents
  lightSand: '#E6DACA',       // Light sand / off-white
  
  // Text Colors
  text: '#FFFFFF',            // White text
  textSecondary: '#E6DACA',   // Light sand for secondary text
  textTertiary: '#9CA3AF',    // Gray for tertiary text
  textMuted: '#6B7280',       // Muted gray
  
  // UI Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Functional Colors
  success: '#10B981',         // Green for success states
  warning: '#F59E0B',         // Amber for warnings
  error: '#DC2626',           // Red for errors
  info: '#3B82F6',            // Blue for info
  
  // Opacity Variants (for overlays and subtle effects)
  primaryAlpha: {
    '05': '#A2003110',
    '08': '#A2003115',
    '10': '#A200311A',
    '15': '#A2003125',
    '20': '#A2003133',
    '25': '#A2003140',
    '30': '#A200314D',
    '40': '#A2003166',
    '50': '#A2003180',
  },
  
  whiteAlpha: {
    '05': '#FFFFFF0D',
    '08': '#FFFFFF14',
    '10': '#FFFFFF1A',
    '15': '#FFFFFF26',
    '20': '#FFFFFF33',
    '25': '#FFFFFF40',
    '30': '#FFFFFF4D',
    '40': '#FFFFFF66',
    '50': '#FFFFFF80',
    'CC': '#FFFFFFCC',
    'BB': '#FFFFFFBB',
  },
  
  // Border Colors
  border: '#2A2A2A',
  borderLight: '#3A3A3A',
  borderPrimary: '#A2003140',
};

// Gradient Presets
export const gradients = {
  primary: ['#A20031', '#811433', '#501529'],
  primaryLight: ['#C14E4C', '#A20031'],
  warm: ['#DB916A', '#EAC492', '#EBD8B6'],
  crimsonToWine: ['#A20031', '#501529'],
  card: ['#2E1C22', '#3A2329'],
};

// Shadow Presets
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#A20031',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  extraLarge: {
    shadowColor: '#A20031',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
};

export default {
  colors,
  gradients,
  shadows,
};



