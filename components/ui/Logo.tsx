import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface LogoProps {
  /**
   * Width/height of the icon (square). Defaults to 120.
   */
  size?: number;
  /**
   * Whether to show the brand name below the icon. Defaults to true.
   */
  showText?: boolean;
  /**
   * Whether to show the tagline under the brand name. Only shown if showText is true. Defaults to true.
   */
  showTagline?: boolean;
}

/**
 * Centralised logo component so the same branding can be reused everywhere
 * without duplicating markup/styles.
 */
export default function Logo({ size = 120, showText = true, showTagline = true }: LogoProps) {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <Image
        // NOTE: Metro cannot resolve the "@/" alias for static assets at runtime,
        // so we resolve via a relative path
        source={require('../../assets/images/icon.png')} // generated via `npm run generate:icons`
        style={{ width: size, height: size, resizeMode: 'contain' }}
      />

      {/* Text */}
      {showText && (
        <>
          <Text style={styles.title}>WithGod</Text>
          {showTagline && <Text style={styles.tagline}>We Live</Text>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.heading,
    color: Colors.text,
    marginTop: 8,
    textTransform: 'capitalize',
  },
  tagline: {
    ...Typography.bodySmall,
    color: Colors.secondary,
    marginTop: 4,
    letterSpacing: 1,
  },
}); 