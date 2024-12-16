import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import styles from '../styles/styles'; // Import styles
import logo from '../assets/communi-logo.png'; // Path to logo file

const Index = () => {
  const router = useRouter(); // Initialize router

  return (
    <LinearGradient
      colors={['#E8A0A0', '#A0C4E8']}
      style={styles.gradientContainer}
    >
      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Image source={logo} style={styles.logo} />

        {/* Title */}
        <Text style={styles.title}>CommUNI</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Connect, Discover, Engage: {'\n'}Your Campus Community Awaits!
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* Log In Button */}
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => router.push('/register')} // Navigate to Register
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {/* Create Account Button */}
          <TouchableOpacity
            style={[styles.button, styles.createButton]}
            onPress={() => router.push('/register')} // Navigate to Register
          >
            <Text style={styles.buttonTextDark}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Index;
