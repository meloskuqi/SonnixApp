import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

const PaymentOptionsScreen = ({ navigation }) => {
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();

  const paymentMethods = [
    {
      id: 'qr',
      title: 'QR Payment',
      subtitle: 'Show QR code to pay',
      icon: 'qr-code',
      gradient: gradients.primary,
      onPress: () => navigation.navigate('QrPayment'),
      isPrimary: true,
    },
    {
      id: 'send',
      title: 'Send Money',
      subtitle: 'Transfer to friends',
      icon: 'send',
      gradient: [colors.info, '#2563EB'],
      onPress: () => navigation.navigate('SendMoney'),
    },
    {
      id: 'request',
      title: 'Request Money',
      subtitle: 'Request payment',
      icon: 'arrow-down-circle',
      gradient: [colors.warning, '#D97706'],
      onPress: () => navigation.navigate('RequestMoney'),
    },
    {
      id: 'vendor',
      title: 'Food & Drinks',
      subtitle: 'Order from vendors',
      icon: 'restaurant',
      gradient: [colors.softOrange, '#EA580C'],
      onPress: () => navigation.navigate('VendorsList'),
    },
  ];

  const quickActions = [
    {
      id: 'add',
      title: 'Add Funds',
      icon: 'add-circle',
      color: colors.success,
      onPress: () => navigation.navigate('AddFunds'),
    },
    {
      id: 'history',
      title: 'History',
      icon: 'receipt',
      color: colors.primary,
      onPress: () => navigation.navigate('TransactionHistory'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
      >
        <View style={[styles.content, { paddingTop: insets.top + spacing.md }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Payments</Text>
              <Text style={styles.subtitle}>Choose payment method</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Balance Card */}
          <TouchableOpacity
            onPress={() => navigation.navigate('WalletTab')}
            activeOpacity={0.9}
            style={styles.balanceCardWrapper}
          >
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
              
              <View style={styles.balanceContent}>
                <View style={styles.balanceHeader}>
                  <View style={styles.balanceBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.balanceBadgeText}>AVAILABLE</Text>
                  </View>
                  <Ionicons name="wallet" size={24} color={colors.white} />
                </View>
                
                <View style={styles.balanceMain}>
                  <Text style={styles.balanceLabel}>Your Balance</Text>
                  <View style={styles.balanceAmountRow}>
                    <Text style={styles.balanceAmount}>{tokens}</Text>
                    <View style={styles.tokenBadge}>
                      <Ionicons name="diamond" size={16} color={colors.warning} />
                      <Text style={styles.tokenLabel}>TOKENS</Text>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <View style={styles.paymentMethodsGrid}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  onPress={method.onPress}
                  style={styles.paymentMethodCard}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={method.gradient}
                    style={[
                      styles.paymentMethodGradient,
                      method.isPrimary && styles.primaryMethodGradient
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons 
                      name={method.icon} 
                      size={method.isPrimary ? 32 : 28} 
                      color={colors.white} 
                    />
                    {method.isPrimary && (
                      <View style={styles.primaryBadge}>
                        <Ionicons name="flash" size={10} color={colors.warning} />
                      </View>
                    )}
                  </LinearGradient>
                  <Text style={[
                    styles.paymentMethodTitle,
                    method.isPrimary && styles.primaryMethodTitle
                  ]}>{method.title}</Text>
                  <Text style={styles.paymentMethodSubtitle}>{method.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsRow}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  onPress={action.onPress}
                  style={styles.quickActionCard}
                  activeOpacity={0.7}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                    <Ionicons name={action.icon} size={24} color={action.color} />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Security Banner */}
          <View style={styles.securityBanner}>
            <Ionicons name="shield-checkmark" size={24} color={colors.success} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Secure Payments</Text>
              <Text style={styles.securityText}>
                All transactions are encrypted and protected
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  balanceCardWrapper: {
    marginBottom: spacing.xl,
  },
  balanceCard: {
    borderRadius: borderRadius.xl,
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
  balanceContent: {
    padding: spacing.lg,
    zIndex: 1,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  balanceBadge: {
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
  balanceBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  balanceMain: {
    marginBottom: spacing.sm,
  },
  balanceLabel: {
    fontSize: 13,
    color: colors.whiteAlpha['CC'],
    marginBottom: spacing.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -1,
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  paymentMethodCard: {
    width: '47%',
    alignItems: 'center',
  },
  paymentMethodGradient: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.medium,
  },
  primaryMethodGradient: {
    width: 88,
    height: 88,
    borderWidth: 2,
    borderColor: colors.primary + '60',
  },
  primaryBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    ...shadows.small,
  },
  paymentMethodTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  primaryMethodTitle: {
    fontSize: 16,
    color: colors.primary,
  },
  paymentMethodSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    fontWeight: '500',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  securityBanner: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.success + '30',
    alignItems: 'center',
    gap: spacing.sm,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 2,
  },
  securityText: {
    fontSize: 12,
    color: colors.textTertiary,
    lineHeight: 18,
  },
});

export default PaymentOptionsScreen;
