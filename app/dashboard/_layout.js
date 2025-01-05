import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router'; // Import router for navigation
import { useRoute } from '@react-navigation/native'; // Import useRoute to access params
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const DashboardLayout = () => {
  console.log("We're in the Dashboard");
  const router = useRouter(); // Initialize the router
  const route = useRoute();  // Access the route object
  const { userData, selectedInterests } = route.params || {};  // Extract userData and selectedInterests from route.params

  console.log("Here is what was received from the Interests screen: ");
  console.log(userData);
  console.log(selectedInterests);

  const navToProfile = () => {
    console.log("navToProfile function called");
    console.log(userData);
    console.log(selectedInterests);
    // console.log("Your selected interests. These will show up on your profile!: ", selectedInterests);
    router.push({
      pathname: '/dashboard/profilescreen',
      params: { userData, selectedInterests },
    });
  };

  const navToFeed = () => {
    console.log("navToFeed function called");
    console.log("UserData tehee: ", userData);
    router.push({
      pathname: '/dashboard/homescreen',
      params: { userData, selectedInterests },
    });
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="communityscreen"
        options={{
          title: 'Community',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-group" size={24} color="black" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="homescreen"
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="homescreen"
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}  // Spread default tabBarButton props
              onPress={navToFeed}  // Custom onPress function
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notificationscreen"
        options={{
          title: 'Notifications',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="bell" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="chat" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profilescreen"
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={24} color="black" />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}  // Spread default tabBarButton props
              onPress={navToProfile}  // Custom onPress function
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
