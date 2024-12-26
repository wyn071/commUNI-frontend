import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import axios
import styles from '../styles/styles'; // Import styles
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the DateTimePicker

const Register = () => {
  const [activeTab, setActiveTab] = useState('Student');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date()); // Store the selected birthday
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [showDatePicker, setShowDatePicker] = useState(false); // Show date picker flag
  const router = useRouter(); // Initialize router

  // Get the current date and set the maximum date to 2024
  const currentDate = new Date();
  const maxDate = new Date(2024, 11, 31); // December 31, 2024

  // Validation states for each field
  const [firstNameVerify, setFirstNameVerify] = useState(true);
  const [lastNameVerify, setLastNameVerify] = useState(true);
  const [emailVerify, setEmailVerify] = useState(true);
  const [passwordVerify, setPasswordVerify] = useState(true);
  const [birthdayVerify, setBirthdayVerify] = useState(true);
  const [idNumberVerify, setIdNumberVerify] = useState(true);
  const [programVerify, setProgramVerify] = useState(true);

  // Function to capitalize the first letter
  const capitalizeFirstLetter = (text) => {
    return text.replace(/^\w/, (c) => c.toUpperCase());
  };

  // Handle registration
  const handleRegister = () => {
    const birthdayFormatted = `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`;
  
    // Validate mandatory fields
    setFirstNameVerify(firstName !== '');
    setLastNameVerify(lastName !== '');
    setEmailVerify(email !== '');
    setPasswordVerify(password !== '');
    setBirthdayVerify(birthdayFormatted !== '--' && birthday !== '');
    setIdNumberVerify(idNumber !== '');
    setProgramVerify(program !== '');
  
    // Log the data being sent to the server
    const userData = {
      firstName,
      lastName,
      email,
      password,
      idNumber,
      program,
      birthday: birthdayFormatted,
    };
  
    console.log('Sending data:', userData); // Log the data
  
    // Check if all required fields are filled
    if (firstName && lastName && email && password && birthdayFormatted && idNumber && program) {
      setLoading(true); // Start loading animation
      axios
        .post('http://192.168.198.236:5003/register', userData)
        .then((res) => {
          console.log(res.data);
          // Pass the userData to the next screen (StartScreen)
          router.push({
            pathname: 'startscreen',
            params: { userData: JSON.stringify(userData) }, // Pass as string
          });
        })
        .catch((error) => {
          setLoading(false); // Stop loading animation
          if (error.response) {
            console.log('Response error:', error.response.data);
            Alert.alert('Error', `Server Error: ${error.response.data}`);
          } else if (error.request) {
            console.log('Request error:', error.request);
            Alert.alert('Error', 'No response from server');
          } else {
            console.log('Error', error.message);
            Alert.alert('Error', `Error: ${error.message}`);
          }
        });
    } else {
      Alert.alert('Please fill in all mandatory fields');
    }
  };

  // Show Date Picker handler
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && selectedDate <= maxDate) {
      setBirthday(selectedDate); // Set birthday only if the date is within the allowed range
    } else {
      Alert.alert('Error', 'Please select a date before 2024');
    }
  };

  // Render form
  const renderForm = () => {
    return (
      <ScrollView style={styles.registerScreenContainer}>
        <View style={styles.registerContainer}>
          {/* First Name */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>First Name</Text>
            <TextInput
              placeholder="Enter first name"
              style={styles.registerinput}
              value={firstName}
              onChangeText={(text) => setFirstName(capitalizeFirstLetter(text))}
            />
          </View>

          {/* Last Name */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Last Name</Text>
            <TextInput
              placeholder="Enter last name"
              style={styles.registerinput}
              value={lastName}
              onChangeText={(text) => setLastName(capitalizeFirstLetter(text))}
            />
          </View>

          {/* Birthday */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Birthday</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.registerinput}>
              <Text style={styles.registerinputText}>
                {birthday.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={maxDate} // Set max date to December 31, 2024
              />
            )}
          </View>

          {/* Email */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Email</Text>
            <TextInput
              placeholder="Enter email"
              style={styles.registerinput}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* ID Number */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>ID Number</Text>
            <TextInput
              placeholder="Enter ID number"
              keyboardType="numeric"
              style={styles.registerinput}
              value={idNumber}
              onChangeText={(value) => setIdNumber(value.replace(/[^0-9]/g, ''))} // Only numbers
            />
          </View>

          {/* Password */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Password</Text>
            <TextInput
              placeholder="Enter password"
              secureTextEntry
              style={styles.registerinput}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Conditional Fields */}
          {activeTab === 'Student' ? (
            <View style={styles.registerinputContainer}>
              <Text style={styles.registerlabel}>Program</Text>
              <TextInput
                placeholder="Enter program"
                style={styles.registerinput}
                value={program}
                onChangeText={setProgram}
              />
            </View>
          ) : (
            <View style={styles.registerinputContainer}>
              <Text style={styles.registerlabel}>Department</Text>
              <TextInput
                placeholder="Enter department"
                style={styles.registerinput}
                value={department}
                onChangeText={setDepartment}
              />
            </View>
          )}

          {/* Terms and Policy */}
          <TouchableOpacity
            style={styles.registertermsContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <MaterialCommunityIcons
              name={termsAccepted ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
            />
            <Text style={styles.registertermsText}>
              I accept the terms and privacy policy
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.registerbutton} onPress={handleRegister}>
            <Text style={styles.registerbuttonText}>Create account</Text>
          </TouchableOpacity>

          <Text style={styles.orRegisterWithText}>Or register with</Text>

          <View style={styles.registersocialContainer}>
            <MaterialCommunityIcons name="facebook" size={32} />
            <MaterialCommunityIcons name="google" size={32} />
            <MaterialCommunityIcons name="apple" size={32} />
          </View>

          <Text style={styles.registerfooterText}>
            Already have an account?{' '}
            <Text
              style={styles.registerfooterLink}
              onPress={() => router.push('login')}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.registerScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <Text style={styles.registerLogo}>CommUNI</Text>

      {/* Tab Switcher */}
      <View style={styles.registerTabContainer}>
        <Text style={[styles.registertabText, activeTab === 'Student' && styles.registeractiveTabText]}>
          Student Registration
        </Text>
      </View>

      {/* Form */}
      {renderForm()}

      {/* Loading Screen */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Register;
