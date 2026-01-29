import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

const RateAppScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rate Us', 'Please select a rating before submitting');
      return;
    }
    Alert.alert(
      'Thank You!',
      'We appreciate your feedback. It helps us improve Sonnix!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const feedbackSuggestions = [
    'Great UI design',
    'Easy to use',
    'Fast payments',
    'Love the events',
    'Helpful support',
    'Needs improvements',
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
        <Text style={styles.headerTitle}>Rate Sonnix</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart" size={48} color={colors.primary} />
          </View>
          <Text style={styles.title}>How do you like Sonnix?</Text>
          <Text style={styles.subtitle}>Your feedback helps us improve</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={48}
                  color={star <= rating ? 'colors.warning' : colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 1 && 'We\'re sorry to hear that'}
              {rating === 2 && 'We can do better'}
              {rating === 3 && 'Good, but room for improvement'}
              {rating === 4 && 'Great! We\'re glad you like it'}
              {rating === 5 && 'Amazing! Thank you!'}
            </Text>
          )}
        </View>

        {/* Feedback Input */}
        {rating > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tell us more (Optional)</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  value={feedback}
                  onChangeText={setFeedback}
                  placeholder="Share your thoughts..."
                  placeholderTextColor={colors.textMuted}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Quick Feedback Chips */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Feedback</Text>
              <View style={styles.chipsContainer}>
                {feedbackSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.chip,
                      feedback.includes(suggestion) && styles.chipSelected
                    ]}
                    onPress={() => {
                      if (feedback.includes(suggestion)) {
                        setFeedback(feedback.replace(suggestion + ', ', '').replace(suggestion, ''));
                      } else {
                        setFeedback(feedback ? `${feedback}, ${suggestion}` : suggestion);
                      }
                    }}
                  >
                    <Text style={[
                      styles.chipText,
                      feedback.includes(suggestion) && styles.chipTextSelected
                    ]}>
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Ionicons name="checkmark-circle" size={22} color={colors.white} style={{ marginRight: 8 }} />
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Store Links */}
        <View style={styles.storeSection}>
          <Text style={styles.storeSectionTitle}>Rate us on stores</Text>
          <TouchableOpacity style={styles.storeButton}>
            <Ionicons name="logo-apple" size={28} color={colors.white} />
            <View style={styles.storeButtonContent}>
              <Text style={styles.storeButtonLabel}>Rate on</Text>
              <Text style={styles.storeButtonText}>App Store</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.storeButton}>
            <Ionicons name="logo-google-playstore" size={28} color={colors.white} />
            <View style={styles.storeButtonContent}>
              <Text style={styles.storeButtonLabel}>Rate on</Text>
              <Text style={styles.storeButtonText}>Play Store</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color={colors.success} />
          <Text style={styles.infoText}>
            Your feedback is anonymous unless you choose to share your contact information
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
    paddingTop: 32,
    paddingBottom: 40,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textTertiary,
    marginBottom: 28,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  starButton: {
    padding: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
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
  textAreaContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  textArea: {
    fontSize: 15,
    color: colors.white,
    height: 100,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary20,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  storeSection: {
    marginBottom: 24,
  },
  storeSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  storeButtonContent: {
    flex: 1,
    marginLeft: 14,
  },
  storeButtonLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  storeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.success30,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textTertiary,
    marginLeft: 12,
    lineHeight: 19,
  },
});

export default RateAppScreen;

