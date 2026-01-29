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
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

const QrPaymentScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const quickAmounts = [10, 25, 50, 100];

  const generateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (parseFloat(amount) > tokens) {
      alert('Insufficient balance');
      return;
    }
    setShowQR(true);
  };

  const qrData = `SONNIX:PAY:${user?.id}:${amount}:${Date.now()}`;

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
            <Text style={styles.title}>QR Payment</Text>
            <View style={{ width: 40 }} />
          </View>

          {!showQR ? (
            <>
              {/* Balance Display */}
              <View style={styles.balanceCard}>
                <View style={styles.balanceHeader}>
                  <Ionicons name="wallet" size={24} color={colors.primary} />
                  <Text style={styles.balanceLabel}>Available Balance</Text>
                </View>
                <View style={styles.balanceAmountRow}>
                  <Text style={styles.balanceAmount}>{tokens}</Text>
                  <View style={styles.tokenBadge}>
                    <Ionicons name="diamond" size={16} color={colors.warning} />
                    <Text style={styles.tokenLabel}>TOKENS</Text>
                  </View>
                </View>
              </View>

              {/* Amount Input */}
              <View style={styles.amountCard}>
                <Text style={styles.amountCardTitle}>Enter Amount</Text>
                <View style={styles.amountInputContainer}>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0"
                    placeholderTextColor={colors.textMuted}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="number-pad"
                    autoFocus
                  />
                  <View style={styles.tokensBadge}>
                    <Ionicons name="diamond" size={18} color={colors.primary} />
                    <Text style={styles.tokensBadgeText}>Tokens</Text>
                  </View>
                </View>
              </View>

              {/* Quick Amount Buttons */}
              <View style={styles.quickSelectSection}>
                <Text style={styles.sectionLabel}>Quick Select</Text>
                <View style={styles.quickSelectGrid}>
                  {quickAmounts.map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => setAmount(value.toString())}
                      style={[
                        styles.quickSelectButton,
                        amount === value.toString() && styles.quickSelectButtonActive
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.quickSelectValue,
                        amount === value.toString() && styles.quickSelectValueActive
                      ]}>{value}</Text>
                      <Text style={styles.quickSelectLabel}>tokens</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Generate QR Button */}
              <TouchableOpacity
                onPress={generateQR}
                style={styles.generateButton}
                activeOpacity={0.9}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <LinearGradient
                  colors={gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.generateButtonGradient}
                >
                  <Ionicons name="qr-code" size={24} color={colors.white} />
                  <Text style={styles.generateButtonText}>Generate QR Code</Text>
                  <Ionicons name="arrow-forward" size={20} color={colors.white} />
                </LinearGradient>
              </TouchableOpacity>

              {/* Info Banner */}
              <View style={styles.infoBanner}>
                <Ionicons name="information-circle" size={20} color={colors.info} />
                <Text style={styles.infoText}>
                  Show this QR code to the vendor to complete payment
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* QR Code Display */}
              <View style={styles.qrDisplayCard}>
                <LinearGradient
                  colors={gradients.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.qrHeader}
                >
                  <View style={styles.qrHeaderContent}>
                    <View style={styles.qrSuccessBadge}>
                      <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                      <Text style={styles.qrSuccessBadgeText}>Ready to Scan</Text>
                    </View>
                    <Text style={styles.qrTitle}>Show QR to Vendor</Text>
                    <Text style={styles.qrSubtitle}>Valid for 5 minutes</Text>
                  </View>
                </LinearGradient>
                
                <View style={styles.qrCodeSection}>
                  <View style={styles.qrCodeContainer}>
                    <QRCode
                      value={qrData}
                      size={240}
                      backgroundColor="white"
                      color="black"
                    />
                  </View>

                  <View style={styles.qrAmountCard}>
                    <Text style={styles.qrAmountLabel}>Payment Amount</Text>
                    <View style={styles.qrAmountRow}>
                      <Text style={styles.qrAmount}>{amount}</Text>
                      <View style={styles.qrTokensBadge}>
                        <Ionicons name="diamond" size={16} color={colors.primary} />
                        <Text style={styles.qrTokensLabel}>Tokens</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <TouchableOpacity
                onPress={() => {
                  setShowQR(false);
                  setAmount('');
                }}
                style={styles.newQrButton}
                activeOpacity={0.8}
              >
                <Text style={styles.newQrButtonText}>Generate New QR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Done</Text>
              </TouchableOpacity>
            </>
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
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryAlpha['15'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primaryAlpha['25'],
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  amountCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amountCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  amountInput: {
    flex: 1,
    fontSize: 40,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },
  tokensBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryAlpha['15'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
  },
  tokensBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  quickSelectSection: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTertiary,
    marginBottom: spacing.md,
  },
  quickSelectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  quickSelectButton: {
    width: '23%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickSelectButtonActive: {
    backgroundColor: colors.primaryAlpha['15'],
    borderColor: colors.primary,
    borderWidth: 2,
  },
  quickSelectValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  quickSelectValueActive: {
    color: colors.primary,
  },
  quickSelectLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  generateButton: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.large,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  generateButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.info + '30',
    gap: spacing.sm,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textTertiary,
    lineHeight: 18,
  },
  qrDisplayCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.large,
  },
  qrHeader: {
    padding: spacing.lg,
  },
  qrHeaderContent: {
    alignItems: 'center',
  },
  qrSuccessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.success + '20',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    marginBottom: spacing.md,
  },
  qrSuccessBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.success,
  },
  qrTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  qrSubtitle: {
    fontSize: 13,
    color: colors.whiteAlpha['CC'],
  },
  qrCodeSection: {
    padding: spacing.lg,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  qrCodeContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  qrAmountCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrAmountLabel: {
    fontSize: 13,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  qrAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  qrAmount: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
  },
  qrTokensBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryAlpha['15'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
  },
  qrTokensLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  newQrButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.medium,
  },
  newQrButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  cancelButton: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});

export default QrPaymentScreen;
