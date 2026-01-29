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
import { colors } from '../../constants/colors';

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
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          <Text style={styles.dateLabel}>{item.date}</Text>
        </View>
        <View style={[
          styles.dateTotalBadge,
          { backgroundColor: item.total >= 0 ? 'colors.success15' : colors.error15 }
        ]}>
          <Text style={[
            styles.dateTotalText,
            { color: item.total >= 0 ? 'colors.success' : colors.error }
          ]}>
            {item.total >= 0 ? '+' : ''}{Math.abs(item.total).toFixed(0)} tokens
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
          <Ionicons name="search" size={22} color={colors.primary} />
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
                <Ionicons name="arrow-down-circle" size={24} color={colors.success} />
              </View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryAmount}>{summary.income.toFixed(0)} tokens</Text>
            </View>

            <View style={[styles.summaryCard, styles.summaryCardExpense]}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="arrow-up-circle" size={24} color={colors.error} />
              </View>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={styles.summaryAmount}>{summary.expense.toFixed(0)} tokens</Text>
            </View>
          </View>

          <View style={[styles.netFlowCard, {
            backgroundColor: summary.netFlow >= 0 ? 'colors.success10' : colors.error10,
            borderColor: summary.netFlow >= 0 ? 'colors.success30' : colors.error30,
          }]}>
            <View style={styles.netFlowHeader}>
              <Ionicons 
                name={summary.netFlow >= 0 ? "trending-up" : "trending-down"} 
                size={20} 
                color={summary.netFlow >= 0 ? "colors.success" : colors.error} 
              />
              <Text style={styles.netFlowLabel}>Net Token Flow</Text>
            </View>
            <Text style={[
              styles.netFlowAmount,
              { color: summary.netFlow >= 0 ? 'colors.success' : colors.error }
            ]}>
              {summary.netFlow >= 0 ? '+' : ''}{summary.netFlow.toFixed(0)} tokens
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
                color={filter === 'all' ? 'colors.white' : colors.textTertiary} 
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
                color={filter === 'income' ? 'colors.white' : colors.success} 
              />
              <Text style={[
                styles.filterText,
                { color: filter === 'income' ? 'colors.white' : colors.success }
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
                color={filter === 'expense' ? 'colors.white' : colors.error} 
              />
              <Text style={[
                styles.filterText,
                { color: filter === 'expense' ? 'colors.white' : colors.error }
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
                <Ionicons name="receipt-outline" size={64} color={colors.textMuted} />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
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
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryCardIncome: {
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  summaryCardExpense: {
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
  },
  summaryIconContainer: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textTertiary,
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
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
    color: colors.white,
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
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipIncome: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  filterChipExpense: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTertiary,
    marginLeft: 6,
  },
  filterTextActive: {
    color: colors.white,
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
    color: colors.white,
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
    color: colors.white,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});

export default TransactionHistoryScreen;
