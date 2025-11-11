import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';

// QR Code Placeholder Component (visual representation)
const QRCodeDisplay = ({ code }) => {
  return (
    <View style={styles.qrCodeContainer}>
      {/* QR Pattern Grid */}
      <View style={styles.qrGrid}>
        {[...Array(10)].map((_, row) => (
          <View key={row} style={styles.qrRow}>
            {[...Array(10)].map((_, col) => {
              // Create a pseudo-random pattern based on code and position
              const seed = parseInt(code.substring(col % 6, (col % 6) + 1)) + row + col;
              const isBlack = seed % 3 !== 0;
              return (
                <View
                  key={col}
                  style={[
                    styles.qrCell,
                    { backgroundColor: isBlack ? '#000000' : '#FFFFFF' }
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
      {/* Corner Markers */}
      <View style={[styles.cornerMarker, styles.topLeft]} />
      <View style={[styles.cornerMarker, styles.topRight]} />
      <View style={[styles.cornerMarker, styles.bottomLeft]} />
    </View>
  );
};

const OfflineCodeScreen = ({ navigation }) => {
  const { balance } = useWallet();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [isActive, setIsActive] = useState(false);

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(newCode);
    setTimeRemaining(90);
    setIsActive(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      setCode('');
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Offline QR</Text>
            <Text style={styles.subtitle}>No internet required</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Balance Info */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceIconContainer}>
              <Ionicons name="wallet" size={18} color="#10B981" />
            </View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>

        {/* QR Code Display */}
        {code ? (
          <View style={styles.qrSection}>
            <View style={styles.qrMainCard}>
              <View style={styles.qrHeader}>
                <View style={styles.qrIconBadge}>
                  <Ionicons name="qr-code" size={24} color="#3B82F6" />
                </View>
                <View>
                  <Text style={styles.qrTitle}>Your Payment QR Code</Text>
                  <Text style={styles.qrSubtitle}>Show this to the vendor</Text>
                </View>
              </View>

              {/* QR Code */}
              <View style={styles.qrDisplayCard}>
                <QRCodeDisplay code={code} />
                <View style={styles.qrCodeOverlay}>
                  <View style={styles.qrLogoCircle}>
                    <Ionicons name="flash" size={32} color="#7B2CBF" />
                  </View>
                </View>
              </View>

              {/* Code ID */}
              <View style={styles.codeIdSection}>
                <Text style={styles.codeIdLabel}>Payment ID</Text>
                <View style={styles.codeIdBox}>
                  <Text style={styles.codeIdText}>{code}</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Ionicons name="copy-outline" size={18} color="#7B2CBF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Timer & Info */}
            <View style={styles.timerCard}>
              <View style={styles.timerRow}>
                <View style={styles.timerIconContainer}>
                  <Ionicons name="time" size={20} color="#7B2CBF" />
                </View>
                <View style={styles.timerContent}>
                  <Text style={styles.timerLabel}>Expires in</Text>
                  <Text style={styles.timerValue}>{timeRemaining} seconds</Text>
                </View>
                <View style={[
                  styles.timerProgress,
                  { width: `${(timeRemaining / 90) * 100}%` }
                ]} />
              </View>
            </View>

            <View style={styles.warningCard}>
              <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              <View style={styles.warningContent}>
                <Text style={styles.warningTitle}>Secure Payment</Text>
                <Text style={styles.warningText}>
                  This QR code is encrypted and can only be used once
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptySection}>
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="qr-code-outline" size={80} color="#7B2CBF" />
                </View>
              </View>
              <Text style={styles.emptyTitle}>Generate Offline QR Code</Text>
              <Text style={styles.emptyDescription}>
                Create a secure QR code that works without internet. Perfect for events with poor connectivity.
              </Text>
              
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>Works offline</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>90-second validity</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>One-time use only</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          onPress={generateCode}
          disabled={isActive}
          style={[styles.generateButton, isActive && styles.generateButtonDisabled]}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={code ? "refresh" : "qr-code"} 
            size={22} 
            color="#FFFFFF" 
            style={{ marginRight: 8 }}
          />
          <Text style={styles.generateButtonText}>
            {code ? 'Generate New QR' : 'Generate QR Code'}
          </Text>
        </TouchableOpacity>

        {/* How it Works */}
        <View style={styles.howItWorksSection}>
          <View style={styles.howItWorksHeader}>
            <Ionicons name="help-circle" size={22} color="#7B2CBF" />
            <Text style={styles.howItWorksTitle}>How it Works</Text>
          </View>
          
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepIndicator}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepLine} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Generate QR Code</Text>
                <Text style={styles.stepDescription}>
                  Tap the button to create your unique payment QR
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepIndicator}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepLine} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Show to Vendor</Text>
                <Text style={styles.stepDescription}>
                  Let the vendor scan your QR code
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepIndicator}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Payment Complete</Text>
                <Text style={styles.stepDescription}>
                  Transaction syncs automatically when online
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Offline Mode</Text>
            <Text style={styles.infoText}>
              QR codes work without internet and sync once you're back online. Perfect for crowded venues!
            </Text>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  balanceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  // QR Code Styles
  qrCodeContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  qrGrid: {
    flex: 1,
  },
  qrRow: {
    flexDirection: 'row',
    flex: 1,
  },
  qrCell: {
    flex: 1,
    margin: 1,
    borderRadius: 1,
  },
  cornerMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 4,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 16,
    right: 16,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  // QR Section
  qrSection: {
    marginBottom: 20,
  },
  qrMainCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F620',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  qrSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  qrDisplayCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    position: 'relative',
  },
  qrCodeOverlay: {
    position: 'absolute',
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrLogoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  codeIdSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  codeIdLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  codeIdBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  codeIdText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B2CBF',
    letterSpacing: 3,
    marginRight: 12,
  },
  copyButton: {
    padding: 6,
  },
  // Timer Card
  timerCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  timerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B2CBF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timerContent: {
    flex: 1,
  },
  timerLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  timerValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B2CBF',
  },
  timerProgress: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 3,
    backgroundColor: '#7B2CBF',
  },
  // Warning Card
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10B98130',
    marginBottom: 16,
  },
  warningContent: {
    flex: 1,
    marginLeft: 12,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  // Empty State
  emptySection: {
    marginBottom: 24,
  },
  emptyCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#7B2CBF15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  featuresList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '500',
  },
  // Generate Button
  generateButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 24,
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // How It Works
  howItWorksSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  howItWorksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  stepsContainer: {
    marginTop: 4,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#2A2A2A',
    marginTop: 4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3B82F630',
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F620',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 19,
  },
});

export default OfflineCodeScreen;
