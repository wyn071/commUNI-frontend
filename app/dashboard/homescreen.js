import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles"; // Adjust this path to your stylesheet

const HomeScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      user: "Tech Innovators Guild",
      time: "15 mins ago",
      content: "Hey Techies! Join us this Friday for an AI workshop.",
      image: "https://picsum.photos/400/200?random=1",
      likes: 14,
      comments: [],
    },
    {
      id: "2",
      user: "Chess Club USC",
      time: "30 mins ago",
      content: "Join our chess tournament this December 20th at DRER Hall!",
      image: "https://picsum.photos/400/200?random=2",
      likes: 147,
      comments: ["Can't wait!", "Good luck everyone!"],
    },
    {
      id: "3",
      user: "Fourth Wing Club",
      time: "1 hour ago",
      content: "Check out our latest book review session this weekend!",
      image: "https://picsum.photos/400/200?random=3",
      likes: 35,
      comments: ["Sounds fun!", "I'm joining!"],
    },
    {
      id: "4",
      user: "Natalie Patt",
      time: "2 hours ago",
      content: "Excited for the next hackathon! Who else is joining?",
      image: "https://picsum.photos/400/200?random=4",
      likes: 90,
      comments: ["Me too!", "Best of luck!"],
    },
    {
      id: "5",
      user: "John Smith",
      time: "3 hours ago",
      content: "The basketball league starts this Friday. Get ready!",
      image: "https://picsum.photos/400/200?random=5",
      likes: 70,
      comments: ["Go team!", "Can't wait!"],
    },
    {
      id: "6",
      user: "Machine Learning Society",
      time: "4 hours ago",
      content:
        "Hands-on deep learning workshop this Thursday. Limited slots available!",
      image: "https://picsum.photos/400/200?random=6",
      likes: 120,
      comments: ["Amazing!", "Signed up already!"],
    },
    {
      id: "7",
      user: "Creative Writing Club",
      time: "5 hours ago",
      content: "Submit your short stories for this month's contest!",
      image: "https://picsum.photos/400/200?random=7",
      likes: 45,
      comments: ["Where to submit?", "Excited for this!"],
    },
    {
      id: "8",
      user: "David Ramos",
      time: "6 hours ago",
      content: "Volunteering event happening this weekend. Come join us!",
      image: "https://picsum.photos/400/200?random=8",
      likes: 55,
      comments: ["I'm in!", "Great initiative!"],
    },
    {
      id: "9",
      user: "Poetry Club",
      time: "Yesterday",
      content: "Join us for a night of poetry reading at the library!",
      image: "https://picsum.photos/400/200?random=9",
      likes: 60,
      comments: ["Count me in!", "Love poetry nights!"],
    },
    {
      id: "10",
      user: "Hiking Enthusiasts",
      time: "2 days ago",
      content: "New trail discovered! Meet us Saturday for the hike.",
      image: "https://picsum.photos/400/200?random=10",
      likes: 80,
      comments: ["Where's the meetup?", "Looking forward to this!"],
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAddPost = () => {
    if (newPost.trim() === "" && !selectedImage) return;

    setPosts([
      {
        id: Date.now().toString(),
        user: "You",
        time: "Just now",
        content: newPost,
        image: selectedImage,
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
    setNewPost("");
    setSelectedImage(null);
  };

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <View style={styles.homeContainer}>
      {/* Post Input Container */}
      <View style={styles.postInputContainer}>
        <Image
          source={{ uri: "https://picsum.photos/50/50" }}
          style={styles.avatar}
        />
        <TextInput
          style={styles.postInput}
          placeholder="Share something..."
          value={newPost}
          onChangeText={setNewPost}
        />
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="images" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      )}

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: "https://picsum.photos/seed/user/50" }}
                style={styles.postAvatar}
              />
              <View>
                <Text style={styles.postUser}>{item.user}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
            <View style={styles.postActions}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Ionicons name="heart" size={20} color="red" />
                <Text>{item.likes} Likes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
