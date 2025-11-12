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
          <Ionicons name="information-circle" size={24} color="#F59E0B" />
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
                  <Ionicons name="receipt-outline" size={24} color="#7B2CBF" />
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
              <Ionicons name="receipt-outline" size={48} color="#6B7280" />
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
                  placeholderTextColor="#6B7280"
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>

            {/* Refund Policy */}
            <View style={styles.policyCard}>
              <Text style={styles.policyTitle}>Refund Policy</Text>
              <View style={styles.policyItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.policyText}>
                  Event tickets: Full refund up to 48 hours before event
                </Text>
              </View>
              <View style={styles.policyItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.policyText}>
                  Food & Drinks: Refund available within 15 minutes
                </Text>
              </View>
              <View style={styles.policyItem}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
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
    backgroundColor: '#0D0D0D',
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
    color: '#FFFFFF',
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
    color: '#F59E0B',
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
    color: '#FFFFFF',
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  transactionCardSelected: {
    borderColor: '#7B2CBF',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonCardSelected: {
    borderColor: '#7B2CBF',
  },
  reasonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  reasonTextSelected: {
    fontWeight: '600',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#7B2CBF',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7B2CBF',
  },
  textAreaContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  textArea: {
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  policyCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
});

export default RefundScreen;



