import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { User, Bell, Heart, Shield, Settings, LogOut, Award, Calendar, Clock, Target, Star, TrendingUp, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { router } from 'expo-router';
import { usePrayerNotifications } from '@/contexts/PrayerNotificationContext';
import { useLanguage } from '@/contexts/LanguageContext';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [prayerReminders, setPrayerReminders] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { triggerTestNotification, showNotification, isPraying, startPrayer, endPrayer } = usePrayerNotifications();
  const { currentLanguage, availableLanguages, t } = useLanguage();

  const handleLogout = () => {
    Alert.alert(
      t('profile.sign_out'),
      t('profile.sign_out_confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('profile.sign_out'), onPress: () => router.replace('/login') }
      ]
    );
  };

  const handleTestNotification = () => {
    console.log('Test notification button pressed');
    
    if (isPraying) {
      Alert.alert(t('profile.currently_praying'), t('profile.currently_praying_desc'));
      return;
    }
    
    if (showNotification) {
      Alert.alert('Notification Active', 'A prayer notification is already showing. Please wait for it to finish.');
      return;
    }
    
    console.log('Triggering test notification immediately');
    triggerTestNotification();
  };

  const handleTogglePrayerState = () => {
    if (isPraying) {
      Alert.alert(
        t('prayer_session.end_session'),
        'Are you finished with your prayer time?',
        [
          { text: t('prayer_session.continue_praying'), style: 'cancel' },
          { text: t('prayer_session.end_session'), onPress: endPrayer }
        ]
      );
    } else {
      Alert.alert(
        t('profile.start_session'),
        'This will mark you as currently praying and pause notifications.',
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('profile.start_session'), onPress: startPrayer }
        ]
      );
    }
  };

  const userStats = {
    prayersSubmitted: 24,
    prayerHours: 156,
    consecutiveDays: 21,
    prayersSoldier: true,
    level: t('profile.prayer_general'),
    joinDate: 'January 2024',
    rank: t('profile.elite_warrior'),
    totalPrayers: 1247,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.header}>
            <Card style={styles.profileCard}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary, '#FFB74D']}
                style={styles.profileGradient}
              >
                <View style={styles.avatarContainer}>
                  <User size={56} color={Colors.white} />
                </View>
                <Text style={styles.name}>{t('profile.prayer_warrior')}</Text>
                <Text style={styles.email}>warrior@withgod.app</Text>
                
                <View style={styles.badges}>
                  {userStats.prayersSoldier && (
                    <View style={styles.soldierBadge}>
                      <Shield size={18} color={Colors.white} />
                      <Text style={styles.soldierText}>{t('profile.prayer_soldier')}</Text>
                    </View>
                  )}
                  
                  <View style={styles.levelBadge}>
                    <Award size={18} color={Colors.white} />
                    <Text style={styles.levelText}>{userStats.level}</Text>
                  </View>
                </View>
                
                {/* Prayer Status Indicator */}
                {isPraying && (
                  <View style={styles.prayingBadge}>
                    <Heart size={18} color={Colors.white} fill={Colors.error} />
                    <Text style={styles.prayingText}>{t('profile.currently_praying')}</Text>
                  </View>
                )}

                {/* Rank Display */}
                <View style={styles.rankContainer}>
                  <Star size={16} color={Colors.white} />
                  <Text style={styles.rankText}>{userStats.rank}</Text>
                  <Star size={16} color={Colors.white} />
                </View>
              </LinearGradient>
            </Card>
          </View>

          {/* Enhanced Stats Grid */}
          <View style={styles.statsSection}>
            <View style={styles.sectionHeader}>
              <TrendingUp size={24} color={Colors.primary} />
              <Text style={styles.sectionTitle}>{t('profile.prayer_journey')}</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <LinearGradient
                  colors={['#fff', '#f8fafc']}
                  style={styles.statGradient}
                >
                  <Heart size={28} color={Colors.primary} />
                  <Text style={styles.statNumber}>{userStats.prayersSubmitted}</Text>
                  <Text style={styles.statLabel}>{t('profile.prayer_requests')}</Text>
                  <View style={styles.statTrend}>
                    <TrendingUp size={12} color={Colors.success} />
                    <Text style={styles.statTrendText}>+3 {t('profile.this_week')}</Text>
                  </View>
                </LinearGradient>
              </Card>
              
              <Card style={styles.statCard}>
                <LinearGradient
                  colors={['#fff', '#f8fafc']}
                  style={styles.statGradient}
                >
                  <Clock size={28} color={Colors.secondary} />
                  <Text style={styles.statNumber}>{userStats.prayerHours}</Text>
                  <Text style={styles.statLabel}>{t('profile.prayer_hours')}</Text>
                  <View style={styles.statTrend}>
                    <TrendingUp size={12} color={Colors.success} />
                    <Text style={styles.statTrendText}>+12 {t('profile.this_month')}</Text>
                  </View>
                </LinearGradient>
              </Card>
              
              <Card style={styles.statCard}>
                <LinearGradient
                  colors={['#fff', '#f8fafc']}
                  style={styles.statGradient}
                >
                  <Target size={28} color={Colors.primary} />
                  <Text style={styles.statNumber}>{userStats.consecutiveDays}</Text>
                  <Text style={styles.statLabel}>{t('profile.day_streak')}</Text>
                  <View style={styles.statTrend}>
                    <Star size={12} color={Colors.secondary} />
                    <Text style={styles.statTrendText}>{t('profile.personal_best')}</Text>
                  </View>
                </LinearGradient>
              </Card>

              <Card style={styles.statCard}>
                <LinearGradient
                  colors={['#fff', '#f8fafc']}
                  style={styles.statGradient}
                >
                  <Calendar size={28} color={Colors.secondary} />
                  <Text style={styles.statNumber}>Jan</Text>
                  <Text style={styles.statLabel}>{t('profile.member_since')}</Text>
                  <View style={styles.statTrend}>
                    <Award size={12} color={Colors.primary} />
                    <Text style={styles.statTrendText}>{t('profile.founding_member')}</Text>
                  </View>
                </LinearGradient>
              </Card>
            </View>
          </View>

          {/* Language Settings */}
          <View style={styles.section}>
            <Card style={styles.settingsCard}>
              <View style={styles.sectionHeader}>
                <Globe size={24} color={Colors.primary} />
                <Text style={styles.sectionTitle}>{t('language.select_language')}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.languageButton}
                onPress={() => setShowLanguageSelector(true)}
              >
                <View style={styles.languageButtonLeft}>
                  <Text style={styles.languageFlag}>
                    {availableLanguages[currentLanguage].flag}
                  </Text>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>
                      {availableLanguages[currentLanguage].nativeName}
                    </Text>
                    <Text style={styles.languageEnglishName}>
                      {availableLanguages[currentLanguage].name}
                    </Text>
                  </View>
                </View>
                <Text style={styles.languageArrow}>›</Text>
              </TouchableOpacity>
            </Card>
          </View>

          {/* Prayer Settings */}
          <View style={styles.section}>
            <Card style={styles.settingsCard}>
              <View style={styles.sectionHeader}>
                <Settings size={24} color={Colors.primary} />
                <Text style={styles.sectionTitle}>{t('profile.prayer_settings')}</Text>
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Bell size={22} color={Colors.primary} />
                  <Text style={styles.settingLabel}>{t('profile.prayer_notifications')}</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: Colors.gray, true: Colors.primaryLight }}
                  thumbColor={notificationsEnabled ? Colors.primary : Colors.white}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Heart size={22} color={Colors.primary} />
                  <Text style={styles.settingLabel}>{t('profile.prayer_reminders')}</Text>
                </View>
                <Switch
                  value={prayerReminders}
                  onValueChange={setPrayerReminders}
                  trackColor={{ false: Colors.gray, true: Colors.primaryLight }}
                  thumbColor={prayerReminders ? Colors.primary : Colors.white}
                />
              </View>

              <View style={styles.testSection}>
                <View style={styles.testSectionHeader}>
                  <Shield size={24} color={Colors.secondary} />
                  <Text style={styles.testSectionTitle}>{t('profile.prayer_controls')}</Text>
                </View>
                
                <Button
                  title={isPraying ? t('profile.end_session') : t('profile.start_session')}
                  onPress={handleTogglePrayerState}
                  variant={isPraying ? "outline" : "secondary"}
                  style={styles.testButton}
                />
                
                <Button
                  title={t('profile.test_notification')}
                  onPress={handleTestNotification}
                  variant="outline"
                  style={styles.testButton}
                />
                
                <Text style={styles.testDescription}>
                  {isPraying 
                    ? t('profile.currently_praying_desc')
                    : t('profile.test_notification_desc')
                  }
                </Text>
              </View>
            </Card>
          </View>

          {/* Enhanced Menu Options */}
          <View style={styles.section}>
            <Card style={styles.menuCard}>
              <View style={styles.sectionHeader}>
                <User size={24} color={Colors.primary} />
                <Text style={styles.sectionTitle}>{t('profile.app_features')}</Text>
              </View>
              
              <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Coming Soon', 'Account settings will be available in the next update!')}>
                <View style={styles.menuButtonLeft}>
                  <Settings size={20} color={Colors.primary} />
                  <Text style={styles.menuButtonText}>{t('profile.account_settings')}</Text>
                </View>
                <Text style={styles.menuButtonArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Coming Soon', 'Prayer history tracking will be available soon!')}>
                <View style={styles.menuButtonLeft}>
                  <Clock size={20} color={Colors.primary} />
                  <Text style={styles.menuButtonText}>{t('profile.prayer_history')}</Text>
                </View>
                <Text style={styles.menuButtonArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Community Guidelines', 'Our community is built on love, respect, and faith. Please pray with compassion and treat all requests with confidentiality.')}>
                <View style={styles.menuButtonLeft}>
                  <Shield size={20} color={Colors.primary} />
                  <Text style={styles.menuButtonText}>{t('profile.community_guidelines')}</Text>
                </View>
                <Text style={styles.menuButtonArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Help & Support', 'Need help? Contact us at support@withgod.app or visit our FAQ section.')}>
                <View style={styles.menuButtonLeft}>
                  <Heart size={20} color={Colors.primary} />
                  <Text style={styles.menuButtonText}>{t('profile.help_support')}</Text>
                </View>
                <Text style={styles.menuButtonArrow}>›</Text>
              </TouchableOpacity>
            </Card>
          </View>

          {/* Daily Verse */}
          <Card style={styles.verseCard}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.secondaryLight, '#FFF9C4']}
              style={styles.verseGradient}
            >
              <View style={styles.verseIcon}>
                <Star size={28} color={Colors.primary} />
              </View>
              <Text style={styles.verseLabel}>{t('home.daily_verse')}</Text>
              <Text style={styles.verseText}>
                {t('profile.verse_romans')}
              </Text>
              <Text style={styles.verseReference}>{t('profile.verse_romans_ref')}</Text>
            </LinearGradient>
          </Card>

          {/* Sign Out */}
          <View style={styles.section}>
            <Button
              title={t('profile.sign_out')}
              onPress={handleLogout}
              variant="outline"
              style={styles.logoutButton}
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </View>
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  profileCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: 24,
  },
  profileGradient: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 24,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  name: {
    ...Typography.heading,
    color: Colors.white,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: '700',
  },
  email: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    fontSize: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  soldierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  soldierText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  levelText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  prayingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 12,
  },
  prayingText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  rankText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 64) / 2,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 16,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 16,
  },
  statNumber: {
    ...Typography.heading,
    color: Colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTrendText: {
    ...Typography.caption,
    color: Colors.success,
    fontSize: 11,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  settingsCard: {
    borderRadius: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  languageButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  languageEnglishName: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  languageArrow: {
    ...Typography.heading,
    color: Colors.textSecondary,
    fontSize: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  testSection: {
    marginTop: 28,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  testSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  testSectionTitle: {
    ...Typography.subheading,
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  testButton: {
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },
  testDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 22,
    fontSize: 14,
  },
  menuCard: {
    borderRadius: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuButtonText: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  menuButtonArrow: {
    ...Typography.heading,
    color: Colors.textSecondary,
    fontSize: 24,
  },
  verseCard: {
    marginHorizontal: 24,
    marginBottom: 28,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  verseGradient: {
    padding: 28,
    alignItems: 'center',
    borderRadius: 20,
  },
  verseIcon: {
    marginBottom: 16,
  },
  verseLabel: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  verseText: {
    ...Typography.body,
    color: Colors.text,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 26,
    fontSize: 17,
  },
  verseReference: {
    ...Typography.bodySmall,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  logoutButton: {
    borderColor: Colors.error,
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 16,
  },
  bottomSpacing: {
    height: 48,
  },
});