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
import { useWallet } from '../../context/WalletContext';
import SexyBalanceCard from '../../components/SexyBalanceCard';

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
    if (parseFloat(amount) > balance) {
      alert('Insufficient balance');
      return;
    }
    alert(`Sending $${amount} to ${recipient}. This feature will be connected to the backend soon!`);
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
          <Text style={styles.title}>Send Money</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Available Balance */}
        <SexyBalanceCard 
          tokens={tokens} 
          gradient={['#EC4899', '#DB2777', '#BE185D']}
          icon="paper-plane"
          badgeIcon="arrow-forward"
          badgeText="Send"
          badgeColor="#F59E0B"
          shadowColor="#EC4899"
        />

        {/* Recipient Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipient</Text>
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
          {['5', '10', '25', '50'].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => setAmount(value)}
              style={styles.quickAmountButton}
            >
              <Text style={styles.quickAmountText}>${value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Note (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="chatbox-outline" size={20} color="#7B2CBF" />
            <TextInput
              style={styles.input}
              placeholder="What's this for?"
              placeholderTextColor="#6B7280"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={24} color="#3B82F6" />
          <Text style={styles.infoBannerText}>
            Money will be instantly transferred to the recipient's Sonnix wallet. This transaction cannot be reversed.
          </Text>
        </View>

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSendMoney}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>
            Send ${amount || '0.00'}
          </Text>
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
    backgroundColor: '#7B2CBF',
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
  sendButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SendMoneyScreen;



