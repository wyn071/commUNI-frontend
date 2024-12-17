import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles'; // Import styles

const interestList = [
  '‘90s kid', 'Harry Potter', 'SoundCloud', 'Spa', 'Self-care', 'Heavy metal',
  'House parties', 'Gin & tonic', 'Gymnastics', 'Ludo', 'Maggi', 'Hot yoga',
  'Biryani', 'Meditation', 'Sushi', 'Spotify', 'Hockey', 'Basketball',
  'Slam poetry', 'Home workouts', 'Theatre', 'Café hopping', 'Trainers', 
  'Aquarium', 'Instagram', 'Hot springs', 'Walking', 'Running', 'Travel',
  'Language exchange', 'Films', 'Guitarists', 'Social development', 'Gym',
  'Social media', 'Hip hop', 'Skincare', 'J-Pop', 'Cricket', 'Shisha', 
  'Freelance', 'K-Pop', 'Skateboarding', 'Gospel', 'Potterhead', 
  'Trying new things', 'Photography', 'Bollywood', 'Bhangra', 'Reading',
  'Singing', 'Sports', 'Poetry', 'Stand-up comedy', 'Coffee', 'Karaoke',
  'Fortnite', 'Free diving', 'Self-development', 'Mental health awareness',
  'Foodie tour', 'Voter rights', 'Jiu-jitsu', 'Climate change'
];

const Interests = () => {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      // Remove interest if already selected
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else if (selectedInterests.length < 6) {
      // Add interest if less than 6 are selected
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      // Alert user if trying to select more than 6 interests
      Alert.alert('Limit Reached', 'You can select up to 6 interests only.');
    }
  };

  const handleContinue = () => {
    if (selectedInterests.length === 0) {
      Alert.alert('No Interests Selected', 'Please select at least one interest to continue.');
    } else {
      // Show welcome message
      Alert.alert(
        'Thank you for Registering!', 
        'Welcome to CommUNI!', 
        [{ text: 'OK', onPress: () => navigation.navigate('dashboard', { interests: selectedInterests }) }]
      );
    }
  };

  return (
    <View style={styles.interestContainer}>
      {/* Header with Back Arrow and Skip Button */}
      <View style={styles.interestHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.interestBackArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.interestTitle}>Interests</Text>
        <TouchableOpacity onPress={() => navigation.navigate('dashboard')}>
          <Text style={styles.interestSkipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.interestSubtitle}>
        Select up to 6 interests to help us recommend the best clubs and organizations!
      </Text>

      {/* Scrollable Interests */}
      <ScrollView contentContainerStyle={styles.interestScroll}>
        {interestList.map((interest, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest) ? styles.selectedInterestButton : null,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text
              style={[
                styles.interestButtonText,
                selectedInterests.includes(interest) ? styles.selectedInterestText : null,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.interestContinueButton} onPress={handleContinue}>
        <Text style={styles.interestContinueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Interests;
