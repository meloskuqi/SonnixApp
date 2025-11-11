# Sonnix App - Setup Instructions

This guide will help you set up and run the Sonnix app locally.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Expo Go App** (for testing on physical devices)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

## Installation Steps

### 1. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd SonnixApp
npm install
```

This will install all dependencies listed in `package.json`, including:
- React Native and Expo
- React Navigation
- NativeWind (Tailwind CSS)
- QR Code generator
- And more...

### 2. Verify Installation

Check that all packages are installed correctly:

```bash
npm list --depth=0
```

### 3. Start Development Server

Start the Expo development server:

```bash
npm start
```

Or use:
```bash
expo start
```

This will open the Expo Developer Tools in your browser.

### 4. Run the App

You have several options to run the app:

#### Option A: Physical Device (Recommended for best experience)
1. Open Expo Go app on your phone
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device

#### Option B: iOS Simulator (Mac only)
1. Press `i` in the terminal
2. Or click "Run on iOS simulator" in Expo Developer Tools
3. Requires Xcode to be installed

#### Option C: Android Emulator
1. Press `a` in the terminal
2. Or click "Run on Android device/emulator" in Expo Developer Tools
3. Requires Android Studio and an emulator to be configured

#### Option D: Web Browser (Limited functionality)
1. Press `w` in the terminal
2. Or click "Run in web browser" in Expo Developer Tools
3. Note: Some native features may not work in web

## Testing the App

### Login Screen
- Enter any email and password (e.g., `test@sonnix.com` / `password`)
- The app uses dummy authentication for now

### Explore Features
1. **Home Screen**: View balance, quick actions, and explore features
2. **Wallet**: Check transactions and connected tickets
3. **Events**: Browse events, view details, merchandise, and table reservations
4. **Settings**: View user profile and app settings

### Test Navigation
- Bottom tabs: Home, Wallet, Events, Settings
- Navigate through all screens to ensure smooth transitions
- Test back navigation and nested screens

## Common Issues & Solutions

### Issue: "Unable to resolve module"
**Solution**: Clear cache and reinstall
```bash
npm start -- --clear
# or
expo start -c
```

### Issue: "Module not found: react-native-qrcode-svg"
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### Issue: "NativeWind styles not working"
**Solution**: Ensure babel.config.js includes the NativeWind plugin
```javascript
plugins: ['nativewind/babel']
```

### Issue: Expo Go app can't connect
**Solution**: 
- Ensure phone and computer are on the same WiFi network
- Try using tunnel connection: `expo start --tunnel`

### Issue: "Invariant Violation: requireNativeComponent"
**Solution**: 
```bash
expo install react-native-gesture-handler react-native-reanimated
```

## Development Tips

### Hot Reloading
- The app supports hot reloading - changes are reflected immediately
- Press `r` in terminal to manually reload
- Press `Shift+R` to reload and clear cache

### Debugging
- Shake your device to open the developer menu
- Enable "Debug Remote JS" for Chrome DevTools debugging
- Use `console.log()` for debugging (visible in terminal)

### Code Organization
- Follow the existing folder structure in `/src`
- Keep components reusable and well-documented
- Update dummy data in `/src/services/dummyData.js` as needed

## Next Steps

Once the app is running successfully:

1. **Replace Assets**: Add actual icons and images to `/assets` directory
2. **Connect Backend**: Update API endpoints in `/src/services/api.js`
3. **Test Features**: Thoroughly test all screens and interactions
4. **Customize Theme**: Adjust colors in `tailwind.config.js`
5. **Add Features**: Extend functionality as needed

## Environment Setup (Future)

When connecting to a real backend, create a `.env` file:

```
API_BASE_URL=https://api.sonnix.com
API_KEY=your_api_key_here
```

Then install and configure:
```bash
npm install react-native-dotenv
```

## Building for Production

When ready to build for production:

### iOS (Mac only)
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

Or use EAS Build (recommended):
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## Support

For issues or questions:
- Check the [README.md](README.md) file
- Review Expo documentation: https://docs.expo.dev/
- React Navigation docs: https://reactnavigation.org/
- Contact the development team

## Project Status

✅ UI Layout Complete
✅ Navigation Flow Complete
✅ Dummy Data Implemented
⏳ Backend Integration Pending
⏳ Real Payment Processing Pending
⏳ Production Assets Pending

Happy coding! 🚀

