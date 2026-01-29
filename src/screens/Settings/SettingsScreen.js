import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { balance, tokens, tickets } = useWallet();
  const insets = useSafeAreaInsets();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const quickActions = [
    {
      id: 1,
      icon: 'person',
      label: 'Edit Profile',
      gradient: gradients.primary,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 2,
      icon: 'wallet',
      label: 'My Wallet',
      gradient: [colors.success, '#059669'],
      onPress: () => navigation.navigate('WalletTab'),
    },
    {
      id: 3,
      icon: 'shield-checkmark',
      label: 'Security',
      gradient: [colors.info, '#2563EB'],
      onPress: () => navigation.navigate('Security'),
    },
    {
      id: 4,
      icon: 'help-circle',
      label: 'Help',
      gradient: [colors.warning, '#D97706'],
      onPress: () => navigation.navigate('Help'),
    },
  ];

  const settingsSections = [
    {
      title: 'Preferences',
      icon: 'settings',
      items: [
        {
          icon: 'notifications',
          label: 'Push Notifications',
          type: 'switch',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
          color: colors.warning,
        },
        {
          icon: 'moon',
          label: 'Dark Mode',
          type: 'switch',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
          color: colors.primaryDark,
        },
        {
          icon: 'language',
          label: 'Language',
          value: 'English',
          onPress: () => navigation.navigate('Language'),
          color: colors.info,
        },
      ],
    },
    {
      title: 'Support & Legal',
      icon: 'information-circle',
      items: [
        {
          icon: 'chatbubble-ellipses',
          label: 'Contact Support',
          subtitle: '24/7 Available',
          onPress: () => navigation.navigate('Support'),
          color: colors.success,
        },
        {
          icon: 'star',
          label: 'Rate Sonnix',
          subtitle: 'Share your feedback',
          onPress: () => navigation.navigate('RateApp'),
          color: colors.warning,
        },
        {
          icon: 'document-text',
          label: 'Terms of Service',
          onPress: () => navigation.navigate('Terms'),
          color: colors.textMuted,
        },
        {
          icon: 'shield-checkmark',
          label: 'Privacy Policy',
          onPress: () => navigation.navigate('Privacy'),
          color: colors.textMuted,
        },
      ],
    },
  ];

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: spacing.xxl }}
    >
      <View style={[styles.content, { paddingTop: insets.top + spacing.md }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.subtitle}>Manage your profile & settings</Text>
          </View>
        </View>

        {/* User Profile Card */}
        <TouchableOpacity 
          style={styles.profileCard}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.9}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={gradients.primary}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
              </LinearGradient>
              <View style={styles.avatarBadge}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={12} color={colors.success} />
                <Text style={styles.verifiedText}>Verified Account</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="wallet" size={18} color={colors.success} />
              </View>
              <View>
                <Text style={styles.statValue}>{balance.toFixed(0)}</Text>
                <Text style={styles.statLabel}>Balance</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="flash" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.statValue}>{tokens}</Text>
                <Text style={styles.statLabel}>Tokens</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="ticket" size={18} color={colors.info} />
              </View>
              <View>
                <Text style={styles.statValue}>{tickets?.length || 0}</Text>
                <Text style={styles.statLabel}>Tickets</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={action.onPress}
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
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name={section.icon} size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                item.type === 'switch' ? (
                  <View
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex !== section.items.length - 1 && styles.settingItemBorder
                    ]}
                  >
                    <View style={[styles.settingItemIcon, { backgroundColor: item.color + '20' }]}>
                      <Ionicons name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={styles.settingItemContent}>
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                    </View>
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={item.value ? colors.white : colors.textTertiary}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={item.onPress}
                    style={[
                      styles.settingItem,
                      itemIndex !== section.items.length - 1 && styles.settingItemBorder
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.settingItemIcon, { backgroundColor: item.color + '20' }]}>
                      <Ionicons name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={styles.settingItemContent}>
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                      {item.subtitle && (
                        <Text style={styles.settingItemSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                    {item.value && (
                      <Text style={styles.settingItemValue}>{item.value}</Text>
                    )}
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                )
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out" size={22} color={colors.error} />
          <Text style={styles.logoutText}>Logout from Account</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Sonnix App</Text>
          <Text style={styles.versionNumber}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Sonnix Inc. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
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
    marginBottom: spacing.lg,
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
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryAlpha['25'],
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardElevated,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  quickActionsSection: {
    marginBottom: spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  quickActionCard: {
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
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 62,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  settingItemSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 4,
    fontWeight: '500',
  },
  settingItemValue: {
    fontSize: 13,
    color: colors.textTertiary,
    marginRight: spacing.sm,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error + '20',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.error + '40',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.error,
    marginLeft: spacing.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  copyrightText: {
    fontSize: 10,
    color: colors.textMuted,
  },
});

export default SettingsScreen;
