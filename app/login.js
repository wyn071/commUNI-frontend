import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link, useNavigation } from 'expo-router'; // Use Link for navigation
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/styles'; // Import your styles
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state for login
  const navigation = useNavigation();

  const handleLogin = () => {
    setLoading(true); // Start loading animation
    console.log('Email:', email);
    console.log('Password:', password);

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.198.236:5003/login-user', userData)
      .then((res) => {
        setLoading(false); // Stop loading animation
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Success', 'Logged in successfully!');
          navigation.navigate('dashboard'); // Redirect to Dashboard screen
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      })
      .catch((err) => {
        setLoading(false); // Stop loading animation
        console.error('Login Error:', err);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      });
  };

  return (
    <View
      style={styles.loginScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {/* Logo */}
      <View style={styles.loginLogoContainer}>
        <Image source={require('../assets/star.png')} style={styles.loginLogo} />
      </View>

      {/* Title */}
      <Text style={styles.loginTitle}>Log In</Text>

      {/* Scrollable Login Form */}
      <ScrollView style={styles.loginFormContainer}>
        {/* Email Input */}
        <View style={styles.loginInputContainer}>
          <Text style={styles.loginLabel}>Email or ID number</Text>
          <View style={styles.loginInputRow}>
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={styles.loginInput}
              keyboardType="email-address" // Ensures correct keyboard type
              autoCapitalize="none" // Prevents auto-capitalization for email
            />
            {email ? (
              <MaterialCommunityIcons name="check-circle" size={20} color="green" />
            ) : (
              <MaterialCommunityIcons name="check-circle" size={20} color="#ccc" />
            )}
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.loginInputContainer}>
          <Text style={styles.loginLabel}>Password</Text>
          <View style={styles.loginInputRow}>
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.loginInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.loginForgotPassword}>
          <Text style={styles.loginForgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Or Login With */}
        <Text style={styles.loginOrText}>Or login with</Text>
        <View style={styles.loginSocialContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="facebook" size={32} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="apple" size={32} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Register Redirect */}
      <Text style={styles.loginFooterText}>
        Don’t have an account?{' '}
        <Link href="/register" style={styles.loginFooterLink}>
          Sign up
        </Link>
      </Text>
    </View>
  );
};

export default Login;
