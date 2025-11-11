import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';
import TransactionItem from '../../components/TransactionItem';

const TransactionHistoryScreen = ({ navigation }) => {
  const { transactions } = useWallet();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const filtered = filter === 'all'
      ? transactions
      : transactions.filter(t => {
          if (filter === 'income') return t.isPositive;
          if (filter === 'expense') return !t.isPositive;
          return true;
        });

    const groups = {};
    filtered.forEach(transaction => {
      const date = transaction.date.split(' ')[0]; // Get just the date part
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return Object.keys(groups).map(date => ({
      date,
      transactions: groups[date],
      total: groups[date].reduce((sum, t) => sum + (t.isPositive ? t.amount : -t.amount), 0),
    }));
  }, [transactions, filter]);

  // Calculate summary stats
  const summary = useMemo(() => {
    const filtered = filter === 'all' ? transactions : 
      transactions.filter(t => filter === 'income' ? t.isPositive : !t.isPositive);
    
    const income = filtered.filter(t => t.isPositive).reduce((sum, t) => sum + t.amount, 0);
    const expense = filtered.filter(t => !t.isPositive).reduce((sum, t) => sum + t.amount, 0);
    
    return {
      total: filtered.length,
      income,
      expense,
      netFlow: income - expense,
    };
  }, [transactions, filter]);

  const renderDateGroup = ({ item }) => (
    <View style={styles.dateGroup}>
      <View style={styles.dateHeader}>
        <View style={styles.dateLabelContainer}>
          <Ionicons name="calendar-outline" size={16} color="#7B2CBF" />
          <Text style={styles.dateLabel}>{item.date}</Text>
        </View>
        <View style={[
          styles.dateTotalBadge,
          { backgroundColor: item.total >= 0 ? '#10B98115' : '#DC262615' }
        ]}>
          <Text style={[
            styles.dateTotalText,
            { color: item.total >= 0 ? '#10B981' : '#DC2626' }
          ]}>
            {item.total >= 0 ? '+' : ''} ${Math.abs(item.total).toFixed(2)}
          </Text>
        </View>
      </View>
      {item.transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          hideDate
          onPress={() => alert(`Transaction Details:\n${transaction.description}`)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Transactions</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={22} color="#7B2CBF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.summaryCardIncome]}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="arrow-down-circle" size={24} color="#10B981" />
              </View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryAmount}>${summary.income.toFixed(2)}</Text>
            </View>

            <View style={[styles.summaryCard, styles.summaryCardExpense]}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="arrow-up-circle" size={24} color="#DC2626" />
              </View>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryAmount}>${summary.expense.toFixed(2)}</Text>
            </View>
          </View>

          <View style={[styles.netFlowCard, {
            backgroundColor: summary.netFlow >= 0 ? '#10B98110' : '#DC262610',
            borderColor: summary.netFlow >= 0 ? '#10B98130' : '#DC262630',
          }]}>
            <View style={styles.netFlowHeader}>
              <Ionicons 
                name={summary.netFlow >= 0 ? "trending-up" : "trending-down"} 
                size={20} 
                color={summary.netFlow >= 0 ? "#10B981" : "#DC2626"} 
              />
              <Text style={styles.netFlowLabel}>Net Cash Flow</Text>
            </View>
            <Text style={[
              styles.netFlowAmount,
              { color: summary.netFlow >= 0 ? '#10B981' : '#DC2626' }
            ]}>
              {summary.netFlow >= 0 ? '+' : ''}${summary.netFlow.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            <TouchableOpacity
              onPress={() => setFilter('all')}
              style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
            >
              <Ionicons 
                name="albums" 
                size={16} 
                color={filter === 'all' ? '#FFFFFF' : '#9CA3AF'} 
              />
              <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                All ({summary.total})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter('income')}
              style={[styles.filterChip, filter === 'income' && styles.filterChipIncome]}
            >
              <Ionicons 
                name="arrow-down-circle" 
                size={16} 
                color={filter === 'income' ? '#FFFFFF' : '#10B981'} 
              />
              <Text style={[
                styles.filterText,
                { color: filter === 'income' ? '#FFFFFF' : '#10B981' }
              ]}>
                Income
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter('expense')}
              style={[styles.filterChip, filter === 'expense' && styles.filterChipExpense]}
            >
              <Ionicons 
                name="arrow-up-circle" 
                size={16} 
                color={filter === 'expense' ? '#FFFFFF' : '#DC2626'} 
              />
              <Text style={[
                styles.filterText,
                { color: filter === 'expense' ? '#FFFFFF' : '#DC2626' }
              ]}>
                Expense
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsSection}>
          {groupedTransactions.length > 0 ? (
            groupedTransactions.map((group, index) => (
              <View key={index}>
                {renderDateGroup({ item: group })}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="receipt-outline" size={64} color="#6B7280" />
              </View>
              <Text style={styles.emptyTitle}>No Transactions</Text>
              <Text style={styles.emptyDescription}>
                Your transaction history will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  summaryCardIncome: {
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  summaryCardExpense: {
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
  },
  summaryIconContainer: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  netFlowCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  netFlowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netFlowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  netFlowAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  filterChipActive: {
    backgroundColor: '#7B2CBF',
    borderColor: '#7B2CBF',
  },
  filterChipIncome: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filterChipExpense: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginLeft: 6,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  transactionsSection: {
    paddingHorizontal: 20,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  dateTotalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dateTotalText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default TransactionHistoryScreen;
