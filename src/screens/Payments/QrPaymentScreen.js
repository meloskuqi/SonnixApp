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
import SexyBalanceCard from '../../components/SexyBalanceCard';

const QrPaymentScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setShowQR(true);
  };

  const qrData = `SONNIX:PAY:${user?.id}:${amount}:${Date.now()}`;

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
          <Text style={styles.title}>QR Payment</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Quick Scan Balance Card */}
        <LinearGradient
          colors={['#10B981', '#059669', '#047857']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.scanBalanceCard}
        >
          <View style={styles.scanDecorativeCircle1} />
          <View style={styles.scanDecorativeCircle2} />
          
          <View style={styles.scanCardContent}>
            <View style={styles.scanTopRow}>
              <View style={styles.scanBadge}>
                <Ionicons name="flash" size={16} color="#F59E0B" />
                <Text style={styles.scanBadgeText}>Quick Scan</Text>
              </View>
              <View style={styles.scanIconCircle}>
                <Ionicons name="qr-code-outline" size={24} color="#FFFFFF" />
              </View>
            </View>
            
            <View style={styles.scanBalanceArea}>
              <Text style={styles.scanLabel}>Scan Balance</Text>
              <View style={styles.scanAmountBox}>
                <View style={styles.scanAmountLeft}>
                  <Ionicons name="diamond" size={18} color="#F59E0B" />
                  <Text style={styles.scanAmount}>{tokens}</Text>
                </View>
                <View style={styles.scanReadyBadge}>
                  <View style={styles.scanPulse} />
                  <Text style={styles.scanReadyText}>READY</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.scanFooter}>
              <Ionicons name="shield-checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.scanFooterText}>Instant • Secure • Fast</Text>
            </View>
          </View>
        </LinearGradient>

        {!showQR ? (
          <>
            {/* Amount Input Card */}
            <View style={styles.amountCard}>
              <View style={styles.amountHeader}>
                <Ionicons name="cash" size={24} color="#7B2CBF" />
                <Text style={styles.amountHeaderText}>Enter Token Amount</Text>
              </View>
              <View style={styles.amountInputContainer}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="#6B7280"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                />
                <View style={styles.tokensBadge}>
                  <Ionicons name="diamond" size={18} color="#7B2CBF" />
                  <Text style={styles.tokensBadgeText}>Tokens</Text>
                </View>
              </View>
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickSelectSection}>
              <Text style={styles.sectionLabel}>Quick Select</Text>
              <View style={styles.quickSelectGrid}>
                {['10', '25', '50', '100'].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setAmount(value)}
                    style={styles.quickSelectButton}
                    activeOpacity={0.8}
                  >
                    <View style={styles.quickSelectContent}>
                      <Text style={styles.quickSelectValue}>{value}</Text>
                      <Text style={styles.quickSelectLabel}>tokens</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Generate QR Button */}
            <TouchableOpacity
              onPress={generateQR}
              style={styles.generateButton}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#7B2CBF', '#9333EA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.generateButtonGradient}
              >
                <Ionicons name="qr-code" size={24} color="#FFFFFF" />
                <Text style={styles.generateButtonText}>Generate QR Code</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Info Banner */}
            <View style={styles.infoBanner}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="shield-checkmark" size={24} color="#3B82F6" />
              </View>
              <View style={styles.infoBannerContent}>
                <Text style={styles.infoBannerTitle}>Instant Payment</Text>
                <Text style={styles.infoBannerText}>
                  Vendor scans your QR code to process payment instantly
                </Text>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* QR Code Display */}
            <View style={styles.qrDisplayCard}>
              <LinearGradient
                colors={['#7B2CBF', '#9333EA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.qrHeaderGradient}
              >
                <View style={styles.qrHeaderContent}>
                  <View style={styles.qrSuccessBadge}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    <Text style={styles.qrSuccessBadgeText}>Ready to Scan</Text>
                  </View>
                  <Text style={styles.qrTitle}>Show QR to Vendor</Text>
                  <Text style={styles.qrSubtitle}>Valid for this transaction</Text>
                </View>
              </LinearGradient>
              
              <View style={styles.qrCodeSection}>
                <View style={styles.qrCodeContainer}>
                  <QRCode
                    value={qrData}
                    size={220}
                    backgroundColor="white"
                    color="black"
                  />
                </View>

                <View style={styles.qrAmountCard}>
                  <Text style={styles.qrAmountLabel}>Payment Amount</Text>
                  <View style={styles.qrAmountRow}>
                    <Text style={styles.qrAmount}>{amount}</Text>
                    <View style={styles.qrTokensBadge}>
                      <Ionicons name="diamond" size={16} color="#7B2CBF" />
                      <Text style={styles.qrTokensLabel}>Tokens</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.validityBanner}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.validityText}>
                  QR code is valid for 5 minutes
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              onPress={() => {
                setShowQR(false);
                setAmount('');
              }}
              style={styles.newQrButton}
            >
              <Text style={styles.newQrButtonText}>
                Generate New QR
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowQR(false);
                setAmount('');
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>
                Cancel Payment
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* NFC Placeholder */}
        <View style={styles.nfcBanner}>
          <View style={styles.nfcHeader}>
            <Ionicons name="radio" size={20} color="#A855F7" />
            <Text style={styles.nfcTitle}>
              NFC Payment (Coming Soon)
            </Text>
          </View>
          <Text style={styles.nfcDescription}>
            Tap your phone to pay will be available in the next update.
          </Text>
        </View>
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
  // Quick Scan Balance Card
  scanBalanceCard: {
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  scanDecorativeCircle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF08',
    top: -60,
    right: -60,
  },
  scanDecorativeCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF05',
    bottom: -40,
    left: -40,
  },
  scanCardContent: {
    padding: 22,
    zIndex: 1,
  },
  scanTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF15',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  scanBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  scanIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF30',
  },
  scanBalanceArea: {
    marginBottom: 16,
  },
  scanLabel: {
    color: '#FFFFFFCC',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  scanAmountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanAmountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scanAmount: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },
  scanReadyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  scanPulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F59E0B',
  },
  scanReadyText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  scanFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF10',
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFFFFF15',
  },
  scanFooterText: {
    color: '#FFFFFFCC',
    fontSize: 11,
    fontWeight: '700',
  },
  balanceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  amountCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  amountHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#7B2CBF',
  },
  amountInput: {
    flex: 1,
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  tokensBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#7B2CBF20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7B2CBF40',
  },
  tokensBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7B2CBF',
  },
  quickSelectSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  quickSelectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickSelectButton: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  quickSelectContent: {
    alignItems: 'center',
  },
  quickSelectValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickSelectLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  generateButton: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  generateButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3B82F630',
    gap: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoBannerText: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
  },
  qrDisplayCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  qrHeaderGradient: {
    padding: 24,
  },
  qrHeaderContent: {
    alignItems: 'center',
  },
  qrSuccessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10B98120',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  qrSuccessBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  qrTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  qrSubtitle: {
    fontSize: 14,
    color: '#FFFFFFCC',
  },
  qrCodeSection: {
    padding: 24,
    alignItems: 'center',
  },
  qrCodeContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  qrAmountCard: {
    width: '100%',
    backgroundColor: '#0D0D0D',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  qrAmountLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
    fontWeight: '600',
  },
  qrAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qrAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  qrTokensBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#7B2CBF20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  qrTokensLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7B2CBF',
  },
  validityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2A1A',
    borderRadius: 12,
    padding: 12,
  },
  validityText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 8,
  },
  newQrButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  newQrButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  nfcBanner: {
    backgroundColor: '#2A1A3A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  nfcHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nfcTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A855F7',
    marginLeft: 8,
  },
  nfcDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});

export default QrPaymentScreen;
