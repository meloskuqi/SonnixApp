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

const SendMoneyScreen = ({ navigation }) => {
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const recentContacts = [
    { id: 1, name: 'Sarah Johnson', username: '@sarah_j', avatar: '👩' },
    { id: 2, name: 'Mike Chen', username: '@mikec', avatar: '👨' },
    { id: 3, name: 'Emma Wilson', username: '@emmaw', avatar: '👩' },
    { id: 4, name: 'Alex Brown', username: '@alexb', avatar: '👨' },
  ];

  const handleSendMoney = () => {
    if (!recipient) {
      alert('Please enter recipient details');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (parseFloat(amount) > tokens) {
      alert('Insufficient balance');
      return;
    }
    alert(`Sending ${amount} tokens to ${recipient}. This feature will be connected to the backend soon!`);
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
            <Text style={styles.title}>Send Money</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={[colors.info, '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceGradient}
            >
              <View style={styles.balanceContent}>
                <View style={styles.balanceHeader}>
                  <Ionicons name="send" size={24} color={colors.white} />
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
            </LinearGradient>
          </View>

          {/* Recipient Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recipient</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
              <TextInput
                style={styles.input}
                placeholder="Username, email or phone"
                placeholderTextColor={colors.textMuted}
                value={recipient}
                onChangeText={setRecipient}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Recent Contacts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Contacts</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contactsScroll}
            >
              {recentContacts.map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  onPress={() => setRecipient(contact.username)}
                  style={styles.contactCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
                  </View>
                  <Text style={styles.contactName}>{contact.name.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                value={amount}
                onChangeText={setAmount}
                keyboardType="number-pad"
              />
              <View style={styles.tokensBadge}>
                <Ionicons name="diamond" size={18} color={colors.primary} />
                <Text style={styles.tokensBadgeText}>Tokens</Text>
              </View>
            </View>
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountGrid}>
            {[10, 25, 50, 100].map((value) => (
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
                ]}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Note Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Note (Optional)</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="chatbox-outline" size={20} color={colors.primary} />
              <TextInput
                style={styles.input}
                placeholder="What's this for?"
                placeholderTextColor={colors.textMuted}
                value={note}
                onChangeText={setNote}
              />
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.infoBannerText}>
              Money will be instantly transferred to the recipient's Sonnix wallet. This transaction cannot be reversed.
            </Text>
          </View>

          {/* Send Button */}
          <TouchableOpacity
            onPress={handleSendMoney}
            style={styles.sendButton}
            activeOpacity={0.9}
            disabled={!amount || parseFloat(amount) <= 0 || !recipient}
          >
            <LinearGradient
              colors={[colors.info, '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={20} color={colors.white} />
              <Text style={styles.sendButtonText}>
                Send {amount || '0'} Tokens
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
  contactsScroll: {
    paddingRight: spacing.md,
  },
  contactCard: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 70,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  contactAvatarText: {
    fontSize: 28,
  },
  contactName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
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
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  quickAmountButton: {
    width: '23%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickAmountButtonActive: {
    backgroundColor: colors.primaryAlpha['15'],
    borderColor: colors.primary,
    borderWidth: 2,
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  quickAmountTextActive: {
    color: colors.primary,
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
    marginBottom: spacing.lg,
  },
  infoBannerText: {
    flex: 1,
    color: colors.textTertiary,
    fontSize: 13,
    lineHeight: 18,
  },
  sendButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.large,
  },
  sendButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  sendButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
  },
});

export default SendMoneyScreen;
