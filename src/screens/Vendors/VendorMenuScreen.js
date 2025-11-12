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
  const [cart, setCart] = useState([]);

  // Cart functions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    if (cart.length > 0) {
      navigation.navigate('OrderConfirm', { cart, vendor });
    }
  };

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
          {filteredItems.map((item) => {
            const cartItem = cart.find(c => c.id === item.id);
            const inCart = !!cartItem;
            
            return (
              <View key={item.id} style={styles.menuCard}>
                <View style={styles.menuCardTop}>
                  <LinearGradient
                    colors={[`${vendor.color}20`, `${vendor.color}10`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.itemImageContainer}
                  >
                    <Text style={styles.itemEmoji}>{item.image}</Text>
                  </LinearGradient>
                  {inCart && (
                    <View style={[styles.cartBadge, { backgroundColor: vendor.color }]}>
                      <Text style={styles.cartBadgeText}>{cartItem.quantity}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.menuCardBottom}>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <View style={styles.itemFooter}>
                    <Text style={[styles.itemPrice, { color: vendor.color }]}>{item.price} tokens</Text>
                    {inCart ? (
                      <View style={styles.cartControls}>
                        <TouchableOpacity
                          onPress={() => removeFromCart(item.id)}
                          style={[styles.cartControlButton, { backgroundColor: `${vendor.color}20` }]}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="remove" size={14} color={vendor.color} />
                        </TouchableOpacity>
                        <Text style={styles.cartQuantity}>{cartItem.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => addToCart(item)}
                          style={[styles.cartControlButton, { backgroundColor: `${vendor.color}20` }]}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="add" size={14} color={vendor.color} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => addToCart(item)}
                        style={[styles.addButton, { backgroundColor: `${vendor.color}20` }]}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="add" size={16} color={vendor.color} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
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

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <View style={styles.floatingCartContainer}>
          <LinearGradient
            colors={vendor.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.floatingCart}
          >
            <TouchableOpacity
              onPress={proceedToCheckout}
              style={styles.floatingCartButton}
              activeOpacity={0.9}
            >
              <View style={styles.cartInfo}>
                <View style={styles.cartCountBadge}>
                  <Ionicons name="cart" size={20} color="#FFFFFF" />
                  <View style={styles.cartCountCircle}>
                    <Text style={styles.cartCountText}>{getCartItemCount()}</Text>
                  </View>
                </View>
                <Text style={styles.cartLabel}>View Cart</Text>
              </View>
              <View style={styles.cartTotal}>
                <Text style={styles.cartTotalLabel}>Total</Text>
                <View style={styles.cartTotalRow}>
                  <Text style={styles.cartTotalAmount}>{getCartTotal()}</Text>
                  <Text style={styles.cartTotalTokens}>tokens</Text>
                </View>
              </View>
              <View style={styles.cartArrow}>
                <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
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
    gap: 12,
    marginBottom: 20,
  },
  menuCard: {
    width: (width - 52) / 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    marginBottom: 4,
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
    padding: 14,
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
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    flex: 1,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  cartControlButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQuantity: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  // Floating Cart
  floatingCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  floatingCart: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  floatingCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartCountBadge: {
    position: 'relative',
  },
  cartCountCircle: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#7B2CBF',
  },
  cartLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cartTotal: {
    alignItems: 'center',
  },
  cartTotalLabel: {
    fontSize: 11,
    color: '#FFFFFFCC',
    marginBottom: 2,
  },
  cartTotalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  cartTotalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cartTotalTokens: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFFCC',
  },
  cartArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF20',
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
