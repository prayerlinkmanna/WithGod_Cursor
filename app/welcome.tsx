import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Heart, Sparkles, Star, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [glowAnim] = useState(new Animated.Value(0));
  const [sparkleAnim] = useState(new Animated.Value(0));
  const [floatAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Start continuous animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to main app after delay
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const floatTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155', '#475569']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Animated Background Elements */}
          <Animated.View style={[styles.backgroundGlow, { opacity: glowOpacity }]}>
            <LinearGradient
              colors={['rgba(33, 150, 243, 0.4)', 'rgba(255, 215, 0, 0.3)', 'transparent']}
              style={styles.glowGradient}
            />
          </Animated.View>

          <Animated.View 
            style={[
              styles.mainContent,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateY: floatTranslateY }
                ]
              }
            ]}
          >
            <Card style={styles.welcomeCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.98)', 'rgba(248, 250, 252, 0.95)']}
                style={styles.cardGradient}
              >
                {/* Icon Container */}
                <View style={styles.iconContainer}>
                  <LinearGradient
                    colors={[Colors.primary, Colors.secondary, '#FFB74D']}
                    style={styles.iconGradient}
                  >
                    <Heart size={72} color={Colors.white} fill={Colors.white} />
                  </LinearGradient>
                  
                  {/* Floating sparkles */}
                  <View style={styles.sparklesContainer}>
                    <Animated.View style={[
                      styles.sparkle, 
                      styles.sparkle1, 
                      { 
                        opacity: sparkleOpacity,
                        transform: [{ scale: sparkleScale }]
                      }
                    ]}>
                      <Sparkles size={20} color={Colors.secondary} />
                    </Animated.View>
                    <Animated.View style={[
                      styles.sparkle, 
                      styles.sparkle2, 
                      { 
                        opacity: sparkleOpacity,
                        transform: [{ scale: sparkleScale }]
                      }
                    ]}>
                      <Star size={16} color={Colors.primary} />
                    </Animated.View>
                    <Animated.View style={[
                      styles.sparkle, 
                      styles.sparkle3, 
                      { 
                        opacity: sparkleOpacity,
                        transform: [{ scale: sparkleScale }]
                      }
                    ]}>
                      <Sparkles size={18} color={Colors.secondary} />
                    </Animated.View>
                    <Animated.View style={[
                      styles.sparkle, 
                      styles.sparkle4, 
                      { 
                        opacity: sparkleOpacity,
                        transform: [{ scale: sparkleScale }]
                      }
                    ]}>
                      <Shield size={14} color={Colors.primary} />
                    </Animated.View>
                  </View>
                </View>
                
                {/* Welcome Content */}
                <View style={styles.textContent}>
                  <Text style={styles.verse}>
                    "The prayer of a righteous person is powerful and effective."
                  </Text>
                  
                  <Text style={styles.reference}>
                    James 5:16
                  </Text>
                  
                  <View style={styles.welcomeTextContainer}>
                    <Text style={styles.welcome}>
                      Welcome to WithGod
                    </Text>
                    
                    <Text style={styles.subtitle}>
                      You're now part of a global family of prayer warriors committed to lifting each other up in faith, hope, and love.
                    </Text>
                  </View>

                  {/* Stats Preview */}
                  <View style={styles.statsPreview}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>50K+</Text>
                      <Text style={styles.statLabel}>Prayer Warriors</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>24/7</Text>
                      <Text style={styles.statLabel}>Coverage</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>∞</Text>
                      <Text style={styles.statLabel}>God's Love</Text>
                    </View>
                  </View>

                  {/* Loading indicator */}
                  <View style={styles.loadingContainer}>
                    <View style={styles.loadingDots}>
                      <Animated.View style={[styles.dot, { opacity: glowOpacity }]} />
                      <Animated.View style={[styles.dot, { opacity: glowOpacity }]} />
                      <Animated.View style={[styles.dot, { opacity: glowOpacity }]} />
                    </View>
                    <Text style={styles.loadingText}>Preparing your sacred journey...</Text>
                  </View>
                </View>
              </LinearGradient>
            </Card>
          </Animated.View>

          {/* Bottom blessing */}
          <Animated.View style={[styles.blessing, { opacity: fadeAnim }]}>
            <Text style={styles.blessingText}>✨ May God's grace guide your every prayer 🙏</Text>
          </Animated.View>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backgroundGlow: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    top: '25%',
  },
  glowGradient: {
    flex: 1,
    borderRadius: 200,
  },
  mainContent: {
    alignItems: 'center',
    maxWidth: 380,
    width: '100%',
  },
  welcomeCard: {
    alignItems: 'center',
    borderRadius: 32,
    padding: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardGradient: {
    width: '100%',
    alignItems: 'center',
    padding: 40,
    borderRadius: 32,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 36,
  },
  iconGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  sparklesContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: -30,
    left: -30,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: 20,
    right: 30,
  },
  sparkle2: {
    bottom: 25,
    left: 15,
  },
  sparkle3: {
    top: 40,
    left: 10,
  },
  sparkle4: {
    bottom: 45,
    right: 15,
  },
  textContent: {
    alignItems: 'center',
    width: '100%',
  },
  verse: {
    ...Typography.subtitle,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    lineHeight: 32,
    fontSize: 20,
  },
  reference: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 36,
    fontSize: 18,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  welcome: {
    ...Typography.title,
    color: Colors.primary,
    marginBottom: 16,
    fontSize: 36,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 17,
    paddingHorizontal: 8,
  },
  statsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...Typography.heading,
    color: Colors.primary,
    fontSize: 22,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    marginHorizontal: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  loadingText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 16,
    fontStyle: 'italic',
  },
  blessing: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  blessingText: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});