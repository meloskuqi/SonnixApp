import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';
import WalletBalanceCard from '../../components/WalletBalanceCard';
import TransactionItem from '../../components/TransactionItem';

const WalletScreen = ({ navigation }) => {
  const { balance, tokens, transactions, tickets } = useWallet();
  const insets = useSafeAreaInsets();

  const recentTransactions = transactions.slice(0, 3);

  const quickActions = [
    {
      id: 1,
      icon: 'add-circle',
      label: 'Add Funds',
      color: '#10B981',
      onPress: () => navigation.navigate('AddFunds'),
    },
    {
      id: 2,
      icon: 'send',
      label: 'Send',
      color: '#3B82F6',
      onPress: () => navigation.navigate('SendMoney'),
    },
    {
      id: 3,
      icon: 'cash',
      label: 'Request',
      color: '#8B5CF6',
      onPress: () => navigation.navigate('RequestMoney'),
    },
    {
      id: 4,
      icon: 'qr-code',
      label: 'QR Pay',
      color: '#7B2CBF',
      onPress: () => navigation.navigate('QrPayment'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
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
            <Ionicons name="time-outline" size={24} color="#7B2CBF" />
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
              style={styles.quickActionButton}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* My Tickets Section */}
        {tickets.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="ticket" size={20} color="#7B2CBF" />
                <Text style={styles.sectionTitle}>My Tickets</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tickets.length}</Text>
                </View>
              </View>
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
                  style={styles.ticketCardHorizontal}
                >
                  <View style={styles.ticketCardContent}>
                    <View style={styles.ticketIconSmall}>
                      <Ionicons name="musical-notes" size={20} color="#7B2CBF" />
                    </View>
                    <Text style={styles.ticketTitleSmall} numberOfLines={2}>
                      {ticket.eventTitle}
                    </Text>
                    <Text style={styles.ticketDateSmall}>{ticket.date}</Text>
                    <View style={styles.ticketViewButton}>
                      <Text style={styles.ticketViewText}>View Ticket</Text>
                      <Ionicons name="arrow-forward" size={14} color="#7B2CBF" />
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
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="receipt" size={20} color="#7B2CBF" />
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
                  onPress={() => alert(`Transaction ID: ${transaction.id}`)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={48} color="#6B7280" />
              <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
          )}
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksSection}>
          <TouchableOpacity
            style={styles.quickLinkCard}
            onPress={() => navigation.navigate('PaymentOptions')}
          >
            <Ionicons name="card-outline" size={24} color="#7B2CBF" />
            <Text style={styles.quickLinkText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickLinkCard}
            onPress={() => navigation.navigate('Refund')}
          >
            <Ionicons name="return-up-back-outline" size={24} color="#F59E0B" />
            <Text style={styles.quickLinkText}>Request Refund</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  historyButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 28,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  badge: {
    backgroundColor: '#7B2CBF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B2CBF',
  },
  ticketsScroll: {
    paddingRight: 20,
  },
  ticketCardHorizontal: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  ticketCardContent: {
    padding: 16,
  },
  ticketIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B2CBF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketTitleSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    height: 36,
  },
  ticketDateSmall: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  ticketViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#7B2CBF15',
    borderRadius: 8,
  },
  ticketViewText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7B2CBF',
    marginRight: 4,
  },
  transactionsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  quickLinksSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  quickLinkText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 16,
  },
});

export default WalletScreen;
