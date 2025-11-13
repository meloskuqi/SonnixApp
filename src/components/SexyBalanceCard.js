import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SexyBalanceCard = ({ 
  tokens, 
  label = "Available Balance", 
  showFooter = true,
  gradient = ['#7B2CBF', '#9333EA', '#6B21A8'],
  icon = 'wallet',
  badgeIcon = 'flash',
  badgeText = 'Active',
  badgeColor = '#F59E0B',
  shadowColor = '#7B2CBF'
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
            <Ionicons name={icon} size={28} color="#FFFFFF" />
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
              <Ionicons name="diamond" size={16} color="#F59E0B" />
              <Text style={styles.tokenLabel}>Tokens</Text>
            </View>
          </View>
        </View>

        {showFooter && (
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.footerText}>Verified</Text>
            </View>
            <View style={styles.footerDivider} />
            <View style={styles.footerItem}>
              <Ionicons name="shield-checkmark" size={16} color="#10B981" />
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
    shadowColor: '#7B2CBF',
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
    backgroundColor: '#FFFFFF08',
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF05',
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
    backgroundColor: '#FFFFFF15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF20',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  balanceSection: {
    marginBottom: 24,
  },
  label: {
    color: '#FFFFFFCC',
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
    color: '#FFFFFF',
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
    backgroundColor: '#FFFFFF15',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  tokenLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF10',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF15',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  footerText: {
    color: '#FFFFFFCC',
    fontSize: 12,
    fontWeight: '600',
  },
  footerDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#FFFFFF20',
    marginHorizontal: 8,
  },
});

export default SexyBalanceCard;

