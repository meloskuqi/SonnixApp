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
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

const RequestMoneyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const recentContacts = [
    { id: 1, name: 'Sarah Johnson', username: '@sarah_j', avatar: '👩' },
    { id: 2, name: 'Mike Chen', username: '@mikec', avatar: '👨' },
    { id: 3, name: 'Emma Wilson', username: '@emmaw', avatar: '👩' },
    { id: 4, name: 'Alex Brown', username: '@alexb', avatar: '👨' },
  ];

  const handleRequestMoney = () => {
    if (!recipient) {
      alert('Please select or enter a recipient');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    alert(`Requesting ${amount} tokens from ${recipient}. This feature will be connected to the backend soon!`);
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
            <Text style={styles.title}>Request Money</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="arrow-down-circle" size={48} color={colors.warning} />
            </View>
            <Text style={styles.infoTitle}>Request Payment</Text>
            <Text style={styles.infoDescription}>
              Send a payment request to friends or family. They'll receive a notification to pay you instantly.
            </Text>
          </View>

          {/* Recipient Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Request From</Text>
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

          {/* Reason Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reason (Optional)</Text>
            <View style={styles.textAreaContainer}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} style={styles.textAreaIcon} />
              <TextInput
                style={styles.textArea}
                placeholder="What's this request for?"
                placeholderTextColor={colors.textMuted}
                value={reason}
                onChangeText={setReason}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <View style={styles.featureItem}>
              <Ionicons name="flash" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Instant notification</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Request expires in 7 days</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Reminder notifications</Text>
            </View>
          </View>

          {/* Request Button */}
          <TouchableOpacity
            onPress={handleRequestMoney}
            style={styles.requestButton}
            activeOpacity={0.9}
            disabled={!amount || parseFloat(amount) <= 0 || !recipient}
          >
            <LinearGradient
              colors={[colors.warning, '#D97706']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.requestButtonGradient}
            >
              <Ionicons name="arrow-down-circle" size={20} color={colors.white} />
              <Text style={styles.requestButtonText}>
                Request {amount || '0'} Tokens
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
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
    backgroundColor: colors.primaryDark,
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
    borderColor: colors.warning,
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
    backgroundColor: colors.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
  },
  tokensBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.warning,
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
    backgroundColor: colors.warning + '20',
    borderColor: colors.warning,
    borderWidth: 2,
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  quickAmountTextActive: {
    color: colors.warning,
  },
  textAreaContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textAreaIcon: {
    marginBottom: spacing.sm,
  },
  textArea: {
    color: colors.text,
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
    fontWeight: '500',
  },
  featuresSection: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  featureText: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  requestButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    ...shadows.large,
  },
  requestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  requestButtonText: {
    fontSize: 17,
    fontWeight: '800',
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
    color: colors.textTertiary,
  },
});

export default RequestMoneyScreen;
