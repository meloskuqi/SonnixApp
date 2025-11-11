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

const SupportScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { label: 'Account Issue', icon: 'person', color: '#7B2CBF' },
    { label: 'Payment Problem', icon: 'card', color: '#10B981' },
    { label: 'Technical Issue', icon: 'bug', color: '#DC2626' },
    { label: 'Event Question', icon: 'calendar', color: '#3B82F6' },
    { label: 'Other', icon: 'help-circle', color: '#F59E0B' },
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert(
      'Support Request Sent',
      'We\'ve received your message and will get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIconContainer}>
            <View style={styles.onlineIndicator} />
            <Ionicons name="chatbubbles" size={28} color="#10B981" />
          </View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>We're Here 24/7</Text>
            <Text style={styles.statusDescription}>
              Average response time: Under 2 hours
            </Text>
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category *</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.label && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category.label)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: `${category.color}20` },
                  selectedCategory === category.label && { backgroundColor: category.color }
                ]}>
                  <Ionicons 
                    name={category.icon} 
                    size={20} 
                    color={selectedCategory === category.label ? '#FFFFFF' : category.color} 
                  />
                </View>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.label && styles.categoryLabelSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Subject */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Brief description of your issue"
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        {/* Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message *</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue in detail..."
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="send" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>

        {/* Other Contact Methods */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or reach us directly</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.contactCard}>
          <View style={styles.contactIcon}>
            <Ionicons name="mail" size={20} color="#7B2CBF" />
          </View>
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>support@sonnix.app</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <View style={styles.contactIcon}>
            <Ionicons name="call" size={20} color="#10B981" />
          </View>
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>1-800-SONNIX-1</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
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
  statusBanner: {
    flexDirection: 'row',
    backgroundColor: '#10B98115',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#10B98130',
  },
  statusIconContainer: {
    position: 'relative',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10B98125',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#10B98115',
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryButton: {
    width: '30%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 6,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  categoryButtonSelected: {
    borderColor: '#7B2CBF',
    backgroundColor: '#7B2CBF10',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 14,
  },
  textAreaContainer: {
    paddingVertical: 14,
  },
  textArea: {
    height: 120,
    paddingVertical: 0,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#7B2CBF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2A2A',
  },
  dividerText: {
    fontSize: 13,
    color: '#6B7280',
    marginHorizontal: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SupportScreen;

