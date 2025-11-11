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

const TablePurchaseScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [selectedTable, setSelectedTable] = useState(null);
  const insets = useSafeAreaInsets();

  const tables = [
    {
      id: 1,
      name: 'Standard Table',
      capacity: 4,
      price: 100,
      features: ['4 seats', 'Standard view', 'Table service'],
      available: 5,
    },
    {
      id: 2,
      name: 'Premium Table',
      capacity: 6,
      price: 200,
      features: ['6 seats', 'Great view', 'Priority service', 'Bottle service'],
      available: 3,
    },
    {
      id: 3,
      name: 'VIP Table',
      capacity: 8,
      price: 350,
      features: ['8 seats', 'Best view', 'VIP service', 'Bottle service', 'Meet & Greet'],
      available: 2,
    },
  ];

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
          <Text style={styles.headerTitle}>Reserve a Table</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="star" size={24} color="#7B2CBF" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>VIP Experience</Text>
            <Text style={styles.infoDescription}>
              Reserve a table for the ultimate event experience with your friends.
            </Text>
          </View>
        </View>

        {/* Table Options */}
        <View style={styles.tablesContainer}>
          {tables.map((table) => (
            <TouchableOpacity
              key={table.id}
              onPress={() => setSelectedTable(table.id)}
              style={[
                styles.tableCard,
                selectedTable === table.id && styles.tableCardSelected,
              ]}
            >
              <View style={styles.tableHeader}>
                <View style={styles.tableInfo}>
                  <Text style={styles.tableName}>
                    {table.name}
                  </Text>
                  <View style={styles.tableDetail}>
                    <Ionicons name="people" size={16} color="#7B2CBF" />
                    <Text style={styles.tableDetailText}>
                      Up to {table.capacity} people
                    </Text>
                  </View>
                  <View style={styles.tableDetail}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text style={styles.tableDetailText}>
                      {table.available} tables available
                    </Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    {table.price}
                  </Text>
                  <Text style={styles.priceLabel}>tokens</Text>
                </View>
              </View>

              {/* Features */}
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresTitle}>Includes:</Text>
                {table.features.map((feature, index) => (
                  <View key={index} style={styles.feature}>
                    <Ionicons name="checkmark" size={16} color="#7B2CBF" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {selectedTable === table.id && (
                <View style={styles.reserveButtonContainer}>
                  <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={() => alert('Table reservation feature coming soon!')}
                  >
                    <Text style={styles.reserveButtonText}>
                      Reserve Now
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Ionicons name="information-circle" size={24} color="#EAB308" />
          <Text style={styles.additionalInfoText}>
            Table reservations are subject to availability. Early booking recommended for VIP tables.
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tablesContainer: {
    marginBottom: 24,
  },
  tableCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tableCardSelected: {
    borderColor: '#7B2CBF',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tableInfo: {
    flex: 1,
  },
  tableName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tableDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tableDetailText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B2CBF',
  },
  priceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  featuresContainer: {
    marginTop: 12,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  featureText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  reserveButtonContainer: {
    marginTop: 16,
  },
  reserveButton: {
    backgroundColor: '#7B2CBF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  additionalInfo: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 12,
    flex: 1,
  },
});

export default TablePurchaseScreen;
