import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dummyEvents } from '../../services/dummyData';
import EventCard from '../../components/EventCard';

const EventsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const insets = useSafeAreaInsets();

  const categoryIcons = {
    all: 'apps',
    Music: 'musical-notes',
    Festival: 'flame',
    Jazz: 'disc',
    Sports: 'basketball',
  };

  const categories = ['all', 'Music', 'Festival', 'Jazz', 'Sports'];

  const filteredEvents = dummyEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured event (first event)
  const featuredEvent = dummyEvents[0];
  
  // Get trending events (exclude featured)
  const trendingEvents = dummyEvents.slice(1, 4);

  const renderHeader = () => (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.title}>Discover Events</Text>
          <Text style={styles.subtitle}>Find amazing experiences near you</Text>
        </View>
        <TouchableOpacity style={styles.filterIconButton}>
          <Ionicons name="options-outline" size={24} color="#7B2CBF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7B2CBF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events, venues, artists..."
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

      {/* Featured Event Banner */}
      {!searchQuery && selectedCategory === 'all' && (
        <TouchableOpacity
          style={styles.featuredBanner}
          onPress={() => navigation.navigate('EventDetails', { event: featuredEvent })}
        >
          <Image
            source={{ uri: featuredEvent.image }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
            <View style={styles.featuredInfo}>
              <Ionicons name="calendar-outline" size={14} color="#FFFFFF" />
              <Text style={styles.featuredInfoText}>{featuredEvent.date}</Text>
              <Ionicons name="location-outline" size={14} color="#FFFFFF" style={{ marginLeft: 12 }} />
              <Text style={styles.featuredInfoText}>{featuredEvent.venue}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Category Filter */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive
              ]}
            >
              <View style={[
                styles.categoryIconContainer,
                selectedCategory === item && styles.categoryIconActive
              ]}>
                <Ionicons
                  name={categoryIcons[item]}
                  size={20}
                  color={selectedCategory === item ? '#FFFFFF' : '#7B2CBF'}
                />
              </View>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Vendors Quick Access */}
      <TouchableOpacity
        style={styles.vendorsQuickAccess}
        onPress={() => navigation.navigate('PayTab', { screen: 'VendorsList' })}
        activeOpacity={0.8}
      >
        <View style={styles.vendorsAccessContent}>
          <View style={styles.vendorsAccessLeft}>
            <View style={styles.vendorsAccessIcon}>
              <Ionicons name="restaurant" size={24} color="#EA580C" />
            </View>
            <View>
              <Text style={styles.vendorsAccessTitle}>Event Food & Drinks</Text>
              <Text style={styles.vendorsAccessSubtitle}>Order from vendors • Skip the line</Text>
            </View>
          </View>
          <View style={styles.vendorsAccessArrow}>
            <Ionicons name="arrow-forward-circle" size={28} color="#EA580C" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Trending Section */}
      {!searchQuery && selectedCategory === 'all' && (
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Ionicons name="flame" size={20} color="#FF6B35" />
              <Text style={styles.sectionTitle}>Trending Now</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingScroll}
          >
            {trendingEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.trendingCard}
                onPress={() => navigation.navigate('EventDetails', { event })}
              >
                <Image
                  source={{ uri: event.image }}
                  style={styles.trendingImage}
                  resizeMode="cover"
                />
                <View style={styles.trendingOverlay}>
                  <Text style={styles.trendingTitle} numberOfLines={2}>
                    {event.title}
                  </Text>
                  <View style={styles.trendingPrice}>
                    <Text style={styles.trendingPriceText}>{event.price} tokens</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* All Events Header */}
      <View style={styles.allEventsHeader}>
        <View style={styles.sectionTitleWithIcon}>
          <Ionicons name="grid" size={18} color="#7B2CBF" />
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Events' : `${selectedCategory} Events`}
          </Text>
        </View>
        <View style={styles.resultCount}>
          <Text style={styles.resultCountText}>{filteredEvents.length} events</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventCardContainer}>
            <EventCard
              event={item}
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#6B7280" />
            <Text style={styles.emptyText}>
              No events found
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  headerContainer: {
    paddingBottom: 16,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  filterIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  featuredBanner: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredInfoText: {
    fontSize: 13,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryButtonActive: {
    opacity: 1,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: '#7B2CBF',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  // Vendors Quick Access Styles
  vendorsQuickAccess: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#EA580C30',
  },
  vendorsAccessContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  vendorsAccessLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vendorsAccessIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EA580C20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  vendorsAccessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  vendorsAccessSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  vendorsAccessArrow: {
    marginLeft: 12,
  },
  trendingSection: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B2CBF',
  },
  trendingScroll: {
    paddingHorizontal: 20,
  },
  trendingCard: {
    width: 180,
    height: 240,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  trendingPrice: {
    alignSelf: 'flex-start',
    backgroundColor: '#7B2CBF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingPriceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  allEventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  resultCount: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  resultCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  eventCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default EventsScreen;
