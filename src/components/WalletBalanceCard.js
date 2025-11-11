import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WalletBalanceCard = ({ balance, tokens }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallet Balance</Text>
        <Ionicons name="wallet-outline" size={24} color="#7B2CBF" />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.label}>Cash Balance</Text>
        <Text style={styles.cashAmount}>${balance.toFixed(2)}</Text>
      </View>
      
      <View style={styles.tokenSection}>
        <Text style={styles.label}>Token Balance</Text>
        <View style={styles.tokenRow}>
          <Text style={styles.tokenAmount}>{tokens}</Text>
          <Text style={styles.tokenLabel}>tokens</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  cashAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  tokenSection: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 16,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenAmount: {
    color: '#7B2CBF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tokenLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default WalletBalanceCard;

