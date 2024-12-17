import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/styles";

const data = [
  {
    id: 1,
    name: "R3D ONE",
    tags: ["Hip Hop", "Street Dance", "Choreography", "Competitive Dance", "Freestyle"],
    image: require("../assets/star.png"),
  },
  {
    id: 2,
    name: "Dance Crew A",
    tags: ["Ballet", "Classical", "Contemporary"],
    image: require("../assets/star.png"),
  },
  {
    id: 3,
    name: "Fusion Dance",
    tags: ["Jazz", "Modern", "Salsa"],
    image: require("../assets/star.png"),
  },
  {
    id: 4,
    name: "Flex Crew",
    tags: ["Popping", "Locking", "Freestyle"],
    image: require("../assets/star.png"),
  },
  {
    id: 5,
    name: "Soul Dance",
    tags: ["Soul", "Hip-Hop", "Freestyle"],
    image: require("../assets/star.png"),
  },
  {
    id: 6,
    name: "Pop Crew",
    tags: ["Pop", "Dancehall", "Breakdance"],
    image: require("../assets/star.png"),
  },
  {
    id: 7,
    name: "Street Kings",
    tags: ["Street Dance", "Freestyle"],
    image: require("../assets/star.png"),
  },
  {
    id: 8,
    name: "Urban Dance",
    tags: ["Hip-Hop", "Contemporary", "Freestyle"],
    image: require("../assets/star.png"),
  },
  {
    id: 9,
    name: "Groove Masters",
    tags: ["Breakdance", "Hip-Hop", "Popping"],
    image: require("../assets/star.png"),
  },
  {
    id: 10,
    name: "Vibe Crew",
    tags: ["Freestyle", "Hip-Hop", "Popping"],
    image: require("../assets/star.png"),
  },
  // Add more cards as needed, ensuring they all have an image property
];

export default function App() {
  const [cardIndex, setCardIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (cardIndex >= data.length) {
      setCardIndex(0); // Reset the card index when we reach the end of the array
    }
  }, [cardIndex]);

  const handleSwipeRight = () => {
    console.log("Liked:", data[cardIndex]?.name);
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
  };

  const handleSwipeLeft = () => {
    console.log("Passed:", data[cardIndex]?.name);
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
  };

  const handleButtonLike = () => {
    console.log("Liked via button:", data[cardIndex]?.name);
    // Ensure we are not triggering an infinite loop
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
    setCardIndex((prev) => (prev + 1) % data.length); // Move to next card after liking
  };

  const handleButtonPass = () => {
    console.log("Passed via button:", data[cardIndex]?.name);
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
    setCardIndex((prev) => (prev + 1) % data.length); // Move to next card after passing
  };

  return (
    <View style={styles.swipeContainer}>
      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        cards={data.filter((card) => card !== null && card !== undefined)} // Filter out invalid cards
        renderCard={(card) => {
          if (!card || !card.image) {
            return (
              <View style={styles.swipeCard}>
                <Text style={styles.swipeTitle}>No Image Available</Text>
              </View>
            );
          }
          return (
            <View style={styles.swipeCard}>
              <Image source={card.image} style={styles.swipeImage} />
              <Text style={styles.swipeTitle}>{card.name}</Text>
              <View style={styles.swipeTagsContainer}>
                {card.tags.map((tag, index) => (
                  <View key={index} style={styles.swipeTag}>
                    <Text style={styles.swipeTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        }}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        cardIndex={cardIndex}
        backgroundColor="white"
        stackSize={2}
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: { backgroundColor: "#FF0000", color: "white", fontSize: 20, padding: 10 },
              wrapper: { alignItems: "flex-end", justifyContent: "center" },
            },
          },
          right: {
            title: "LIKE",
            style: {
              label: { backgroundColor: "#00FF00", color: "white", fontSize: 20, padding: 10 },
              wrapper: { alignItems: "flex-start", justifyContent: "center" },
            },
          },
        }}
      />

      {/* Buttons */}
      <View style={styles.swipeButtonContainer}>
        <TouchableOpacity style={styles.swipePassButton} onPress={handleButtonPass}>
          <MaterialCommunityIcons name="close" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.swipeLikeButton} onPress={handleButtonLike}>
          <MaterialCommunityIcons name="plus" size={40} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
