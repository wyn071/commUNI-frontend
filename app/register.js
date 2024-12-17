import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios'; // Import axios
import styles from '../styles/styles'; // Import styles
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register = () => {
  const [activeTab, setActiveTab] = useState('Student');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  const [department, setDepartment] = useState('');
  const router = useRouter(); // Initialize router

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

  // Function to enforce numeric input and limits
  const handleBirthdayInput = (value, field) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (field === 'month') {
      if (numericValue <= 12) setMonth(numericValue);
    } else if (field === 'day') {
      if (numericValue <= 31) setDay(numericValue);
    } else if (field === 'year') {
      if (numericValue.length <= 4) setYear(numericValue);
    }
  };

  // Handle registration
  const handleRegister = () => {
    const birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  
    // Validate mandatory fields
    setFirstNameVerify(firstName !== '');
    setLastNameVerify(lastName !== '');
    setEmailVerify(email !== '');
    setPasswordVerify(password !== '');
    setBirthdayVerify(birthday !== '--' && month !== '' && day !== '' && year !== '');
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
      birthday,
    };
  
    console.log('Sending data:', userData); // Log the data
  
    // Check if all required fields are filled
    if (firstName && lastName && email && password && birthday && idNumber && program) {
      axios
        .post('http://192.168.1.24:5003/register', userData)
        .then((res) => {
          console.log(res.data);
          // Pass the userData to the next screen (StartScreen)
          router.push({
            pathname: 'startscreen',
            params: { userData: JSON.stringify(userData) }, // Pass as string
          });
        })
        .catch((error) => {
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
            <View style={styles.registerrow}>
              <TextInput
                placeholder="MM"
                keyboardType="numeric"
                style={[styles.registerinput, styles.registersmallInput]}
                value={month}
                onChangeText={(value) => handleBirthdayInput(value, 'month')}
                maxLength={2}
              />
              <TextInput
                placeholder="DD"
                keyboardType="numeric"
                style={[styles.registerinput, styles.registersmallInput]}
                value={day}
                onChangeText={(value) => handleBirthdayInput(value, 'day')}
                maxLength={2}
              />
              <TextInput
                placeholder="YYYY"
                keyboardType="numeric"
                style={[styles.registerinput, styles.registersmallInput]}
                value={year}
                onChangeText={(value) => handleBirthdayInput(value, 'year')}
                maxLength={4}
              />
            </View>
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
    <View style={styles.registerScreenContainer}>
      <Text style={styles.registerLogo}>CommUNI</Text>

      {/* Tab Switcher */}
      <View style={styles.registerTabContainer}>
        <TouchableOpacity
          style={[styles.registertabButton, activeTab === 'Student' && styles.registeractiveTabButton]}
          onPress={() => setActiveTab('Student')}
        >
          <Text style={[styles.registertabText, activeTab === 'Student' && styles.registeractiveTabText]}>
            Student
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.registertabButton, activeTab === 'Faculty' && styles.registeractiveTabButton]}
          onPress={() => setActiveTab('Faculty')}
        >
          <Text style={[styles.registertabText, activeTab === 'Faculty' && styles.registeractiveTabText]}>
            Faculty
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      {renderForm()}
    </View>
  );
};

export default Register;
