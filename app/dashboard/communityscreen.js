// CommunityScreen.js
import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles"; // Adjust this path as needed


const communityData = [
    { id: 1, name: "Tech Innovators Guild", tags: ["Technology", "AI", "Web Dev"], logo: "https://picsum.photos/400/300?random=1" },
    { id: 2, name: "AI Pioneers", tags: ["Artificial Intelligence", "Machine Learning"], logo: "https://picsum.photos/400/300?random=2" },
    { id: 3, name: "Web Wizards", tags: ["Web Development", "Front-End", "CSS"], logo: "https://picsum.photos/400/300?random=3" },
    { id: 4, name: "Startup Founders", tags: ["Innovation", "Business"], logo: "https://picsum.photos/400/300?random=4" },
    { id: 5, name: "Cloud Heroes", tags: ["Cloud Computing", "AWS", "Azure"], logo: "https://picsum.photos/400/300?random=5" },
    { id: 6, name: "Mobile Developers", tags: ["React Native", "iOS", "Android"], logo: "https://picsum.photos/400/300?random=6" },
    { id: 7, name: "Data Science Hub", tags: ["Data Science", "Analytics"], logo: "https://picsum.photos/400/300?random=7" },
    { id: 8, name: "CyberSec Experts", tags: ["Cybersecurity", "Ethical Hacking"], logo: "https://picsum.photos/400/300?random=8" },
    { id: 9, name: "Blockchain Builders", tags: ["Blockchain", "Crypto"], logo: "https://picsum.photos/400/300?random=9" },
    { id: 10, name: "Game Developers", tags: ["Game Dev", "Unity", "Unreal"], logo: "https://picsum.photos/400/300?random=10" },
    { id: 11, name: "AR/VR Innovators", tags: ["AR", "VR", "Mixed Reality"], logo: "https://picsum.photos/400/300?random=11" },
    { id: 12, name: "Open Source Contributors", tags: ["Open Source", "GitHub"], logo: "https://picsum.photos/400/300?random=12" },
    { id: 13, name: "AI Think Tank", tags: ["Artificial Intelligence", "Deep Learning"], logo: "https://picsum.photos/400/300?random=13" },
    { id: 14, name: "DevOps Masters", tags: ["DevOps", "CI/CD", "Jenkins"], logo: "https://picsum.photos/400/300?random=14" },
    { id: 15, name: "UI/UX Designers", tags: ["UI/UX", "Design", "Figma"], logo: "https://picsum.photos/400/300?random=15" },
    { id: 16, name: "Coding Ninjas", tags: ["Programming", "Competitive Coding"], logo: "https://picsum.photos/400/300?random=16" },
    { id: 17, name: "IoT Explorers", tags: ["IoT", "Hardware"], logo: "https://picsum.photos/400/300?random=17" },
    { id: 18, name: "Tech Mentors", tags: ["Mentorship", "Tech Guidance"], logo: "https://picsum.photos/400/300?random=18" },
    { id: 19, name: "Full Stack Devs", tags: ["Full Stack", "Node.js", "React"], logo: "https://picsum.photos/400/300?random=19" },
    { id: 20, name: "AI Coders Hub", tags: ["AI", "Coding", "Projects"], logo: "https://picsum.photos/400/300?random=20" },
  ];
const CommunityScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [cardPosition] = useState(new Animated.Value(0));

  const handleLike = () => {
    animateCard(true);
  };

  const handlePass = () => {
    animateCard(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const animateCard = (liked) => {
    const offset = liked ? 500 : -500;
    Animated.timing(cardPosition, {
      toValue: offset,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      cardPosition.setValue(0);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % communityData.length);
    });
  };

  return (
    <View style={styles.dashboardContainer}>
      {currentIndex < communityData.length ? (
        <Animated.View style={[styles.cardContainer, { transform: [{ translateX: cardPosition }] }]}>
          <ImageBackground
            source={{ uri: communityData[currentIndex].logo }}
            style={styles.cardImageBackground}
            imageStyle={styles.cardImage}
            onLoad={handleImageLoad}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>{communityData[currentIndex].name}</Text>
              <View style={styles.cardTags}>
                {communityData[currentIndex].tags.map((tag, index) => (
                  <Text key={index} style={styles.cardTag}>
                    {tag}
                  </Text>
                ))}
              </View>
              {isImageLoading && (
                <ActivityIndicator size="large" color="white" style={styles.loader} />
              )}
              <View style={styles.cardButtons}>
                <TouchableOpacity onPress={handlePass} style={styles.button}>
                  <Ionicons name="close-circle" size={100} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike} style={styles.button}>
                  <Ionicons name="add-circle" size={100} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      ) : (
        <Text style={styles.noMoreText}>No more communities!</Text>
      )}
    </View>
  );
};

export default CommunityScreen;
