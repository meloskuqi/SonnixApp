import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { colors, gradients } from '../../constants/colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const result = await register(name, email, password);
    if (result.success) {
      // Navigation is handled by the navigation container
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Decorative Background Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
        
        <View style={styles.content}>
          {/* Logo Section with Gradient */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoIcon}
            >
              <Ionicons name="musical-notes" size={52} color="white" />
            </LinearGradient>
            <Text style={styles.logoText}>Sonnix</Text>
            <View style={styles.newBadge}>
              <Ionicons name="sparkles" size={12} color={colors.warning} />
              <Text style={styles.newBadgeText}>NEW ACCOUNT</Text>
            </View>
          </View>

          {/* Header with Badge */}
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Create Account ✨</Text>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>1/1</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>Join thousands enjoying amazing events</Text>
          </View>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Ionicons name="person" size={20} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#6B7280"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Ionicons name="mail" size={20} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Ionicons name="lock-closed" size={20} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor="#6B7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Ionicons name="ticket" size={16} color={colors.success} />
              <Text style={styles.featureText}>Easy Tickets</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="flash" size={16} color={colors.warning} />
              <Text style={styles.featureText}>Instant Access</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="shield" size={16} color={colors.info} />
              <Text style={styles.featureText}>Secure</Text>
            </View>
          </View>

          {/* Gradient Register Button */}
          <LinearGradient
            colors={gradients.primaryLight}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.registerButton}
          >
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerButtonInner}
            >
              <Text style={styles.registerButtonText}>
                Create My Account
              </Text>
              <Ionicons name="arrow-forward-circle" size={22} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign In →</Text>
            </TouchableOpacity>
          </View>

          {/* Terms Badge */}
          <View style={styles.termsBadge}>
            <Ionicons name="information-circle" size={14} color={colors.textMuted} />
            <Text style={styles.termsText}>
              By signing up, you agree to our Terms & Privacy
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.primaryAlpha['15'],
    top: -160,
    left: -100,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primaryAlpha['10'],
    bottom: -80,
    right: -60,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primaryAlpha['08'],
    top: '35%',
    right: -80,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 10,
    letterSpacing: -1,
  },
  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  newBadgeText: {
    color: colors.whiteAlpha['CC'],
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerContainer: {
    marginBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
    flex: 1,
  },
  stepBadge: {
    backgroundColor: colors.primaryAlpha['20'],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryAlpha['40'],
  },
  stepBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    marginLeft: 12,
  },
  eyeButton: {
    padding: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    color: colors.whiteAlpha['CC'],
    fontSize: 11,
    fontWeight: '700',
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  registerButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 15,
    color: colors.textTertiary,
  },
  signInLink: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  termsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  termsText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});

export default RegisterScreen;
