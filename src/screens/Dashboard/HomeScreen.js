import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { dummyEvents } from '../../services/dummyData';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius, typography } from '../../constants/design';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tokens, balance, tickets } = useWallet();
  const insets = useSafeAreaInsets();

  const upcomingEvents = dummyEvents.slice(0, 3);
  const myTickets = tickets?.slice(0, 2) || [];

  const quickActions = [
    {
      id: 1,
      title: 'QR Pay',
      icon: 'qr-code',
      gradient: gradients.primary,
      onPress: () => navigation.navigate('PayTab', { screen: 'QrPayment' }),
      isPrimary: true, // Mark QR Pay as primary action
    },
    {
      id: 2,
      title: 'Add Funds',
      icon: 'add-circle',
      gradient: [colors.success, '#059669'],
      onPress: () => navigation.navigate('WalletTab', { screen: 'AddFunds' }),
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
            <View style={styles.headerLeft}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={gradients.primary}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
                </LinearGradient>
              </View>
              <View>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
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
              {/* Decorative Background Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
              <View style={styles.decorativeCircle3} />
              <View style={styles.decorativeSparkle1} />
              <View style={styles.decorativeSparkle2} />
              <View style={styles.decorativeSparkle3} />
              <View style={styles.decorativeLine1} />
              <View style={styles.decorativeLine2} />
              
              <View style={styles.balanceContent}>
                <View style={styles.balanceHeader}>
                  <View style={styles.balanceBadge}>
                    <View style={styles.pulseDot} />
                    <View style={styles.pulseRingDot} />
                    <Text style={styles.balanceBadgeText}>LIVE</Text>
                  </View>
                  <View style={styles.walletIconContainer}>
                    <Ionicons name="wallet" size={24} color={colors.white} />
                    <View style={styles.walletIconGlow} />
                  </View>
                </View>
                
                <View style={styles.balanceMain}>
                  <Text style={styles.balanceLabel}>Available Balance</Text>
                  <View style={styles.balanceAmountRow}>
                    <View style={styles.balanceAmountContainer}>
                      <Text style={styles.balanceAmount}>{tokens}</Text>
                      <View style={styles.amountGlow} />
                    </View>
                    <View style={styles.tokenBadge}>
                      <View style={styles.diamondContainer}>
                        <Ionicons name="diamond" size={18} color={colors.warning} />
                        <View style={styles.diamondGlow} />
                      </View>
                      <Text style={styles.tokenLabel}>TOKENS</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.balanceFooter}>
                  <View style={styles.balanceStat}>
                    <View style={styles.statIconContainer}>
                      <Ionicons name="ticket" size={14} color={colors.white} />
                    </View>
                    <Text style={styles.balanceStatText}>{tickets?.length || 0} Active</Text>
                  </View>
                  <View style={styles.balanceDivider} />
                  <View style={styles.balanceStat}>
                    <View style={styles.statIconContainer}>
                      <Ionicons name="shield-checkmark" size={14} color={colors.white} />
                    </View>
                    <Text style={styles.balanceStatText}>Secure</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* My Tickets Section - Hero Style */}
          {myTickets.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <View style={styles.ticketHeaderIcon}>
                    <Ionicons name="ticket" size={22} color={colors.white} />
                  </View>
                  <View>
                    <Text style={styles.sectionTitle}>My Tickets</Text>
                    <Text style={styles.ticketCountText}>{myTickets.length} Active {myTickets.length === 1 ? 'Ticket' : 'Tickets'}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('WalletTab')}
                  style={styles.viewAllButton}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              {/* Hero Ticket Card - First Ticket */}
              {myTickets[0] && (
                <TouchableOpacity
                  key={myTickets[0].id}
                  style={styles.heroTicketCard}
                  onPress={() => navigation.navigate('WalletTab', { 
                    screen: 'TicketDetails', 
                    params: { ticket: myTickets[0] } 
                  })}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark, colors.deepWine]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroTicketGradient}
                  >
                    {/* Decorative Elements */}
                    <View style={styles.heroTicketPattern} />
                    <View style={styles.heroTicketPattern2} />
                    <View style={styles.heroTicketSparkle1} />
                    <View style={styles.heroTicketSparkle2} />
                    <View style={styles.heroTicketLine1} />
                    <View style={styles.heroTicketLine2} />
                    <View style={styles.heroTicketCornerAccent} />
                    
                    <View style={styles.heroTicketContent}>
                      <View style={styles.heroTicketHeader}>
                        <View style={styles.heroTicketBadge}>
                          <View style={styles.ticketIconGlow}>
                            <Ionicons name="ticket" size={16} color={colors.white} />
                          </View>
                          <Text style={styles.heroTicketBadgeText}>YOUR TICKET</Text>
                        </View>
                        <View style={styles.heroTicketStatus}>
                          <View style={styles.heroTicketStatusDot} />
                          <View style={styles.heroTicketStatusGlow} />
                          <Text style={styles.heroTicketStatusText}>ACTIVE</Text>
                        </View>
                      </View>
                      
                      <View style={styles.heroTicketMain}>
                        <View style={styles.heroTicketTitleContainer}>
                          <Text style={styles.heroTicketEventName} numberOfLines={2}>
                            {myTickets[0].event?.title || 'Event Ticket'}
                          </Text>
                          <View style={styles.heroTicketTitleGlow} />
                        </View>
                        <View style={styles.heroTicketDetails}>
                          <View style={styles.heroTicketDetailItem}>
                            <View style={styles.heroTicketDetailIcon}>
                              <Ionicons name="calendar" size={14} color={colors.white} />
                            </View>
                            <Text style={styles.heroTicketDetailText}>
                              {myTickets[0].event?.date || 'Date TBD'}
                            </Text>
                          </View>
                          <View style={styles.heroTicketDetailItem}>
                            <View style={styles.heroTicketDetailIcon}>
                              <Ionicons name="location" size={14} color={colors.white} />
                            </View>
                            <Text style={styles.heroTicketDetailText} numberOfLines={1}>
                              {myTickets[0].event?.venue || 'Venue TBD'}
                            </Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.heroTicketFooter}>
                        <View style={styles.heroTicketQrHint}>
                          <View style={styles.qrIconContainer}>
                            <Ionicons name="qr-code" size={14} color={colors.white} />
                            <View style={styles.qrIconGlow} />
                          </View>
                          <Text style={styles.heroTicketQrText}>Tap to view QR code</Text>
                        </View>
                        <View style={styles.arrowIconContainer}>
                          <Ionicons name="arrow-forward-circle" size={24} color={colors.white} />
                          <View style={styles.arrowIconGlow} />
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {/* Additional Tickets - Compact View */}
              {myTickets.length > 1 && (
                <View style={styles.additionalTicketsContainer}>
                  {myTickets.slice(1).map((ticket) => (
                    <TouchableOpacity
                      key={ticket.id}
                      style={styles.compactTicketCard}
                      onPress={() => navigation.navigate('WalletTab', { 
                        screen: 'TicketDetails', 
                        params: { ticket } 
                      })}
                      activeOpacity={0.8}
                    >
                      <View style={styles.compactTicketLeft}>
                        <View style={styles.compactTicketIcon}>
                          <Ionicons name="ticket" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.compactTicketInfo}>
                          <Text style={styles.compactTicketEventName} numberOfLines={1}>
                            {ticket.event?.title || 'Event Ticket'}
                          </Text>
                          <Text style={styles.compactTicketDate}>
                            {ticket.event?.date || 'Date TBD'}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.compactTicketRight}>
                        <View style={styles.compactTicketStatusBadge}>
                          <Text style={styles.compactTicketStatusText}>ACTIVE</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.noTicketsSection}>
              <View style={styles.noTicketsCard}>
                <View style={styles.noTicketsIconContainer}>
                  <Ionicons name="ticket-outline" size={48} color={colors.primary} />
                </View>
                <Text style={styles.noTicketsTitle}>No Active Tickets</Text>
                <Text style={styles.noTicketsText}>
                  Discover events and get your tickets to start using Sonnix
                </Text>
                <TouchableOpacity
                  style={styles.exploreEventsButton}
                  onPress={() => navigation.navigate('EventsTab')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.exploreEventsGradient}
                  >
                    <Ionicons name="calendar" size={18} color={colors.white} />
                    <Text style={styles.exploreEventsText}>Explore Events</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="flash" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Quick Actions</Text>
              </View>
            </View>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  onPress={action.onPress}
                  style={styles.quickActionItem}
                  activeOpacity={0.7}
                >
                  <View style={action.isPrimary && styles.primaryActionWrapper}>
                    <LinearGradient
                      colors={action.gradient}
                      style={[
                        styles.quickActionGradient,
                        action.isPrimary && styles.primaryActionGradient
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons 
                        name={action.icon} 
                        size={action.isPrimary ? 30 : 26} 
                        color={colors.white} 
                      />
                      {action.isPrimary && (
                        <View style={styles.pulseRing} />
                      )}
                    </LinearGradient>
                    {action.isPrimary && (
                      <View style={styles.primaryBadge}>
                        <Ionicons name="flash" size={10} color={colors.warning} />
                      </View>
                    )}
                  </View>
                  <Text style={[
                    styles.quickActionText,
                    action.isPrimary && styles.primaryActionText
                  ]}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Discover Events */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Discover Events</Text>
              </View>
              <TouchableOpacity 
                onPress={() => navigation.navigate('EventsTab')}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.primary} />
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
                  onPress={() => navigation.navigate('EventsTab', { 
                    screen: 'EventDetails', 
                    params: { event } 
                  })}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                  <View style={styles.eventOverlay}>
                    <View style={styles.eventCategoryBadge}>
                      <Text style={styles.eventCategoryText}>{event.category}</Text>
                    </View>
                    <View style={styles.eventPriceBadge}>
                      <Ionicons name="flash" size={12} color={colors.white} />
                      <Text style={styles.eventPriceText}>{event.price}</Text>
                    </View>
                  </View>
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                    <View style={styles.eventInfoRow}>
                      <Ionicons name="calendar-outline" size={12} color={colors.textTertiary} />
                      <Text style={styles.eventInfoText}>{event.date}</Text>
                    </View>
                    <View style={styles.eventFooter}>
                      <View style={styles.eventAttendees}>
                        <Ionicons name="people" size={14} color={colors.success} />
                        <Text style={styles.eventAttendeesText}>120+ going</Text>
                      </View>
                      <Ionicons name="arrow-forward" size={16} color={colors.primary} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatarGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
  },
  welcomeText: {
    fontSize: 13,
    color: colors.textTertiary,
    marginBottom: 2,
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
  },
  balanceCardWrapper: {
    marginBottom: spacing.lg,
  },
  balanceCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.large,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.whiteAlpha['12'],
    top: -70,
    right: -70,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.whiteAlpha['08'],
    bottom: -50,
    left: -50,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.whiteAlpha['06'],
    top: '30%',
    right: '10%',
  },
  decorativeSparkle1: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    top: '20%',
    left: '15%',
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  decorativeSparkle2: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.white,
    top: '60%',
    right: '20%',
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  decorativeSparkle3: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.warning,
    bottom: '25%',
    right: '15%',
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  decorativeLine1: {
    position: 'absolute',
    width: 60,
    height: 2,
    backgroundColor: colors.whiteAlpha['15'],
    top: '40%',
    left: '10%',
    transform: [{ rotate: '45deg' }],
  },
  decorativeLine2: {
    position: 'absolute',
    width: 40,
    height: 1,
    backgroundColor: colors.whiteAlpha['10'],
    bottom: '30%',
    right: '20%',
    transform: [{ rotate: '-30deg' }],
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
    backgroundColor: colors.whiteAlpha['25'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.whiteAlpha['40'],
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  pulseRingDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    opacity: 0.5,
  },
  walletIconContainer: {
    position: 'relative',
  },
  walletIconGlow: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    opacity: 0.2,
    top: -4,
    left: -4,
  },
  balanceAmountContainer: {
    position: 'relative',
  },
  amountGlow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: colors.white,
    opacity: 0.1,
    borderRadius: 8,
    top: -4,
    left: -4,
  },
  diamondContainer: {
    position: 'relative',
  },
  diamondGlow: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.warning,
    opacity: 0.3,
    top: -1,
    left: -1,
  },
  statIconContainer: {
    position: 'relative',
  },
  balanceBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  balanceMain: {
    marginBottom: spacing.lg,
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
  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteAlpha['15'],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['20'],
  },
  balanceStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  balanceStatText: {
    color: colors.whiteAlpha['CC'],
    fontSize: 12,
    fontWeight: '600',
  },
  balanceDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.whiteAlpha['25'],
    marginHorizontal: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
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
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  ticketHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  ticketCountText: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500',
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroTicketCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.extraLarge,
  },
  heroTicketGradient: {
    position: 'relative',
    overflow: 'hidden',
  },
  heroTicketPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.whiteAlpha['08'],
    transform: [{ translateX: 60 }, { translateY: -60 }],
  },
  heroTicketPattern2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.whiteAlpha['05'],
    transform: [{ translateX: -40 }, { translateY: 40 }],
  },
  heroTicketSparkle1: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.white,
    top: '25%',
    left: '20%',
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  heroTicketSparkle2: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.warning,
    top: '65%',
    right: '25%',
    shadowColor: colors.warning,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  heroTicketLine1: {
    position: 'absolute',
    width: 80,
    height: 2,
    backgroundColor: colors.whiteAlpha['12'],
    top: '35%',
    left: '15%',
    transform: [{ rotate: '45deg' }],
  },
  heroTicketLine2: {
    position: 'absolute',
    width: 50,
    height: 1,
    backgroundColor: colors.whiteAlpha['08'],
    bottom: '35%',
    right: '25%',
    transform: [{ rotate: '-35deg' }],
  },
  heroTicketCornerAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 40,
    borderRightWidth: 40,
    borderTopColor: colors.whiteAlpha['10'],
    borderRightColor: 'transparent',
  },
  heroTicketContent: {
    padding: spacing.lg,
    zIndex: 1,
  },
  heroTicketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heroTicketBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.whiteAlpha['25'],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.whiteAlpha['40'],
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketIconGlow: {
    position: 'relative',
  },
  heroTicketBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  heroTicketStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.success + '35',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.round,
    borderWidth: 1.5,
    borderColor: colors.success + '60',
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  heroTicketStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  heroTicketStatusGlow: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    opacity: 0.5,
  },
  heroTicketTitleContainer: {
    position: 'relative',
  },
  heroTicketTitleGlow: {
    position: 'absolute',
    width: '110%',
    height: '110%',
    backgroundColor: colors.white,
    opacity: 0.08,
    borderRadius: 4,
    top: -2,
    left: -2,
  },
  heroTicketDetailIcon: {
    position: 'relative',
  },
  qrIconContainer: {
    position: 'relative',
  },
  qrIconGlow: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.white,
    opacity: 0.2,
    top: -2,
    left: -2,
  },
  arrowIconContainer: {
    position: 'relative',
  },
  arrowIconGlow: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    opacity: 0.2,
    top: -2,
    left: -2,
  },
  heroTicketStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  heroTicketMain: {
    marginBottom: spacing.lg,
  },
  heroTicketEventName: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    marginBottom: spacing.md,
    lineHeight: 30,
  },
  heroTicketDetails: {
    gap: spacing.sm,
  },
  heroTicketDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroTicketDetailText: {
    fontSize: 14,
    color: colors.whiteAlpha['CC'],
    fontWeight: '600',
    flex: 1,
  },
  heroTicketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.whiteAlpha['15'],
  },
  heroTicketQrHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroTicketQrText: {
    fontSize: 12,
    color: colors.whiteAlpha['CC'],
    fontWeight: '600',
  },
  additionalTicketsContainer: {
    gap: spacing.sm,
  },
  compactTicketCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactTicketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactTicketIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primaryAlpha['25'],
  },
  compactTicketInfo: {
    flex: 1,
  },
  compactTicketEventName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  compactTicketDate: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  compactTicketRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  compactTicketStatusBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.success + '40',
  },
  compactTicketStatusText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.success,
    letterSpacing: 0.5,
  },
  noTicketsSection: {
    marginBottom: spacing.lg,
  },
  noTicketsCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  noTicketsIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primaryAlpha['25'],
  },
  noTicketsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  noTicketsText: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  exploreEventsButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  exploreEventsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  exploreEventsText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '48%',
  },
  quickActionGradient: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.medium,
  },
  primaryActionWrapper: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  primaryActionGradient: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.primary + '40',
    ...shadows.large,
  },
  pulseRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.primary + '60',
    top: -2,
    left: -2,
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
  quickActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginTop: 2,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  eventsScroll: {
    paddingRight: spacing.md,
  },
  eventCard: {
    width: 180,
    marginRight: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventCategoryBadge: {
    backgroundColor: colors.black + 'CC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  eventCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  eventPriceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  eventPriceText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  eventInfoText: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: 4,
    fontWeight: '500',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventAttendeesText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
});

export default HomeScreen;
