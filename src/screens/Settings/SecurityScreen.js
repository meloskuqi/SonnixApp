import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

const SecurityScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const securityOptions = [
    {
      icon: 'finger-print',
      title: 'Biometric Login',
      description: 'Use fingerprint or Face ID',
      type: 'switch',
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
      color: colors.primary,
    },
    {
      icon: 'shield-checkmark',
      title: 'Two-Factor Authentication',
      description: 'Extra layer of security',
      type: 'switch',
      value: twoFactorEnabled,
      onToggle: setTwoFactorEnabled,
      color: colors.success,
    },
    {
      icon: 'key',
      title: 'Change Password',
      description: 'Update your password',
      onPress: () => Alert.alert('Change Password', 'Password change coming soon!'),
      color: colors.info,
    },
    {
      icon: 'lock-closed',
      title: 'Change PIN',
      description: 'Update your 4-digit PIN',
      onPress: () => Alert.alert('Change PIN', 'PIN change coming soon!'),
      color: colors.warning,
    },
    {
      icon: 'phone-portrait',
      title: 'Trusted Devices',
      description: 'Manage logged-in devices',
      onPress: () => Alert.alert('Trusted Devices', 'Device management coming soon!'),
      color: colors.primaryDark,
    },
    {
      icon: 'time',
      title: 'Login History',
      description: 'View recent login activity',
      onPress: () => Alert.alert('Login History', 'Login history coming soon!'),
      color: colors.textMuted,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Security Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name="shield-checkmark" size={32} color={colors.success} />
          </View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Account Secured</Text>
            <Text style={styles.statusDescription}>
              Your account is protected with strong security measures
            </Text>
          </View>
        </View>

        {/* Security Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Settings</Text>
          {securityOptions.map((option, index) => (
            option.type === 'switch' ? (
              <View
                key={index}
                style={[
                  styles.optionCard,
                  index !== securityOptions.length - 1 && styles.optionCardBorder
                ]}
              >
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                  <Ionicons name={option.icon} size={24} color={option.color} />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Switch
                  value={option.value}
                  onValueChange={option.onToggle}
                  trackColor={{ false: colors.border, true: option.color }}
                  thumbColor={option.value ? 'colors.white' : colors.textTertiary}
                />
              </View>
            ) : (
              <TouchableOpacity
                key={index}
                style={styles.optionCard}
                onPress={option.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                  <Ionicons name={option.icon} size={24} color={option.color} />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            )
          ))}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={24} color={colors.info} />
          <Text style={styles.infoBannerText}>
            We recommend enabling two-factor authentication for maximum account security.
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statusCard: {
    flexDirection: 'row',
    backgroundColor: colors.success15,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.success30,
  },
  statusIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.success25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 6,
  },
  statusDescription: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 20,
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
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  optionCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.info30,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 14,
    color: colors.textTertiary,
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default SecurityScreen;

