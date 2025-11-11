# Sonnix App - Complete File Structure

```
SonnixApp/
│
├── 📱 App.js                          # Main entry point
│
├── 📋 Configuration Files
│   ├── package.json                   # Dependencies and scripts
│   ├── app.json                       # Expo configuration
│   ├── babel.config.js                # Babel + NativeWind config
│   ├── tailwind.config.js             # Tailwind CSS config
│   └── .gitignore                     # Git exclusions
│
├── 📚 Documentation
│   ├── README.md                      # Project overview
│   ├── SETUP.md                       # Detailed setup guide
│   ├── QUICKSTART.md                  # 5-minute quick start
│   ├── SCREENS_OVERVIEW.md            # All screens reference
│   ├── PROJECT_SUMMARY.md             # Build summary
│   ├── PROJECT_CHECKLIST.md           # Completion checklist
│   └── STRUCTURE.md                   # This file
│
├── 🎨 assets/
│   └── README.md                      # Asset guidelines
│
└── 📂 src/
    │
    ├── 🧩 components/                 # Reusable UI components
    │   ├── WalletBalanceCard.js       # Balance display card
    │   ├── TransactionItem.js         # Transaction list item
    │   └── EventCard.js               # Event listing card
    │
    ├── 🔐 context/                    # State management
    │   ├── AuthContext.js             # Authentication state
    │   └── WalletContext.js           # Wallet & transactions state
    │
    ├── 🧭 navigation/                 # Navigation structure
    │   ├── RootNavigator.js           # Main router
    │   ├── AuthNavigator.js           # Auth flow (Login/Register)
    │   ├── MainNavigator.js           # Bottom tabs
    │   ├── HomeStackNavigator.js      # Home stack
    │   ├── WalletStackNavigator.js    # Wallet stack
    │   ├── EventsStackNavigator.js    # Events stack
    │   └── SettingsStackNavigator.js  # Settings stack
    │
    ├── 📱 screens/
    │   │
    │   ├── Auth/                      # Authentication screens
    │   │   ├── LoginScreen.js         # Email/password login
    │   │   └── RegisterScreen.js      # User registration
    │   │
    │   ├── Dashboard/                 # Main dashboard
    │   │   └── HomeScreen.js          # Home hub
    │   │
    │   ├── Wallet/                    # Wallet management
    │   │   ├── WalletScreen.js        # Wallet overview
    │   │   ├── TransactionHistoryScreen.js  # Full transaction list
    │   │   └── TicketDetailsScreen.js       # Ticket with QR code
    │   │
    │   ├── Events/                    # Event discovery
    │   │   ├── EventsScreen.js        # Event browsing
    │   │   ├── EventDetailsScreen.js  # Event details
    │   │   ├── MerchScreen.js         # Merchandise shop
    │   │   └── TablePurchaseScreen.js # VIP table reservations
    │   │
    │   ├── Payments/                  # Payment features
    │   │   ├── QrPaymentScreen.js     # QR code payments
    │   │   └── OfflineCodeScreen.js   # 6-digit offline codes
    │   │
    │   ├── Vendors/                   # Vendor ordering
    │   │   ├── VendorMenuScreen.js    # Menu browsing
    │   │   └── OrderConfirmScreen.js  # Order confirmation
    │   │
    │   └── Settings/                  # App settings
    │       ├── SettingsScreen.js      # Settings hub
    │       ├── TermsScreen.js         # Terms of Use
    │       └── PrivacyScreen.js       # Privacy Policy
    │
    └── 🔧 services/                   # Service layer
        ├── api.js                     # API service (placeholder)
        └── dummyData.js               # Dummy data for preview
```

---

## 📊 File Count Summary

| Category | Files | Description |
|----------|-------|-------------|
| **Configuration** | 5 | Core setup files |
| **Documentation** | 7 | Guides and references |
| **Components** | 3 | Reusable UI components |
| **Context** | 2 | State management |
| **Navigation** | 7 | Navigation structure |
| **Screens** | 17 | All app screens |
| **Services** | 2 | API and data layer |
| **Entry Point** | 1 | App.js |
| **Assets** | 1 | Asset guidelines |
| **TOTAL** | **45** | Complete files |

---

## 🎯 Screen Distribution

```
Authentication (2)
├── LoginScreen
└── RegisterScreen

Dashboard (1)
└── HomeScreen

Wallet (3)
├── WalletScreen
├── TransactionHistoryScreen
└── TicketDetailsScreen

Events (4)
├── EventsScreen
├── EventDetailsScreen
├── MerchScreen
└── TablePurchaseScreen

Payments (2)
├── QrPaymentScreen
└── OfflineCodeScreen

Vendors (2)
├── VendorMenuScreen
└── OrderConfirmScreen

Settings (3)
├── SettingsScreen
├── TermsScreen
└── PrivacyScreen

TOTAL: 17 Screens
```

---

## 🔗 Navigation Flow

```
App.js
  └── RootNavigator
      │
      ├── [Not Authenticated]
      │   └── AuthNavigator (Stack)
      │       ├── LoginScreen
      │       └── RegisterScreen
      │
      └── [Authenticated]
          └── MainNavigator (Bottom Tabs)
              │
              ├── 🏠 HomeTab → HomeStackNavigator
              │   ├── HomeScreen
              │   ├── QrPaymentScreen
              │   ├── OfflineCodeScreen
              │   ├── VendorMenuScreen
              │   └── OrderConfirmScreen
              │
              ├── 💰 WalletTab → WalletStackNavigator
              │   ├── WalletScreen
              │   ├── TransactionHistoryScreen
              │   └── TicketDetailsScreen
              │
              ├── 🎉 EventsTab → EventsStackNavigator
              │   ├── EventsScreen
              │   ├── EventDetailsScreen
              │   ├── MerchScreen
              │   └── TablePurchaseScreen
              │
              └── ⚙️ SettingsTab → SettingsStackNavigator
                  ├── SettingsScreen
                  ├── TermsScreen
                  └── PrivacyScreen
```

---

## 🎨 Component Hierarchy

```
App.js
├── SafeAreaProvider
├── AuthProvider (Context)
├── WalletProvider (Context)
└── RootNavigator
    └── NavigationContainer
        └── Screens
            └── Components
                ├── WalletBalanceCard
                ├── TransactionItem
                └── EventCard
```

---

## 📦 Dependencies Tree

```
React Native (Expo)
├── Navigation
│   ├── @react-navigation/native
│   ├── @react-navigation/stack
│   ├── @react-navigation/bottom-tabs
│   ├── react-native-screens
│   ├── react-native-safe-area-context
│   └── react-native-gesture-handler
│
├── Styling
│   ├── nativewind
│   ├── tailwindcss
│   └── @expo/vector-icons
│
├── UI Components
│   ├── react-native-svg
│   ├── react-native-qrcode-svg
│   └── expo-linear-gradient
│
└── Utilities
    ├── axios
    └── expo-status-bar
```

---

## 🗂️ Code Organization Principles

### 1. Feature-Based Structure
Screens organized by feature (Auth, Wallet, Events, etc.)

### 2. Separation of Concerns
- **Screens**: UI and user interaction
- **Components**: Reusable UI pieces
- **Context**: Global state management
- **Services**: API calls and data
- **Navigation**: Routing logic

### 3. Consistent Naming
- Screens: `*Screen.js`
- Navigators: `*Navigator.js`
- Components: PascalCase
- Context: `*Context.js`

### 4. Clear Dependencies
- Screens import from components
- Screens use context via hooks
- Navigation files are self-contained
- Services are independent

---

## 📍 Key File Locations

### Need to modify...

**Colors/Theme?**
→ `tailwind.config.js`

**Dummy Data?**
→ `src/services/dummyData.js`

**API Endpoints?**
→ `src/services/api.js`

**A Specific Screen?**
→ `src/screens/[Category]/[ScreenName].js`

**Navigation Flow?**
→ `src/navigation/*Navigator.js`

**Global State?**
→ `src/context/*Context.js`

**Reusable Component?**
→ `src/components/[ComponentName].js`

**App Configuration?**
→ `app.json` or `package.json`

---

## 🔍 Quick File Finder

```bash
# Find a screen
src/screens/[Category]/[Name]Screen.js

# Find navigation
src/navigation/[Name]Navigator.js

# Find component
src/components/[Name].js

# Find context
src/context/[Name]Context.js

# Find service
src/services/[name].js

# Find docs
[NAME].md (root directory)
```

---

## 📝 File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Screen | `[Name]Screen.js` | `LoginScreen.js` |
| Component | `[Name].js` | `EventCard.js` |
| Navigator | `[Name]Navigator.js` | `AuthNavigator.js` |
| Context | `[Name]Context.js` | `AuthContext.js` |
| Service | `[name].js` | `api.js` |
| Config | `[name].config.js` | `tailwind.config.js` |
| Doc | `[NAME].md` | `README.md` |

---

## 🎯 Structure Benefits

✅ **Easy to Navigate**: Clear folder hierarchy
✅ **Scalable**: Easy to add new features
✅ **Maintainable**: Consistent organization
✅ **Modular**: Independent, reusable pieces
✅ **Professional**: Industry-standard structure
✅ **Team-Friendly**: Easy onboarding for new devs

---

## 🚀 Getting Started with This Structure

1. **Find the screen you want to edit**
   → Navigate to `src/screens/[Category]/`

2. **Need to change dummy data?**
   → Edit `src/services/dummyData.js`

3. **Want to modify navigation?**
   → Check `src/navigation/`

4. **Adding a new feature?**
   → Create new folder in `src/screens/`
   → Add to appropriate navigator

5. **Need documentation?**
   → Check root `.md` files

---

## 💡 Tips

- **Use VS Code search** (Ctrl+P) to quickly find files
- **Follow existing patterns** when adding new features
- **Keep components small** and focused
- **Document as you go** inline with comments
- **Test in both iOS and Android** for consistency

---

**This structure is production-ready and follows React Native best practices!** 🎉

