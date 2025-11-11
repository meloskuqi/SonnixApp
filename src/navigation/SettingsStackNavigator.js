import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import EditProfileScreen from '../screens/Settings/EditProfileScreen';
import SecurityScreen from '../screens/Settings/SecurityScreen';
import HelpScreen from '../screens/Settings/HelpScreen';
import LanguageScreen from '../screens/Settings/LanguageScreen';
import SupportScreen from '../screens/Settings/SupportScreen';
import RateAppScreen from '../screens/Settings/RateAppScreen';
import TermsScreen from '../screens/Settings/TermsScreen';
import PrivacyScreen from '../screens/Settings/PrivacyScreen';

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0D0D0D' },
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="RateApp" component={RateAppScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;

