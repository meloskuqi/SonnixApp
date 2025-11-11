import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';

const { width } = Dimensions.get('window');

const PaymentOptionsScreen = ({ navigation }) => {
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();

  const featuredOptions = [
    {
      id: 1,
      title: 'QR Payment',
      subtitle: 'Fastest Way to Pay',
      description: 'Scan or show your QR code',
      icon: 'qr-code',
      gradient: ['#7B2CBF', '#9333EA'],
      color: '#7B2CBF',
      screen: 'QrPayment',
      badge: 'Popular',
    },
    {
      id: 2,
      title: 'Offline QR',
      subtitle: 'No Internet Needed',
      description: 'Generate offline QR code',
      icon: 'qr-code-outline',
      gradient: ['#3B82F6', '#2563EB'],
      color: '#3B82F6',
      screen: 'OfflineCode',
      badge: 'New',
    },
  ];

  const paymentOptions = [
    {
      id: 3,
      title: 'Send Money',
      description: 'Transfer to friends instantly',
      icon: 'paper-plane',
      color: '#10B981',
      screen: 'SendMoney',
    },
    {
      id: 4,
      title: 'Request Money',
      description: 'Request payment from others',
      icon: 'cash-outline',
      color: '#F59E0B',
      screen: 'RequestMoney',
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Food & Drinks',
      icon: 'restaurant',
      color: '#EA580C',
      screen: 'VendorMenu',
    },
    {
      id: 2,
      title: 'Add Funds',
      icon: 'add-circle',
      color: '#10B981',
      screen: 'AddFunds',
    },
    {
      id: 3,
      title: 'Transaction History',
      icon: 'receipt',
      color: '#8B5CF6',
      screen: 'TransactionHistory',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <Ionicons name="close-circle" size={32} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Quick Pay</Text>
            <Text style={styles.subtitle}>Choose your payment method</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIconContainer}>
              <Ionicons name="wallet" size={20} color="#7B2CBF" />
            </View>
            <Text style={styles.balanceHeaderText}>Available Balance</Text>
          </View>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
              <Text style={styles.balanceLabel}>Cash Balance</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.balanceItem}>
              <Text style={styles.tokenAmount}>{tokens}</Text>
              <Text style={styles.balanceLabel}>Sonnix Tokens</Text>
            </View>
          </View>
        </View>

        {/* Featured Payment Options */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={18} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Featured Methods</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {featuredOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => navigation.navigate(option.screen)}
                style={styles.featuredCard}
                activeOpacity={0.8}
              >
                <View style={styles.featuredCardHeader}>
                  <View style={[styles.featuredIcon, { backgroundColor: `${option.color}25` }]}>
                    <Ionicons name={option.icon} size={36} color={option.color} />
                  </View>
                  {option.badge && (
                    <View style={[styles.badge, { backgroundColor: option.badge === 'Popular' ? '#10B98120' : '#F59E0B20' }]}>
                      <Text style={[styles.badgeText, { color: option.badge === 'Popular' ? '#10B981' : '#F59E0B' }]}>
                        {option.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.featuredTitle}>{option.title}</Text>
                <Text style={styles.featuredSubtitle}>{option.subtitle}</Text>
                <Text style={styles.featuredDescription}>{option.description}</Text>
                <View style={[styles.featuredButton, { backgroundColor: `${option.color}15` }]}>
                  <Text style={[styles.featuredButtonText, { color: option.color }]}>Use Now</Text>
                  <Ionicons name="arrow-forward" size={16} color={option.color} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Other Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="swap-horizontal" size={18} color="#7B2CBF" />
            <Text style={styles.sectionTitle}>More Options</Text>
          </View>
          {paymentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => navigation.navigate(option.screen)}
              style={styles.optionCard}
              activeOpacity={0.7}
            >
              <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                <Ionicons name={option.icon} size={24} color={option.color} />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="apps" size={18} color="#7B2CBF" />
            <Text style={styles.sectionTitle}>Quick Access</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => navigation.navigate(action.screen)}
                style={styles.quickActionCard}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Banner */}
        <View style={styles.securityBanner}>
          <View style={styles.securityIcon}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
          </View>
          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>Safe & Secure</Text>
            <Text style={styles.securityText}>
              All transactions are encrypted and protected with bank-level security
            </Text>
          </View>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  balanceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7B2CBF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  balanceHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: '#2A2A2A',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 2,
  },
  tokenAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B2CBF',
    marginBottom: 2,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  featuredScroll: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.7,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  featuredCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featuredIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 18,
    lineHeight: 20,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  featuredButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickActionCard: {
    width: (width - 52) / 3,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  securityBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#10B98130',
  },
  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
});

export default PaymentOptionsScreen;



