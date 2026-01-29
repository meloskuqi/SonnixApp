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
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dummyEvents } from '../../services/dummyData';
import EventCard from '../../components/EventCard';
import { colors, gradients, shadows } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/design';

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

  const featuredEvent = dummyEvents[0];
  const trendingEvents = dummyEvents.slice(1, 4);

  const renderHeader = () => (
    <View style={[styles.headerContainer, { paddingTop: insets.top + spacing.md }]}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.title}>Discover Events</Text>
          <Text style={styles.subtitle}>Find amazing experiences near you</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.primary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events, venues, artists..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Featured Event Banner */}
      {!searchQuery && selectedCategory === 'all' && (
        <TouchableOpacity
          style={styles.featuredBanner}
          onPress={() => navigation.navigate('EventDetails', { event: featuredEvent })}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: featuredEvent.image }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.featuredOverlay}
          >
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={14} color={colors.warning} />
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
            <View style={styles.featuredInfo}>
              <Ionicons name="calendar-outline" size={14} color={colors.white} />
              <Text style={styles.featuredInfoText}>{featuredEvent.date}</Text>
              <Ionicons name="location-outline" size={14} color={colors.white} style={styles.featuredInfoIcon} />
              <Text style={styles.featuredInfoText}>{featuredEvent.venue}</Text>
            </View>
          </LinearGradient>
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
              style={styles.categoryButton}
              activeOpacity={0.7}
            >
              <View style={[
                styles.categoryIconContainer,
                selectedCategory === item && styles.categoryIconActive
              ]}>
                <Ionicons
                  name={categoryIcons[item]}
                  size={20}
                  color={selectedCategory === item ? colors.white : colors.primary}
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
              <Ionicons name="restaurant" size={24} color={colors.softOrange} />
            </View>
            <View>
              <Text style={styles.vendorsAccessTitle}>Event Food & Drinks</Text>
              <Text style={styles.vendorsAccessSubtitle}>Order from vendors • Skip the line</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-circle" size={28} color={colors.softOrange} />
        </View>
      </TouchableOpacity>

      {/* Trending Section */}
      {!searchQuery && selectedCategory === 'all' && (
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Ionicons name="flame" size={20} color={colors.softOrange} />
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
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: event.image }}
                  style={styles.trendingImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.trendingOverlay}
                >
                  <Text style={styles.trendingTitle} numberOfLines={2}>
                    {event.title}
                  </Text>
                  <View style={styles.trendingPrice}>
                    <Ionicons name="flash" size={12} color={colors.white} />
                    <Text style={styles.trendingPriceText}>{event.price}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* All Events Header */}
      <View style={styles.allEventsHeader}>
        <View style={styles.sectionTitleWithIcon}>
          <Ionicons name="grid" size={18} color={colors.primary} />
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
            <Ionicons name="calendar-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyText}>No events found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingBottom: spacing.md,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  featuredBanner: {
    height: 200,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.large,
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
    padding: spacing.md,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.black + 'CC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    marginBottom: spacing.sm,
    gap: 4,
  },
  featuredBadgeText: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: '700',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  featuredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  featuredInfoText: {
    fontSize: 13,
    color: colors.white,
    marginLeft: 4,
    marginRight: spacing.sm,
    fontWeight: '500',
  },
  featuredInfoIcon: {
    marginLeft: spacing.sm,
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  categoryContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIconActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textTertiary,
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: colors.text,
  },
  vendorsQuickAccess: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.softOrange + '40',
    ...shadows.medium,
  },
  vendorsAccessContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
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
    backgroundColor: colors.softOrange + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  vendorsAccessTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  vendorsAccessSubtitle: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  trendingSection: {
    marginBottom: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  trendingScroll: {
    paddingHorizontal: spacing.md,
  },
  trendingCard: {
    width: 180,
    height: 240,
    marginRight: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
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
    padding: spacing.sm + 2,
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  trendingPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  trendingPriceText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  allEventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  resultCount: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  eventCardContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
});

export default EventsScreen;
