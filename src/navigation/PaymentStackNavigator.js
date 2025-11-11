import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentOptionsScreen from '../screens/Payments/PaymentOptionsScreen';
import QrPaymentScreen from '../screens/Payments/QrPaymentScreen';
import OfflineCodeScreen from '../screens/Payments/OfflineCodeScreen';
import AddFundsScreen from '../screens/Transactions/AddFundsScreen';
import SendMoneyScreen from '../screens/Transactions/SendMoneyScreen';
import RequestMoneyScreen from '../screens/Transactions/RequestMoneyScreen';
import RefundScreen from '../screens/Transactions/RefundScreen';
import VendorMenuScreen from '../screens/Vendors/VendorMenuScreen';
import OrderConfirmScreen from '../screens/Vendors/OrderConfirmScreen';
import TransactionHistoryScreen from '../screens/Wallet/TransactionHistoryScreen';

const Stack = createStackNavigator();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0D0D0D' },
      }}
    >
      <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
      <Stack.Screen name="QrPayment" component={QrPaymentScreen} />
      <Stack.Screen name="OfflineCode" component={OfflineCodeScreen} />
      <Stack.Screen name="AddFunds" component={AddFundsScreen} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="RequestMoney" component={RequestMoneyScreen} />
      <Stack.Screen name="Refund" component={RefundScreen} />
      <Stack.Screen name="VendorMenu" component={VendorMenuScreen} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;

