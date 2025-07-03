# WithGod Prayer App - Android Installation Guide

## 📱 How to Build and Install APK on Your Phone

### Method 1: Using EAS Build (Recommended)

1. **Install EAS CLI globally:**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to your Expo account:**
   ```bash
   eas login
   ```
   If you don't have an account, create one at [expo.dev](https://expo.dev)

3. **Configure your project:**
   ```bash
   eas build:configure
   ```

4. **Build APK for Android:**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download and Install:**
   - After build completes (usually 10-15 minutes), you'll get a download link
   - Download the APK file to your phone
   - Enable "Install from Unknown Sources" in Android settings
   - Tap the APK file to install

### Method 2: Local Development Build

1. **Install Expo CLI:**
   ```bash
   npm install -g @expo/cli
   ```

2. **Start development server:**
   ```bash
   npx expo start
   ```

3. **Install Expo Go app** on your Android phone from Google Play Store

4. **Scan QR code** from the terminal with Expo Go app

### Method 3: Export and Build Locally

1. **Export the project:**
   ```bash
   npx expo export --platform android
   ```

2. **Use Android Studio or Gradle** to build APK from the exported project

## 🔧 Prerequisites

- Node.js 18+ installed
- Expo account (free at expo.dev)
- Android phone with developer options enabled

## 📋 Installation Steps on Phone

1. **Enable Unknown Sources:**
   - Go to Settings > Security
   - Enable "Install from Unknown Sources" or "Allow from this source"

2. **Download APK:**
   - Use the download link from EAS build
   - Or transfer APK file via USB/cloud storage

3. **Install:**
   - Tap the APK file
   - Follow installation prompts
   - Grant necessary permissions

## 🚀 Features in the APK

- ✅ Complete prayer community experience
- ✅ Beautiful UI with smooth animations
- ✅ Prayer request submission and browsing
- ✅ Prayer soldier time commitment system
- ✅ Angel notification system
- ✅ Offline-capable design
- ✅ Optimized for Android performance

## 🔒 Security Note

This APK is built from source code and is safe to install. Always download from trusted sources and verify the APK if needed.

## 📞 Support

If you encounter any issues:
1. Check that your Android version is 7.0+ (API level 24+)
2. Ensure sufficient storage space (50MB+)
3. Try clearing cache and reinstalling if needed

## 🎯 Next Steps

After installation:
1. Create your prayer warrior account
2. Join the global prayer community
3. Submit prayer requests
4. Commit to prayer soldier times
5. Experience divine notifications

---

**Built with ❤️ for the global prayer community**