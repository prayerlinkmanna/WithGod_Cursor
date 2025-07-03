import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Heart, Clock, Users, Star, CircleCheck as CheckCircle } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { usePrayerNotifications } from '@/contexts/PrayerNotificationContext';
import PrayerCard from '@/components/ui/PrayerCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.92;
const CARD_HEIGHT = screenHeight * 0.68;
const SWIPE_THRESHOLD = screenWidth * 0.3;

interface PrayerRequest {
  id: number;
  category: string;
  title: string;
  content: string;
  submittedBy: string;
  urgent: boolean;
  timeAgo: string;
}

// Enhanced sample prayer requests
const SAMPLE_PRAYERS: PrayerRequest[] = [
  {
    id: 1,
    category: 'Health & Healing',
    title: 'Recovery Prayer',
    content: 'Please pray for my mother who is recovering from surgery. She needs strength and healing during this difficult time. The doctors say she\'s doing well, but I know the power of prayer can help her heal completely. She has been such a pillar of strength for our family, and now it\'s our turn to lift her up in prayer.',
    submittedBy: 'Sarah M.',
    urgent: true,
    timeAgo: '2 hours ago'
  },
  {
    id: 2,
    category: 'Job Opportunities',
    title: 'Career Guidance',
    content: 'I\'ve been searching for a job for months now. Please pray that God opens the right doors and guides me to the position He has planned for me. I trust in His timing but need strength to keep going. The financial pressure is mounting, but I believe God has a plan for my life and career.',
    submittedBy: 'Michael R.',
    urgent: false,
    timeAgo: '5 hours ago'
  },
  {
    id: 3,
    category: 'Spiritual Growth',
    title: 'Faith Journey',
    content: 'I\'m going through a season of doubt and need prayer for my faith to be strengthened. Please pray that I can feel God\'s presence more clearly and that His word becomes alive in my heart again. I want to grow closer to Him but feel distant lately.',
    submittedBy: 'Anonymous',
    urgent: false,
    timeAgo: '1 day ago'
  },
  {
    id: 4,
    category: 'Marriage & Relationships',
    title: 'Marriage Restoration',
    content: 'My marriage is going through a very difficult time. Please pray for healing, forgiveness, and restoration. We both want to work things out but need God\'s wisdom and grace to guide us through this challenging season. Our children need to see us united in love.',
    submittedBy: 'Jennifer L.',
    urgent: true,
    timeAgo: '3 hours ago'
  },
  {
    id: 5,
    category: 'Family & Children',
    title: 'Prodigal Son',
    content: 'Please pray for my teenage son who has walked away from his faith and is making dangerous choices. Pray for his protection and that God would draw him back to Himself. I believe in the power of a mother\'s prayers and trust God will restore our relationship.',
    submittedBy: 'Maria G.',
    urgent: false,
    timeAgo: '6 hours ago'
  },
  {
    id: 6,
    category: 'Financial Breakthrough',
    title: 'Provision Needed',
    content: 'Our family is facing financial hardship after unexpected medical bills. Please pray for God\'s provision and wisdom in managing our resources. We trust that He will provide for all our needs according to His riches in glory.',
    submittedBy: 'David K.',
    urgent: true,
    timeAgo: '4 hours ago'
  },
];

export default function PrayerSessionScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prayedForCount, setPrayedForCount] = useState(0);
  const [sessionStartTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const { endPrayer } = usePrayerNotifications();
  
  // Animation values for current card
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Animation values for next cards
  const nextCardScale = useSharedValue(0.94);
  const nextCardOpacity = useSharedValue(0.7);
  const thirdCardScale = useSharedValue(0.88);
  const thirdCardOpacity = useSharedValue(0.5);

  useEffect(() => {
    // Initialize card animations with smooth entrance
    scale.value = withSpring(1, { damping: 20, stiffness: 200 });
    opacity.value = withSpring(1, { damping: 20, stiffness: 200 });
    nextCardScale.value = withSpring(0.94, { damping: 20, stiffness: 200 });
    nextCardOpacity.value = withSpring(0.7, { damping: 20, stiffness: 200 });
    thirdCardScale.value = withSpring(0.88, { damping: 20, stiffness: 200 });
    thirdCardOpacity.value = withSpring(0.5, { damping: 20, stiffness: 200 });
  }, []);

  const resetCardPosition = () => {
    translateX.value = withSpring(0, { damping: 25, stiffness: 400 });
    translateY.value = withSpring(0, { damping: 25, stiffness: 400 });
    rotate.value = withSpring(0, { damping: 25, stiffness: 400 });
    scale.value = withSpring(1, { damping: 20, stiffness: 200 });
    opacity.value = withSpring(1, { damping: 20, stiffness: 200 });
  };

  const animateCardOut = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -screenWidth * 1.5 : screenWidth * 1.5;
    
    translateX.value = withTiming(toValue, { duration: 500 });
    rotate.value = withTiming(direction === 'left' ? -60 : 60, { duration: 500 });
    opacity.value = withTiming(0, { duration: 500 });
    scale.value = withTiming(0.7, { duration: 500 });
    
    // Animate next cards forward with smooth transitions
    nextCardScale.value = withSpring(1, { damping: 20, stiffness: 200 });
    nextCardOpacity.value = withSpring(1, { damping: 20, stiffness: 200 });
    thirdCardScale.value = withSpring(0.94, { damping: 20, stiffness: 200 });
    thirdCardOpacity.value = withSpring(0.7, { damping: 20, stiffness: 200 });
  };

  const handleCardSwiped = () => {
    setIsAnimating(true);
    setPrayedForCount(prev => prev + 1);
    
    if (currentIndex < SAMPLE_PRAYERS.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        // Reset animations for next card
        translateX.value = 0;
        translateY.value = 0;
        rotate.value = 0;
        scale.value = 1;
        opacity.value = 1;
        nextCardScale.value = 0.94;
        nextCardOpacity.value = 0.7;
        thirdCardScale.value = 0.88;
        thirdCardOpacity.value = 0.5;
        setIsAnimating(false);
      }, 500);
    } else {
      // Session complete
      setTimeout(() => {
        handleSessionComplete();
      }, 500);
    }
  };

  const handleSessionComplete = () => {
    const sessionDuration = Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000);
    
    Alert.alert(
      'Prayer Session Complete! 🙏',
      `You prayed for ${prayedForCount} requests in ${sessionDuration} minutes. May God bless your faithful prayers and may His peace be with you.`,
      [
        {
          text: 'Amen',
          onPress: () => {
            endPrayer();
            router.back();
          }
        }
      ]
    );
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      if (isAnimating) return;
      scale.value = withSpring(1.05, { damping: 20, stiffness: 300 });
    },
    onActive: (event) => {
      if (isAnimating) return;
      
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.1; // Reduced vertical movement
      
      // Enhanced rotation based on horizontal movement
      rotate.value = interpolate(
        event.translationX,
        [-screenWidth, 0, screenWidth],
        [-30, 0, 30],
        Extrapolate.CLAMP
      );
      
      // Smooth opacity transition
      const progress = Math.abs(event.translationX) / SWIPE_THRESHOLD;
      opacity.value = interpolate(progress, [0, 1], [1, 0.6], Extrapolate.CLAMP);
      
      // Enhanced next cards animation
      const swipeProgress = Math.min(Math.abs(event.translationX) / SWIPE_THRESHOLD, 1);
      nextCardScale.value = interpolate(swipeProgress, [0, 1], [0.94, 1], Extrapolate.CLAMP);
      nextCardOpacity.value = interpolate(swipeProgress, [0, 1], [0.7, 1], Extrapolate.CLAMP);
      thirdCardScale.value = interpolate(swipeProgress, [0, 1], [0.88, 0.94], Extrapolate.CLAMP);
      thirdCardOpacity.value = interpolate(swipeProgress, [0, 1], [0.5, 0.7], Extrapolate.CLAMP);
    },
    onEnd: (event) => {
      if (isAnimating) return;
      
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD || Math.abs(event.velocityX) > 1200;
      
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        runOnJS(animateCardOut)(direction);
        runOnJS(handleCardSwiped)();
      } else {
        runOnJS(resetCardPosition)();
        // Reset next card animations
        nextCardScale.value = withSpring(0.94, { damping: 20, stiffness: 200 });
        nextCardOpacity.value = withSpring(0.7, { damping: 20, stiffness: 200 });
        thirdCardScale.value = withSpring(0.88, { damping: 20, stiffness: 200 });
        thirdCardOpacity.value = withSpring(0.5, { damping: 20, stiffness: 200 });
      }
    },
  });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const nextCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextCardScale.value }],
    opacity: nextCardOpacity.value,
  }));

  const thirdCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: thirdCardScale.value }],
    opacity: thirdCardOpacity.value,
  }));

  const handleEndSession = () => {
    Alert.alert(
      'End Prayer Session',
      'Are you sure you want to end your prayer session?',
      [
        { text: 'Continue Praying', style: 'cancel' },
        {
          text: 'End Session',
          onPress: () => {
            endPrayer();
            router.back();
          }
        }
      ]
    );
  };

  const currentPrayer = SAMPLE_PRAYERS[currentIndex];
  const nextPrayer = SAMPLE_PRAYERS[currentIndex + 1];
  const thirdPrayer = SAMPLE_PRAYERS[currentIndex + 2];

  return (
    <GestureHandlerRootView style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155', '#475569']}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Enhanced Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleEndSession}>
              <ArrowLeft size={26} color={Colors.white} />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Sacred Prayer Session</Text>
              <Text style={styles.headerSubtitle}>
                {prayedForCount} of {SAMPLE_PRAYERS.length} prayers lifted up
              </Text>
            </View>
            
            <View style={styles.headerRight}>
              <View style={styles.timerContainer}>
                <Clock size={18} color={Colors.white} />
                <Text style={styles.timerText}>
                  {Math.round((Date.now() - sessionStartTime.getTime()) / 60000)}m
                </Text>
              </View>
            </View>
          </View>

          {/* Enhanced Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[Colors.secondary, Colors.primary]}
                style={[
                  styles.progressFill, 
                  { width: `${(prayedForCount / SAMPLE_PRAYERS.length) * 100}%` }
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((prayedForCount / SAMPLE_PRAYERS.length) * 100)}% Complete
            </Text>
          </View>

          {/* Cards Container */}
          <View style={styles.cardsContainer}>
            {/* Third Card (Background) */}
            {thirdPrayer && (
              <Animated.View style={[styles.cardContainer, styles.backgroundCard, thirdCardAnimatedStyle]}>
                <PrayerCard prayer={thirdPrayer} />
              </Animated.View>
            )}

            {/* Next Card (Middle) */}
            {nextPrayer && (
              <Animated.View style={[styles.cardContainer, styles.nextCard, nextCardAnimatedStyle]}>
                <PrayerCard prayer={nextPrayer} />
              </Animated.View>
            )}

            {/* Current Card (Top) */}
            {currentPrayer && (
              <PanGestureHandler onGestureEvent={gestureHandler} enabled={!isAnimating}>
                <Animated.View style={[styles.cardContainer, styles.currentCard, cardAnimatedStyle]}>
                  <PrayerCard prayer={currentPrayer} />
                </Animated.View>
              </PanGestureHandler>
            )}
          </View>

          {/* Enhanced Instructions */}
          <View style={styles.instructionsContainer}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.instructionsCard}
            >
              <Text style={styles.instructionsText}>
                Take a moment to pray, then swipe to continue
              </Text>
              <View style={styles.swipeIndicator}>
                <Text style={styles.swipeText}>← Swipe left or right →</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Enhanced Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Heart size={22} color={Colors.secondary} />
              <Text style={styles.statText}>{prayedForCount} Prayed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Users size={22} color={Colors.secondary} />
              <Text style={styles.statText}>{SAMPLE_PRAYERS.length - currentIndex} Remaining</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Star size={22} color={Colors.secondary} />
              <Text style={styles.statText}>Blessed</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.subheading,
    color: Colors.white,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  headerRight: {
    width: 44,
    alignItems: 'flex-end',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  timerText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
  },
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  backgroundCard: {
    zIndex: 1,
  },
  nextCard: {
    zIndex: 2,
  },
  currentCard: {
    zIndex: 3,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  instructionsCard: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  instructionsText: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  swipeIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  swipeText: {
    ...Typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    borderRadius: 20,
    paddingVertical: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  statText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});