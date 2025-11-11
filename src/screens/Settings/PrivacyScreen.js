import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PrivacyScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
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
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          <Text style={styles.lastUpdated}>
            Last Updated: November 11, 2024
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Introduction
            </Text>
            <Text style={styles.sectionText}>
              Sonnix ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our mobile application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Information We Collect
            </Text>
            <Text style={styles.sectionText}>
              We collect information that you provide directly to us, including:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Personal information (name, email, phone number)
              </Text>
              <Text style={styles.bulletPoint}>
                • Payment and wallet information
              </Text>
              <Text style={styles.bulletPoint}>
                • Transaction history
              </Text>
              <Text style={styles.bulletPoint}>
                • Event preferences and tickets
              </Text>
              <Text style={styles.bulletPoint}>
                • Device information and usage data
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              How We Use Your Information
            </Text>
            <Text style={styles.sectionText}>
              We use the information we collect to:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Provide, maintain, and improve our services
              </Text>
              <Text style={styles.bulletPoint}>
                • Process transactions and send related information
              </Text>
              <Text style={styles.bulletPoint}>
                • Send you technical notices and support messages
              </Text>
              <Text style={styles.bulletPoint}>
                • Respond to your comments and questions
              </Text>
              <Text style={styles.bulletPoint}>
                • Detect, prevent, and address fraud and security issues
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Data Security
            </Text>
            <Text style={styles.sectionText}>
              We implement appropriate technical and organizational security measures
              to protect your personal information. However, no method of transmission
              over the Internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Information Sharing
            </Text>
            <Text style={styles.sectionText}>
              We do not sell your personal information. We may share your information
              with:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Event organizers and vendors (only transaction-related data)
              </Text>
              <Text style={styles.bulletPoint}>
                • Service providers who assist in our operations
              </Text>
              <Text style={styles.bulletPoint}>
                • Law enforcement when required by law
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Your Rights
            </Text>
            <Text style={styles.sectionText}>
              You have the right to access, update, or delete your personal
              information at any time. You can also opt-out of marketing
              communications and request a copy of your data. Contact us to exercise
              these rights.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Cookies and Tracking
            </Text>
            <Text style={styles.sectionText}>
              We use cookies and similar tracking technologies to track activity on
              our application and hold certain information. You can instruct your
              device to refuse all cookies or to indicate when a cookie is being sent.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Children's Privacy
            </Text>
            <Text style={styles.sectionText}>
              Our service is not directed to individuals under the age of 18. We do
              not knowingly collect personal information from children under 18. If
              you become aware that a child has provided us with personal information,
              please contact us.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Changes to This Policy
            </Text>
            <Text style={styles.sectionText}>
              We may update our Privacy Policy from time to time. We will notify you
              of any changes by posting the new Privacy Policy on this page and
              updating the "Last Updated" date.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Contact Us
            </Text>
            <Text style={styles.sectionText}>
              If you have any questions about this Privacy Policy, please contact us:
            </Text>
            <Text style={styles.contactEmail}>
              privacy@sonnix.com
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
  contentSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 24,
    textAlign: 'center',
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
  sectionText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  bulletPoints: {
    marginTop: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 24,
    paddingLeft: 8,
  },
  contactEmail: {
    fontSize: 14,
    color: '#7B2CBF',
    marginTop: 8,
    fontWeight: '600',
  },
});

export default PrivacyScreen;
