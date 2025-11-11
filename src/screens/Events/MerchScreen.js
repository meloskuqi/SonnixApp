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
import { dummyMerch } from '../../services/dummyData';

const MerchScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 16 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Merchandise</Text>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="#7B2CBF" />
          </TouchableOpacity>
        </View>

        {/* Merch Items */}
        <View style={styles.merchList}>
          {dummyMerch.map((item) => (
            <View
              key={item.id}
              style={styles.merchCard}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.merchImage}
                resizeMode="cover"
              />
              <View style={styles.merchInfo}>
                <Text style={styles.merchName}>
                  {item.name}
                </Text>
                <Text style={styles.merchDescription}>
                  {item.description}
                </Text>

                {/* Sizes */}
                <View style={styles.sizesContainer}>
                  <Text style={styles.sizesLabel}>Sizes:</Text>
                  <View style={styles.sizesRow}>
                    {item.sizes.map((size, index) => (
                      <View
                        key={index}
                        style={styles.sizeButton}
                      >
                        <Text style={styles.sizeText}>{size}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Price & Buy Button */}
                <View style={styles.actionRow}>
                  <View>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.priceAmount}>
                      {item.price} tokens
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => alert('Purchase feature coming soon!')}
                    style={styles.addToCartButton}
                  >
                    <Text style={styles.addToCartText}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={24} color="#3B82F6" />
          <Text style={styles.infoBannerText}>
            All merchandise will be available for pickup at the event venue or shipped to your address.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  merchList: {
    marginBottom: 20,
  },
  merchCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  merchImage: {
    width: '100%',
    height: 200,
  },
  merchInfo: {
    padding: 16,
  },
  merchName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  merchDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
    lineHeight: 20,
  },
  sizesContainer: {
    marginBottom: 16,
  },
  sizesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sizesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeButton: {
    backgroundColor: '#252525',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B2CBF',
  },
  addToCartButton: {
    backgroundColor: '#7B2CBF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A2A3A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoBannerText: {
    flex: 1,
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default MerchScreen;
