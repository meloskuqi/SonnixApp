import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { useWallet } from '../context/WalletContext';

const QuickPaymentModal = ({ visible, onClose, navigation }) => {
  const { tokens, balance } = useWallet();
  const [amount, setAmount] = useState('');

  const quickAmounts = [10, 25, 50, 100];

  const paymentActions = [
    {
      id: 'qr',
      title: 'Scan & Pay',
      subtitle: 'QR Code',
      icon: 'qr-code',
      color: colors.primary,
      gradient: [colors.primary, colors.primaryDark],
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'QrPayment' });
      },
    },
    {
      id: 'send',
      title: 'Send Money',
      subtitle: 'To friends',
      icon: 'send',
      color: colors.info,
      gradient: [colors.info, '#2563EB'],
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'SendMoney' });
      },
    },
    {
      id: 'vendor',
      title: 'Food & Drinks',
      subtitle: 'Order now',
      icon: 'restaurant',
      color: colors.softOrange,
      gradient: [colors.softOrange, '#EA580C'],
      onPress: () => {
        onClose();
        navigation.navigate('PayTab', { screen: 'VendorsList' });
      },
    },
    {
      id: 'add',
      title: 'Add Funds',
      subtitle: 'Top up',
      icon: 'add-circle',
      color: colors.success,
      gradient: [colors.success, '#059669'],
      onPress: () => {
        onClose();
        navigation.navigate('WalletTab', { screen: 'AddFunds' });
      },
    },
  ];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Quick Payment</Text>
              <Text style={styles.modalSubtitle}>Choose payment method</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Balance Display */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceGradient}
            >
              <View style={styles.balanceContent}>
                <Ionicons name="wallet" size={28} color={colors.white} />
                <View style={styles.balanceTextBlock}>
                  <Text style={styles.balanceLabel}>Available Balance</Text>
                  <Text style={styles.balanceAmount}>{tokens} Tokens</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Payment Actions Grid */}
          <View style={styles.actionsGrid}>
            {paymentActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={action.icon} size={32} color={colors.white} />
                </LinearGradient>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Access Info */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.infoText}>
              Tap any method to start paying instantly
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  balanceGradient: {
    padding: 20,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTextBlock: {
    marginLeft: 16,
  },
  balanceLabel: {
    fontSize: 13,
    color: colors.whiteAlpha['BB'],
    marginBottom: 4,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryAlpha['15'],
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textTertiary,
    marginLeft: 12,
    lineHeight: 18,
  },
});

export default QuickPaymentModal;

