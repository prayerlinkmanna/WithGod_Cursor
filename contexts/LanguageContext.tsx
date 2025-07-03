import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportedLanguage, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/constants/Languages';

// Import translation files
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import te from '@/locales/te.json';
import ta from '@/locales/ta.json';
import kn from '@/locales/kn.json';
import ml from '@/locales/ml.json';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
  availableLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'withgod_selected_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [i18n] = useState(() => {
    const i18nInstance = new I18n({
      en,
      hi,
      te,
      ta,
      kn,
      ml,
    });

    // Set default locale
    i18nInstance.defaultLocale = DEFAULT_LANGUAGE;
    i18nInstance.locale = DEFAULT_LANGUAGE;
    i18nInstance.enableFallback = true;

    return i18nInstance;
  });

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  useEffect(() => {
    i18n.locale = currentLanguage;
  }, [currentLanguage, i18n]);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && savedLanguage in SUPPORTED_LANGUAGES) {
        setCurrentLanguage(savedLanguage as SupportedLanguage);
      } else {
        // Auto-detect language based on device locale
        const deviceLocale = Localization.locale;
        const detectedLanguage = detectLanguageFromLocale(deviceLocale);
        setCurrentLanguage(detectedLanguage);
      }
    } catch (error) {
      console.log('Error loading saved language:', error);
    }
  };

  const detectLanguageFromLocale = (locale: string): SupportedLanguage => {
    // Extract language code from locale (e.g., 'hi-IN' -> 'hi')
    const languageCode = locale.split('-')[0].toLowerCase();
    
    // Map common locale codes to our supported languages
    const languageMap: Record<string, SupportedLanguage> = {
      'hi': 'hi',
      'te': 'te',
      'ta': 'ta',
      'kn': 'kn',
      'ml': 'ml',
      'en': 'en',
    };

    return languageMap[languageCode] || DEFAULT_LANGUAGE;
  };

  const setLanguage = async (language: SupportedLanguage) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      setCurrentLanguage(language);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const t = (key: string, options?: any) => {
    return i18n.t(key, options);
  };

  const isRTL = SUPPORTED_LANGUAGES[currentLanguage].rtl;

  const value = {
    currentLanguage,
    setLanguage,
    t,
    isRTL,
    availableLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}