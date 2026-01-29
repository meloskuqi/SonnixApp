import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useWallet } from '../context/WalletContext';
import { colors, gradients, shadows } from '../constants/colors';
import { spacing, borderRadius } from '../constants/design';

const PaymentOptionsModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();

  const onlinePayments = [
    {
      id: 'qr-online',
      title: 'QR Payment',
      subtitle: 'Online QR code',
      icon: 'qr-code',
      gradient: gradients.primary,
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'QrPayment' });
      },
      isPrimary: true,
    },
    {
      id: 'send',
      title: 'Send Money',
      subtitle: 'Transfer instantly',
      icon: 'send',
      gradient: [colors.info, '#2563EB'],
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'SendMoney' });
      },
    },
    {
      id: 'request',
      title: 'Request Money',
      subtitle: 'Request payment',
      icon: 'arrow-down-circle',
      gradient: [colors.warning, '#D97706'],
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'RequestMoney' });
      },
    },
  ];

  const offlinePayments = [
    {
      id: 'qr-offline',
      title: 'Offline QR',
      subtitle: 'No internet needed',
      icon: 'qr-code-outline',
      gradient: [colors.info, '#1D4ED8'],
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'OfflineCode' });
      },
    },
  ];

  const quickActions = [
    {
      id: 'vendor',
      title: 'Food & Drinks',
      icon: 'restaurant',
      color: colors.softOrange,
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'VendorsList' });
      },
    },
    {
      id: 'add',
      title: 'Add Funds',
      icon: 'add-circle',
      color: colors.success,
      onPress: () => {
        onClose();
        navigation.navigate('WalletTab', { screen: 'AddFunds' });
      },
    },
    {
      id: 'history',
      title: 'History',
      icon: 'receipt',
      color: colors.primary,
      onPress: () => {
        onClose();
        navigation.navigate('WalletTab', { screen: 'TransactionHistory' });
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={[styles.modalContent, { paddingBottom: insets.bottom + spacing.md }]}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerIconContainer}>
                <Ionicons name="flash" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.title}>Quick Pay</Text>
                <Text style={styles.subtitle}>Choose payment method</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.md }}
          >
            {/* Balance Card - Compact */}
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('WalletTab');
              }}
              activeOpacity={0.9}
              style={styles.balanceCardWrapper}
            >
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.balanceCard}
              >
                <View style={styles.balanceContent}>
                  <View style={styles.balanceHeader}>
                    <View style={styles.balanceBadge}>
                      <View style={styles.pulseDot} />
                      <Text style={styles.balanceBadgeText}>BALANCE</Text>
                    </View>
                  </View>
                  
                  <View style={styles.balanceMain}>
                    <View style={styles.balanceAmountRow}>
                      <Text style={styles.balanceAmount}>{tokens}</Text>
                      <View style={styles.tokenBadge}>
                        <Ionicons name="diamond" size={14} color={colors.warning} />
                        <Text style={styles.tokenLabel}>TOKENS</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Online Payments Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <Ionicons name="wifi" size={18} color={colors.success} />
                  <Text style={styles.sectionTitle}>Online Payments</Text>
                </View>
                <View style={styles.onlineBadge}>
                  <Text style={styles.onlineBadgeText}>REAL-TIME</Text>
                </View>
              </View>
              <View style={styles.paymentMethodsGrid}>
                {onlinePayments.map((method) => (
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
                        size={method.isPrimary ? 30 : 26} 
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

            {/* Offline Payments Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <Ionicons name="cloud-offline" size={18} color={colors.info} />
                  <Text style={styles.sectionTitle}>Offline Payments</Text>
                </View>
                <View style={styles.offlineBadge}>
                  <Text style={styles.offlineBadgeText}>NO INTERNET</Text>
                </View>
              </View>
              <View style={styles.paymentMethodsGrid}>
                {offlinePayments.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    onPress={method.onPress}
                    style={styles.paymentMethodCard}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={method.gradient}
                      style={styles.paymentMethodGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons 
                        name={method.icon} 
                        size={26} 
                        color={colors.white} 
                      />
                    </LinearGradient>
                    <Text style={styles.paymentMethodTitle}>{method.title}</Text>
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
                      <Ionicons name={action.icon} size={22} color={action.color} />
                    </View>
                    <Text style={styles.quickActionText}>{action.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl + 4,
    borderTopRightRadius: borderRadius.xl + 4,
    maxHeight: '90%',
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    ...shadows.extraLarge,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: colors.textMuted,
    borderRadius: borderRadius.round,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  balanceCardWrapper: {
    marginBottom: spacing.lg,
  },
  balanceCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.large,
  },
  balanceContent: {
    padding: spacing.md,
    zIndex: 1,
  },
  balanceHeader: {
    marginBottom: spacing.sm,
  },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.whiteAlpha['20'],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.whiteAlpha['30'],
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  balanceBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  balanceMain: {
    marginBottom: spacing.xs,
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -1,
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.whiteAlpha['20'],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['30'],
  },
  tokenLabel: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  onlineBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.success + '40',
  },
  onlineBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.success,
    letterSpacing: 0.5,
  },
  offlineBadge: {
    backgroundColor: colors.info + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.info + '40',
  },
  offlineBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.info,
    letterSpacing: 0.5,
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  paymentMethodCard: {
    width: '31%',
    alignItems: 'center',
  },
  paymentMethodGradient: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
    ...shadows.medium,
  },
  primaryMethodGradient: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderColor: colors.primary + '60',
  },
  primaryBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    ...shadows.small,
  },
  paymentMethodTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  primaryMethodTitle: {
    fontSize: 14,
    color: colors.primary,
  },
  paymentMethodSubtitle: {
    fontSize: 10,
    color: colors.textTertiary,
    textAlign: 'center',
    fontWeight: '500',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.sm + 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});

export default PaymentOptionsModal;
