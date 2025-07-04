import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Heart, Shield, ArrowRight, BookOpen, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  /* ----------------------------- Daily Verse ----------------------------- */
  const verses = [
    {
      reference: 'Philippians 4:6',
      text:
        'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
    },
    {
      reference: 'Jeremiah 29:11',
      text:
        '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
    },
    {
      reference: 'Matthew 7:7',
      text: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.',
    },
    {
      reference: 'Psalm 34:17',
      text: 'The righteous cry out, and the Lord hears them; He delivers them from all their troubles.',
    },
  ];

  const [dailyVerse, setDailyVerse] = useState(verses[0]);

  // pick a random verse on mount
  useEffect(() => {
    const random = Math.floor(Math.random() * verses.length);
    setDailyVerse(verses[random]);
  }, []);

  // Not using pull-to-refresh at the moment, but set up for future use
  const [refreshing] = useState(false);

  const handleRequestPrayer = () => {
    router.push('/(tabs)/requests');
  };

  const handleJoinPrayerSoldier = () => {
    router.push('/(tabs)/soldier');
  };

  return (
    <View style={styles.container}>
      {/* Subtle background gradient for calm look */}
      <LinearGradient
        colors={[Colors.background, Colors.primaryLight] as any}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
        >
          {/* App Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>WithGod</Text>
            <TouchableOpacity style={styles.headerIcon}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary] as any}
                style={styles.headerIconGradient}
              >
                <Sparkles size={24} color={Colors.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Daily Verse */}
          <View style={styles.dailyVerseSection}>
            <LinearGradient
              colors={[Colors.white, Colors.lightGray] as any}
              style={styles.dailyVerseCard}
            >
              <BookOpen size={28} color={Colors.primary} style={styles.dailyVerseIcon} />
              <Text style={styles.dailyVerseText}>
                “{dailyVerse.text}”
              </Text>
              <Text style={styles.dailyVerseReference}>— {dailyVerse.reference}</Text>
            </LinearGradient>
          </View>

          {/* Main Actions */}
          <View style={styles.actionsSection}>
            {/* Spacer */}

            <TouchableOpacity style={styles.primaryActionCard} onPress={handleRequestPrayer}>
              <LinearGradient
                colors={[Colors.primaryDark, Colors.primary] as any}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <View style={styles.actionLeft}>
                    <View style={styles.actionIconContainer}>
                      <Heart size={36} color={Colors.white} fill={Colors.white} />
                    </View>
                    <View style={styles.actionText}>
                      <Text style={styles.actionTitle}>Request Prayer</Text>
                      <Text style={styles.actionDescription}>
                        Share your heart with our loving community of believers
                      </Text>
                      <View style={styles.actionStats}>
                        <Text style={styles.actionStatsText}>✨ 50K+ warriors ready to pray</Text>
                      </View>
                    </View>
                  </View>
                  <ArrowRight size={28} color={Colors.white} />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryActionCard} onPress={handleJoinPrayerSoldier}>
              <LinearGradient
                colors={['#FFC977', Colors.secondary] as any}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <View style={styles.actionLeft}>
                    <View style={styles.actionIconContainer}>
                      <Shield size={36} color={Colors.white} />
                    </View>
                    <View style={styles.actionText}>
                      <Text style={styles.actionTitle}>Join Prayer Soldier</Text>
                      <Text style={styles.actionDescription}>
                        Commit to prayer time and help maintain 24/7 global coverage
                      </Text>
                      <View style={styles.actionStats}>
                        <Text style={styles.actionStatsText}>⚡ Elite prayer force awaits</Text>
                      </View>
                    </View>
                  </View>
                  <ArrowRight size={28} color={Colors.white} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
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
    paddingHorizontal: 24,
    paddingTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    ...Typography.heading,
    color: Colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  headerIcon: {
    marginLeft: 20,
  },
  headerIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
  liveText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 10,
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
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 16,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statNumber: {
    ...Typography.heading,
    color: Colors.text,
    fontSize: 24,
    fontWeight: '800',
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
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  primaryActionCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  secondaryActionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  actionGradient: {
    padding: 24,
    borderRadius: 20,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    marginRight: 20,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    ...Typography.subheading,
    color: Colors.white,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  actionDescription: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  actionStats: {
    marginTop: 4,
  },
  actionStatsText: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  featuredSection: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  featuredCard: {
    padding: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  featuredCategory: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    ...Typography.subheading,
    color: Colors.white,
    marginBottom: 8,
    fontSize: 22,
    fontWeight: '700',
  },
  featuredText: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 24,
    fontSize: 15,
  },
  featuredStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredStatText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  featuredButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
  },
  verseCard: {
    marginHorizontal: 24,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  verseGradient: {
    padding: 28,
    borderRadius: 20,
  },
  verseContent: {
    alignItems: 'center',
  },
  verseIcon: {
    marginBottom: 12,
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
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 20,
    fontSize: 16,
  },
  verseActions: {
    flexDirection: 'row',
    gap: 24,
  },
  verseAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  verseActionText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 48,
  },
  dailyVerseSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  dailyVerseCard: {
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  dailyVerseIcon: {
    marginBottom: 12,
  },
  dailyVerseText: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 12,
  },
  dailyVerseReference: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
});