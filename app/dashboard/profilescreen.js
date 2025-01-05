import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router'; // Import router for navigation
import { useRoute } from '@react-navigation/native'; // Import useRoute to access params
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from 'expo-image-picker';

// teddy = https://i.ibb.co/yN9ftfq/teddy-bear.jpg
// grey = https://i.ibb.co/2Yy9JM4/your-image.jpg
// emptypfp = https://i.ibb.co/x1DvXZN/empty-pfp.jpg

export default function ProfileScreen() {
  const router = useRouter(); // Initialize the router
  const route = useRoute(); // Access the route object
  const { userData, selectedInterests, newPost } = route.params || {}; // Extract userData and selectedInterests from route.params
  const parsedUserData = userData ? JSON.parse(userData) : {}; // Parse userData back to an object

  let processedInterests = selectedInterests;

  if (typeof selectedInterests === "string") {
    processedInterests = selectedInterests.split(",").map((selectedInterests) => selectedInterests.trim());
  }

  const [interestsArray, setInterestsArray] = useState([]);
  const firstName = parsedUserData.firstName;
  const lastName = parsedUserData.lastName;
  const fullName = `${firstName} ${lastName}`;
  const department = parsedUserData.department;
  const program = parsedUserData.program;
  const yearlevel = parsedUserData.yearlevel;
  const [profilePicture, setProfilePicture] = useState(parsedUserData.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');
  const [headerImage, setHeaderImage] = useState(parsedUserData.headerImage || 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg');

  const getRandomProfileImage = (id) => {
    return `https://picsum.photos/seed/${id}/50`;
  };
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        newPost.id === id
          ? {
            ...newPost,
            likedByUser: !post.likedByUser,
            likes: post.likedByUser ? newPost.likes - 1 : newPost.likes + 1,
          }
          : newPost
      )
    );
  };

  useEffect(() => {
    fetchUserImagesAndInterests();
    // Check if selectedInterests is a string and convert it to an array
    if (typeof selectedInterests === 'string') {
      setInterestsArray(selectedInterests.split(','));
    } else {
      setInterestsArray(selectedInterests || []);
    }
  }, [selectedInterests]); // Only rerun when selectedInterests changes


  const fetchUserImagesAndInterests = async () => {
    try {
      const response = await fetch('http://192.168.1.53:5003/get-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsedUserData.email }),
      });

      const rawText = await response.text();
      try {
        const data = JSON.parse(rawText);
        if (data.status === 'ok') {
          setProfilePicture(data.user.profilePicture || 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg');
          setHeaderImage(data.user.headerImage || 'https://i.ibb.co/2Yy9JM4/emptyheader.jpg');
          setInterestsArray(data.user.selectedInterests || []);
        } else {
          // Alert.alert('Error', data.message || 'Failed to fetch user data.');
        }
      } catch {
        console.error('Server returned invalid JSON:', rawText);
        Alert.alert('Error', 'Invalid server response.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'An error occurred while fetching user data.');
    }
  };
  const handleLogout = () => {
    // Logic for logging out can go here, such as clearing tokens or state
    console.log('Logging out...');
    router.replace('/login'); // Navigate to the login screen
  };

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri); // Update the image state with the selected URI
    }
  };

  const saveImages = async () => {
    try {
      const response = await fetch("http://<YOUR_BACKEND_URL>/update-profile-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsedUserData.email,
          profilePicture,
          headerImage,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Profile images updated successfully!");
      } else {
        alert("Error updating profile images: " + data.data);
      }
    } catch (error) {
      console.error("Error saving profile images:", error);
      alert("An error occurred while saving your images.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: headerImage }} style={styles.headerImage} />

      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>

        <Image source={{ uri: profilePicture }} style={styles.profileImage} />

        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.bio}>
          {program}{"\n"}{department}{"\n"}{yearlevel}
        </Text>
        <Text style={styles.communities}>0 communities joined</Text>

        {/* Followers and Following */}
        <View style={styles.followSection}>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>0</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>0</Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.tagsContainer}>
          {interestsArray.map((selectedInterests, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{selectedInterests}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: '/editprofilescreen', // Navigate to edit profile screen
                params: { userData, selectedInterests },
              })
            }
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Text style={[styles.tabText, styles.activeTab]}>Posts</Text>
          <Text style={styles.tabText}>Reposts</Text>
          <Text style={styles.tabText}>Replies</Text>
          <Text style={styles.tabText}>Media</Text>
        </View>
      </View>

      {/* <View style={styles.postsSection}>
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg' }}
              style={styles.postAvatar}
            />
            <View>
              <Text style={styles.postTitle}>{fullName}</Text>
              <Text style={styles.postSubtitle}>{fullName} · {yearlevel} · {program} · Just now</Text>
            </View>
          </View>
          <Text style={styles.postContent}>Test</Text>
        </View>

        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: 'https://i.ibb.co/x1DvXZN/empty-pfp.jpg' }}
              style={styles.postAvatar}
            />
            <View>
              <Text style={styles.postTitle}>{fullName}</Text>
              <Text style={styles.postSubtitle}>{fullName} · {yearlevel} · {program} · Just now</Text>
            </View>
          </View>
          <Text style={styles.postContent}>Test</Text>
          <Image
            source={{ uri: 'https://i.ibb.co/yN9ftfq/teddy-bear.jpg' }}
            style={styles.postImage}
          />
        </View>
      </View> 
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%', // Make the image take the full width of the post
    height: 250,   // Set the height of the image
    borderRadius: 10, // Optional: Adds rounded corners
    marginTop: 10,    // Adds spacing between the text and the image
  },

  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    height: 150,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    padding: 15,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  bio: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
  },
  communities: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  followSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  followBox: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  followNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followLabel: {
    fontSize: 12,
    color: '#555',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#e7e7f3',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    color: '#555',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row', // Keep buttons in a row
    marginVertical: 10,
    justifyContent: 'space-around', // Space out the buttons evenly
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(99, 94, 226, 0.8)', // #635EE2 with 80% opacity
    paddingVertical: 8, // Maintain compact padding
    paddingHorizontal: 20,
    borderRadius: 10, // Slightly rounded corners
    marginHorizontal: 1,
    alignItems: 'center', // Center the text
  },
  buttonText: {
    color: '#fff', // White text for contrast
    fontWeight: '500',
    fontSize: 14,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTab: {
    color: '#333',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#333',
    paddingBottom: 5,
  },
  postsSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
  },
});

