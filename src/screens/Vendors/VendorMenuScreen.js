import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dummyVendorItems } from '../../services/dummyData';

const { width } = Dimensions.get('window');

const VendorMenuScreen = ({ navigation, route }) => {
  const { vendor } = route.params;
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on vendor specialties
  const vendorCategories = ['all', ...vendor.specialties];
  const categories = vendorCategories;

  const filteredItems = dummyVendorItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVendor = vendor.specialties.includes(item.category);
    return matchesSearch && matchesCategory && matchesVendor;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Big Beautiful Header - Scrollable */}
        <LinearGradient
          colors={[...vendor.gradient, '#0D0D0D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.headerGradient, { paddingTop: insets.top + 16 }]}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ width: 44 }} />
          </View>
          <View style={styles.vendorInfo}>
            <View style={styles.vendorIconLarge}>
              <Text style={styles.vendorEmojiLarge}>{vendor.image}</Text>
            </View>
            <Text style={styles.vendorNameLarge}>{vendor.name}</Text>
            <Text style={styles.vendorSubtitle}>{vendor.description}</Text>
            <View style={styles.vendorMetaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={14} color="#FFFFFF" />
                <Text style={styles.metaText}>{vendor.rating}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Ionicons name="location" size={14} color="#FFFFFF" />
                <Text style={styles.metaText}>{vendor.distance}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Ionicons name="time" size={14} color="#FFFFFF" />
                <Text style={styles.metaText}>5-10 min</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={vendor.color} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search menu..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.8}
              >
                {isActive ? (
                  <LinearGradient
                    colors={vendor.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.categoryPillActive}
                  >
                    <Text style={styles.categoryTextActive}>{category}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.categoryPillInactive}>
                    <Text style={styles.categoryTextInactive}>{category}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Menu Items Grid */}
        <View style={styles.menuGrid}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => navigation.navigate('OrderConfirm', { item, vendor })}
              activeOpacity={0.9}
            >
              <View style={styles.menuCardTop}>
                <LinearGradient
                  colors={[`${vendor.color}20`, `${vendor.color}10`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.itemImageContainer}
                >
                  <Text style={styles.itemEmoji}>{item.image}</Text>
                </LinearGradient>
              </View>
              <View style={styles.menuCardBottom}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <View style={styles.itemFooter}>
                  <Text style={[styles.itemPrice, { color: vendor.color }]}>${item.price}</Text>
                  <View style={[styles.addButton, { backgroundColor: `${vendor.color}20` }]}>
                    <Ionicons name="add" size={18} color={vendor.color} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="flash" size={24} color="#F59E0B" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Instant Payment</Text>
            <Text style={styles.infoText}>
              Orders are paid with your Sonnix tokens. Show the QR code to collect your items.
            </Text>
          </View>
        </View>
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
  scrollContainer: {
    flex: 1,
  },
  // Header Gradient - Big & Beautiful
  headerGradient: {
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vendorIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  vendorEmojiLarge: {
    fontSize: 44,
  },
  vendorNameLarge: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  vendorSubtitle: {
    fontSize: 14,
    color: '#FFFFFFCC',
    marginBottom: 16,
  },
  vendorMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000040',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#FFFFFF30',
    marginHorizontal: 12,
  },
  // Content
  content: {
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  // Categories
  categoriesContainer: {
    paddingVertical: 4,
    marginBottom: 20,
  },
  categoryPillActive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryPillInactive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  categoryTextActive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  categoryTextInactive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'capitalize',
  },
  // Menu Grid
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuCard: {
    width: (width - 48) / 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  menuCardTop: {
    aspectRatio: 1,
    overflow: 'hidden',
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 56,
  },
  menuCardBottom: {
    padding: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  itemCategory: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 10,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#F59E0B30',
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F59E0B20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#B0B0B0',
    lineHeight: 19,
  },
});

export default VendorMenuScreen;
