import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Send, Heart, Shield, Users, CircleCheck as CheckCircle, Star, Sparkles, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width } = Dimensions.get('window');

const prayerCategories = [
  'Spiritual Growth',
  'Financial Breakthrough', 
  'Job Opportunities',
  'Marriage & Relationships',
  'Health & Healing',
  'Family & Children',
  'Other',
];

export default function RequestsScreen() {
  const [selectedCategory, setSelectedCategory] = useState(prayerCategories[0]);
  const [prayerRequest, setPrayerRequest] = useState('');
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitPrayer = async () => {
    if (!prayerRequest.trim()) {
      Alert.alert('Prayer Request Required', 'Please share what\'s on your heart so we can pray with you.');
      return;
    }

    if (prayerRequest.trim().length < 10) {
      Alert.alert('Please Share More', 'Help us understand your prayer need better with a few more details.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        Alert.alert(
          'Prayer Submitted Successfully! 🙏',
          'Your prayer request has been shared with our prayer community. Our prayer warriors are already lifting you up in prayer. May God bless you abundantly.',
          [{ 
            text: 'Amen', 
            onPress: () => {
              setPrayerRequest('');
              setName('');
              setSelectedCategory(prayerCategories[0]);
              setIsSubmitted(false);
            }
          }]
        );
      }, 2000);
    }, 2500);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac']}
          style={styles.backgroundGradient}
        />
        
        <SafeAreaView style={styles.container}>
          <View style={styles.successContainer}>
            <Card style={styles.successCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.98)', 'rgba(248, 250, 252, 0.95)']}
                style={styles.successGradient}
              >
                <View style={styles.successIcon}>
                  <CheckCircle size={100} color={Colors.success} />
                  <View style={styles.successSparkles}>
                    <Sparkles size={24} color={Colors.secondary} />
                    <Star size={20} color={Colors.primary} />
                    <Sparkles size={18} color={Colors.success} />
                  </View>
                </View>
                
                <Text style={styles.successTitle}>Prayer Submitted! 🙏</Text>
                <Text style={styles.successMessage}>
                  Your prayer is now in the loving hands of our faithful prayer warriors. 
                  God hears every prayer, and we're standing with you in unwavering faith.
                </Text>
                
                <View style={styles.successStats}>
                  <View style={styles.successStat}>
                    <Users size={20} color={Colors.primary} />
                    <Text style={styles.successStatText}>52,847 prayer warriors notified</Text>
                  </View>
                  <View style={styles.successStat}>
                    <Globe size={20} color={Colors.secondary} />
                    <Text style={styles.successStatText}>Prayers ascending worldwide</Text>
                  </View>
                  <View style={styles.successStat}>
                    <Heart size={20} color={Colors.error} />
                    <Text style={styles.successStatText}>Covered in divine love & faith</Text>
                  </View>
                </View>

                <View style={styles.successActions}>
                  <Button
                    title="🙏 Submit Another Prayer"
                    onPress={() => {
                      setPrayerRequest('');
                      setName('');
                      setSelectedCategory(prayerCategories[0]);
                      setIsSubmitted(false);
                    }}
                    style={styles.successButton}
                  />
                </View>
              </LinearGradient>
            </Card>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fef7ff', '#fae8ff', '#f3e8ff', '#e9d5ff']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerIconContainer}>
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary, '#FFB74D']}
                  style={styles.headerIcon}
                >
                  <Heart size={40} color={Colors.white} fill={Colors.white} />
                </LinearGradient>
                <View style={styles.headerGlow}>
                  <LinearGradient
                    colors={['rgba(33, 150, 243, 0.3)', 'transparent']}
                    style={styles.glowCircle}
                  />
                </View>
              </View>
              
              <Text style={styles.title}>Share Your Prayer Request</Text>
              <Text style={styles.subtitle}>
                Our global community of prayer warriors is ready to lift you up in faith and love
              </Text>
            </View>

            {/* Community Promise */}
            <Card style={styles.promiseCard}>
              <LinearGradient
                colors={[Colors.primaryLight, Colors.secondaryLight, '#FFF9C4']}
                style={styles.promiseGradient}
              >
                <View style={styles.promiseIcon}>
                  <Shield size={32} color={Colors.primary} />
                </View>
                <Text style={styles.promiseTitle}>Our Sacred Prayer Community Promise</Text>
                <Text style={styles.promiseText}>
                  Your prayer requests are treated with divine love, complete confidentiality, and profound respect. 
                  Our prayer soldiers commit to praying for each request with compassion and unwavering faith.
                </Text>
                <View style={styles.promiseStats}>
                  <View style={styles.promiseStat}>
                    <Users size={18} color={Colors.primary} />
                    <Text style={styles.promiseStatText}>52,847+ Prayer Warriors</Text>
                  </View>
                  <View style={styles.promiseStat}>
                    <Heart size={18} color={Colors.primary} />
                    <Text style={styles.promiseStatText}>24/7 Prayer Coverage</Text>
                  </View>
                  <View style={styles.promiseStat}>
                    <Globe size={18} color={Colors.primary} />
                    <Text style={styles.promiseStatText}>127 Countries United</Text>
                  </View>
                </View>
              </LinearGradient>
            </Card>

            {/* Form */}
            <View style={styles.form}>
              <Card style={styles.formCard}>
                <Text style={styles.formTitle}>Your Sacred Prayer Request</Text>
                
                {/* Category Selection */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Prayer Category</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedCategory}
                      onValueChange={setSelectedCategory}
                      style={styles.picker}
                    >
                      {prayerCategories.map((category) => (
                        <Picker.Item
                          key={category}
                          label={category}
                          value={category}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Your Name (Optional)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name or leave blank to remain anonymous"
                    placeholderTextColor={Colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                    multiline={false}
                  />
                  <Text style={styles.inputHint}>
                    💝 Many choose to share their name to build deeper community connections
                  </Text>
                </View>

                {/* Prayer Request */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>What's on your heart? *</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Share what's weighing on your heart. Our prayer warriors will lift you up in prayer with divine love and unwavering faith. Be as specific or general as you feel comfortable sharing..."
                    placeholderTextColor={Colors.textSecondary}
                    value={prayerRequest}
                    onChangeText={setPrayerRequest}
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical="top"
                  />
                  <Text style={styles.inputHint}>
                    🙏 The more you share, the more specifically we can intercede for you in prayer
                  </Text>
                </View>

                <Button
                  title={isSubmitting ? 'Sending to Prayer Warriors...' : '🙏 Submit Prayer Request'}
                  onPress={handleSubmitPrayer}
                  disabled={isSubmitting}
                  style={styles.submitButton}
                />
              </Card>
            </View>

            {/* Bible Verse */}
            <Card style={styles.verseCard}>
              <LinearGradient
                colors={[Colors.secondaryLight, '#fef3c7', '#fde68a']}
                style={styles.verseGradient}
              >
                <View style={styles.verseIcon}>
                  <Sparkles size={28} color={Colors.secondary} />
                </View>
                <Text style={styles.verseText}>
                  "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                </Text>
                <Text style={styles.verseReference}>Philippians 4:6</Text>
              </LinearGradient>
            </Card>

            <View style={styles.bottomSpacing} />
          </ScrollView>
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
    shadowColor: Colors.primary,
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
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 17,
    paddingHorizontal: 8,
  },
  promiseCard: {
    marginHorizontal: 24,
    marginBottom: 28,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  promiseGradient: {
    padding: 24,
    alignItems: 'center',
    borderRadius: 20,
  },
  promiseIcon: {
    marginBottom: 16,
  },
  promiseTitle: {
    ...Typography.subheading,
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  promiseText: {
    ...Typography.body,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    fontSize: 16,
  },
  promiseStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  promiseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  promiseStatText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  form: {
    paddingHorizontal: 24,
  },
  formCard: {
    marginBottom: 28,
    borderRadius: 20,
  },
  formTitle: {
    ...Typography.heading,
    color: Colors.text,
    marginBottom: 28,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 28,
  },
  inputLabel: {
    ...Typography.subheading,
    color: Colors.text,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  picker: {
    height: 60,
  },
  textInput: {
    ...Typography.body,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    padding: 20,
    color: Colors.text,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 160,
    textAlignVertical: 'top',
  },
  inputHint: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 12,
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 20,
  },
  submitButton: {
    marginTop: 12,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successCard: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 24,
  },
  successGradient: {
    width: '100%',
    alignItems: 'center',
    padding: 40,
    borderRadius: 24,
  },
  successIcon: {
    position: 'relative',
    marginBottom: 24,
  },
  successSparkles: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
  },
  successTitle: {
    ...Typography.title,
    color: Colors.success,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
  },
  successMessage: {
    ...Typography.body,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 28,
    fontSize: 17,
  },
  successStats: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  successStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.2)',
  },
  successStatText: {
    ...Typography.bodySmall,
    color: Colors.text,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  successActions: {
    width: '100%',
  },
  successButton: {
    paddingVertical: 18,
    borderRadius: 20,
  },
  bottomSpacing: {
    height: 48,
  },
});