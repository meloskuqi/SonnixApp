import React from 'react';
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

const TicketDetailsScreen = ({ route, navigation }) => {
  const { ticket } = route.params;
  const insets = useSafeAreaInsets();

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
          <Text style={styles.title}>Ticket Details</Text>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="#7B2CBF" />
          </TouchableOpacity>
        </View>

        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <View style={styles.ticketIcon}>
              <Ionicons name="musical-notes" size={48} color="white" />
            </View>
            <Text style={styles.ticketEventTitle}>
              {ticket.eventTitle}
            </Text>
            <Text style={styles.ticketVenue}>
              {ticket.venue}
            </Text>
          </View>

          {/* Event Details */}
          <View style={styles.ticketDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{ticket.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Seat</Text>
                <Text style={styles.detailValue}>{ticket.seatNumber}</Text>
              </View>
            </View>
            <View style={styles.purchaseDateContainer}>
              <Text style={styles.detailLabel}>Purchase Date</Text>
              <Text style={styles.detailValue}>{ticket.purchaseDate}</Text>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <QRCode
              value={ticket.qrCode}
              size={200}
              backgroundColor="white"
              color="black"
            />
            <Text style={styles.qrCodeText}>
              {ticket.qrCode}
            </Text>
          </View>

          <View style={styles.infoBanner}>
            <Ionicons name="information-circle" size={24} color="#EAB308" />
            <Text style={styles.infoBannerText}>
              Show this QR code at the venue entrance for admission
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download-outline" size={20} color="#7B2CBF" />
          <Text style={styles.actionButtonText}>Download Ticket</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={20} color="#7B2CBF" />
          <Text style={styles.actionButtonText}>Add to Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="map-outline" size={20} color="#7B2CBF" />
          <Text style={styles.actionButtonText}>Get Directions</Text>
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
  ticketCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  ticketHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  ticketIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketEventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ticketVenue: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  ticketDetails: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  purchaseDateContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  qrCodeText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
    letterSpacing: 2,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#2A2616',
    borderRadius: 12,
    padding: 16,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#EAB308',
    marginLeft: 12,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B2CBF',
    marginLeft: 8,
  },
});

export default TicketDetailsScreen;
