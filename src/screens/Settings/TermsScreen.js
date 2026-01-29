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
import { colors } from '../../constants/colors';

const TermsScreen = ({ navigation }) => {
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
          <Text style={styles.title}>Terms of Use</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          <Text style={styles.lastUpdated}>
            Last Updated: November 11, 2024
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              1. Acceptance of Terms
            </Text>
            <Text style={styles.sectionText}>
              By accessing and using the Sonnix application, you accept and agree to
              be bound by the terms and provision of this agreement. If you do not
              agree to these terms, please do not use this application.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              2. Use License
            </Text>
            <Text style={styles.sectionText}>
              Permission is granted to temporarily use Sonnix for personal,
              non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>
                • Modify or copy the materials
              </Text>
              <Text style={styles.bulletPoint}>
                • Use the materials for any commercial purpose
              </Text>
              <Text style={styles.bulletPoint}>
                • Attempt to reverse engineer any software
              </Text>
              <Text style={styles.bulletPoint}>
                • Remove any copyright or proprietary notations
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              3. Wallet & Payments
            </Text>
            <Text style={styles.sectionText}>
              You are responsible for maintaining the security of your wallet and
              account credentials. Sonnix is not responsible for any unauthorized
              access to your account or loss of funds due to security breaches on
              your device.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              4. User Conduct
            </Text>
            <Text style={styles.sectionText}>
              You agree not to use the Sonnix application for any unlawful purpose or
              in any way that interrupts, damages, or impairs the service. You must
              not transmit any worms, viruses, or any code of a destructive nature.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              5. Refund Policy
            </Text>
            <Text style={styles.sectionText}>
              Refund requests for event tickets must be submitted at least 48 hours
              before the event start time. Refunds for food and beverage purchases
              are subject to vendor policies. Token purchases are non-refundable
              unless required by law.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              6. Limitation of Liability
            </Text>
            <Text style={styles.sectionText}>
              In no event shall Sonnix or its suppliers be liable for any damages
              arising out of the use or inability to use the materials on Sonnix's
              application, even if authorized representative has been notified orally
              or in writing.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              7. Modifications
            </Text>
            <Text style={styles.sectionText}>
              Sonnix may revise these terms of use at any time without notice. By
              using this application you are agreeing to be bound by the then current
              version of these Terms of Use.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              8. Contact Information
            </Text>
            <Text style={styles.sectionText}>
              If you have any questions about these Terms, please contact us at:
            </Text>
            <Text style={styles.contactEmail}>
              support@sonnix.com
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
    backgroundColor: colors.background,
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
    color: colors.white,
  },
  contentSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 22,
  },
  bulletPoints: {
    marginTop: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 24,
    paddingLeft: 8,
  },
  contactEmail: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
});

export default TermsScreen;
