# Sonnix - Event Companion App

Sonnix is a modern React Native mobile application designed to enhance the event experience with wallet management, QR payments, ticket management, and vendor ordering capabilities.

## 🚀 Features

### Authentication
- User registration and login
- Secure authentication flow
- Persistent login state

### Wallet Management
- View cash and token balance
- Transaction history with filtering
- Connected event tickets with QR codes
- Real-time balance updates

### Events
- Browse and search events
- Filter by category
- View detailed event information
- Purchase tickets and merchandise
- Reserve VIP tables

### Payments
- QR code payment generation
- Offline payment codes
- NFC payment support (coming soon)

### Vendor Integration
- Browse vendor menus
- Order food and drinks
- QR code order confirmation
- Real-time order tracking

### Settings
- User profile management
- Payment methods
- Notification preferences
- Terms of Use and Privacy Policy

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: React Native + Expo Vector Icons
- **State Management**: React Context API
- **QR Codes**: react-native-qrcode-svg
- **HTTP Client**: Axios (placeholder)

## 📁 Project Structure

```
SonnixApp/
├── src/
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Dashboard/
│   │   │   └── HomeScreen.js
│   │   ├── Wallet/
│   │   │   ├── WalletScreen.js
│   │   │   ├── TransactionHistoryScreen.js
│   │   │   └── TicketDetailsScreen.js
│   │   ├── Events/
│   │   │   ├── EventsScreen.js
│   │   │   ├── EventDetailsScreen.js
│   │   │   ├── MerchScreen.js
│   │   │   └── TablePurchaseScreen.js
│   │   ├── Payments/
│   │   │   ├── QrPaymentScreen.js
│   │   │   └── OfflineCodeScreen.js
│   │   ├── Vendors/
│   │   │   ├── VendorMenuScreen.js
│   │   │   └── OrderConfirmScreen.js
│   │   └── Settings/
│   │       ├── SettingsScreen.js
│   │       ├── TermsScreen.js
│   │       └── PrivacyScreen.js
│   ├── components/
│   │   ├── WalletBalanceCard.js
│   │   ├── TransactionItem.js
│   │   └── EventCard.js
│   ├── navigation/
│   │   ├── RootNavigator.js
│   │   ├── AuthNavigator.js
│   │   ├── MainNavigator.js
│   │   ├── HomeStackNavigator.js
│   │   ├── WalletStackNavigator.js
│   │   ├── EventsStackNavigator.js
│   │   └── SettingsStackNavigator.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── WalletContext.js
│   ├── services/
│   │   ├── api.js
│   │   └── dummyData.js
│   └── assets/
├── App.js
├── package.json
├── tailwind.config.js
├── babel.config.js
└── app.json
```

## 🎯 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical devices)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SonnixApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## 🎨 Design System

### Colors
- **Primary**: `#7B2CBF` (Purple)
- **Dark Background**: `#0D0D0D`
- **Card Background**: `#1A1A1A`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#9CA3AF`

### Typography
- Font family: System default (San Francisco on iOS, Roboto on Android)
- Headings: Bold, 24-32px
- Body: Regular, 14-16px
- Labels: Medium, 12-14px

## 📱 Dummy Data

The app currently uses dummy data for preview purposes:

- **User**: Melos Kuqi with $125.50 balance and 125 tokens
- **Transactions**: 6 sample transactions (income and expenses)
- **Events**: 3 sample events (Night Vibes, Summer Festival, Jazz Night)
- **Tickets**: 1 connected ticket with QR code
- **Merchandise**: 2 items (T-shirt and Hat)
- **Vendor Menu**: 6 items (drinks and food)

## 🔌 Backend Integration (To Do)

Replace placeholder API calls in `src/services/api.js` with actual backend endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /wallet/balance` - Get wallet balance
- `GET /wallet/transactions` - Get transaction history
- `GET /events` - Get all events
- `POST /tickets/purchase` - Purchase event ticket
- `POST /payments/qr` - Generate payment QR code
- `POST /orders` - Create vendor order

## 📝 Next Steps

1. Connect to actual backend API
2. Implement real payment processing
3. Add NFC payment support
4. Integrate push notifications
5. Add biometric authentication
6. Implement real-time order tracking
7. Add social features (friend requests, money sharing)
8. Implement event check-in system
9. Add analytics and crash reporting
10. Submit to App Store and Google Play

## 🧪 Testing

Currently using manual testing with dummy data. To test:

1. Launch the app
2. Login with any email/password
3. Explore all screens and features
4. Test navigation flow
5. Verify UI responsiveness

## 📄 License

Copyright © 2024 Sonnix Inc. All rights reserved.

## 👥 Team

Developed by the Sonnix Team

For questions or support, contact: support@sonnix.com

