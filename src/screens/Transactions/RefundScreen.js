import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';
import { colors } from '../../constants/colors';

const RefundScreen = ({ navigation }) => {
  const { transactions } = useWallet();
  const insets = useSafeAreaInsets();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [reason, setReason] = useState('');

  // Only show transactions that can be refunded (recent purchases)
  const refundableTransactions = transactions.filter(tx => 
    !tx.isPositive && // Only outgoing transactions
    ['Event Ticket', 'Merchandise', 'Food & Drink'].some(type => 
      tx.description.includes(type)
    )
  ).slice(0, 5);

  const refundReasons = [
    'Event cancelled',
    'Can\'t attend anymore',
    'Wrong item ordered',
    'Duplicate purchase',
    'Quality issue',
    'Other',
  ];

  const handleRequestRefund = () => {
    if (!selectedTransaction) {
      alert('Please select a transaction');
      return;
    }
    if (!reason) {
      alert('Please select a reason for refund');
      return;
    }
    alert(`Refund request submitted for ${Math.abs(selectedTransaction.amount).toFixed(0)} tokens. This feature will be connected to the backend soon!`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Request Refund</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={24} color={colors.warning} />
          <Text style={styles.infoBannerText}>
            Select a recent transaction to request a refund. Refunds are typically processed within 3-5 business days.
          </Text>
        </View>

        {/* Refundable Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Purchases</Text>
          {refundableTransactions.length > 0 ? (
            refundableTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => setSelectedTransaction(transaction)}
                style={[
                  styles.transactionCard,
                  selectedTransaction?.id === transaction.id && styles.transactionCardSelected
                ]}
              >
                <View style={styles.transactionIcon}>
                  <Ionicons name="receipt-outline" size={24} color={colors.primary} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.transactionAmountText}>
                    {Math.abs(transaction.amount).toFixed(0)} tokens
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyStateText}>
                No recent purchases available for refund
              </Text>
            </View>
          )}
        </View>

        {selectedTransaction && (
          <>
            {/* Refund Reasons */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reason for Refund</Text>
              {refundReasons.map((reasonOption, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setReason(reasonOption)}
                  style={[
                    styles.reasonCard,
                    reason === reasonOption && styles.reasonCardSelected
                  ]}
                >
                  <Text style={[
                    styles.reasonText,
                    reason === reasonOption && styles.reasonTextSelected
                  ]}>
                    {reasonOption}
                  </Text>
                  <View style={[
                    styles.radioButton,
                    reason === reasonOption && styles.radioButtonSelected
                  ]}>
                    {reason === reasonOption && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Additional Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Details (Optional)</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Provide more information about your refund request..."
                  placeholderTextColor={colors.textMuted}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>

            {/* Refund Policy */}
            <View style={styles.policyCard}>
              <Text style={styles.policyTitle}>Refund Policy</Text>
              <View style={styles.policyItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.policyText}>
                  Event tickets: Full refund up to 48 hours before event
                </Text>
              </View>
              <View style={styles.policyItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.policyText}>
                  Food & Drinks: Refund available within 15 minutes
                </Text>
              </View>
              <View style={styles.policyItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.policyText}>
                  Merchandise: Return within 30 days for full refund
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleRequestRefund}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>
                Submit Refund Request
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#2A2616',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoBannerText: {
    flex: 1,
    color: colors.warning,
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 20,
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
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  transactionCardSelected: {
    borderColor: colors.primary,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.error,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 12,
    textAlign: 'center',
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonCardSelected: {
    borderColor: colors.primary,
  },
  reasonText: {
    fontSize: 16,
    color: colors.white,
  },
  reasonTextSelected: {
    fontWeight: '600',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  textAreaContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  textArea: {
    color: colors.white,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  policyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: colors.textTertiary,
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  cancelButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTertiary,
  },
});

export default RefundScreen;



