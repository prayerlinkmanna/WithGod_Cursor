import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface PrayerTime {
  hour: number;
  minute: number;
  label: string;
}

interface PrayerNotificationContextType {
  showNotification: boolean;
  currentPrayerMessage: string;
  isPraying: boolean;
  hideNotification: () => void;
  triggerTestNotification: () => void;
  startPrayer: () => void;
  endPrayer: () => void;
}

const PrayerNotificationContext = createContext<PrayerNotificationContextType | undefined>(undefined);

// Default prayer times
const DEFAULT_PRAYER_TIMES: PrayerTime[] = [
  { hour: 6, minute: 0, label: 'Morning Prayer' },
  { hour: 12, minute: 0, label: 'Midday Prayer' },
  { hour: 18, minute: 0, label: 'Evening Prayer' },
  { hour: 21, minute: 0, label: 'Night Prayer' },
];

export function PrayerNotificationProvider({ children }: { children: React.ReactNode }) {
  const [showNotification, setShowNotification] = useState(false);
  const [currentPrayerMessage, setCurrentPrayerMessage] = useState('');
  const [isPraying, setIsPraying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastNotificationRef = useRef<string>('');

  const checkPrayerTime = useCallback(() => {
    // Don't show notifications if user is already praying
    if (isPraying) {
      console.log('User is praying, skipping notification');
      return;
    }

    // Don't show notifications if one is already visible
    if (showNotification) {
      console.log('Notification already showing, skipping');
      return;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeKey = `${currentHour}:${currentMinute}`;

    // Avoid showing the same notification multiple times
    if (lastNotificationRef.current === currentTimeKey) {
      return;
    }

    // Check if current time matches any prayer time
    const matchingPrayer = DEFAULT_PRAYER_TIMES.find(
      prayer => prayer.hour === currentHour && prayer.minute === currentMinute
    );

    if (matchingPrayer) {
      console.log(`Triggering prayer notification for ${matchingPrayer.label}`);
      setCurrentPrayerMessage(`Time for ${matchingPrayer.label}`);
      setShowNotification(true);
      lastNotificationRef.current = currentTimeKey;
    }
  }, [isPraying, showNotification]);

  useEffect(() => {
    // Check every minute for prayer times
    intervalRef.current = setInterval(checkPrayerTime, 60000);
    
    // Check immediately on mount
    checkPrayerTime();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkPrayerTime]);

  const hideNotification = useCallback(() => {
    console.log('Hiding notification from context...');
    setShowNotification(false);
    setCurrentPrayerMessage('');
  }, []);

  const triggerTestNotification = useCallback(() => {
    console.log('Triggering test notification from context...');
    
    // Don't show test notification if user is praying
    if (isPraying) {
      console.log('User is praying, not showing test notification');
      return;
    }
    
    // Clear any existing notification first
    setShowNotification(false);
    setCurrentPrayerMessage('');
    
    // Use a small delay to ensure state is cleared
    setTimeout(() => {
      setCurrentPrayerMessage("🙏 Test Prayer Notification - May God bless you");
      setShowNotification(true);
      console.log('Test notification state set to true');
    }, 100);
  }, [isPraying]);

  const startPrayer = useCallback(() => {
    console.log('Starting prayer session...');
    setIsPraying(true);
    // Hide any active notifications when prayer starts
    if (showNotification) {
      hideNotification();
    }
  }, [showNotification, hideNotification]);

  const endPrayer = useCallback(() => {
    console.log('Ending prayer session...');
    setIsPraying(false);
  }, []);

  const value = {
    showNotification,
    currentPrayerMessage,
    isPraying,
    hideNotification,
    triggerTestNotification,
    startPrayer,
    endPrayer,
  };

  return (
    <PrayerNotificationContext.Provider value={value}>
      {children}
    </PrayerNotificationContext.Provider>
  );
}

export function usePrayerNotifications() {
  const context = useContext(PrayerNotificationContext);
  if (context === undefined) {
    throw new Error('usePrayerNotifications must be used within a PrayerNotificationProvider');
  }
  return context;
}