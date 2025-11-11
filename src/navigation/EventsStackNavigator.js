import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventsScreen from '../screens/Events/EventsScreen';
import EventDetailsScreen from '../screens/Events/EventDetailsScreen';
import MerchScreen from '../screens/Events/MerchScreen';
import TablePurchaseScreen from '../screens/Events/TablePurchaseScreen';

const Stack = createStackNavigator();

const EventsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0D0D0D' },
      }}
    >
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Merch" component={MerchScreen} />
      <Stack.Screen name="TablePurchase" component={TablePurchaseScreen} />
    </Stack.Navigator>
  );
};

export default EventsStackNavigator;

