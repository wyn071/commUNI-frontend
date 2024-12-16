import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  const handleRegister = async () => {
    // Log to check if function is being triggered
    console.log('Register button pressed');
  
    // Validate required fields
    if (!email || !password || !idNumber || !firstName || !lastName || !month || !day || !year || birthday === "--") {
      alert("All fields are required and birthday must be valid.");
      return;
    }
  
    // Construct the birthday string
    const birthday = `${month}-${day}-${year}`;
    
    console.log('Birthday:', birthday); // Log to check the birthday format
  
    // Validate user type (activeTab)
    if (!['Student', 'Faculty'].includes(activeTab)) {
      alert('Invalid user type');
      return;
    }
  
    const userData = {
      firstName,
      lastName,
      email,
      password,
      idNumber,
      birthday,
      activeTab,
      program: activeTab === 'Student' ? program : undefined, // Send undefined if not applicable
      department: activeTab === 'Faculty' ? department : undefined, // Send undefined if not applicable
    };
  
    console.log('Sending data to backend:', userData);
  
    if (!termsAccepted) {
      alert('You must accept the terms and privacy policy');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.24:5001/register', userData);
      console.log('Response:', response.data); // Log response data
      if (response.data.status === 'ok') {
        router.push('/personality-test'); // Navigate to personality test page
      } else {
        alert('Registration failed: ' + response.data.data);
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log error details
      alert('Error during registration');
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
          style={[
            styles.registertabButton,
            activeTab === 'Student' && styles.registeractiveTabButton,
          ]}
          onPress={() => setActiveTab('Student')}
        >
          <Text
            style={[
              styles.registertabText,
              activeTab === 'Student' && styles.registeractiveTabText,
            ]}
          >
            Student
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registertabButton,
            activeTab === 'Faculty' && styles.registeractiveTabButton,
          ]}
          onPress={() => setActiveTab('Faculty')}
        >
          <Text
            style={[
              styles.registertabText,
              activeTab === 'Faculty' && styles.registeractiveTabText,
            ]}
          >
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
