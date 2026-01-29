import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../constants/colors';
import { spacing, borderRadius } from '../constants/design';

const EventCard = ({ event, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <View style={styles.priceBadge}>
            <Ionicons name="flash" size={12} color={colors.white} />
            <Text style={styles.priceText}>{event.price}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar" size={14} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoText}>
                {event.date} • {event.time}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location" size={14} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Venue</Text>
              <Text style={styles.infoText} numberOfLines={1}>{event.venue}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.attendeesInfo}>
            <Ionicons name="people" size={16} color={colors.success} />
            <Text style={styles.attendeesText}>120+ going</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.medium,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryBadge: {
    backgroundColor: colors.black + 'CC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    gap: 4,
  },
  priceText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  content: {
    padding: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  infoContainer: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryAlpha['15'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  infoLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  attendeesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attendeesText: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default EventCard;
