import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton, { top: insets.top + 16 }]}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.shareButton, { top: insets.top + 16 }]}>
            <Ionicons name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Event Title & Category */}
          <View style={styles.headerSection}>
            <View>
              <Text style={styles.title}>
                {event.title}
              </Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {event.category}
                </Text>
              </View>
            </View>
          </View>

          {/* Event Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar" size={24} color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Date & Time</Text>
                <Text style={styles.infoValue}>
                  {event.date} at {event.time}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="location" size={24} color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Venue</Text>
                <Text style={styles.infoValue}>
                  {event.venue}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="pricetag" size={24} color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Price</Text>
                <Text style={styles.infoValue}>
                  {event.price} tokens
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              About Event
            </Text>
            <Text style={styles.description}>
              {event.description}
            </Text>
          </View>

          {/* Quick Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickLinksGrid}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Merch', { eventId: event.id })}
                style={styles.quickLinkButton}
              >
                <Ionicons name="shirt-outline" size={28} color={colors.primary} />
                <Text style={styles.quickLinkText}>Merch</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('TablePurchase', { eventId: event.id })}
                style={styles.quickLinkButton}
              >
                <Ionicons name="restaurant-outline" size={28} color={colors.primary} />
                <Text style={styles.quickLinkText}>Tables</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buy Button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceText}>{event.price} tokens</Text>
        </View>
        <TouchableOpacity
          onPress={() => alert('Ticket purchase feature coming soon!')}
          style={styles.buyButton}
        >
          <Text style={styles.buyButtonText}>Buy Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  headerSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  infoSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textTertiary,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLinkButton: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginTop: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  buyButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default EventDetailsScreen;
