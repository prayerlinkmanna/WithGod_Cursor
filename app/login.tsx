import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Phone, Key } from 'lucide-react-native';
import Logo from '@/components/ui/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneAuth = () => {
    if (!otpSent) {
      // Validate phone
      const digitsOnly = phone.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 10) {
        Alert.alert('Invalid Phone', 'Please enter a valid phone number');
        return;
      }
      // Simulate sending OTP
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
      Alert.alert('OTP Sent', `For demo purposes, your OTP is ${code}`);
    } else {
      if (otp !== generatedOtp) {
        Alert.alert('Incorrect OTP', 'Please check the code and try again');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/welcome');
      }, 1000);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/welcome');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <LinearGradient
        colors={['#292E49', '#536976']}
        style={styles.backgroundGradient}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.content}>
            {/* Login Form */}
            <Card style={styles.formCard}>
              {/* Logo & Intro */}
              <View style={styles.logoIntro}>
                <Logo />
                <Text style={styles.descriptionCard}>
                  This app is created to help believers come into God's presence at least once a day through prayer—by lifting others and being lifted. Join this wonderful experience of intercession.
                </Text>
              </View>
              
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>
                  {otpSent ? 'Verify OTP' : 'Welcome Back, Warrior'}
                </Text>
                <Text style={styles.formSubtitle}>
                  {otpSent 
                    ? 'Continue your sacred prayer journey'
                    : 'Continue your sacred prayer journey'
                  }
                </Text>
              </View>
              
              <View style={styles.inputContainer}>
                {!otpSent && (
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconContainer}>
                      <Phone size={22} color={Colors.primary} />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter phone number"
                      placeholderTextColor={Colors.textSecondary}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                )}

                {otpSent && (
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputIconContainer}>
                      <Key size={22} color={Colors.primary} />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter OTP"
                      placeholderTextColor={Colors.textSecondary}
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                    />
                  </View>
                )}
              </View>

              <Button
                title={otpSent ? '🔑 Verify OTP' : '📩 Send OTP'}
                onPress={handlePhoneAuth}
                disabled={isLoading}
                style={styles.primaryButton}
              />

              {otpSent && (
                <Button
                  title="🔄 Resend OTP"
                  onPress={() => {
                    setOtpSent(false);
                    setOtp('');
                  }}
                  variant="ghost"
                  disabled={isLoading}
                  style={styles.switchButton}
                  textStyle={{ color: Colors.primary }}
                />
              )}
            </Card>
          </View>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  formCard: {
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  formHeader: {
    marginBottom: 36,
    alignItems: 'center',
  },
  formTitle: {
    ...Typography.heading,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 26,
    lineHeight: 34,
  },
  formSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 36,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIconContainer: {
    marginRight: 16,
  },
  input: {
    ...Typography.body,
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
  primaryButton: {
    marginBottom: 28,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  switchButton: {
    alignSelf: 'center',
    paddingVertical: 16,
  },
  logoIntro: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  appTitleCard: {
    ...Typography.title,
    color: Colors.white,
    fontSize: 48,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  taglineCard: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 18,
    lineHeight: 26,
  },
  descriptionCard: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
  },
});