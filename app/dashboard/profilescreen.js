import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import router for navigation

export default function App() {
  const router = useRouter(); // Initialize the router

  const handleLogout = () => {
    // Logic for logging out can go here, such as clearing tokens or state
    console.log('Logging out...');
    router.replace('/login'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://picsum.photos/seed/profile-bg/500/300' }}
          style={styles.headerImage}
        />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://picsum.photos/seed/profile/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Natalie Patt</Text>
        <Text style={styles.bio}>
          Bachelor of Science of Information Technology{"\n"}CITC Department{"\n"}Junior
        </Text>
        <Text style={styles.communities}>7 communities joined</Text>

        {/* Followers and Following */}
        <View style={styles.followSection}>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>152</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>241</Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {[
            'Poetry',
            'Photography',
            'Basketball',
            'Fiction',
            'Computer Programming',
            'Hip hop',
            'Harry Potter',
            'Web Development',
            'Machine Learning',
            'Volunteering',
          ].map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
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

      {/* Scrollable Posts */}
      <ScrollView style={styles.postsSection}>
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/post-icon/50/50' }}
              style={styles.postAvatar}
            />
            <View>
              <Text style={styles.postTitle}>Tech Innovators Guild</Text>
              <Text style={styles.postSubtitle}>Natalie Patt · Junior · BSIT · 2 weeks ago</Text>
            </View>
          </View>
          <Text style={styles.postContent}>
            Hi. I'm gearing up for my first hackathon this weekend, and I'd love some advice from
            experienced participants. What should I expect and how can I make the most out of it?
            Looking forward to your responses!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#e7e7f3',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#555',
    fontWeight: 'bold',
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
