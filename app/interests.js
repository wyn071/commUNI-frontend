import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles'; // Import styles
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';



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
  const route = useRoute();
  const router = useRouter();
  const { userData } = route.params || {};
  const parsedUserData = userData ? JSON.parse(userData) : {};  // Parse userData back to an object

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      // Remove interest if already selected
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else if (selectedInterests.length < 10) {
      // Add interest if less than 6 are selected
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      // Alert user if trying to select more than 6 interests
      Alert.alert('Limit Reached', 'You can select up to 10 interests only.');
    }
  };

  // const handleContinue = () => {
  //   if (selectedInterests.length === 0) {
  //     Alert.alert('No Interests Selected', 'Please select at least one interest to continue.');
  //   } else {
  //     // Show welcome message
  //     Alert.alert(
  //       'Thank you for Registering!', 
  //       'Welcome to CommUNI!', 
  //       [{ text: 'OK', onPress: () => navigation.navigate('dashboard', { interests: selectedInterests }) }]
  //     );
  //   }
  // };
  // const handleContinue = async () => {
  //   if (selectedInterests.length === 0) {
  //     Alert.alert('No Interests Selected', 'Please select at least one interest to continue.');
  //   } else {
  //     // Send the selected interests to the backend
  //     try {
  //       const response = await axios.post('http://192.168.1.53:5003/save-interests', {
  //         email: userData.email,  // Send the user's email
  //         selectedInterests: selectedInterests,  // Send the selected interests
  //       });

  //       if (response.data.status === 'ok') {
  //         // Navigate to the dashboard or next screen
  //         Alert.alert('Thank you for Selecting Interests!', 'Your interests have been saved.');
  //         navigation.navigate('dashboard', { interests: selectedInterests });
  //       } else {
  //         alert('Error saving interests');
  //       }
  //     } catch (error) {
  //       console.error('Error saving interests:', error);
  //       alert('Failed to save interests');
  //     }
  //   }
  // };

  // const handleContinue = async () => {
  //   console.log("Interests: ", selectedInterests); // Add this log to see if the function is executed
  //   if (!userData || !parseduserData.email) {
  //     Alert.alert('Error', 'User data is missing or email is undefined');
  //     return;
  //   }

  //   if (selectedInterests.length === 0) {
  //     Alert.alert('No Interests Selected', 'Please select at least one interest to continue.');
  //   } else {

  //     try {
  //       const response = await axios.post('http://192.168.1.53:5003/save-interests', {
  //         email: parsedUserData.email,  // Send the user's email
  //         selectedInterests: selectedInterests,  // Send the selected interests
  //       });

  //       if (response.data.status === 'ok') {
  //         // Navigate to the dashboard or next screen
  //         Alert.alert('Thank you for Selecting Interests!', 'Your interests have been saved.');
  //         // navigation.navigate('dashboard', { interests: selectedInterests });
  //       } else {
  //         alert('Error saving interests');
  //       }
  //     } catch (error) {
  //       console.error('Error saving interests:', error);
  //       alert('Failed to save interests');
  //     }
  //   }
  // }; // kani pwede

  const handleContinue = async () => {
    console.log("Interests: ", selectedInterests);  // Logs the selected interests to console
    if (!userData || !parsedUserData.email) {
      Alert.alert('Error', 'User data is missing or email is undefined');
      return;
    }
    if (selectedInterests.length === 0) {
      Alert.alert('No Interests Selected', 'Please select at least one interest to continue.');
    } else {
      try {
        const response = await axios.post('http://192.168.1.53:5003/save-interests', {
          email: parsedUserData.email,  // Send the user's email
          selectedInterests: selectedInterests,  // Send the selected interests
        });

        console.log("Response from server: ", response.data);  // Log the response to see what is returned

        if (response.data.status === 'ok') {
          Alert.alert('Your interests have been saved!', 'These will show up on your profile.');

          // router.push('/dashboard/communityscreen'); // Make sure the path is correct for the community screen

          router.push({
            pathname: '/dashboard',
            params: { userData, selectedInterests },
          });

        } else {
          alert('Error saving interests');
        }
      } catch (error) {
        console.error('Error saving interests:', error); ``
        alert('Failed to save interests');
      }
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
