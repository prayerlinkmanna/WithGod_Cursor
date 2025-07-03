import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import {
  LibreBaskerville_400Regular,
  LibreBaskerville_700Bold
} from '@expo-google-fonts/libre-baskerville';
import * as SplashScreen from 'expo-splash-screen';
import AngelNotification from '@/components/ui/AngelNotification';
import { PrayerNotificationProvider, usePrayerNotifications } from '@/contexts/PrayerNotificationContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { router } from 'expo-router';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { showNotification, currentPrayerMessage, hideNotification, startPrayer } = usePrayerNotifications();

  const handleBeginPrayer = () => {
    console.log('Begin prayer from notification');
    startPrayer();
    router.push('/prayer-session');
  };

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="prayer-session" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      
      {/* Angel Prayer Notification */}
      <AngelNotification
        visible={showNotification}
        message={currentPrayerMessage}
        onComplete={hideNotification}
        onBeginPrayer={handleBeginPrayer}
      />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-Bold': Roboto_700Bold,
    'LibreBaskerville-Regular': LibreBaskerville_400Regular,
    'LibreBaskerville-Bold': LibreBaskerville_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LanguageProvider>
      <PrayerNotificationProvider>
        <AppContent />
      </PrayerNotificationProvider>
    </LanguageProvider>
  );
}