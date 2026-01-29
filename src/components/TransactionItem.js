import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, borderRadius } from '../constants/design';

const TransactionItem = ({ transaction, onPress, hideDate = false }) => {
  const getIconAndColor = (type) => {
    switch (type) {
      case 'Add Funds':
        return { icon: 'add-circle', color: colors.success, bg: colors.success + '20' };
      case 'Purchase':
      case 'Ticket Purchase':
        return { icon: 'cart', color: colors.warning, bg: colors.warning + '20' };
      case 'Refund':
        return { icon: 'return-up-back', color: colors.info, bg: colors.info + '20' };
      case 'Sent':
        return { icon: 'arrow-up-circle', color: colors.error, bg: colors.error + '20' };
      case 'Received':
        return { icon: 'arrow-down-circle', color: colors.success, bg: colors.success + '20' };
      case 'Drink Purchase':
      case 'Food Purchase':
        return { icon: 'restaurant', color: colors.softOrange, bg: colors.softOrange + '20' };
      default:
        return { icon: 'cash', color: colors.primary, bg: colors.primaryAlpha['20'] };
    }
  };

  const iconData = getIconAndColor(transaction.type);
  const amountColor = transaction.isPositive ? styles.positiveAmount : styles.negativeAmount;
  const amountSign = transaction.isPositive ? '+' : '-';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: iconData.bg }]}>
        <Ionicons name={iconData.icon} size={24} color={iconData.color} />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.type}>{transaction.type}</Text>
        <Text style={styles.description} numberOfLines={1}>{transaction.description}</Text>
        {!hideDate && (
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text style={styles.date}>{transaction.date}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, amountColor]}>
          {amountSign}${Math.abs(transaction.amount).toFixed(2)}
        </Text>
        <View style={[
          styles.statusBadge,
          transaction.status === 'Completed' && styles.statusCompleted,
          transaction.status === 'Pending' && styles.statusPending,
          transaction.status === 'Failed' && styles.statusFailed,
        ]}>
          <View style={[
            styles.statusDot,
            transaction.status === 'Completed' && styles.statusDotCompleted,
            transaction.status === 'Pending' && styles.statusDotPending,
            transaction.status === 'Failed' && styles.statusDotFailed,
          ]} />
          <Text style={styles.statusText}>{transaction.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    borderRadius: borderRadius.md,
    padding: 12,
    marginRight: spacing.sm,
  },
  detailsContainer: {
    flex: 1,
  },
  type: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: colors.textTertiary,
    fontSize: 13,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  date: {
    color: colors.textMuted,
    fontSize: 12,
    marginLeft: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  positiveAmount: {
    color: colors.success,
  },
  negativeAmount: {
    color: colors.error,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.border,
  },
  statusCompleted: {
    backgroundColor: colors.success + '15',
  },
  statusPending: {
    backgroundColor: colors.warning + '15',
  },
  statusFailed: {
    backgroundColor: colors.error + '15',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textMuted,
    marginRight: 5,
  },
  statusDotCompleted: {
    backgroundColor: colors.success,
  },
  statusDotPending: {
    backgroundColor: colors.warning,
  },
  statusDotFailed: {
    backgroundColor: colors.error,
  },
  statusText: {
    color: colors.textTertiary,
    fontSize: 11,
    fontWeight: '600',
  },
});

export default TransactionItem;
