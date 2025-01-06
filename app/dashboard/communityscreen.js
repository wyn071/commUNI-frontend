// CommunityScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Animated, Alert, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles"; // Adjust this path as needed
import images from "../../assets/images"; // Import the images object
import HomeScreen, { addNewPosts } from "./homescreen";


const communityData = [
  { id: 1, name: "Blockchain Builders", tags: ["Blockchain", "Crypto"], logo: images.blockchainBuilders },
  { id: 2, name: "AI Coders Hub", tags: ["AI", "Coding", "Projects"], logo: images.aiCodersHub },
  { id: 3, name: "Data Science Hub", tags: ["Data Science", "Analytics"], logo: images.dataScienceHub }, //
  { id: 4, name: "CyberSec Experts", tags: ["Cybersecurity", "Ethical Hacking"], logo: images.cyberSecExperts },
  { id: 5, name: "Cloud Heroes", tags: ["Cloud Computing", "AWS", "Azure"], logo: images.cloudHeroes },
  { id: 6, name: "Tech Innovators Guild", tags: ["Technology", "AI", "Web Dev"], logo: images.techInnovatorsGuild }, //
  { id: 7, name: "Startup Founders", tags: ["Innovation", "Business"], logo: images.startupFounders },
  { id: 8, name: "Open Source Contributors", tags: ["Open Source", "GitHub"], logo: images.openSourceContributors },
  { id: 9, name: "AI Think Tank", tags: ["Artificial Intelligence", "Deep Learning"], logo: images.aiThinkTank },
  { id: 10, name: "Grishaverse Fans", tags: ["Six of Crows", "Shadow and Bone", "Fantasy"], logo: images.grishaverseFans }, //
  { id: 11, name: "Fourth Wing", tags: ["Fourth Wing", "Fantasy", "Young Adult"], logo: images.fourthWing }, //
  { id: 12, name: "Potterheads", tags: ["Harry Potter", "Wizardry", "Fantasy"], logo: images.potterheads },
  { id: 13, name: "Literature", tags: ["Fantasy", "Dystopia", "Literature"], logo: images.literature },
  { id: 14, name: "Game Developers", tags: ["Game Dev", "Unity", "Unreal"], logo: images.gameDevelopers },
  { id: 15, name: "AI Pioneers", tags: ["Artificial Intelligence", "Machine Learning"], logo: images.aipioneers },
  { id: 16, name: "Creative Writing Club", tags: ["Fiction", "Poetry", "Writing"], logo: images.creativeWritingClub },
  { id: 17, name: "Meditation & Mindfulness", tags: ["Meditation", "Wellness", "Self-care"], logo: images.meditationClub },
  { id: 18, name: "Digital Media Creators", tags: ["Social Media", "Content Creation", "Marketing"], logo: images.digitalMediaCreators },
  { id: 19, name: "Cultural Exchange Society", tags: ["Language Exchange", "Culture", "Travel"], logo: images.culturalExchange },
  { id: 20, name: "Cybersecurity Warriors", tags: ["Cybersecurity", "Ethical Hacking", "Security"], logo: images.cybersecurityWarriors },
  { id: 21, name: "Climate Action Group", tags: ["Climate Change", "Sustainability", "Activism"], logo: images.climateAction },
  { id: 22, name: "Self-Development & Growth", tags: ["Self-development", "Mental Health", "Motivation"], logo: images.selfDevelopment },
  { id: 23, name: "Slam Poetry Collective", tags: ["Slam Poetry", "Poetry", "Spoken Word"], logo: images.slamPoetry },
  // { id: 24, name: "Guitarists Collective", tags: ["Guitar", "Music", "Creativity"], logo: images.guitaristsCollective },
  // { id: 25, name: "Sports Enthusiasts", tags: ["Basketball", "Football", "Sports"], logo: images.sportsEnthusiasts },
  // { id: 26, name: "Yoga and Wellness Society", tags: ["Yoga", "Wellness", "Fitness"], logo: images.yogaWellness },
  // { id: 27, name: "Film Buffs", tags: ["Films", "Cinema", "Movies"], logo: images.filmBuffs },
  // { id: 28, name: "Tech Entrepreneurs", tags: ["Innovation", "Entrepreneurship", "Startups"], logo: images.techEntrepreneurs },
  // { id: 29, name: "Healthy Living Club", tags: ["Nutrition", "Self-care", "Healthy Lifestyle"], logo: images.healthyLiving },
  // { id: 30, name: "Environmental Science Club", tags: ["Environmental Science", "Sustainability", "Nature"], logo: images.environmentalScience },
  // { id: 31, name: "Virtual Reality Pioneers", tags: ["Virtual Reality", "Tech", "Gaming"], logo: images.virtualRealityPioneers },
  // { id: 32, name: "Self-Care Society", tags: ["Mental Health", "Self-care", "Relaxation"], logo: images.selfCareSociety },
  // { id: 33, name: "Global Travel Network", tags: ["Travel", "Culture", "Language Exchange"], logo: images.globalTravel },
  // { id: 34, name: "Creative Arts Collective", tags: ["Poetry", "Literature", "Art"], logo: images.creativeArtsCollective },
  // { id: 35, name: "Food Lovers Club", tags: ["Food", "Sushi", "Culinary Arts"], logo: images.foodLoversClub },
  // { id: 36, name: "Bollywood Dance Society", tags: ["Bollywood", "Dance", "Cultural Arts"], logo: images.bollywoodDance },
  // { id: 37, name: "J-Pop & K-Pop Fans", tags: ["J-Pop", "K-Pop", "Music"], logo: images.jPopKPopFans },
  // { id: 38, name: "Social Impact Network", tags: ["Social Development", "Activism", "Community Service"], logo: images.socialImpactNetwork },
  // { id: 39, name: "Culinary Innovation Society", tags: ["Food", "Culinary Arts", "Innovation"], logo: images.culinaryInnovation },
  // { id: 40, name: "Bhangra Dance Crew", tags: ["Bhangra", "Dance", "Culture"], logo: images.bhangraDanceCrew },
  // { id: 41, name: "Startup Incubators", tags: ["Startups", "Innovation", "Business"], logo: images.startupIncubators },
  // { id: 42, name: "Gospel Music Collective", tags: ["Gospel", "Music", "Community"], logo: images.gospelMusicCollective },
  // { id: 43, name: "Music Production Club", tags: ["Music", "Production", "Sound"], logo: images.musicProductionClub },
  // { id: 44, name: "Entrepreneurship Network", tags: ["Business", "Startups", "Innovation"], logo: images.entrepreneurshipNetwork },
  // { id: 45, name: "Photography Club", tags: ["Photography", "Arts", "Creativity"], logo: images.photographyClub },
  // { id: 46, name: "Digital Designers", tags: ["Design", "Tech", "Creative"], logo: images.digitalDesigners },
  // { id: 47, name: "Tech Startup Founders", tags: ["Startups", "Innovation", "Business"], logo: images.techStartupFounders },
  // { id: 48, name: "Young Adult Fiction Society", tags: ["Young Adult", "Literature", "Books"], logo: images.youngAdultFiction },
  // { id: 49, name: "Film Production Group", tags: ["Film Production", "Movies", "Cinema"], logo: images.filmProductionGroup }
];

const CommunityScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cardPosition = new Animated.Value(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track likeCount with state
  // let likeCount = 0;

  const handleLike = () => {
    // setIsRequestSent(true);
    // setTimeout(() => {
    //   setIsRequestSent(false);
    // }, 2000);
    // Alert.alert("Request Sent");
    // Show custom modal
    animateCard(true);
    setIsModalVisible(true);
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
    console.log(likeCount); // Logs the updated likeCount
  };

  // const handleLikesUpdate = () => {
  //   addNewPosts();
  //   addNewNotifications();
  //   addNewMessages();
  // };

  // useEffect(() => {
  //   if (likeCount >= 5) {
  //     handleLikesUpdate();
  //     likeCount = 0; // Reset the counter
  //   }
  // }, [likeCount]);

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
            source={communityData[currentIndex].logo}
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


      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalText}>Request Sent</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={modalStyles.modalButton}>
              <Text style={modalStyles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    // fontWeight: "bold",
    color: "#635EE2",
  },
  modalButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#635EE2",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});


export default CommunityScreen;