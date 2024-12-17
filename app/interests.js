import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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

  return (
    <View style={styles.interestContainer}>
      {/* Header with Back Arrow and Skip Button */}
      <View style={styles.interestHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.interestBackArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.interestTitle}>Interests</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.interestSkipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.interestSubtitle}>
        Select your interests to help us recommend the best clubs and organizations!
      </Text>

      {/* Scrollable Interests */}
      <ScrollView contentContainerStyle={styles.interestScroll}>
        {interestList.map((interest, index) => (
          <TouchableOpacity key={index} style={styles.interestButton}>
            <Text style={styles.interestButtonText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.interestContinueButton}>
        <Text style={styles.interestContinueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Interests;