import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWallet } from '../../context/WalletContext';
import SexyBalanceCard from '../../components/SexyBalanceCard';

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
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(newCode);
    
    // Set expiry to midnight (end of night)
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    setExpiryTime(midnight);
  };

  const calculateTimeRemaining = () => {
    if (!expiryTime) return '';
    
    const now = new Date();
    const diff = expiryTime - now;
    
    if (diff <= 0) {
      setCode('');
      setExpiryTime(null);
      return '';
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    if (expiryTime) {
      const interval = setInterval(() => {
        const remaining = calculateTimeRemaining();
        setTimeRemaining(remaining);
        
        if (!remaining) {
          clearInterval(interval);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [expiryTime]);

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

        {/* Offline Balance Card */}
        <LinearGradient
          colors={['#F59E0B', '#D97706', '#B45309']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.offlineBalanceCard}
        >
          <View style={styles.offlineDecorativeCircle1} />
          <View style={styles.offlineDecorativeCircle2} />
          
          <View style={styles.offlineCardContent}>
            <View style={styles.offlineHeader}>
              <View style={styles.offlineModeRow}>
                <View style={styles.offlineIconBox}>
                  <Ionicons name="wifi-off" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.offlineModeInfo}>
                  <Text style={styles.offlineModeLabel}>OFFLINE MODE</Text>
                  <Text style={styles.offlineModeSubtext}>Valid Until Midnight</Text>
                </View>
              </View>
              <View style={styles.moonBadge}>
                <Ionicons name="moon" size={20} color="#F59E0B" />
              </View>
            </View>
            
            <View style={styles.offlineBalanceRow}>
              <View style={styles.offlineBalanceBlock}>
                <Text style={styles.offlineBalanceLabel}>Available Tokens</Text>
                <View style={styles.offlineAmountRow}>
                  <Text style={styles.offlineAmount}>{tokens}</Text>
                  <View style={styles.offlineTokenDot} />
                </View>
              </View>
              
              {expiryTime && (
                <View style={styles.timeRemainingBox}>
                  <Ionicons name="time" size={18} color="#FFFFFF" />
                  <Text style={styles.timeRemainingText}>{timeRemaining}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.offlineFeatures}>
              <View style={styles.offlineFeature}>
                <Ionicons name="checkmark" size={14} color="#10B981" />
                <Text style={styles.offlineFeatureText}>One-Time Use</Text>
              </View>
              <View style={styles.offlineFeature}>
                <Ionicons name="checkmark" size={14} color="#10B981" />
                <Text style={styles.offlineFeatureText}>Encrypted</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

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

            {/* Validity Card */}
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.validityCard}
            >
              <View style={styles.validityContent}>
                <View style={styles.validityLeft}>
                  <View style={styles.validityIconContainer}>
                    <Ionicons name="time" size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text style={styles.validityLabel}>Valid Until</Text>
                    <Text style={styles.validityValue}>Midnight</Text>
                    <Text style={styles.validitySubtext}>
                      {timeRemaining} remaining
                    </Text>
                  </View>
                </View>
                <View style={styles.validityBadge}>
                  <Ionicons name="moon" size={20} color="#10B981" />
                </View>
              </View>
            </LinearGradient>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                <Text style={styles.infoText}>Encrypted & Secure</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="wifi-off" size={20} color="#3B82F6" />
                <Text style={styles.infoText}>Works Offline</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="flash" size={20} color="#F59E0B" />
                <Text style={styles.infoText}>One-Time Use</Text>
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
              <Text style={styles.emptyTitle}>Offline Payment QR Code</Text>
              <Text style={styles.emptyDescription}>
                Generate a secure QR code valid until midnight. Perfect for events with poor internet connectivity.
              </Text>
              
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="wifi-off" size={20} color="#3B82F6" />
                  <Text style={styles.featureText}>Works offline</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="moon" size={20} color="#7B2CBF" />
                  <Text style={styles.featureText}>Valid until midnight</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="flash" size={20} color="#F59E0B" />
                  <Text style={styles.featureText}>One-time use</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          onPress={code ? () => { setCode(''); setExpiryTime(null); setTimeRemaining(''); } : generateCode}
          style={styles.actionButtonContainer}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#7B2CBF', '#9333EA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.generateButton}
          >
            <Ionicons 
              name={code ? "refresh" : "qr-code"} 
              size={22} 
              color="#FFFFFF" 
            />
            <Text style={styles.generateButtonText}>
              {code ? 'Generate New Code' : 'Generate QR Code'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </LinearGradient>
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
  // Offline Balance Card
  offlineBalanceCard: {
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  offlineDecorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF08',
    top: -70,
    right: -50,
  },
  offlineDecorativeCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF05',
    bottom: -50,
    left: -40,
  },
  offlineCardContent: {
    padding: 22,
    zIndex: 1,
  },
  offlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  offlineModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  offlineIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF30',
  },
  offlineModeInfo: {
    gap: 2,
  },
  offlineModeLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  offlineModeSubtext: {
    color: '#FFFFFFCC',
    fontSize: 11,
    fontWeight: '600',
  },
  moonBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  offlineBalanceBlock: {
    flex: 1,
  },
  offlineBalanceLabel: {
    color: '#FFFFFFCC',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  offlineAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  offlineAmount: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1,
  },
  offlineTokenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  timeRemainingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  timeRemainingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  offlineFeatures: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#FFFFFF10',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF15',
  },
  offlineFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  offlineFeatureText: {
    color: '#FFFFFFCC',
    fontSize: 11,
    fontWeight: '700',
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
  validityCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  validityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  validityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  validityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityLabel: {
    fontSize: 13,
    color: '#FFFFFFCC',
    marginBottom: 4,
    fontWeight: '600',
  },
  validityValue: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 2,
  },
  validitySubtext: {
    fontSize: 12,
    color: '#FFFFFFAA',
  },
  validityBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
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
  actionButtonContainer: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#7B2CBF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  generateButton: {
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
