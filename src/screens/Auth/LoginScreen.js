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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Navigation is handled by the navigation container
    } else {
      alert('Login failed. Please try again.');
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
              style={styles.logoCircle}
            >
              <Ionicons name="musical-notes" size={56} color="white" />
            </LinearGradient>
            <Text style={styles.appName}>Sonnix</Text>
            <View style={styles.taglineBadge}>
              <Ionicons name="ticket" size={14} color={colors.warning} />
              <Text style={styles.tagline}>Your Event Companion</Text>
            </View>
          </View>

          {/* Welcome Section with Decorative Elements */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeTitle}>Welcome Back! 👋</Text>
              <View style={styles.activeBadge}>
                <View style={styles.activeDot} />
                <Text style={styles.activeBadgeText}>LOGIN</Text>
              </View>
            </View>
            <Text style={styles.welcomeSubtitle}>Sign in to access your events and tickets</Text>
          </View>

          {/* Enhanced Input Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
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

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotButtonText}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Ionicons name="lock-closed" size={20} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
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

          {/* Gradient Sign In Button */}
          <LinearGradient
            colors={gradients.primaryLight}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInButton}
          >
            <TouchableOpacity onPress={handleLogin} style={styles.signInButtonInner}>
              <Text style={styles.signInButtonText}>Sign In</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Sign Up Link with Enhanced Design */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpLink}>Create Account →</Text>
            </TouchableOpacity>
          </View>

          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <Ionicons name="shield-checkmark" size={16} color={colors.success} />
            <Text style={styles.securityText}>Secure Login • Encrypted Connection</Text>
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
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primaryAlpha['15'],
    top: -150,
    right: -100,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primaryAlpha['10'],
    bottom: -100,
    left: -50,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primaryAlpha['08'],
    top: '40%',
    left: -75,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  appName: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: -1,
  },
  taglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagline: {
    color: colors.whiteAlpha['CC'],
    fontSize: 13,
    fontWeight: '600',
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    flex: 1,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryAlpha['20'],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryAlpha['40'],
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  activeBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    color: colors.textTertiary,
    fontSize: 15,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 12,
    color: colors.white,
    fontSize: 16,
  },
  eyeButton: {
    padding: 4,
  },
  signInButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 24,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  signInButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
  },
  signInButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  forgotButton: {
    paddingVertical: 4,
  },
  forgotButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpText: {
    color: colors.textTertiary,
    fontSize: 15,
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 15,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  securityText: {
    color: colors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default LoginScreen;

