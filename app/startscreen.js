import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';  // Correct router
import { useRoute } from '@react-navigation/native';  // Correct hook for accessing route params
import styles from '../styles/styles';  // Import your custom styles

const StartScreen = () => {
  const router = useRouter();
  const route = useRoute();  // Access the current route
  const { userData } = route.params || {};  // Extract userData from route params

  // Check if userData exists
  if (!userData) {
    return (
      <View style={styles.testContainer}>
        <Text>Failed to load user data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.testContainer}>
      <View style={styles.testHeader}>
        <Text style={styles.testTitle}>Take the Personality Test</Text>
        <Text style={styles.testSubtitle}>
          Answer a few quick questions to help us personalize your experience.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.testButtonPrimary}
        onPress={() => {
          // Pass userData to the next screen (QuestionsScreen)
          router.push({
            pathname: 'questions',  // The path to the questions screen
            params: { userData },  // Pass userData as params
          });
        }}
      >
        <Text style={styles.testButtonText}>Take the Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.testButtonSecondary}
        onPress={() => console.log('Skipped')}
      >
        <Text style={styles.testButtonTextSecondary}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
