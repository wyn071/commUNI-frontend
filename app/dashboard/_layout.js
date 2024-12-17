import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const DashboardLayout = () => {
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
      <Tabs.Screen
        name="homescreen"
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
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
        name="profilescreen"
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={24} color="black" />
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
    </Tabs>
  );
};

export default DashboardLayout;
