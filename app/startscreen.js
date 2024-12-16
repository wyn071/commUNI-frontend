import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import styles from '../styles/styles';

const StartScreen = () => {
  const navigation = useNavigation();

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
        onPress={() => navigation.navigate('questions')}
      >
        <Text style={styles.testButtonText}>Take the test</Text>
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
