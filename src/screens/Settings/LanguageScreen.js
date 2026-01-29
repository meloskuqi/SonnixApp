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
import { colors } from '../../constants/colors';

const LanguageScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Deutsch', code: 'de', flag: '🇩🇪' },
    { name: 'Italiano', code: 'it', flag: '🇮🇹' },
    { name: 'Português', code: 'pt', flag: '🇧🇷' },
    { name: '日本語', code: 'ja', flag: '🇯🇵' },
    { name: '한국어', code: 'ko', flag: '🇰🇷' },
    { name: '中文', code: 'zh', flag: '🇨🇳' },
    { name: 'العربية', code: 'ar', flag: '🇸🇦' },
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
        <Text style={styles.headerTitle}>Language</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.description}>
          Select your preferred language for the app interface
        </Text>

        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.languageCard,
              selectedLanguage === language.name && styles.languageCardSelected
            ]}
            onPress={() => setSelectedLanguage(language.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{language.flag}</Text>
            <Text style={styles.languageName}>{language.name}</Text>
            {selectedLanguage === language.name && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={colors.info} />
          <Text style={styles.infoText}>
            Language changes will take effect after restarting the app
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
  description: {
    fontSize: 14,
    color: colors.textTertiary,
    marginBottom: 20,
    lineHeight: 20,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  languageCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary10,
  },
  flag: {
    fontSize: 28,
    marginRight: 14,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.info30,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textTertiary,
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default LanguageScreen;

