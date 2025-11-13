import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { useWallet } from '../../context/WalletContext';

const { width } = Dimensions.get('window');

const OrderConfirmScreen = ({ route, navigation }) => {
  const { item, cart, vendor } = route.params;
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Support both single item and cart
  const isCart = !!cart;
  const orderItems = isCart ? cart : [{ ...item, quantity: 1 }];
  
  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const getTotalItems = () => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const totalPrice = calculateTotal();
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  const confirmOrder = () => {
    if (balance < totalPrice) {
      alert('Insufficient balance');
      return;
    }
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Sexy Success Header - Scrollable */}
          <LinearGradient
            colors={['#10B981', '#059669', '#047857', '#0D0D0D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            style={[styles.successHeader, { paddingTop: insets.top + 20 }]}
          >
            {/* Decorative Elements */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
            <View style={styles.decorativeCircle3} />
            
            <TouchableOpacity
              onPress={() => navigation.navigate('PayTab', { screen: 'VendorsList' })}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
            
            <View style={styles.successContent}>
              {/* Success Badge */}
              <View style={styles.successBadge}>
                <Ionicons name="flash" size={16} color="#10B981" />
                <Text style={styles.successBadgeText}>Instant</Text>
              </View>
              
              {/* Animated Icon */}
              <View style={styles.successIconWrapper}>
                <View style={styles.successIconOuter}>
                  <LinearGradient
                    colors={['#FFFFFF', '#F0FDF4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.successIconCircle}
                  >
                    <Ionicons name="checkmark" size={64} color="#10B981" />
                  </LinearGradient>
                </View>
              </View>
              
              <Text style={styles.successTitle}>Order Confirmed!</Text>
              <Text style={styles.successSubtitle}>
                Your payment was successful
              </Text>
              
              {/* Order Badge */}
              <View style={styles.orderBadge}>
                <Text style={styles.orderBadgeLabel}>Order Number</Text>
                <Text style={styles.orderBadgeNumber}>#{orderId}</Text>
              </View>
              
              {/* Success Features */}
              <View style={styles.successFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="time-outline" size={20} color="#FFFFFFCC" />
                  <Text style={styles.featureText}>5-10 min</Text>
                </View>
                <View style={styles.featureDivider} />
                <View style={styles.featureItem}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#FFFFFFCC" />
                  <Text style={styles.featureText}>Secured</Text>
                </View>
                <View style={styles.featureDivider} />
                <View style={styles.featureItem}>
                  <Ionicons name="wallet-outline" size={20} color="#FFFFFFCC" />
                  <Text style={styles.featureText}>Paid</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.scrollContent}>
          {/* QR Code Section */}
          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>Show this QR code to vendor</Text>
            <View style={styles.qrContainer}>
              <View style={styles.qrCard}>
                <QRCode
                  value={orderId}
                  size={200}
                  backgroundColor="white"
                  color="#000000"
                />
              </View>
              <Text style={styles.orderIdText}>#{orderId}</Text>
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.statusBadge}>
                <Ionicons name="time" size={14} color="#F59E0B" />
                <Text style={styles.statusText}>Pending Pickup</Text>
              </View>
            </View>

            {orderItems.map((orderItem, index) => (
              <View key={index}>
                <View style={styles.itemRow}>
                  <LinearGradient
                    colors={vendor ? [`${vendor.color}20`, `${vendor.color}10`] : ['#7B2CBF20', '#7B2CBF10']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.itemIconBox}
                  >
                    <Text style={styles.itemIconEmoji}>{orderItem.image}</Text>
                  </LinearGradient>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemNameText}>{orderItem.name}</Text>
                    <Text style={styles.itemQtyText}>{orderItem.quantity}x {orderItem.price} tokens</Text>
                  </View>
                  <Text style={styles.itemTotal}>{(orderItem.price * orderItem.quantity).toFixed(0)} tokens</Text>
                </View>
                {index < orderItems.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Total Paid</Text>
                <Text style={styles.totalSubtext}>{getTotalItems()} item{getTotalItems() > 1 ? 's' : ''}</Text>
              </View>
              <Text style={styles.totalValue}>{totalPrice.toFixed(0)} tokens</Text>
            </View>
          </View>

          {/* Instructions Banner */}
          <View style={styles.instructionsCard}>
            <View style={styles.instructionIcon}>
              <Ionicons name="information-circle" size={24} color="#3B82F6" />
            </View>
            <View style={styles.instructionContent}>
              <Text style={styles.instructionTitle}>Pickup Instructions</Text>
              <Text style={styles.instructionText}>
                Show this QR code to the vendor. Keep this screen open until you receive your items.
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <LinearGradient
            colors={vendor ? vendor.gradient : ['#7B2CBF', '#9333EA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionButton}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('PayTab', { screen: 'VendorsList' })}
              style={styles.actionButtonInner}
            >
              <Ionicons name="restaurant" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Browse Vendors</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            onPress={() => navigation.navigate('HomeTab')}
            style={styles.secondaryActionButton}
          >
            <Text style={styles.secondaryActionText}>Back to Home</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Compact Gradient Header */}
      <LinearGradient
        colors={vendor ? [...vendor.gradient, '#0D0D0D'] : ['#7B2CBF', '#9333EA', '#0D0D0D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.25 }}
        style={[styles.preOrderHeader, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.preOrderBackButton}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.preOrderTitle}>Review Order</Text>
            <Text style={styles.preOrderSubtitle}>{vendor ? vendor.name : 'Vendor'}</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.preOrderContent} showsVerticalScrollIndicator={false}>
        {/* Items List Card */}
        <View style={styles.itemDisplayCard}>
          <View style={styles.cartItemsHeader}>
            <Ionicons name="cart" size={20} color={vendor?.color || '#7B2CBF'} />
            <Text style={styles.cartItemsHeaderText}>
              {getTotalItems()} Item{getTotalItems() > 1 ? 's' : ''}
            </Text>
          </View>
          
          {orderItems.map((orderItem, index) => (
            <View key={index}>
              <View style={styles.itemCardRow}>
                <LinearGradient
                  colors={vendor ? [`${vendor.color}30`, `${vendor.color}15`] : ['#7B2CBF30', '#7B2CBF15']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.itemImageBox}
                >
                  <Text style={styles.itemDisplayEmoji}>{orderItem.image}</Text>
                </LinearGradient>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemDisplayName} numberOfLines={2}>{orderItem.name}</Text>
                  <View style={styles.itemPriceRow}>
                    <Text style={[styles.itemDisplayPrice, vendor && { color: vendor.color }]}>
                      {orderItem.quantity}x {orderItem.price} tokens
                    </Text>
                  </View>
                </View>
                <Text style={[styles.itemTotalPrice, vendor && { color: vendor.color }]}>
                  {(orderItem.price * orderItem.quantity).toFixed(0)}
                </Text>
              </View>
              {index < orderItems.length - 1 && <View style={styles.cartItemDivider} />}
            </View>
          ))}
        </View>

        {/* Payment Card */}
        <View style={styles.paymentCard}>
          {/* Payment Section */}
          <View style={styles.paymentSection}>
            <Text style={styles.sectionLabel}>Payment Summary</Text>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Your Balance</Text>
              <Text style={styles.paymentValue}>{balance.toFixed(0)} tokens</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Order Total</Text>
              <Text style={[styles.paymentValue, vendor && { color: vendor.color }]}>
                {totalPrice.toFixed(0)} tokens
              </Text>
            </View>

            <View style={styles.paymentDivider} />
            
            <View style={styles.paymentRowFinal}>
              <View>
                <Text style={styles.paymentLabelFinal}>After Payment</Text>
                <Text style={[
                  styles.paymentValueFinal,
                  balance < totalPrice && styles.insufficientFunds
                ]}>
                  {(balance - totalPrice).toFixed(0)} tokens
                </Text>
              </View>
              {balance < totalPrice ? (
                <View style={styles.warningBadge}>
                  <Ionicons name="alert-circle" size={14} color="#DC2626" />
                  <Text style={styles.warningText}>Low Balance</Text>
                </View>
              ) : (
                <View style={styles.successBadgeSmall}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                  <Text style={styles.successBadgeSmallText}>Ready</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Compact Info Banner */}
        <View style={styles.paymentInfoBanner}>
          <Ionicons name="shield-checkmark" size={18} color="#3B82F6" />
          <Text style={styles.paymentInfoText}>
            Secure instant payment with Sonnix tokens
          </Text>
        </View>
      </ScrollView>

      {/* Sleek Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceColumn}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.priceValue}>{totalPrice.toFixed(0)} tokens</Text>
          </View>
          <LinearGradient
            colors={vendor ? vendor.gradient : ['#7B2CBF', '#9333EA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.confirmBtn, balance < totalPrice && styles.confirmBtnDisabled]}
          >
            <TouchableOpacity
              onPress={confirmOrder}
              disabled={balance < totalPrice}
              style={styles.confirmBtnInner}
              activeOpacity={0.9}
            >
              <Text style={styles.confirmBtnText}>
                {balance < totalPrice ? 'Add Tokens' : 'Confirm & Pay'}
              </Text>
              <Ionicons 
                name={balance < totalPrice ? "wallet" : "arrow-forward"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
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
  // Success Screen (After Order) - Sexy & Premium
  successHeader: {
    paddingBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  // Decorative Background Circles
  decorativeCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF08',
  },
  decorativeCircle2: {
    position: 'absolute',
    top: 100,
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF05',
  },
  decorativeCircle3: {
    position: 'absolute',
    bottom: -40,
    right: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF06',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  successContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    zIndex: 1,
  },
  // Success Badge at Top
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  successBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  // Icon Styles
  successIconWrapper: {
    marginBottom: 24,
  },
  successIconOuter: {
    padding: 6,
    borderRadius: 70,
    backgroundColor: '#FFFFFF15',
  },
  successIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: '#00000030',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#FFFFFFCC',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  // Order Badge
  orderBadge: {
    backgroundColor: '#FFFFFF15',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  orderBadgeLabel: {
    fontSize: 12,
    color: '#FFFFFFAA',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  orderBadgeNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  // Success Features Row
  successFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF10',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF15',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFFCC',
    marginLeft: 6,
  },
  featureDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#FFFFFF20',
    marginHorizontal: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  // QR Section
  qrSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  qrLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 16,
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  // Summary Card
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemIconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  itemIconEmoji: {
    fontSize: 32,
  },
  itemDetails: {
    flex: 1,
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemQtyText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#10B981',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 12,
  },
  // Instructions
  instructionsCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3B82F630',
  },
  instructionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F620',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 6,
  },
  instructionText: {
    fontSize: 13,
    color: '#B0B0B0',
    lineHeight: 19,
  },
  // Action Buttons
  actionButton: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryActionButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Pre-Order Screen (COMPACT & SEXY)
  preOrderHeader: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preOrderBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  preOrderTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  preOrderSubtitle: {
    fontSize: 12,
    color: '#FFFFFFAA',
    marginTop: 2,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preOrderContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // Item Display (COMPACT HORIZONTAL)
  itemDisplayCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cartItemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  cartItemsHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cartItemDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 12,
  },
  itemPriceRow: {
    marginTop: 4,
  },
  itemTotalPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginLeft: 'auto',
  },
  itemImageBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDisplayEmoji: {
    fontSize: 42,
  },
  itemInfo: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F59E0B20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B40',
  },
  itemDisplayName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  itemDisplayCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemDisplayPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7B2CBF',
  },
  itemPriceLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Unified Payment Card
  paymentCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  // Quantity Section
  quantitySection: {
    marginBottom: 20,
  },
  quantityHeader: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  quantityBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3A3A3A',
  },
  quantityBtnDisabled: {
    opacity: 0.3,
  },
  quantityDisplay: {
    minWidth: 70,
    alignItems: 'center',
  },
  quantityNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 20,
  },
  // Payment Section
  paymentSection: {
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  paymentValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paymentDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 14,
  },
  paymentRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabelFinal: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  paymentValueFinal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#10B981',
  },
  insufficientFunds: {
    color: '#DC2626',
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DC262620',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DC262640',
  },
  warningText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  successBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#10B98120',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#10B98140',
  },
  successBadgeSmallText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  // Compact Info Banner
  paymentInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#3B82F630',
    gap: 10,
  },
  paymentInfoText: {
    fontSize: 12,
    color: '#9CA3AF',
    flex: 1,
  },
  // Sleek Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 15,
  },
  bottomBarContent: {
    gap: 12,
  },
  priceColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  confirmBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmBtnDisabled: {
    opacity: 0.5,
  },
  confirmBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default OrderConfirmScreen;
