# Sonnix App - Quick Start Guide

Get the Sonnix app running in 5 minutes! ⚡

## Prerequisites Check

Before starting, verify you have:
- [ ] Node.js installed (`node --version` should show v16+)
- [ ] npm installed (`npm --version`)
- [ ] Smartphone with Expo Go app installed

Don't have these? See [SETUP.md](SETUP.md) for detailed installation instructions.

---

## 🚀 3-Step Setup

### Step 1: Install Dependencies
```bash
cd SonnixApp
npm install
```
⏱️ This takes ~2-3 minutes

### Step 2: Start the App
```bash
npm start
```
✅ Wait for QR code to appear

### Step 3: Open on Your Phone
1. Open **Expo Go** app
2. **Scan the QR code** from your terminal
3. Wait for app to load (~30 seconds)

🎉 Done! The app should now be running on your device.

---

## 🔐 Login

Use any credentials to login (it's using dummy auth):
- **Email**: test@sonnix.com
- **Password**: password

Or create a new account - both work!

---

## 🧭 Explore the App

### Main Sections (Bottom Tabs)

1. **Home** 🏠
   - View your balance
   - Quick actions (Add Funds, Send Money, etc.)
   - Feature shortcuts

2. **Wallet** 💰
   - See your transactions
   - View connected tickets
   - Access ticket QR codes

3. **Events** 🎉
   - Browse 3 sample events
   - View event details
   - Check out merchandise
   - Reserve VIP tables

4. **Settings** ⚙️
   - View account info
   - Read Terms & Privacy
   - Logout

### Try These Features

✨ **Generate a QR Payment**
1. Home → QR Payment
2. Enter amount ($10)
3. Generate QR Code

🎫 **View Your Ticket**
1. Wallet → Connected Tickets
2. Tap on "Night Vibes 2024"
3. See QR code

🍔 **Order Food**
1. Home → Vendor Menu
2. Select "Mojito"
3. Confirm order
4. View order QR code

🎪 **Browse Events**
1. Events tab
2. Try the search bar
3. Filter by category
4. View event details

---

## 💡 Tips

- **Shake your phone** to open developer menu
- **Pull down** on screens to see navigation clearly
- **All data is dummy** - nothing is saved or charged
- **Everything is clickable** - explore freely!

---

## ❓ Troubleshooting

### Can't scan QR code?
```bash
npm start -- --tunnel
```
Then scan the new QR code.

### App won't load?
1. Check internet connection
2. Verify phone and computer are on same WiFi
3. Try restarting the dev server (Ctrl+C, then `npm start`)

### Blank white screen?
1. Shake phone
2. Select "Reload"
3. If still blank, check terminal for errors

### "Module not found" error?
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

---

## 🎯 What to Test

✅ **Navigation**
- Switch between tabs
- Navigate into screens
- Use back buttons

✅ **Interactions**
- Tap all buttons
- Fill out forms
- Generate QR codes
- Adjust quantity selectors

✅ **Visual**
- Check dark theme
- Verify purple accents
- Test scrolling
- View images

---

## 📱 Demo User Profile

**Name**: Melos Kuqi  
**Balance**: $125.50  
**Tokens**: 125  
**Transactions**: 6 items  
**Tickets**: 1 connected  
**Events**: 3 available  

---

## 🐛 Found a Bug?

Great! Note it down and check:
1. Which screen it's on
2. What you did before it happened
3. Any error messages in terminal

Report to the dev team or fix it yourself!

---

## 🎨 Want to Customize?

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#7B2CBF',  // Change this!
  dark: '#0D0D0D',
  darkCard: '#1A1A1A',
}
```

### Add/Edit Dummy Data
Edit `src/services/dummyData.js`

### Modify Screens
All screens are in `src/screens/`

---

## 📚 Next Steps

Once you've explored the app:

1. **Read the docs**
   - [README.md](README.md) - Project overview
   - [SCREENS_OVERVIEW.md](SCREENS_OVERVIEW.md) - All screens
   - [SETUP.md](SETUP.md) - Detailed setup

2. **Plan backend integration**
   - Review `src/services/api.js`
   - Design API endpoints
   - Connect real authentication

3. **Customize design**
   - Add your branding
   - Adjust colors/fonts
   - Add custom assets

4. **Build features**
   - Add new screens
   - Enhance existing features
   - Integrate real data

---

## 🚢 Ready to Deploy?

When you're ready to build:

```bash
# iOS
expo build:ios

# Android  
expo build:android
```

Or use EAS Build (recommended):
```bash
npm install -g eas-cli
eas build
```

---

## 📞 Need Help?

- Check [SETUP.md](SETUP.md) for detailed instructions
- Review [Expo docs](https://docs.expo.dev/)
- Ask the team on Slack/Discord

---

## 🎉 Enjoy!

You're all set! The complete Sonnix app experience is now in your hands.

Explore, test, and build amazing features! 🚀

---

**Quick Commands Reference:**
```bash
npm start              # Start dev server
npm start -- --clear   # Clear cache and start
npm start -- --tunnel  # Use tunnel (if QR doesn't work)
npm install            # Install dependencies
```

**Login Shortcut:**
Any email/password works for testing! 🔐

