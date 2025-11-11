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
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';

const QrPaymentScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { balance } = useWallet();
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

        {/* Balance Info */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>

        {!showQR ? (
          <>
            {/* Amount Input */}
            <View style={styles.amountSection}>
              <Text style={styles.sectionTitle}>
                Enter Amount to Pay
              </Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor="#6B7280"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickSelectSection}>
              <Text style={styles.sectionTitle}>Quick Select</Text>
              <View style={styles.quickSelectGrid}>
                {['5', '10', '20', '50'].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => setAmount(value)}
                    style={styles.quickSelectButton}
                  >
                    <Text style={styles.quickSelectText}>
                      ${value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Generate QR Button */}
            <TouchableOpacity
              onPress={generateQR}
              style={styles.generateButton}
            >
              <Text style={styles.generateButtonText}>
                Generate QR Code
              </Text>
            </TouchableOpacity>

            {/* Info */}
            <View style={styles.infoBanner}>
              <Ionicons name="information-circle" size={24} color="#3B82F6" />
              <Text style={styles.infoBannerText}>
                The vendor will scan this QR code to process your payment instantly.
              </Text>
            </View>
          </>
        ) : (
          <>
            {/* QR Code Display */}
            <View style={styles.qrSection}>
              <Text style={styles.qrTitle}>
                Show QR to Vendor
              </Text>
              
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value={qrData}
                  size={220}
                  backgroundColor="white"
                  color="black"
                />
              </View>

              <View style={styles.qrAmountInfo}>
                <Text style={styles.qrAmountLabel}>Payment Amount</Text>
                <Text style={styles.qrAmount}>${amount}</Text>
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
  amountSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dollarSign: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7B2CBF',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quickSelectSection: {
    marginBottom: 24,
  },
  quickSelectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickSelectButton: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickSelectText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A2A3A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoBannerText: {
    flex: 1,
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 20,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  qrCodeContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  qrAmountInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrAmountLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  qrAmount: {
    fontSize: 32,
    fontWeight: 'bold',
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
