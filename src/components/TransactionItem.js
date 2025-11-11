import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TransactionItem = ({ transaction, onPress, hideDate = false }) => {
  const getIconAndColor = (type) => {
    switch (type) {
      case 'Add Funds':
        return { icon: 'add-circle', color: '#10B981', bg: '#10B98120' };
      case 'Purchase':
      case 'Ticket Purchase':
        return { icon: 'cart', color: '#F59E0B', bg: '#F59E0B20' };
      case 'Refund':
        return { icon: 'return-up-back', color: '#3B82F6', bg: '#3B82F620' };
      case 'Sent':
        return { icon: 'arrow-up-circle', color: '#DC2626', bg: '#DC262620' };
      case 'Received':
        return { icon: 'arrow-down-circle', color: '#10B981', bg: '#10B98120' };
      case 'Drink Purchase':
      case 'Food Purchase':
        return { icon: 'restaurant', color: '#EA580C', bg: '#EA580C20' };
      default:
        return { icon: 'cash', color: '#7B2CBF', bg: '#7B2CBF20' };
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
            <Ionicons name="time-outline" size={12} color="#6B7280" />
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
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  iconContainer: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  type: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  date: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  positiveAmount: {
    color: '#10B981',
  },
  negativeAmount: {
    color: '#DC2626',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#2A2A2A',
  },
  statusCompleted: {
    backgroundColor: '#10B98115',
  },
  statusPending: {
    backgroundColor: '#F59E0B15',
  },
  statusFailed: {
    backgroundColor: '#DC262615',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
    marginRight: 5,
  },
  statusDotCompleted: {
    backgroundColor: '#10B981',
  },
  statusDotPending: {
    backgroundColor: '#F59E0B',
  },
  statusDotFailed: {
    backgroundColor: '#DC2626',
  },
  statusText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default TransactionItem;
