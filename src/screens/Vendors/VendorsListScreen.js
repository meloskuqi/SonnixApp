import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const VendorsListScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const vendors = [
    {
      id: 1,
      name: 'The Cocktail Bar',
      type: 'Bar',
      description: 'Premium cocktails & spirits',
      rating: 4.8,
      reviews: 324,
      image: '🍹',
      color: '#7B2CBF',
      gradient: ['#7B2CBF', '#9333EA'],
      specialties: ['Cocktails', 'Beer', 'Wine'],
      distance: '50m',
      popular: true,
    },
    {
      id: 2,
      name: 'Street Food Hub',
      type: 'Food',
      description: 'Burgers, hot dogs & more',
      rating: 4.6,
      reviews: 189,
      image: '🍔',
      color: '#EA580C',
      gradient: ['#EA580C', '#DC2626'],
      specialties: ['Burgers', 'Hot Dogs', 'Fries'],
      distance: '75m',
    },
    {
      id: 3,
      name: 'Energy Zone',
      type: 'Drinks',
      description: 'Energy drinks & refreshments',
      rating: 4.7,
      reviews: 156,
      image: '⚡',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#EAB308'],
      specialties: ['Energy Drinks', 'Soft Drinks'],
      distance: '30m',
      popular: true,
    },
    {
      id: 4,
      name: 'Pizza Paradise',
      type: 'Food',
      description: 'Fresh pizza & Italian bites',
      rating: 4.9,
      reviews: 412,
      image: '🍕',
      color: '#DC2626',
      gradient: ['#DC2626', '#B91C1C'],
      specialties: ['Pizza', 'Pasta', 'Salads'],
      distance: '100m',
    },
    {
      id: 5,
      name: 'Sweet Treats',
      type: 'Desserts',
      description: 'Ice cream, desserts & sweets',
      rating: 4.5,
      reviews: 98,
      image: '🍦',
      color: '#EC4899',
      gradient: ['#EC4899', '#DB2777'],
      specialties: ['Ice Cream', 'Desserts', 'Candy'],
      distance: '60m',
    },
    {
      id: 6,
      name: 'Coffee Corner',
      type: 'Beverages',
      description: 'Coffee, tea & pastries',
      rating: 4.7,
      reviews: 267,
      image: '☕',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      specialties: ['Coffee', 'Tea', 'Pastries'],
      distance: '45m',
    },
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Event Vendors</Text>
          <Text style={styles.subtitle}>{vendors.length} vendors available</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7B2CBF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors..."
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

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Quick & Easy</Text>
            <Text style={styles.infoText}>
              Order with tokens • Skip the line • Pick up at vendor booth
            </Text>
          </View>
        </View>

        {/* Featured Vendor */}
        {filteredVendors.length > 0 && filteredVendors[0].popular && (
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="star" size={18} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Featured</Text>
            </View>
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => navigation.navigate('VendorMenu', { vendor: filteredVendors[0] })}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={filteredVendors[0].gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featuredGradient}
              >
                <View style={styles.featuredContent}>
                  <View style={styles.featuredLeft}>
                    <View style={styles.featuredBadge}>
                      <Ionicons name="flame" size={14} color="#FFFFFF" />
                      <Text style={styles.featuredBadgeText}>Most Popular</Text>
                    </View>
                    <Text style={styles.featuredName}>{filteredVendors[0].name}</Text>
                    <Text style={styles.featuredDescription}>{filteredVendors[0].description}</Text>
                    <View style={styles.featuredStats}>
                      <View style={styles.featuredStatItem}>
                        <Ionicons name="star" size={14} color="#FFFFFF" />
                        <Text style={styles.featuredStatText}>{filteredVendors[0].rating}</Text>
                      </View>
                      <View style={styles.featuredStatDivider} />
                      <View style={styles.featuredStatItem}>
                        <Ionicons name="location" size={14} color="#FFFFFF" />
                        <Text style={styles.featuredStatText}>{filteredVendors[0].distance}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.featuredIconContainer}>
                    <Text style={styles.featuredIcon}>{filteredVendors[0].image}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* All Vendors Grid */}
        <View style={styles.vendorsSection}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="restaurant" size={18} color="#7B2CBF" />
            <Text style={styles.sectionTitle}>All Vendors</Text>
          </View>
          <View style={styles.vendorsGrid}>
            {filteredVendors.map((vendor) => (
              <TouchableOpacity
                key={vendor.id}
                style={styles.gridCard}
                onPress={() => navigation.navigate('VendorMenu', { vendor })}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[`${vendor.color}20`, `${vendor.color}08`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gridCardGradient}
                >
                  {vendor.popular && (
                    <View style={styles.gridPopularBadge}>
                      <Ionicons name="flame" size={10} color="#FF6B35" />
                    </View>
                  )}
                  <LinearGradient
                    colors={vendor.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gridIconContainer}
                  >
                    <Text style={styles.gridIcon}>{vendor.image}</Text>
                  </LinearGradient>
                  <Text style={styles.gridName}>{vendor.name}</Text>
                  <Text style={styles.gridType}>{vendor.type}</Text>
                  <View style={styles.gridFooter}>
                    <View style={styles.gridRating}>
                      <Ionicons name="star" size={12} color="#F59E0B" />
                      <Text style={styles.gridRatingText}>{vendor.rating}</Text>
                    </View>
                    <Text style={styles.gridDistance}>{vendor.distance}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {filteredVendors.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#6B7280" />
            <Text style={styles.emptyTitle}>No vendors found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search terms
            </Text>
          </View>
        )}
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1.5,
    borderColor: '#3B82F640',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F625',
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
    color: '#3B82F6',
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  infoText: {
    fontSize: 13,
    color: '#B0B0B0',
    lineHeight: 20,
    fontWeight: '500',
  },
  // Featured Vendor Section
  featuredSection: {
    marginBottom: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredGradient: {
    borderRadius: 20,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  featuredLeft: {
    flex: 1,
    paddingRight: 16,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF25',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  featuredName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#FFFFFFCC',
    marginBottom: 14,
    lineHeight: 20,
  },
  featuredStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredStatText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  featuredStatDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#FFFFFF40',
    marginHorizontal: 12,
  },
  featuredIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredIcon: {
    fontSize: 50,
  },
  // Grid Section
  vendorsSection: {
    marginBottom: 20,
  },
  vendorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: (width - 48) / 2, // 2 columns with padding
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gridCardGradient: {
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    minHeight: 180,
  },
  gridPopularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  gridIcon: {
    fontSize: 38,
  },
  gridName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  gridType: {
    fontSize: 12,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  gridFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
  },
  gridRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A80',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  gridRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  gridDistance: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default VendorsListScreen;

