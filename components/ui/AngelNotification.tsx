import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface AngelNotificationProps {
  visible: boolean;
  onComplete?: () => void;
  onBeginPrayer?: () => void;
  message?: string;
}

const { width, height } = Dimensions.get('window');

export default function AngelNotification({ 
  visible, 
  onComplete, 
  onBeginPrayer,
  message = "It's time for prayer" 
}: AngelNotificationProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const wingAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const haloAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    console.log('AngelNotification visibility changed:', visible);
    
    if (visible) {
      // Stop any existing animations
      if (animationRef.current) {
        animationRef.current.stop();
      }

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.3);
      glowAnim.setValue(0);
      wingAnim.setValue(0);
      floatAnim.setValue(0);
      sparkleAnim.setValue(0);
      haloAnim.setValue(0);

      // Start the angel entrance animation
      const entranceAnimation = Animated.sequence([
        // Fade in and scale up
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 40,
            friction: 8,
            useNativeDriver: true,
          }),
        ]),
        // Start continuous animations
        Animated.parallel([
          // Divine glow effect
          Animated.loop(
            Animated.sequence([
              Animated.timing(glowAnim, {
                toValue: 1,
                duration: 2500,
                useNativeDriver: true,
              }),
              Animated.timing(glowAnim, {
                toValue: 0.4,
                duration: 2500,
                useNativeDriver: true,
              }),
            ])
          ),
          // Wing flapping
          Animated.loop(
            Animated.sequence([
              Animated.timing(wingAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.timing(wingAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
              }),
            ])
          ),
          // Floating motion
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
          ),
          // Sparkle animation
          Animated.loop(
            Animated.sequence([
              Animated.timing(sparkleAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
              }),
              Animated.timing(sparkleAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
              }),
            ])
          ),
          // Halo glow
          Animated.loop(
            Animated.sequence([
              Animated.timing(haloAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
              }),
              Animated.timing(haloAnim, {
                toValue: 0.3,
                duration: 3000,
                useNativeDriver: true,
              }),
            ])
          ),
        ]),
      ]);

      animationRef.current = entranceAnimation;
      entranceAnimation.start();

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    } else {
      // Stop all animations when not visible
      if (animationRef.current) {
        animationRef.current.stop();
      }
      fadeAnim.stopAnimation();
      scaleAnim.stopAnimation();
      glowAnim.stopAnimation();
      wingAnim.stopAnimation();
      floatAnim.stopAnimation();
      sparkleAnim.stopAnimation();
      haloAnim.stopAnimation();
    }
  }, [visible, fadeAnim, scaleAnim, glowAnim, wingAnim, floatAnim, sparkleAnim, haloAnim]);

  const hideNotification = () => {
    console.log('Hiding notification...');
    
    // Stop continuous animations
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const exitAnimation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    exitAnimation.start(() => {
      onComplete?.();
    });
  };

  const handleBeginPrayer = () => {
    console.log('Begin prayer pressed');
    onBeginPrayer?.();
    hideNotification();
  };

  if (!visible) {
    console.log('AngelNotification not visible, returning null');
    return null;
  }

  console.log('Rendering AngelNotification with message:', message);

  const floatTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const wingRotateLeft = wingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-20deg'],
  });

  const wingRotateRight = wingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.2],
  });

  const haloOpacity = haloAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const haloScale = haloAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: floatTranslateY }
          ]
        }
      ]}
    >
      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={hideNotification}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.5)']}
          style={styles.closeButtonGradient}
        >
          <X size={20} color={Colors.white} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Divine radiance background */}
      <Animated.View style={[styles.radianceContainer, { opacity: glowOpacity }]}>
        <LinearGradient
          colors={[
            'rgba(255, 215, 0, 0.9)',
            'rgba(255, 255, 255, 0.8)',
            'rgba(135, 206, 250, 0.6)',
            'transparent'
          ]}
          style={styles.radiance}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Angel figure */}
      <View style={styles.angelContainer}>
        {/* Divine Halo */}
        <Animated.View 
          style={[
            styles.haloContainer,
            {
              opacity: haloOpacity,
              transform: [{ scale: haloScale }]
            }
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.9)', 'rgba(255, 255, 255, 0.7)', 'transparent']}
            style={styles.halo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.haloInner}>
            <LinearGradient
              colors={['rgba(255, 215, 0, 1)', 'rgba(255, 255, 255, 0.8)']}
              style={styles.haloInnerGradient}
            />
          </View>
        </Animated.View>

        {/* Majestic Wings */}
        <Animated.View 
          style={[
            styles.wingLeft,
            { transform: [{ rotate: wingRotateLeft }] }
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(240, 248, 255, 0.8)', 'rgba(255, 255, 255, 0.6)']}
            style={styles.wing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          {/* Wing feather details */}
          <View style={styles.wingFeathers}>
            {[...Array(5)].map((_, i) => (
              <View key={i} style={[styles.feather, { top: i * 15, left: i * 8 }]} />
            ))}
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.wingRight,
            { transform: [{ rotate: wingRotateRight }] }
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(240, 248, 255, 0.8)', 'rgba(255, 255, 255, 0.6)']}
            style={styles.wing}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          {/* Wing feather details */}
          <View style={styles.wingFeathers}>
            {[...Array(5)].map((_, i) => (
              <View key={i} style={[styles.feather, { top: i * 15, right: i * 8 }]} />
            ))}
          </View>
        </Animated.View>

        {/* Angel Face */}
        <View style={styles.angelFace}>
          <LinearGradient
            colors={['#FFF8DC', '#F5DEB3', '#DEB887']}
            style={styles.faceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          {/* Eyes */}
          <View style={styles.eyes}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          {/* Peaceful smile */}
          <View style={styles.smile} />
        </View>

        {/* Angel Hair */}
        <View style={styles.angelHair}>
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.8)', 'rgba(218, 165, 32, 0.6)']}
            style={styles.hairGradient}
          />
        </View>

        {/* Angel Robe */}
        <View style={styles.angelRobe}>
          <LinearGradient
            colors={[Colors.white, Colors.primaryLight, 'rgba(135, 206, 250, 0.3)']}
            style={styles.robeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          {/* Robe belt */}
          <View style={styles.robeBelt}>
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.9)', 'rgba(218, 165, 32, 0.7)']}
              style={styles.beltGradient}
            />
          </View>
        </View>

        {/* Angel Arms in prayer position */}
        <View style={styles.angelArms}>
          <View style={styles.armLeft}>
            <LinearGradient
              colors={['#FFF8DC', '#F5DEB3']}
              style={styles.armGradient}
            />
          </View>
          <View style={styles.armRight}>
            <LinearGradient
              colors={['#FFF8DC', '#F5DEB3']}
              style={styles.armGradient}
            />
          </View>
          {/* Praying hands */}
          <View style={styles.prayingHands}>
            <LinearGradient
              colors={['#FFF8DC', '#F5DEB3']}
              style={styles.handsGradient}
            />
          </View>
        </View>
      </View>

      {/* Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subMessage}>Take a moment to connect with God</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prayButton} onPress={handleBeginPrayer}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              style={styles.prayButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.prayButtonText}>Begin Prayer 🙏</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dismissButton} onPress={hideNotification}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Heavenly Sparkles */}
      <View style={styles.sparklesContainer}>
        {[...Array(12)].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.sparkle,
              {
                left: `${10 + index * 7}%`,
                top: `${20 + (index % 4) * 15}%`,
                opacity: sparkleOpacity,
                transform: [{ scale: sparkleScale }],
              }
            ]}
          >
            <Text style={styles.sparkleText}>✨</Text>
          </Animated.View>
        ))}
        
        {/* Additional divine light particles */}
        {[...Array(8)].map((_, index) => (
          <Animated.View
            key={`light-${index}`}
            style={[
              styles.lightParticle,
              {
                left: `${15 + index * 10}%`,
                top: `${30 + (index % 3) * 20}%`,
                opacity: glowOpacity,
              }
            ]}
          >
            <Text style={styles.lightText}>⭐</Text>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    zIndex: 1001,
  },
  closeButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radianceContainer: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
  },
  radiance: {
    flex: 1,
    borderRadius: width * 0.6,
  },
  angelContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  haloContainer: {
    width: 120,
    height: 30,
    marginBottom: -15,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    width: 120,
    height: 30,
    borderRadius: 60,
    position: 'absolute',
  },
  haloInner: {
    width: 80,
    height: 20,
    borderRadius: 40,
    overflow: 'hidden',
  },
  haloInnerGradient: {
    flex: 1,
    borderRadius: 40,
  },
  wingLeft: {
    position: 'absolute',
    top: 35,
    left: -60,
    width: 90,
    height: 120,
    transformOrigin: 'bottom right',
    zIndex: 1,
  },
  wingRight: {
    position: 'absolute',
    top: 35,
    right: -60,
    width: 90,
    height: 120,
    transformOrigin: 'bottom left',
    zIndex: 1,
  },
  wing: {
    flex: 1,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  wingFeathers: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
  feather: {
    position: 'absolute',
    width: 3,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
  angelFace: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
    zIndex: 2,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  faceGradient: {
    flex: 1,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    marginBottom: 8,
  },
  eye: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8B4513',
  },
  smile: {
    width: 12,
    height: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#CD853F',
    borderRadius: 6,
  },
  angelHair: {
    position: 'absolute',
    top: -5,
    left: -10,
    right: -10,
    height: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
    overflow: 'hidden',
  },
  hairGradient: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  angelRobe: {
    width: 80,
    height: 140,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  robeGradient: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  robeBelt: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 8,
    overflow: 'hidden',
  },
  beltGradient: {
    flex: 1,
  },
  angelArms: {
    position: 'absolute',
    top: 80,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  armLeft: {
    position: 'absolute',
    left: 10,
    top: 0,
    width: 25,
    height: 50,
    borderRadius: 12,
    transform: [{ rotate: '30deg' }],
    overflow: 'hidden',
  },
  armRight: {
    position: 'absolute',
    right: 10,
    top: 0,
    width: 25,
    height: 50,
    borderRadius: 12,
    transform: [{ rotate: '-30deg' }],
    overflow: 'hidden',
  },
  armGradient: {
    flex: 1,
    borderRadius: 12,
  },
  prayingHands: {
    width: 20,
    height: 25,
    borderRadius: 10,
    marginTop: 25,
    overflow: 'hidden',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  handsGradient: {
    flex: 1,
    borderRadius: 10,
  },
  messageContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  message: {
    ...Typography.heading,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subMessage: {
    ...Typography.body,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  prayButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  prayButtonGradient: {
    paddingHorizontal: 36,
    paddingVertical: 18,
    alignItems: 'center',
  },
  prayButtonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  dismissButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  dismissButtonText: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  sparklesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
  },
  sparkleText: {
    fontSize: 20,
    textShadowColor: 'rgba(255, 215, 0, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  lightParticle: {
    position: 'absolute',
  },
  lightText: {
    fontSize: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
});