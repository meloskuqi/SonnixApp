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
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

const AddFundsScreen = ({ navigation }) => {
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'bank', name: 'Bank Transfer', icon: 'business-outline' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
  ];

  const handleAddFunds = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    alert(`Adding $${amount} to your wallet via ${selectedMethod}. This feature will be connected to the backend soon!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
      >
        <View style={[styles.content, { paddingTop: insets.top + spacing.md }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Add Funds</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Current Balance */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={[colors.success, '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceGradient}
            >
              <View style={styles.balanceContent}>
                <View style={styles.balanceHeader}>
                  <Ionicons name="wallet" size={24} color={colors.white} />
                  <Text style={styles.balanceLabel}>Current Balance</Text>
                </View>
                <View style={styles.balanceAmountRow}>
                  <Text style={styles.balanceAmount}>{tokens}</Text>
                  <View style={styles.tokenBadge}>
                    <Ionicons name="diamond" size={16} color={colors.warning} />
                    <Text style={styles.tokenLabel}>TOKENS</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Amount Input */}
          <View style={styles.amountSection}>
            <Text style={styles.sectionTitle}>Amount to Add</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={colors.textMuted}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountSection}>
            <Text style={styles.sectionTitle}>Quick Select</Text>
            <View style={styles.quickAmountGrid}>
              {[10, 25, 50, 100, 200, 500].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setAmount(value.toString())}
                  style={[
                    styles.quickAmountButton,
                    amount === value.toString() && styles.quickAmountButtonActive
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.quickAmountText,
                    amount === value.toString() && styles.quickAmountTextActive
                  ]}>${value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment Method Selection */}
          <View style={styles.paymentMethodSection}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                style={[
                  styles.paymentMethodCard,
                  selectedMethod === method.id && styles.paymentMethodCardSelected
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.paymentMethodInfo}>
                  <View style={styles.paymentMethodIcon}>
                    <Ionicons name={method.icon} size={24} color={colors.primary} />
                  </View>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.radioButtonSelected
                ]}>
                  {selectedMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Ionicons name="shield-checkmark" size={24} color={colors.success} />
            <Text style={styles.infoBannerText}>
              All transactions are secured with bank-level encryption. Your payment information is never stored on our servers.
            </Text>
          </View>

          {/* Add Funds Button */}
          <TouchableOpacity
            onPress={handleAddFunds}
            style={styles.addFundsButton}
            activeOpacity={0.9}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <LinearGradient
              colors={[colors.success, '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addFundsButtonGradient}
            >
              <Ionicons name="add-circle" size={20} color={colors.white} />
              <Text style={styles.addFundsButtonText}>
                Add ${amount || '0.00'} to Wallet
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By adding funds, you agree to our Terms of Service and Privacy Policy.
          </Text>
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
  content: {
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  balanceCard: {
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.large,
  },
  balanceGradient: {
    padding: spacing.lg,
  },
  balanceContent: {
    gap: spacing.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteAlpha['CC'],
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -1,
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.whiteAlpha['20'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['30'],
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  amountSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.success,
  },
  dollarSign: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.success,
    marginRight: spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: 40,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },
  quickAmountSection: {
    marginBottom: spacing.lg,
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  quickAmountButton: {
    width: '31%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickAmountButtonActive: {
    backgroundColor: colors.success + '20',
    borderColor: colors.success,
    borderWidth: 2,
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  quickAmountTextActive: {
    color: colors.success,
  },
  paymentMethodSection: {
    marginBottom: spacing.lg,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentMethodCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryAlpha['10'],
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cardElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
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
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.success + '30',
    gap: spacing.sm,
    alignItems: 'center',
  },
  infoBannerText: {
    flex: 1,
    color: colors.textTertiary,
    fontSize: 13,
    lineHeight: 18,
  },
  addFundsButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.large,
  },
  addFundsButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  addFundsButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
  },
  termsText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default AddFundsScreen;
