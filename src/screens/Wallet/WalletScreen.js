import React, { useState } from 'react';
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
import WalletBalanceCard from '../../components/WalletBalanceCard';
import TransactionItem from '../../components/TransactionItem';
import QuickPaymentModal from '../../components/QuickPaymentModal';
import FloatingPayButton from '../../components/FloatingPayButton';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

const WalletScreen = ({ navigation }) => {
  const { balance, tokens, transactions, tickets } = useWallet();
  const insets = useSafeAreaInsets();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const recentTransactions = transactions.slice(0, 5);

  const quickActions = [
    {
      id: 1,
      icon: 'add-circle',
      label: 'Add Funds',
      gradient: [colors.success, '#059669'],
      onPress: () => navigation.navigate('AddFunds'),
    },
    {
      id: 2,
      icon: 'send',
      label: 'Send',
      gradient: [colors.info, '#2563EB'],
      onPress: () => navigation.navigate('SendMoney'),
    },
    {
      id: 3,
      icon: 'arrow-down-circle',
      label: 'Request',
      gradient: [colors.warning, '#D97706'],
      onPress: () => navigation.navigate('RequestMoney'),
    },
    {
      id: 4,
      icon: 'qr-code',
      label: 'QR Pay',
      gradient: gradients.primary,
      onPress: () => navigation.navigate('QrPayment'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={[styles.content, { paddingTop: insets.top + spacing.md }]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>My Wallet</Text>
              <Text style={styles.subtitle}>Manage your funds & tickets</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionHistory')}
              style={styles.historyButton}
            >
              <Ionicons name="time-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <WalletBalanceCard balance={balance} tokens={tokens} />

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={action.onPress}
                style={styles.quickActionItem}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={action.icon} size={24} color={colors.white} />
                </LinearGradient>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* My Tickets Section */}
          {tickets.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Ionicons name="ticket" size={20} color={colors.primary} />
                  <Text style={styles.sectionTitle}>My Tickets</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{tickets.length}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('WalletTab')}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ticketsScroll}
              >
                {tickets.map((ticket) => (
                  <TouchableOpacity
                    key={ticket.id}
                    onPress={() => navigation.navigate('TicketDetails', { ticket })}
                    style={styles.ticketCard}
                    activeOpacity={0.8}
                  >
                    <View style={styles.ticketCardContent}>
                      <View style={styles.ticketIconContainer}>
                        <Ionicons name="ticket" size={24} color={colors.primary} />
                      </View>
                      <Text style={styles.ticketTitle} numberOfLines={2}>
                        {ticket.eventTitle || ticket.event?.title || 'Event Ticket'}
                      </Text>
                      <Text style={styles.ticketDate}>{ticket.date || ticket.event?.date || 'Date TBD'}</Text>
                      <View style={styles.ticketViewButton}>
                        <Text style={styles.ticketViewText}>View</Text>
                        <Ionicons name="arrow-forward" size={14} color={colors.primary} />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="receipt" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Recent Activity</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TransactionHistory')}
              >
                <Text style={styles.viewAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {recentTransactions.length > 0 ? (
              <View style={styles.transactionsContainer}>
                {recentTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onPress={() => {}}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyText}>No transactions yet</Text>
                <Text style={styles.emptySubtext}>Your transaction history will appear here</Text>
              </View>
            )}
          </View>

          {/* Quick Links */}
          <View style={styles.quickLinksSection}>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => navigation.navigate('PaymentOptions')}
              activeOpacity={0.7}
            >
              <View style={styles.quickLinkIconContainer}>
                <Ionicons name="card" size={22} color={colors.primary} />
              </View>
              <Text style={styles.quickLinkText}>Payment Methods</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => navigation.navigate('Refund')}
              activeOpacity={0.7}
            >
              <View style={styles.quickLinkIconContainer}>
                <Ionicons name="return-up-back" size={22} color={colors.warning} />
              </View>
              <Text style={styles.quickLinkText}>Request Refund</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Quick Pay Button */}
      <FloatingPayButton onPress={() => setShowPaymentModal(true)} />

      {/* Quick Payment Modal */}
      <QuickPaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        navigation={navigation}
      />
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
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
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
  historyButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionGradient: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.medium,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  ticketsScroll: {
    paddingRight: spacing.md,
  },
  ticketCard: {
    width: 160,
    marginRight: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
  },
  ticketCardContent: {
    padding: spacing.md,
  },
  ticketIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primaryAlpha['25'],
  },
  ticketTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 20,
    minHeight: 40,
  },
  ticketDate: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  ticketViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryAlpha['15'],
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  ticketViewText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  transactionsContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    marginTop: spacing.md,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  quickLinksSection: {
    marginTop: spacing.sm,
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickLinkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinkText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.md,
  },
});

export default WalletScreen;
