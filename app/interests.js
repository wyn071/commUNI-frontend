import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'; // Import axios to make the POST request
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
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigation = useNavigation();

  // Handle the selection/deselection of interests
  const handleInterestChange = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      if (selectedInterests.length < 6) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        // Limit to 6 interests
        Alert.alert("Limit reached", "You can only select up to 6 interests.");
      }
    }
  };

  // Submit the selected interests to the backend
  const handleSubmitInterests = async () => {
    try {
      const response = await axios.post('http://192.168.1.24:5001/update-interests', { interests: selectedInterests });
      if (response.data.status === 'ok') {
        navigation.navigate('Home'); // Navigate to the Home screen if successful
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error("Error updating interests:", error);
    }
  };

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
          <TouchableOpacity
            key={index}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest) && styles.selectedInterestButton
            ]}
            onPress={() => handleInterestChange(interest)}
          >
            <Text style={styles.interestButtonText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.interestContinueButton}
        onPress={handleSubmitInterests}
      >
        <Text style={styles.interestContinueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Interests;
