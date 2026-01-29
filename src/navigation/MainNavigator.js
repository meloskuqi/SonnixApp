import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import WalletStackNavigator from './WalletStackNavigator';
import PaymentStackNavigator from './PaymentStackNavigator';
import EventsStackNavigator from './EventsStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'EventsTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'PayTab') {
            return null; // Custom button renders here
          } else if (route.name === 'WalletTab') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'AccountTab') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('HomeTab', { screen: 'Home' });
          },
        })}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="EventsTab"
        component={EventsStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('EventsTab', { screen: 'Events' });
          },
        })}
        options={{ tabBarLabel: 'Events' }}
      />
      <Tab.Screen
        name="PayTab"
        component={PaymentStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            // Show payment modal instead of navigating
            setShowPaymentModal(true);
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.payButtonContainer}>
              <View style={[styles.payButton, focused && styles.payButtonFocused]}>
                <Ionicons name="flash" size={32} color="white" />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="WalletTab"
        component={WalletStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('WalletTab', { screen: 'Wallet' });
          },
        })}
        options={{ tabBarLabel: 'Wallet' }}
      />
      <Tab.Screen
        name="AccountTab"
        component={SettingsStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AccountTab', { screen: 'Settings' });
          },
        })}
        options={{ tabBarLabel: 'Account' }}
      />
    </Tab.Navigator>
    <PaymentOptionsModal
      visible={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
    />
    </>
  );
};

const styles = StyleSheet.create({
  payButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: colors.background,
  },
  payButtonFocused: {
    backgroundColor: colors.primaryLight,
    transform: [{ scale: 1.1 }],
  },
});

export default MainNavigator;
