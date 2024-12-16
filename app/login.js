import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router'; // Use Link for navigation
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/styles'; // Import your styles

const Login = () => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.loginScreenContainer}>
      {/* Logo */}
      <Image source={require('../assets/star.png')} style={styles.loginLogo} />

      {/* Title */}
      <Text style={styles.loginTitle}>Log In</Text>

      {/* Email or ID Input */}
      <View style={styles.loginInputContainer}>
        <Text style={styles.loginLabel}>Email or ID number</Text>
        <View style={styles.loginInputRow}>
          <TextInput
            placeholder="Enter email or ID"
            value={emailOrId}
            onChangeText={setEmailOrId}
            style={styles.loginInput}
          />
          <MaterialCommunityIcons name="check-circle" size={20} color="#ccc" />
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

      {/* Log In Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Or Login With */}
      <Text style={styles.loginOrText}>Or login with</Text>
      <View style={styles.loginSocialContainer}>
        <MaterialCommunityIcons name="facebook" size={32} color="#4267B2" />
        <MaterialCommunityIcons name="google" size={32} color="#DB4437" />
        <MaterialCommunityIcons name="apple" size={32} color="#000" />
      </View>

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
