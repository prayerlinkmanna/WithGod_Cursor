import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Clock, User, Star, Shield } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width, height } = Dimensions.get('window');

interface PrayerRequest {
  id: number;
  category: string;
  title: string;
  content: string;
  submittedBy: string;
  urgent: boolean;
  timeAgo: string;
}

interface PrayerCardProps {
  prayer: PrayerRequest;
}

export default function PrayerCard({ prayer }: PrayerCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health & Healing':
        return ['#dcfce7', '#bbf7d0', '#86efac'];
      case 'Job Opportunities':
        return ['#dbeafe', '#bfdbfe', '#93c5fd'];
      case 'Spiritual Growth':
        return ['#f3e8ff', '#e9d5ff', '#d8b4fe'];
      case 'Marriage & Relationships':
        return ['#fce7f3', '#fbcfe8', '#f9a8d4'];
      case 'Family & Children':
        return ['#fef3c7', '#fde68a', '#fcd34d'];
      case 'Financial Breakthrough':
        return ['#d1fae5', '#a7f3d0', '#6ee7b7'];
      default:
        return ['#f1f5f9', '#e2e8f0', '#cbd5e1'];
    }
  };

  const categoryColors = getCategoryColor(prayer.category);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#fefefe', '#fdfdfd']}
        style={styles.card}
      >
        {/* Decorative top accent */}
        <LinearGradient
          colors={categoryColors}
          style={styles.topAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <LinearGradient
              colors={[categoryColors[0], categoryColors[1]]}
              style={styles.categoryBadge}
            >
              <Text style={styles.categoryText}>{prayer.category}</Text>
            </LinearGradient>
            {prayer.urgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}
          </View>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{prayer.timeAgo}</Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{prayer.title}</Text>

        {/* Content */}
        <ScrollView 
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={styles.content}>{prayer.content}</Text>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.submittedBy}>
            <User size={18} color={Colors.textSecondary} />
            <Text style={styles.submittedByText}>
              {prayer.submittedBy === 'Anonymous' ? 'Anonymous' : `by ${prayer.submittedBy}`}
            </Text>
          </View>
          
          <View style={styles.prayerPrompt}>
            <Heart size={18} color={Colors.primary} fill={Colors.primary} />
            <Text style={styles.prayerPromptText}>Lift this up in prayer</Text>
          </View>
        </View>

        {/* Prayer Instructions */}
        <View style={styles.instructionsContainer}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.secondaryLight]}
            style={styles.instructionsGradient}
          >
            <View style={styles.instructionsContent}>
              <Shield size={20} color={Colors.primary} />
              <Text style={styles.instructionsText}>
                Take a moment to pray for this request, then swipe to continue
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Subtle shadow overlay */}
        <View style={styles.shadowOverlay} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
  },
  topAccent: {
    height: 8,
    width: '100%',
  },
  header: {
    padding: 28,
    paddingBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  urgentBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: Colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  urgentText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  title: {
    ...Typography.heading,
    color: Colors.text,
    paddingHorizontal: 28,
    marginBottom: 20,
    lineHeight: 34,
    fontSize: 26,
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
    marginBottom: 24,
  },
  content: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 28,
    fontSize: 17,
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
  },
  submittedBy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  submittedByText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 14,
    fontWeight: '500',
  },
  prayerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  prayerPromptText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  instructionsContainer: {
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  instructionsGradient: {
    borderRadius: 20,
    padding: 20,
  },
  instructionsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  instructionsText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  shadowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    pointerEvents: 'none',
  },
});