import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { useWallet } from '../../context/WalletContext';

const OrderConfirmScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { balance, tokens } = useWallet();
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalPrice = item.price * quantity;
  const orderId = `ORD-${Date.now()}`;

  const confirmOrder = () => {
    if (balance < totalPrice) {
      alert('Insufficient balance');
      return;
    }
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VendorMenu')}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Order Confirmed</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Success Message */}
          <View style={styles.successSection}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.successDescription}>
              Show this QR code to the vendor to collect your order
            </Text>
          </View>

          {/* Order Details Card */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderEmoji}>{item.image}</Text>
              <View style={styles.orderHeaderInfo}>
                <Text style={styles.orderItemName}>
                  {item.name}
                </Text>
                <Text style={styles.orderQuantity}>Quantity: {quantity}</Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Order ID</Text>
                <Text style={styles.orderDetailValue}>{orderId}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Total Amount</Text>
                <Text style={styles.orderDetailValue}>${totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Status</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>
                    Pending Pickup
                  </Text>
                </View>
              </View>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <QRCode
                value={`${orderId}:${item.id}:${quantity}`}
                size={200}
                backgroundColor="white"
                color="black"
              />
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.infoBanner}>
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
            <Text style={styles.infoBannerText}>
              The vendor will scan this QR code to verify and fulfill your order.
              Keep this screen open until you receive your items.
            </Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={() => navigation.navigate('VendorMenu')}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              Order More Items
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Confirm Order</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Item Details */}
        <View style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemEmoji}>{item.image}</Text>
            <Text style={styles.itemName}>
              {item.name}
            </Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemPrice}>
              ${item.price}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                <Ionicons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Balance Info */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
          </View>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Order Total</Text>
            <Text style={styles.balanceValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.balanceRowTotal}>
            <View>
              <Text style={styles.balanceTotalLabel}>Remaining Balance</Text>
              <Text style={styles.balanceTotalValue}>
                ${(balance - totalPrice).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={confirmOrder}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmButtonText}>
            Confirm & Pay ${totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
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
    paddingTop: 50,
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
  successSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
  orderCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  orderEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  orderHeaderInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  orderQuantity: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  orderDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    backgroundColor: '#EAB30820',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EAB308',
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  itemCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  itemHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  itemEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  itemCategory: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B2CBF',
  },
  quantitySection: {
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 12,
    padding: 8,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 32,
  },
  balanceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceRowTotal: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 16,
    marginTop: 8,
  },
  balanceTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  confirmButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
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
  primaryButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default OrderConfirmScreen;
