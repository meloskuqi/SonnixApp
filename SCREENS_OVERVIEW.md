# Sonnix App - Screens Overview

Complete reference guide for all screens in the Sonnix application.

## 🔐 Authentication Screens

### LoginScreen (`/src/screens/Auth/LoginScreen.js`)
- **Purpose**: User authentication entry point
- **Features**:
  - Email and password input fields
  - Show/hide password toggle
  - "Forgot Password?" link (placeholder)
  - Navigation to RegisterScreen
- **Navigation**: → HomeScreen (on success)

### RegisterScreen (`/src/screens/Auth/RegisterScreen.js`)
- **Purpose**: New user account creation
- **Features**:
  - Name, email, and password fields
  - Password confirmation
  - Show/hide password toggle
  - Navigation back to LoginScreen
- **Navigation**: → HomeScreen (on success)

---

## 🏠 Dashboard Screens

### HomeScreen (`/src/screens/Dashboard/HomeScreen.js`)
- **Purpose**: Main dashboard and app hub
- **Features**:
  - Welcome message with user name
  - Token and cash balance display card
  - Quick action buttons (Add Funds, Refund, Send, Request)
  - Feature shortcuts to other sections
  - Settings icon navigation
- **Navigation**: 
  - → EventsScreen
  - → WalletScreen
  - → QrPaymentScreen
  - → VendorMenuScreen
  - → SettingsScreen

---

## 💰 Wallet Screens

### WalletScreen (`/src/screens/Wallet/WalletScreen.js`)
- **Purpose**: Wallet overview and ticket management
- **Features**:
  - Balance card showing cash and tokens
  - Connected tickets section with QR codes
  - Recent transactions (latest 5)
  - "View All" buttons for full history
- **Navigation**:
  - → TransactionHistoryScreen
  - → TicketDetailsScreen

### TransactionHistoryScreen (`/src/screens/Wallet/TransactionHistoryScreen.js`)
- **Purpose**: Complete transaction history
- **Features**:
  - Filter buttons (All, Income, Expense)
  - Full transaction list with scrolling
  - Transaction details (type, amount, date, status)
  - Color-coded amounts (green/red)
- **Navigation**: ← Back to WalletScreen

### TicketDetailsScreen (`/src/screens/Wallet/TicketDetailsScreen.js`)
- **Purpose**: Individual ticket viewing
- **Features**:
  - Event information display
  - Large QR code for entry
  - Seat number and purchase date
  - Download ticket button (placeholder)
  - Request refund option
  - Share functionality
- **Navigation**: ← Back to WalletScreen

---

## 🎉 Events Screens

### EventsScreen (`/src/screens/Events/EventsScreen.js`)
- **Purpose**: Browse and discover events
- **Features**:
  - Search bar for event filtering
  - Category filter chips (All, Music, Festival, Jazz, Sports)
  - Event cards with images and details
  - Scrollable list of events
- **Navigation**: → EventDetailsScreen

### EventDetailsScreen (`/src/screens/Events/EventDetailsScreen.js`)
- **Purpose**: Detailed event information
- **Features**:
  - Full-screen event image
  - Event title, date, time, venue
  - Price in tokens
  - Event description
  - Links to merchandise and table reservations
  - Buy Ticket / Connect Ticket buttons
  - Share event functionality
- **Navigation**:
  - → MerchScreen
  - → TablePurchaseScreen
  - ← Back to EventsScreen

### MerchScreen (`/src/screens/Events/MerchScreen.js`)
- **Purpose**: Event merchandise shopping
- **Features**:
  - Product images and descriptions
  - Available sizes display
  - Price in tokens
  - Add to cart functionality (placeholder)
  - Shopping cart icon
- **Navigation**: ← Back to EventDetailsScreen

### TablePurchaseScreen (`/src/screens/Events/TablePurchaseScreen.js`)
- **Purpose**: VIP table reservation
- **Features**:
  - Multiple table tiers (Standard, Premium, VIP)
  - Capacity and feature lists
  - Price comparison
  - Availability indicators
  - Table selection and reservation
- **Navigation**: ← Back to EventDetailsScreen

---

## 💳 Payment Screens

### QrPaymentScreen (`/src/screens/Payments/QrPaymentScreen.js`)
- **Purpose**: Generate QR codes for payments
- **Features**:
  - Balance display
  - Amount input field
  - Quick amount selection buttons ($5, $10, $20, $50)
  - QR code generation
  - 5-minute validity timer
  - NFC placeholder notice
- **Navigation**: ← Back to HomeScreen

### OfflineCodeScreen (`/src/screens/Payments/OfflineCodeScreen.js`)
- **Purpose**: Offline payment code generation
- **Features**:
  - 6-digit one-time code generation
  - 60-second countdown timer
  - Code expiration handling
  - "How it Works" instructions
  - Offline payment explanation
  - NFC placeholder notice
- **Navigation**: ← Back to HomeScreen

---

## 🍔 Vendor Screens

### VendorMenuScreen (`/src/screens/Vendors/VendorMenuScreen.js`)
- **Purpose**: Browse and order from vendors
- **Features**:
  - Search functionality
  - Category filters (Cocktails, Beer, Food, etc.)
  - Menu items grouped by category
  - Item images (emoji), names, and prices
  - Order button for each item
- **Navigation**: → OrderConfirmScreen

### OrderConfirmScreen (`/src/screens/Vendors/OrderConfirmScreen.js`)
- **Purpose**: Order confirmation and payment
- **Features**:
  - Two states: Confirmation and Success
  - Quantity selector (+/-)
  - Balance calculation
  - Order total display
  - QR code generation on confirmation
  - Order ID and status tracking
- **Navigation**: 
  - ← Back to VendorMenuScreen
  - → HomeScreen

---

## ⚙️ Settings Screens

### SettingsScreen (`/src/screens/Settings/SettingsScreen.js`)
- **Purpose**: App settings and account management
- **Features**:
  - User profile card with balance summary
  - Grouped settings sections:
    - Account (Profile, Payment Methods, Security)
    - Preferences (Notifications, Language, Dark Mode)
    - Support (Help Center, Contact Us, Rate App)
    - Legal (Terms, Privacy, About)
  - Logout button
  - App version display
- **Navigation**:
  - → TermsScreen
  - → PrivacyScreen
  - → LoginScreen (on logout)

### TermsScreen (`/src/screens/Settings/TermsScreen.js`)
- **Purpose**: Display Terms of Use
- **Features**:
  - Scrollable terms and conditions
  - 8 sections covering:
    - Acceptance, License, Wallet, Conduct
    - Refunds, Liability, Modifications, Contact
  - Last updated date
  - Contact email
- **Navigation**: ← Back to SettingsScreen

### PrivacyScreen (`/src/screens/Settings/PrivacyScreen.js`)
- **Purpose**: Display Privacy Policy
- **Features**:
  - Comprehensive privacy information
  - 9 sections covering:
    - Introduction, Data Collection, Usage
    - Security, Sharing, Rights, Cookies
    - Children's Privacy, Policy Changes, Contact
  - Last updated date
  - Privacy contact email
- **Navigation**: ← Back to SettingsScreen

---

## 📊 Navigation Structure

```
RootNavigator
├── AuthNavigator (if not authenticated)
│   ├── LoginScreen
│   └── RegisterScreen
│
└── MainNavigator (if authenticated) - Bottom Tabs
    ├── HomeTab → HomeStackNavigator
    │   ├── HomeScreen
    │   ├── QrPaymentScreen
    │   ├── OfflineCodeScreen
    │   ├── VendorMenuScreen
    │   └── OrderConfirmScreen
    │
    ├── WalletTab → WalletStackNavigator
    │   ├── WalletScreen
    │   ├── TransactionHistoryScreen
    │   └── TicketDetailsScreen
    │
    ├── EventsTab → EventsStackNavigator
    │   ├── EventsScreen
    │   ├── EventDetailsScreen
    │   ├── MerchScreen
    │   └── TablePurchaseScreen
    │
    └── SettingsTab → SettingsStackNavigator
        ├── SettingsScreen
        ├── TermsScreen
        └── PrivacyScreen
```

---

## 🎨 Common Design Patterns

### Header Pattern
Most screens include:
- Back button (left)
- Screen title (center)
- Action button or empty space (right)

### Card Pattern
- Dark card background (#1A1A1A)
- Rounded corners (rounded-2xl)
- Padding (p-4 to p-6)
- Subtle shadow effects

### Button Patterns
1. **Primary**: Purple background (#7B2CBF), white text
2. **Secondary**: Dark card background, border, colored text
3. **Destructive**: Red background/border, red text

### Color Indicators
- **Green**: Positive transactions, success states
- **Red**: Negative transactions, destructive actions
- **Yellow**: Warnings, important notices
- **Blue**: Information, tips
- **Purple**: Primary actions, highlights

---

## 🔄 User Flows

### Purchase Flow
1. HomeScreen → EventsScreen
2. Select Event → EventDetailsScreen
3. Click "Buy Ticket" → (Payment processing)
4. View in WalletScreen → TicketDetailsScreen

### Payment Flow
1. HomeScreen → QrPaymentScreen
2. Enter amount → Generate QR
3. Show to vendor → Payment complete

### Vendor Order Flow
1. HomeScreen → VendorMenuScreen
2. Select item → OrderConfirmScreen
3. Adjust quantity → Confirm & Pay
4. Show QR to vendor → Order complete

---

## 📱 Screen Sizes & Responsiveness

All screens are designed to be responsive and work on:
- iPhone (various sizes)
- Android phones (various sizes)
- Tablets (basic support)

Key responsive features:
- ScrollView for content overflow
- Flexible layouts with flex-row/flex-col
- Percentage-based widths where appropriate
- Safe area handling for notches

---

## 🚀 Future Screen Additions

Planned screens for future versions:
- Profile editing screen
- Payment method management
- Friend list and social features
- Transaction details modal
- Push notification settings
- Event check-in screen
- Venue map screen
- Live event feed

---

## 📝 Notes for Developers

- All screens use NativeWind (Tailwind CSS) for styling
- Navigation handled via React Navigation
- State managed through Context API
- All API calls are currently dummy functions
- Replace placeholders with real implementations before production

