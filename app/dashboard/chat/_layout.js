import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import ChatScreen from "./chatscreen"; // Import the ChatScreen component

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true); // Add this state to check if user is new

  // Sample groups
  const groups = [
    { id: "1", name: "Tech Innovators Guild", message: "Don’t miss this opportunity guys!" },
    { id: "2", name: "Chess Club USC", message: "Need to warm up before the regional match!" },
    { id: "3", name: "Student Government Ass.", message: "Speaking of the showcase, just a heads up..." },
    // More groups...
  ];

  // Render group list
  const renderGroup = ({ item }) => (
    <TouchableOpacity style={styles.chatGroupItem} onPress={() => setSelectedGroup(item)}>
      <View style={styles.chatGroupContent}>
        <Image
          source={{ uri: `https://picsum.photos/50?random=${item.id}` }} // Random image for each group
          style={styles.chatGroupImage}
        />
        <View style={styles.textContent}>
          <Text style={styles.chatGroupName}>{item.name}</Text>
          <Text style={styles.chatGroupMessage}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.chatContainer}>
      {/* Home Screen */}
      {!selectedGroup ? (
        <>
          <Text style={styles.chatHeader}>Messages</Text>
          {isNewUser ? (
            <View style={styles.emptyMessagesContainer}>
              <Text style={styles.emptyMessagesText}>No messages yet</Text>
            </View>
          ) : (
            <FlatList data={groups} renderItem={renderGroup} keyExtractor={(item) => item.id} />
          )}
        </>
      ) : (
        /* Chat Screen */
        <ChatScreen group={selectedGroup} onBack={() => setSelectedGroup(null)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 20, // Added some padding to avoid top cutoff
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  chatGroupItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center", // Ensure items are aligned properly
  },
  chatGroupContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatGroupImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 15, // Space between image and text
  },
  textContent: {
    flex: 1, // Ensure text content takes up available space
  },
  chatGroupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Ensure the name text is visible
  },
  chatGroupMessage: {
    color: "#888",
    marginTop: 3,
  },
  emptyMessagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessagesText: {
    fontSize: 18,
    color: "#888",
  },
});

export default App;
