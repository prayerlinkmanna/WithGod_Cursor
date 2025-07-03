import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Globe, Check, X } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useLanguage } from '@/contexts/LanguageContext';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '@/constants/Languages';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageSelect = async (language: SupportedLanguage) => {
    await setLanguage(language);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={Colors.gradient.primary}
          style={styles.backgroundGradient}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Globe size={28} color={Colors.primary} />
              <Text style={styles.headerTitle}>{t('language.select_language')}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Language */}
        <View style={styles.currentSection}>
          <Text style={styles.currentLabel}>{t('language.current_language')}</Text>
          <View style={styles.currentLanguage}>
            <Text style={styles.currentFlag}>
              {SUPPORTED_LANGUAGES[currentLanguage].flag}
            </Text>
            <View style={styles.currentLanguageText}>
              <Text style={styles.currentLanguageName}>
                {SUPPORTED_LANGUAGES[currentLanguage].nativeName}
              </Text>
              <Text style={styles.currentLanguageEnglish}>
                {SUPPORTED_LANGUAGES[currentLanguage].name}
              </Text>
            </View>
            <Check size={20} color={Colors.success} />
          </View>
        </View>

        {/* Language List */}
        <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Available Languages</Text>
          
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, language]) => (
            <TouchableOpacity
              key={code}
              style={[
                styles.languageItem,
                currentLanguage === code && styles.selectedLanguageItem
              ]}
              onPress={() => handleLanguageSelect(code as SupportedLanguage)}
            >
              <View style={styles.languageContent}>
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <View style={styles.languageInfo}>
                  <Text style={[
                    styles.languageName,
                    currentLanguage === code && styles.selectedLanguageName
                  ]}>
                    {language.nativeName}
                  </Text>
                  <Text style={[
                    styles.languageEnglishName,
                    currentLanguage === code && styles.selectedLanguageEnglishName
                  ]}>
                    {language.name}
                  </Text>
                </View>
                {currentLanguage === code && (
                  <View style={styles.checkContainer}>
                    <Check size={20} color={Colors.white} />
                  </View>
                )}
              </View>
              
              {currentLanguage === code && (
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  style={styles.selectedGradient}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🙏 WithGod supports multiple languages to unite believers worldwide in prayer
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerTitle: {
    ...Typography.heading,
    color: Colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  currentLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  currentLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  currentLanguageText: {
    flex: 1,
  },
  currentLanguageName: {
    ...Typography.subheading,
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  currentLanguageEnglish: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  languageList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  languageItem: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedLanguageItem: {
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    zIndex: 2,
  },
  languageFlag: {
    fontSize: 28,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedLanguageName: {
    color: Colors.white,
  },
  languageEnglishName: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  selectedLanguageEnglishName: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  checkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  footerText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    fontSize: 14,
  },
});