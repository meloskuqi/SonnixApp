import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HelpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqItems = [
    {
      question: 'How do I add funds to my wallet?',
      answer: 'Go to the Wallet tab, tap "Add Funds", choose your payment method, and enter the amount you want to add.',
    },
    {
      question: 'How do QR payments work?',
      answer: 'Tap the Quick Pay button, select QR Payment, and either scan a vendor\'s code or show your code to be scanned.',
    },
    {
      question: 'Can I get a refund for tickets?',
      answer: 'Yes! Go to My Tickets, select the ticket you want to refund, and tap "Request Refund". Refunds are processed within 3-5 business days.',
    },
    {
      question: 'What are Sonnix Tokens?',
      answer: 'Sonnix Tokens are our in-app currency that can be used for faster transactions and special offers at events.',
    },
    {
      question: 'Is offline payment really offline?',
      answer: 'Yes! Generate an offline QR code before losing connection, and it will sync automatically when you\'re back online.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach us 24/7 through the Contact Support option in the Settings menu, or email support@sonnix.app.',
    },
  ];

  const quickHelp = [
    {
      icon: 'chatbubble-ellipses',
      title: 'Live Chat',
      description: 'Chat with our team',
      color: '#10B981',
      onPress: () => navigation.navigate('Support'),
    },
    {
      icon: 'call',
      title: 'Call Us',
      description: '1-800-SONNIX-1',
      color: '#3B82F6',
      onPress: () => {},
    },
    {
      icon: 'mail',
      title: 'Email Support',
      description: 'support@sonnix.app',
      color: '#F59E0B',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help Now?</Text>
          <View style={styles.quickHelpGrid}>
            {quickHelp.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickHelpCard}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.quickHelpIcon, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={styles.quickHelpTitle}>{item.title}</Text>
                <Text style={styles.quickHelpDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Ionicons 
                  name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color="#7B2CBF" 
                />
              </View>
              {expandedIndex === index && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Resources</Text>
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="book" size={24} color="#7B2CBF" />
            <Text style={styles.resourceText}>User Guide</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="videocam" size={24} color="#3B82F6" />
            <Text style={styles.resourceText}>Video Tutorials</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard}>
            <Ionicons name="globe" size={24} color="#10B981" />
            <Text style={styles.resourceText}>Visit Our Website</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickHelpCard: {
    width: '31%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    alignItems: 'center',
  },
  quickHelpIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickHelpTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickHelpDescription: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  resourceText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 14,
  },
});

export default HelpScreen;

