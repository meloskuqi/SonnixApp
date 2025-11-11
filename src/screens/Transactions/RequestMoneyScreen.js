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
    alert(`Requesting $${amount} from ${recipient}. This feature will be connected to the backend soon!`);
  };

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
          <Text style={styles.title}>Request Money</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="wallet" size={48} color="#7B2CBF" />
          <Text style={styles.infoTitle}>Request Payment</Text>
          <Text style={styles.infoDescription}>
            Send a payment request to friends or family. They'll receive a notification to pay you instantly.
          </Text>
        </View>

        {/* Recipient Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request From</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#7B2CBF" />
            <TextInput
              style={styles.input}
              placeholder="Username, email or phone"
              placeholderTextColor="#6B7280"
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
            style={styles.contactsScroll}
          >
            {recentContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                onPress={() => setRecipient(contact.username)}
                style={styles.contactCard}
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
        <View style={styles.quickAmountGrid}>
          {['10', '25', '50', '100'].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => setAmount(value)}
              style={styles.quickAmountButton}
            >
              <Text style={styles.quickAmountText}>${value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reason Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason (Optional)</Text>
          <View style={styles.textAreaContainer}>
            <Ionicons name="document-text-outline" size={20} color="#7B2CBF" style={styles.textAreaIcon} />
            <TextInput
              style={styles.textArea}
              placeholder="What's this request for?"
              placeholderTextColor="#6B7280"
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
            <Ionicons name="flash" size={20} color="#7B2CBF" />
            <Text style={styles.featureText}>Instant notification</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="time" size={20} color="#7B2CBF" />
            <Text style={styles.featureText}>Request expires in 7 days</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="notifications" size={20} color="#7B2CBF" />
            <Text style={styles.featureText}>Reminder notifications</Text>
          </View>
        </View>

        {/* Request Button */}
        <TouchableOpacity
          onPress={handleRequestMoney}
          style={styles.requestButton}
        >
          <Text style={styles.requestButtonText}>
            Request ${amount || '0.00'}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  contactsScroll: {
    marginBottom: 8,
  },
  contactCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactAvatarText: {
    fontSize: 28,
  },
  contactName: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
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
  quickAmountGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAmountButton: {
    width: '23%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textAreaContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  textAreaIcon: {
    marginBottom: 8,
  },
  textArea: {
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  featuresSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 12,
  },
  requestButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
});

export default RequestMoneyScreen;



