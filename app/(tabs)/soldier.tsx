import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { Clock, Shield, Users, Play, Star, Heart, CircleCheck as CheckCircle, Sword, Target, Globe } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { usePrayerNotifications } from '@/contexts/PrayerNotificationContext';

const { width } = Dimensions.get('window');

export default function SoldierScreen() {
  const { startPrayer } = usePrayerNotifications();
  const [selectedTime, setSelectedTime] = useState('');
  const [isCommitted, setIsCommitted] = useState(false);
  const [nextPrayerTime, setNextPrayerTime] = useState('');
  const [currentPrayers, setCurrentPrayers] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching current prayer requests
    setCurrentPrayers([
      { 
        id: 1, 
        category: 'Health & Healing', 
        preview: 'Please pray for my mother\'s recovery from surgery. She needs divine strength and healing...', 
        urgent: true,
        submittedBy: 'Sarah M.',
        timeAgo: '2 hours ago',
        prayerCount: 247
      },
      { 
        id: 2, 
        category: 'Job Opportunities', 
        preview: 'Seeking God\'s guidance for career direction after months of searching for employment...', 
        urgent: false,
        submittedBy: 'Michael R.',
        timeAgo: '5 hours ago',
        prayerCount: 156
      },
      { 
        id: 3, 
        category: 'Spiritual Growth', 
        preview: 'Pray for strength in my faith journey during this difficult season of doubt and questioning...', 
        urgent: false,
        submittedBy: 'Anonymous',
        timeAgo: '1 day ago',
        prayerCount: 89
      },
      { 
        id: 4, 
        category: 'Marriage & Relationships', 
        preview: 'Please pray for healing and restoration in my marriage. We need God\'s wisdom and grace...', 
        urgent: true,
        submittedBy: 'Jennifer L.',
        timeAgo: '3 hours ago',
        prayerCount: 312
      },
    ]);
  }, []);

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
  ];

  const handleTimeCommitment = (time: string) => {
    Alert.alert(
      'Join the Elite Prayer Force 🛡️',
      `Commit to pray at ${time} daily and become part of our sacred 24/7 prayer coverage army?`,
      [
        { text: 'Not Yet', style: 'cancel' },
        { text: 'Yes, I Commit!', onPress: () => {
          setSelectedTime(time);
          setIsCommitted(true);
          setNextPrayerTime(time);
        }}
      ]
    );
  };

  const handlePrayNow = () => {
    Alert.alert(
      'Begin Sacred Prayer Mission 🙏',
      'Start your prayer time with the current prayer requests from our global community?',
      [
        { text: 'Not Now', style: 'cancel' },
        { 
          text: 'Begin Mission', 
          onPress: () => {
            startPrayer();
            router.push('/prayer-session');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fef3c7', '#fde68a', '#f59e0b', '#d97706']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIconContainer}>
              <LinearGradient
                colors={[Colors.secondary, '#f59e0b', '#d97706']}
                style={styles.headerIcon}
              >
                <Shield size={40} color={Colors.white} fill={Colors.white} />
              </LinearGradient>
              <View style={styles.headerGlow}>
                <LinearGradient
                  colors={['rgba(245, 158, 11, 0.4)', 'transparent']}
                  style={styles.glowCircle}
                />
              </View>
            </View>
            
            <Text style={styles.title}>Prayer Soldier</Text>
            <Text style={styles.subtitle}>
              Join the elite 24/7 prayer coverage army
            </Text>
            
            {/* Elite Stats */}
            <View style={styles.headerStats}>
              <View style={styles.headerStat}>
                <Sword size={20} color={Colors.white} />
                <Text style={styles.headerStatNumber}>1,247</Text>
                <Text style={styles.headerStatLabel}>Active Soldiers</Text>
              </View>
              <View style={styles.headerStat}>
                <Target size={20} color={Colors.white} />
                <Text style={styles.headerStatNumber}>24/7</Text>
                <Text style={styles.headerStatLabel}>Coverage</Text>
              </View>
              <View style={styles.headerStat}>
                <Globe size={20} color={Colors.white} />
                <Text style={styles.headerStatNumber}>127</Text>
                <Text style={styles.headerStatLabel}>Countries</Text>
              </View>
            </View>
          </View>

          {/* Commitment Status */}
          {isCommitted && (
            <Card style={styles.commitmentCard}>
              <LinearGradient
                colors={[Colors.success, '#22c55e', '#16a34a']}
                style={styles.commitmentGradient}
              >
                <View style={styles.commitmentIcon}>
                  <CheckCircle size={40} color={Colors.white} />
                </View>
                <Text style={styles.commitmentTitle}>Your Next Prayer Mission</Text>
                <Text style={styles.commitmentTime}>{nextPrayerTime}</Text>
                <Text style={styles.commitmentSubtext}>
                  You're committed to daily prayer at this sacred time
                </Text>
                <View style={styles.commitmentStats}>
                  <View style={styles.commitmentStat}>
                    <Users size={16} color={Colors.white} />
                    <Text style={styles.commitmentStatText}>Elite Force Member</Text>
                  </View>
                  <View style={styles.commitmentStat}>
                    <Star size={16} color={Colors.white} />
                    <Text style={styles.commitmentStatText}>Prayer Warrior</Text>
                  </View>
                </View>
                <Button
                  title="⚔️ Begin Prayer Mission"
                  onPress={handlePrayNow}
                  variant="outline"
                  style={styles.prayNowButton}
                  textStyle={{ color: Colors.white }}
                />
              </LinearGradient>
            </Card>
          )}

          {/* Time Commitment */}
          <Card style={styles.timeCard}>
            <View style={styles.sectionHeader}>
              <Clock size={28} color={Colors.secondary} />
              <Text style={styles.sectionTitle}>Choose Your Prayer Time</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Commit to daily prayer (minimum 2 minutes) and help maintain our global prayer coverage. Join the elite force of prayer soldiers.
            </Text>
            
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => handleTimeCommitment(time)}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText
                  ]}>
                    {time}
                  </Text>
                  {selectedTime === time && (
                    <Star size={16} color={Colors.white} fill={Colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Current Prayer Requests */}
          <Card style={styles.prayersCard}>
            <View style={styles.prayersHeader}>
              <Users size={28} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Active Prayer Missions</Text>
            </View>
            <Text style={styles.prayersSubtitle}>
              These believers need your prayers right now. Join the mission to lift them up.
            </Text>
            
            {currentPrayers.map((prayer) => (
              <Card key={prayer.id} style={styles.prayerCard}>
                <LinearGradient
                  colors={['#fff', '#f8fafc']}
                  style={styles.prayerGradient}
                >
                  <View style={styles.prayerHeader}>
                    <View style={styles.prayerMeta}>
                      <Text style={styles.prayerCategory}>{prayer.category}</Text>
                      {prayer.urgent && (
                        <View style={styles.urgentBadge}>
                          <Text style={styles.urgentText}>URGENT</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.prayerTime}>{prayer.timeAgo}</Text>
                  </View>
                  
                  <Text style={styles.prayerPreview} numberOfLines={2}>
                    {prayer.preview}
                  </Text>
                  
                  <View style={styles.prayerFooter}>
                    <View style={styles.prayerSubmitter}>
                      <Text style={styles.prayerSubmitterText}>
                        by {prayer.submittedBy}
                      </Text>
                    </View>
                    <View style={styles.prayerStats}>
                      <View style={styles.prayerStat}>
                        <Heart size={14} color={Colors.error} />
                        <Text style={styles.prayerStatText}>{prayer.prayerCount} praying</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </Card>
            ))}

            <Button
              title="⚔️ Start Prayer Mission"
              onPress={handlePrayNow}
              style={styles.startSessionButton}
            />
          </Card>

          {/* Bible Verse */}
          <Card style={styles.verseCard}>
            <LinearGradient
              colors={[Colors.secondaryLight, '#fef3c7', '#fde68a']}
              style={styles.verseGradient}
            >
              <View style={styles.verseIcon}>
                <Sword size={28} color={Colors.secondary} />
              </View>
              <Text style={styles.verseText}>
                "Pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus."
              </Text>
              <Text style={styles.verseReference}>1 Thessalonians 5:17-18</Text>
            </LinearGradient>
          </Card>

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
    alignItems: 'center',
  },
  headerIconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  headerIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  headerGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    zIndex: -1,
  },
  glowCircle: {
    flex: 1,
    borderRadius: 68,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: 12,
    fontSize: 36,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
    fontSize: 17,
    fontWeight: '500',
  },
  headerStats: {
    flexDirection: 'row',
    gap: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
  },
  headerStat: {
    alignItems: 'center',
    gap: 8,
  },
  headerStatNumber: {
    ...Typography.heading,
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  headerStatLabel: {
    ...Typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  commitmentCard: {
    marginHorizontal: 24,
    marginBottom: 28,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  commitmentGradient: {
    padding: 28,
    alignItems: 'center',
    borderRadius: 20,
  },
  commitmentIcon: {
    marginBottom: 16,
  },
  commitmentTitle: {
    ...Typography.subheading,
    color: Colors.white,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
  },
  commitmentTime: {
    ...Typography.title,
    color: Colors.white,
    marginBottom: 12,
    fontSize: 32,
    fontWeight: '800',
  },
  commitmentSubtext: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  commitmentStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  commitmentStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  commitmentStatText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  prayNowButton: {
    borderColor: Colors.white,
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 16,
  },
  timeCard: {
    marginHorizontal: 24,
    marginBottom: 28,
    borderRadius: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: Colors.text,
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  sectionSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 24,
    fontSize: 16,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    minWidth: (width - 88) / 3,
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  timeSlotText: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  selectedTimeSlotText: {
    color: Colors.white,
  },
  prayersCard: {
    marginHorizontal: 24,
    marginBottom: 28,
    borderRadius: 20,
  },
  prayersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  prayersSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 24,
    fontSize: 16,
  },
  prayerCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 16,
  },
  prayerGradient: {
    padding: 20,
    borderRadius: 16,
  },
  prayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  prayerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  prayerCategory: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  urgentBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  prayerTime: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  prayerPreview: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 24,
    fontSize: 16,
  },
  prayerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prayerSubmitter: {
    flex: 1,
  },
  prayerSubmitterText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 14,
  },
  prayerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  prayerStatText: {
    ...Typography.bodySmall,
    color: Colors.error,
    fontWeight: '700',
    fontSize: 12,
  },
  startSessionButton: {
    marginTop: 12,
    paddingVertical: 18,
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
    alignItems: 'center',
    borderRadius: 20,
  },
  verseIcon: {
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
    color: Colors.secondary,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomSpacing: {
    height: 48,
  },
});