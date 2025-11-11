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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';

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
      color: '#7B2CBF',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 2,
      icon: 'wallet',
      label: 'My Wallet',
      color: '#10B981',
      onPress: () => navigation.navigate('WalletTab'),
    },
    {
      id: 3,
      icon: 'shield-checkmark',
      label: 'Security',
      color: '#3B82F6',
      onPress: () => navigation.navigate('Security'),
    },
    {
      id: 4,
      icon: 'help-circle',
      label: 'Help',
      color: '#F59E0B',
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
          color: '#F59E0B',
        },
        {
          icon: 'moon',
          label: 'Dark Mode',
          type: 'switch',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
          color: '#8B5CF6',
        },
        {
          icon: 'language',
          label: 'Language',
          value: 'English',
          onPress: () => navigation.navigate('Language'),
          color: '#3B82F6',
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
          color: '#10B981',
        },
        {
          icon: 'star',
          label: 'Rate Sonnix',
          subtitle: 'Share your feedback',
          onPress: () => navigation.navigate('RateApp'),
          color: '#F59E0B',
        },
        {
          icon: 'document-text',
          label: 'Terms of Service',
          onPress: () => navigation.navigate('Terms'),
          color: '#6B7280',
        },
        {
          icon: 'shield-checkmark',
          label: 'Privacy Policy',
          onPress: () => navigation.navigate('Privacy'),
          color: '#6B7280',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
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
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
              </View>
              <View style={styles.avatarBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={12} color="#10B981" />
                <Text style={styles.verifiedText}>Verified Account</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#7B2CBF" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="wallet" size={18} color="#10B981" />
              </View>
              <View>
                <Text style={styles.statValue}>${balance.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Balance</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: '#7B2CBF15' }]}>
                <Ionicons name="flash" size={18} color="#7B2CBF" />
              </View>
              <View>
                <Text style={styles.statValue}>{tokens}</Text>
                <Text style={styles.statLabel}>Tokens</Text>
              </View>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: '#3B82F615' }]}>
                <Ionicons name="ticket" size={18} color="#3B82F6" />
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
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name={section.icon} size={18} color="#7B2CBF" />
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
                    <View style={[styles.settingItemIcon, { backgroundColor: `${item.color}15` }]}>
                      <Ionicons name={item.icon} size={20} color={item.color} />
                    </View>
                    <View style={styles.settingItemContent}>
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                    </View>
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#2A2A2A', true: '#7B2CBF' }}
                      thumbColor={item.value ? '#FFFFFF' : '#9CA3AF'}
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
                  >
                    <View style={[styles.settingItemIcon, { backgroundColor: `${item.color}15` }]}>
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
                    <Ionicons name="chevron-forward" size={20} color="#6B7280" />
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
        >
          <Ionicons name="log-out" size={22} color="#DC2626" />
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
    backgroundColor: '#0D0D0D',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  profileCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0D0D0D',
    borderRadius: 12,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#10B98115',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B2CBF15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
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
    backgroundColor: '#10B98115',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#3A3A3A',
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  sectionCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 62,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  settingItemSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  settingItemValue: {
    fontSize: 13,
    color: '#9CA3AF',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC262615',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#DC262630',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#DC2626',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  copyrightText: {
    fontSize: 10,
    color: '#6B7280',
  },
});

export default SettingsScreen;
