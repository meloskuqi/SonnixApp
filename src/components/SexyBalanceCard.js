import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../constants/colors';

const SexyBalanceCard = ({ 
  tokens, 
  label = "Available Balance", 
  showFooter = true,
  gradient = gradients.primary,
  icon = 'wallet',
  badgeIcon = 'flash',
  badgeText = 'Active',
  badgeColor = colors.warning,
  shadowColor = colors.primary
}) => {
  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { shadowColor }]}
    >
      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={28} color={colors.white} />
          </View>
          <View style={styles.badgeContainer}>
            <Ionicons name={badgeIcon} size={14} color={badgeColor} />
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>
        
        <View style={styles.balanceSection}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.amountRow}>
            <Text style={styles.tokenAmount}>{tokens}</Text>
            <View style={styles.tokenBadge}>
              <Ionicons name="diamond" size={16} color={colors.warning} />
              <Text style={styles.tokenLabel}>Tokens</Text>
            </View>
          </View>
        </View>

        {showFooter && (
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.footerText}>Verified</Text>
            </View>
            <View style={styles.footerDivider} />
            <View style={styles.footerItem}>
              <Ionicons name="shield-checkmark" size={16} color={colors.success} />
              <Text style={styles.footerText}>Secured</Text>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.whiteAlpha['08'],
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.whiteAlpha['05'],
    bottom: -30,
    left: -30,
  },
  cardContent: {
    padding: 24,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.whiteAlpha['15'],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.whiteAlpha['20'],
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.whiteAlpha['15'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['20'],
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  balanceSection: {
    marginBottom: 24,
  },
  label: {
    color: colors.whiteAlpha['CC'],
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenAmount: {
    color: colors.white,
    fontSize: 48,
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
    backgroundColor: colors.whiteAlpha['15'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['20'],
  },
  tokenLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteAlpha['10'],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['15'],
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
    backgroundColor: colors.whiteAlpha['20'],
    marginHorizontal: 8,
  },
});

export default SexyBalanceCard;

