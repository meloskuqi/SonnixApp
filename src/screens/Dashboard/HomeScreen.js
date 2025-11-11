import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { dummyEvents } from '../../services/dummyData';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tokens, balance, tickets } = useWallet();
  const insets = useSafeAreaInsets();

  const upcomingEvents = dummyEvents.slice(0, 3);

  const quickActions = [
    {
      id: 1,
      title: 'Add Funds',
      icon: 'add-circle',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      onPress: () => navigation.navigate('WalletTab', { screen: 'AddFunds' }),
    },
    {
      id: 2,
      title: 'QR Pay',
      icon: 'qr-code',
      color: '#7B2CBF',
      gradient: ['#7B2CBF', '#9333EA'],
      onPress: () => navigation.navigate('PayTab', { screen: 'QrPayment' }),
    },
    {
      id: 3,
      title: 'Send Money',
      icon: 'send',
      color: '#3B82F6',
      gradient: ['#3B82F6', '#2563EB'],
      onPress: () => navigation.navigate('PayTab', { screen: 'SendMoney' }),
    },
    {
      id: 4,
      title: 'More',
      icon: 'grid',
      color: '#6B7280',
      gradient: ['#6B7280', '#4B5563'],
      onPress: () => navigation.navigate('PayTab'),
    },
  ];

  const stats = [
    { label: 'Active Tickets', value: tickets?.length || 0, icon: 'ticket', color: '#7B2CBF' },
    { label: 'This Month', value: `$${balance.toFixed(0)}`, icon: 'trending-up', color: '#10B981' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back 👋</Text>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <TouchableOpacity 
          style={styles.balanceCard}
          onPress={() => navigation.navigate('Wallet')}
          activeOpacity={0.9}
        >
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <View style={styles.balanceAmountRow}>
                <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
                <View style={styles.balanceChange}>
                  <Ionicons name="trending-up" size={14} color="#10B981" />
                  <Text style={styles.balanceChangeText}>+12.5%</Text>
                </View>
              </View>
            </View>
            <View style={styles.walletIconContainer}>
              <Ionicons name="wallet" size={28} color="white" />
            </View>
          </View>
          
          <View style={styles.tokenSection}>
            <View style={styles.tokenInfo}>
              <Ionicons name="flash" size={16} color="#E9D5FF" />
              <Text style={styles.tokenLabel}>{tokens} Tokens Available</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('WalletTab')}>
              <Ionicons name="arrow-forward-circle" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={action.onPress}
                style={styles.quickActionButton}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                  <Ionicons name={action.icon} size={26} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Food & Drinks Vendors Banner */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.vendorBanner}
            onPress={() => navigation.navigate('PayTab', { screen: 'VendorMenu' })}
            activeOpacity={0.9}
          >
            <View style={styles.vendorBannerContent}>
              <View style={styles.vendorBannerLeft}>
                <View style={styles.vendorIconLarge}>
                  <Ionicons name="restaurant" size={32} color="#EA580C" />
                </View>
                <View style={styles.vendorBannerText}>
                  <Text style={styles.vendorBannerTitle}>Food & Drinks</Text>
                  <Text style={styles.vendorBannerSubtitle}>Order from event vendors</Text>
                  <View style={styles.vendorBadges}>
                    <View style={styles.vendorBadge}>
                      <Ionicons name="time" size={12} color="#10B981" />
                      <Text style={styles.vendorBadgeText}>Fast delivery</Text>
                    </View>
                    <View style={styles.vendorBadge}>
                      <Ionicons name="flash" size={12} color="#F59E0B" />
                      <Text style={styles.vendorBadgeText}>Pay with tokens</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.vendorBannerButton}>
                <Text style={styles.vendorBannerButtonText}>Browse</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWithIcon}>
              <Ionicons name="calendar" size={20} color="#7B2CBF" />
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsScroll}
          >
            {upcomingEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => navigation.navigate('EventDetails', { event })}
              >
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventOverlay}>
                  <View style={styles.eventBadge}>
                    <Text style={styles.eventCategory}>{event.category}</Text>
                  </View>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                  <View style={styles.eventInfo}>
                    <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                  <View style={styles.eventFooter}>
                    <View style={styles.eventPrice}>
                      <Ionicons name="flash" size={12} color="#7B2CBF" />
                      <Text style={styles.eventPriceText}>{event.price}</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={16} color="#7B2CBF" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWithIcon}>
              <Ionicons name="apps" size={20} color="#7B2CBF" />
              <Text style={styles.sectionTitle}>Explore More</Text>
            </View>
          </View>
          <View style={styles.featuresGrid}>
            <TouchableOpacity
              style={styles.featureBox}
              onPress={() => navigation.navigate('EventsTab')}
            >
              <View style={[styles.featureBoxIcon, { backgroundColor: '#7B2CBF15' }]}>
                <Ionicons name="calendar" size={28} color="#7B2CBF" />
              </View>
              <Text style={styles.featureBoxTitle}>Browse Events</Text>
              <Text style={styles.featureBoxDesc}>Find events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureBox}
              onPress={() => navigation.navigate('PayTab', { screen: 'VendorMenu' })}
            >
              <View style={[styles.featureBoxIcon, { backgroundColor: '#EA580C15' }]}>
                <Ionicons name="restaurant" size={28} color="#EA580C" />
              </View>
              <Text style={styles.featureBoxTitle}>Food & Drinks</Text>
              <Text style={styles.featureBoxDesc}>Order now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureBox}
              onPress={() => navigation.navigate('WalletTab')}
            >
              <View style={[styles.featureBoxIcon, { backgroundColor: '#05966915' }]}>
                <Ionicons name="ticket" size={28} color="#059669" />
              </View>
              <Text style={styles.featureBoxTitle}>My Tickets</Text>
              <Text style={styles.featureBoxDesc}>{tickets?.length || 0} active</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureBox}
              onPress={() => navigation.navigate('AccountTab')}
            >
              <View style={[styles.featureBoxIcon, { backgroundColor: '#6B728015' }]}>
                <Ionicons name="person-circle" size={28} color="#6B7280" />
              </View>
              <Text style={styles.featureBoxTitle}>Account</Text>
              <Text style={styles.featureBoxDesc}>Manage</Text>
            </TouchableOpacity>
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
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceCard: {
    backgroundColor: '#7B2CBF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#E9D5FF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  balanceChangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  walletIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E9D5FF',
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
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
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B2CBF',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  // Vendor Banner Styles
  vendorBanner: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EA580C30',
  },
  vendorBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  vendorBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vendorIconLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EA580C20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vendorBannerText: {
    flex: 1,
  },
  vendorBannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  vendorBannerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  vendorBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  vendorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vendorBadgeText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 4,
    fontWeight: '600',
  },
  vendorBannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  vendorBannerButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventsScroll: {
    paddingRight: 20,
  },
  eventCard: {
    width: 220,
    marginRight: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 140,
  },
  eventOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
  },
  eventBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventContent: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 20,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventPriceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#7B2CBF',
    marginLeft: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBox: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureBoxIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureBoxDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default HomeScreen;
