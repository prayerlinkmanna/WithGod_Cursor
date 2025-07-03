import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Heart, Clock, Users, Globe, Sparkles, Shield, ArrowRight, Star, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    activePrayers: 1247,
    prayerWarriors: 52847,
    countriesReached: 127,
    prayersAnswered: 18421,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        activePrayers: prev.activePrayers + Math.floor(Math.random() * 20),
        prayerWarriors: prev.prayerWarriors + Math.floor(Math.random() * 10),
        prayersAnswered: prev.prayersAnswered + Math.floor(Math.random() * 5),
      }));
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleRequestPrayer = () => {
    router.push('/(tabs)/requests');
  };

  const handleJoinPrayerSoldier = () => {
    router.push('/(tabs)/soldier');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradient.primary}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>🌅 Peace be with you</Text>
                <Text style={styles.title}>How shall we pray together today?</Text>
              </View>
              
              <TouchableOpacity style={styles.headerIcon}>
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary]}
                  style={styles.headerIconGradient}
                >
                  <Heart size={28} color={Colors.white} fill={Colors.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Live Stats */}
          <View style={styles.statsSection}>
            <View style={styles.sectionHeader}>
              <Globe size={24} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Global Prayer Impact</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveIndicator} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <LinearGradient
                  colors={[Colors.white, Colors.background]}
                  style={styles.statGradient}
                >
                  <View style={styles.statIconContainer}>
                    <Users size={32} color={Colors.primary} />
                  </View>
                  <Text style={styles.statNumber}>{stats.activePrayers.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Active Prayers</Text>
                  <View style={styles.statTrend}>
                    <TrendingUp size={12} color={Colors.success} />
                    <Text style={styles.statTrendText}>+12 today</Text>
                  </View>
                </LinearGradient>
              </Card>
              
              <Card style={styles.statCard}>
                <LinearGradient
                  colors={[Colors.white, Colors.background]}
                  style={styles.statGradient}
                >
                  <View style={styles.statIconContainer}>
                    <Shield size={32} color={Colors.secondary} />
                  </View>
                  <Text style={styles.statNumber}>{stats.prayerWarriors.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Prayer Warriors</Text>
                  <View style={styles.statTrend}>
                    <TrendingUp size={12} color={Colors.success} />
                    <Text style={styles.statTrendText}>+8 today</Text>
                  </View>
                </LinearGradient>
              </Card>

              <Card style={styles.statCard}>
                <LinearGradient
                  colors={[Colors.white, Colors.background]}
                  style={styles.statGradient}
                >
                  <View style={styles.statIconContainer}>
                    <Globe size={32} color={Colors.primary} />
                  </View>
                  <Text style={styles.statNumber}>{stats.countriesReached}</Text>
                  <Text style={styles.statLabel}>Countries</Text>
                  <View style={styles.statTrend}>
                    <Star size={12} color={Colors.secondary} />
                    <Text style={styles.statTrendText}>Worldwide</Text>
                  </View>
                </LinearGradient>
              </Card>

              <Card style={styles.statCard}>
                <LinearGradient
                  colors={[Colors.white, Colors.background]}
                  style={styles.statGradient}
                >
                  <View style={styles.statIconContainer}>
                    <Sparkles size={32} color={Colors.secondary} />
                  </View>
                  <Text style={styles.statNumber}>{stats.prayersAnswered.toLocaleString()}</Text>
                  <Text style={styles.statLabel}>Prayers Answered</Text>
                  <View style={styles.statTrend}>
                    <TrendingUp size={12} color={Colors.success} />
                    <Text style={styles.statTrendText}>+23 today</Text>
                  </View>
                </LinearGradient>
              </Card>
            </View>
          </View>

          {/* Main Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>🙏 Your Prayer Journey</Text>
            
            <TouchableOpacity style={styles.primaryActionCard} onPress={handleRequestPrayer}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark, '#1565C0']}
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
                colors={[Colors.secondary, '#f59e0b', '#d97706']}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <View style={styles.actionLeft}>
                    <View style={styles.actionIconContainer}>
                      <Clock size={36} color={Colors.white} />
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

          {/* Featured Prayer */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Sparkles size={24} color={Colors.secondary} />
              <Text style={styles.sectionTitle}>Today's Featured Prayer</Text>
            </View>
            
            <Card style={styles.featuredCard}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                style={styles.featuredImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.featuredOverlay}
              />
              <View style={styles.featuredContent}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredCategory}>Health & Healing</Text>
                </View>
                <Text style={styles.featuredTitle}>Pray for Global Healing</Text>
                <Text style={styles.featuredText}>
                  Join thousands in praying for healing and restoration across our world. Together, our prayers create waves of hope and divine intervention.
                </Text>
                <View style={styles.featuredStats}>
                  <View style={styles.featuredStat}>
                    <Users size={16} color={Colors.white} />
                    <Text style={styles.featuredStatText}>2.3K praying</Text>
                  </View>
                  <View style={styles.featuredStat}>
                    <Clock size={16} color={Colors.white} />
                    <Text style={styles.featuredStatText}>24h coverage</Text>
                  </View>
                </View>
                <Button
                  title="🙏 Join This Prayer"
                  onPress={() => router.push('/(tabs)/soldier')}
                  size="small"
                  style={styles.featuredButton}
                />
              </View>
            </Card>
          </View>

          {/* Daily Verse */}
          <Card style={styles.verseCard}>
            <LinearGradient
              colors={Colors.gradient.spiritual}
              style={styles.verseGradient}
            >
              <View style={styles.verseContent}>
                <View style={styles.verseIcon}>
                  <Sparkles size={28} color={Colors.primary} />
                </View>
                <Text style={styles.verseLabel}>Daily Verse</Text>
                <Text style={styles.verseText}>
                  "Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven."
                </Text>
                <Text style={styles.verseReference}>Matthew 18:19</Text>
                <View style={styles.verseActions}>
                  <TouchableOpacity style={styles.verseAction}>
                    <Heart size={16} color={Colors.primary} />
                    <Text style={styles.verseActionText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.verseAction}>
                    <Users size={16} color={Colors.primary} />
                    <Text style={styles.verseActionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </Card>

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
    padding: 24,
    paddingTop: 48,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    ...Typography.heading,
    color: Colors.text,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
  },
  headerIcon: {
    marginLeft: 20,
  },
  headerIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    color: Colors.primary,
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
});