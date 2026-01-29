import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, shadows } from '../constants/colors';
import { spacing, borderRadius } from '../constants/design';

const WalletBalanceCard = ({ balance, tokens }) => {
  return (
    <LinearGradient
      colors={gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="wallet" size={26} color={colors.white} />
          </View>
          <View style={styles.badgeContainer}>
            <View style={styles.pulseDot} />
            <Text style={styles.badgeText}>ACTIVE</Text>
          </View>
        </View>
        
        <View style={styles.balanceSection}>
          <Text style={styles.label}>Available Balance</Text>
          <View style={styles.amountRow}>
            <Text style={styles.tokenAmount}>{tokens}</Text>
            <View style={styles.tokenBadge}>
              <Ionicons name="diamond" size={16} color={colors.warning} />
              <Text style={styles.tokenLabel}>TOKENS</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Ionicons name="checkmark-circle" size={14} color={colors.white} />
            <Text style={styles.footerText}>Verified</Text>
          </View>
          <View style={styles.footerDivider} />
          <View style={styles.footerItem}>
            <Ionicons name="shield-checkmark" size={14} color={colors.white} />
            <Text style={styles.footerText}>Secured</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.large,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.whiteAlpha['10'],
    top: -60,
    right: -60,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.whiteAlpha['08'],
    bottom: -40,
    left: -40,
  },
  cardContent: {
    padding: spacing.lg,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.whiteAlpha['20'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.whiteAlpha['30'],
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.whiteAlpha['20'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['30'],
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  balanceSection: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.whiteAlpha['CC'],
    fontSize: 13,
    marginBottom: spacing.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tokenAmount: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    textShadowColor: '#00000030',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.whiteAlpha['20'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['30'],
  },
  tokenLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteAlpha['15'],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['20'],
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  footerText: {
    color: colors.whiteAlpha['CC'],
    fontSize: 12,
    fontWeight: '600',
  },
  footerDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.whiteAlpha['25'],
    marginHorizontal: spacing.sm,
  },
});

export default WalletBalanceCard;
