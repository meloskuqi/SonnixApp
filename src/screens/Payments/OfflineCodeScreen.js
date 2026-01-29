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
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

// QR Code Placeholder Component (visual representation)
const QRCodeDisplay = ({ code }) => {
  return (
    <View style={styles.qrCodeContainer}>
      {/* QR Pattern Grid */}
      <View style={styles.qrGrid}>
        {[...Array(10)].map((_, row) => (
          <View key={row} style={styles.qrRow}>
            {[...Array(10)].map((_, col) => {
              const seed = parseInt(code.substring(col % 6, (col % 6) + 1)) + row + col;
              const isBlack = seed % 3 !== 0;
              return (
                <View
                  key={col}
                  style={[
                    styles.qrCell,
                    { backgroundColor: isBlack ? colors.black : colors.white }
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
            <View style={styles.headerContent}>
              <Text style={styles.title}>Offline QR</Text>
              <Text style={styles.subtitle}>No internet required</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Offline Balance Card */}
          <LinearGradient
            colors={[colors.warning, '#D97706', '#B45309']}
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
                    <Ionicons name="wifi-off" size={24} color={colors.white} />
                  </View>
                  <View style={styles.offlineModeInfo}>
                    <Text style={styles.offlineModeLabel}>OFFLINE MODE</Text>
                    <Text style={styles.offlineModeSubtext}>Valid Until Midnight</Text>
                  </View>
                </View>
                <View style={styles.moonBadge}>
                  <Ionicons name="moon" size={20} color={colors.warning} />
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
                    <Ionicons name="time" size={18} color={colors.white} />
                    <Text style={styles.timeRemainingText}>{timeRemaining}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.offlineFeatures}>
                <View style={styles.offlineFeature}>
                  <Ionicons name="checkmark" size={14} color={colors.success} />
                  <Text style={styles.offlineFeatureText}>One-Time Use</Text>
                </View>
                <View style={styles.offlineFeature}>
                  <Ionicons name="checkmark" size={14} color={colors.success} />
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
                    <Ionicons name="qr-code" size={24} color={colors.info} />
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
                      <Ionicons name="flash" size={32} color={colors.primary} />
                    </View>
                  </View>
                </View>

                {/* Code ID */}
                <View style={styles.codeIdSection}>
                  <Text style={styles.codeIdLabel}>Payment ID</Text>
                  <View style={styles.codeIdBox}>
                    <Text style={styles.codeIdText}>{code}</Text>
                    <TouchableOpacity style={styles.copyButton}>
                      <Ionicons name="copy-outline" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Validity Card */}
              <LinearGradient
                colors={[colors.success, '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.validityCard}
              >
                <View style={styles.validityContent}>
                  <View style={styles.validityLeft}>
                    <View style={styles.validityIconContainer}>
                      <Ionicons name="time" size={24} color={colors.white} />
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
                    <Ionicons name="moon" size={20} color={colors.success} />
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <Ionicons name="shield-checkmark" size={20} color={colors.success} />
                  <Text style={styles.infoText}>Encrypted & Secure</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="wifi-off" size={20} color={colors.info} />
                  <Text style={styles.infoText}>Works Offline</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="flash" size={20} color={colors.warning} />
                  <Text style={styles.infoText}>One-Time Use</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.emptySection}>
              <View style={styles.emptyCard}>
                <View style={styles.emptyIconContainer}>
                  <View style={styles.emptyIconCircle}>
                    <Ionicons name="qr-code-outline" size={80} color={colors.primary} />
                  </View>
                </View>
                <Text style={styles.emptyTitle}>Offline Payment QR Code</Text>
                <Text style={styles.emptyDescription}>
                  Generate a secure QR code valid until midnight. Perfect for events with poor internet connectivity.
                </Text>
                
                <View style={styles.featuresList}>
                  <View style={styles.featureItem}>
                    <Ionicons name="wifi-off" size={20} color={colors.info} />
                    <Text style={styles.featureText}>Works offline</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="moon" size={20} color={colors.primary} />
                    <Text style={styles.featureText}>Valid until midnight</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="flash" size={20} color={colors.warning} />
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
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButton}
            >
              <Ionicons 
                name={code ? "refresh" : "qr-code"} 
                size={22} 
                color={colors.white} 
              />
              <Text style={styles.generateButtonText}>
                {code ? 'Generate New Code' : 'Generate QR Code'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>

          {/* How it Works */}
          <View style={styles.howItWorksSection}>
            <View style={styles.howItWorksHeader}>
              <Ionicons name="help-circle" size={22} color={colors.primary} />
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
              <Ionicons name="information-circle" size={24} color={colors.info} />
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
    paddingBottom: spacing.xl,
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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  offlineBalanceCard: {
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.large,
  },
  offlineDecorativeCircle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.whiteAlpha['08'],
    top: -30,
    right: -30,
  },
  offlineDecorativeCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.whiteAlpha['05'],
    bottom: -30,
    left: -30,
  },
  offlineCardContent: {
    padding: spacing.lg,
    zIndex: 1,
  },
  offlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  offlineModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  offlineIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.whiteAlpha['20'],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.whiteAlpha['30'],
  },
  offlineModeInfo: {
    gap: 2,
  },
  offlineModeLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  offlineModeSubtext: {
    color: colors.whiteAlpha['CC'],
    fontSize: 11,
    fontWeight: '600',
  },
  moonBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.whiteAlpha['20'],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.whiteAlpha['30'],
  },
  offlineBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  offlineBalanceBlock: {
    flex: 1,
  },
  offlineBalanceLabel: {
    color: colors.whiteAlpha['CC'],
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  offlineAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  offlineAmount: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  offlineTokenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.warning,
  },
  timeRemainingBox: {
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
  timeRemainingText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  offlineFeatures: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.whiteAlpha['15'],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.whiteAlpha['20'],
  },
  offlineFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  offlineFeatureText: {
    color: colors.whiteAlpha['CC'],
    fontSize: 12,
    fontWeight: '600',
  },
  qrSection: {
    marginBottom: spacing.lg,
  },
  qrMainCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  qrIconBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.info + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  qrSubtitle: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  qrDisplayCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    position: 'relative',
    ...shadows.medium,
  },
  qrCodeContainer: {
    width: 240,
    height: 240,
    position: 'relative',
  },
  qrGrid: {
    width: '100%',
    height: '100%',
  },
  qrRow: {
    flexDirection: 'row',
    height: '10%',
  },
  qrCell: {
    width: '10%',
    height: '100%',
  },
  cornerMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: colors.black,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  qrCodeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrLogoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  codeIdSection: {
    marginTop: spacing.md,
  },
  codeIdLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  codeIdBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'space-between',
  },
  codeIdText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 2,
  },
  copyButton: {
    padding: spacing.xs,
  },
  validityCard: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.medium,
  },
  validityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  validityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  validityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.whiteAlpha['20'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityLabel: {
    fontSize: 12,
    color: colors.whiteAlpha['CC'],
    fontWeight: '600',
    marginBottom: 2,
  },
  validityValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 2,
  },
  validitySubtext: {
    fontSize: 11,
    color: colors.whiteAlpha['CC'],
    fontWeight: '500',
  },
  validityBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.whiteAlpha['20'],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.whiteAlpha['30'],
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  emptySection: {
    marginBottom: spacing.lg,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIconContainer: {
    marginBottom: spacing.lg,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryAlpha['25'],
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  featuresList: {
    width: '100%',
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  featureText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  actionButtonContainer: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.large,
  },
  generateButton: {
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
  howItWorksSection: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  howItWorksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  stepsContainer: {
    gap: spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepIndicator: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.border,
    marginTop: spacing.xs,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: colors.textTertiary,
    lineHeight: 18,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.info + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    alignSelf: 'center',
  },
  infoContent: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
});

export default OfflineCodeScreen;
