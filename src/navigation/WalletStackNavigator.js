import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletScreen from '../screens/Wallet/WalletScreen';
import TransactionHistoryScreen from '../screens/Wallet/TransactionHistoryScreen';
import TicketDetailsScreen from '../screens/Wallet/TicketDetailsScreen';
import PaymentOptionsScreen from '../screens/Payments/PaymentOptionsScreen';
import AddFundsScreen from '../screens/Transactions/AddFundsScreen';
import SendMoneyScreen from '../screens/Transactions/SendMoneyScreen';
import RequestMoneyScreen from '../screens/Transactions/RequestMoneyScreen';
import RefundScreen from '../screens/Transactions/RefundScreen';
import { colors } from '../constants/colors';

const Stack = createStackNavigator();

const WalletStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
      <Stack.Screen name="AddFunds" component={AddFundsScreen} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="RequestMoney" component={RequestMoneyScreen} />
      <Stack.Screen name="Refund" component={RefundScreen} />
    </Stack.Navigator>
  );
};

export default WalletStackNavigator;

