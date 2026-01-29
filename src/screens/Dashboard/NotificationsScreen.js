import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

const NotificationsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received $50.00 from John Doe',
      time: '5 min ago',
      read: false,
      icon: 'checkmark-circle',
      iconColor: colors.success,
    },
    {
      id: 2,
      type: 'event',
      title: 'Event Reminder',
      message: 'Summer Music Festival starts in 2 days',
      time: '1 hour ago',
      read: false,
      icon: 'calendar',
      iconColor: colors.primary,
    },
    {
      id: 3,
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 20% off on your next ticket purchase',
      time: '3 hours ago',
      read: false,
      icon: 'gift',
      iconColor: colors.warning,
    },
    {
      id: 4,
      type: 'system',
      title: 'Security Alert',
      message: 'New login from iPhone 15',
      time: '1 day ago',
      read: true,
      icon: 'shield-checkmark',
      iconColor: colors.info,
    },
    {
      id: 5,
      type: 'transaction',
      title: 'Transaction Complete',
      message: 'Food purchase at Vendor Booth #12 - $15.50',
      time: '2 days ago',
      read: true,
      icon: 'receipt',
      iconColor: colors.primaryDark,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
            <Ionicons name="checkmark-done" size={22} color={colors.primary} />
          </TouchableOpacity>
        )}
        {unreadCount === 0 && <View style={{ width: 40 }} />}
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {notifications.length > 0 ? (
          <>
            {notifications.some(n => !n.read) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>New</Text>
                {notifications.filter(n => !n.read).map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={[styles.notificationCard, !notification.read && styles.unreadCard]}
                    onPress={() => markAsRead(notification.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: `${notification.iconColor}20` }]}>
                      <Ionicons name={notification.icon} size={24} color={notification.iconColor} />
                    </View>
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        {!notification.read && <View style={styles.unreadDot} />}
                      </View>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteNotification(notification.id)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {notifications.some(n => n.read) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Earlier</Text>
                {notifications.filter(n => n.read).map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={styles.notificationCard}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.iconContainer, { backgroundColor: `${notification.iconColor}20` }]}>
                      <Ionicons name={notification.icon} size={24} color={notification.iconColor} />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteNotification(notification.id)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="notifications-off-outline" size={80} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyDescription}>
              You're all caught up! We'll notify you when something new happens.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  markAllButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadCard: {
    backgroundColor: colors.primary08,
    borderColor: colors.primary30,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
});

export default NotificationsScreen;

