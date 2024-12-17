import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';  // Correct hook for accessing route params
import axios from 'axios';
import styles from '../styles/styles';

const questionsData = [
  { id: 1, text: "You enjoy social gatherings." },
  { id: 2, text: "You often get excited by new ideas." },
  { id: 3, text: "You prefer working in groups rather than alone." },
  { id: 4, text: "You often feel energized by social interactions." },
  { id: 5, text: "You prefer to focus on the present rather than the future." },
  { id: 6, text: "You enjoy trying new things and taking risks." },
  { id: 7, text: "You tend to be more practical than imaginative." },
  { id: 8, text: "You often find yourself thinking about the future." },
  { id: 9, text: "You prefer to make decisions based on logic rather than feelings." },
  { id: 10, text: "You often find yourself analyzing situations objectively." },
  { id: 11, text: "You enjoy spending time with others more than being by yourself." },
  { id: 12, text: "You prefer a well-structured and organized environment." },
  { id: 13, text: "You are more comfortable with flexibility than with rules." },
  { id: 14, text: "You tend to be more spontaneous rather than planning ahead." },
  { id: 15, text: "You find it easy to make decisions based on logic and facts." },
  { id: 16, text: "You are more inclined to follow rules and traditions." },
  { id: 17, text: "You value social harmony and avoid conflict." },
  { id: 18, text: "You prefer to stay in your comfort zone rather than try new things." },
  { id: 19, text: "You are more focused on the details than the big picture." },
  { id: 20, text: "You tend to be more reserved in expressing your emotions." }
];

const QuestionsScreen = () => {
  const route = useRoute();  // Access route params using useRoute
  const { userData } = route.params || {};  // Extract userData from route params

  // Check if userData exists
  if (!userData) {
    return <Text>Failed to load user data.</Text>;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [mbtiType, setMbtiType] = useState('');

  const handleAnswer = (score) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = score;
    setAnswers(updatedAnswers);

    if (currentQuestion === questionsData.length - 1) {
      const mbtiType = calculateMBTI(updatedAnswers);
      setMbtiType(mbtiType);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateMBTI = (answers) => {
    const E = answers.slice(0, 5).reduce((a, b) => a + b, 0);
    const S = answers.slice(5, 10).reduce((a, b) => a + b, 0);
    const T = answers.slice(10, 15).reduce((a, b) => a + b, 0);
    const J = answers.slice(15, 20).reduce((a, b) => a + b, 0);

    const extroverted = E > 15 ? "E" : "I";
    const sensing = S > 15 ? "S" : "N";
    const thinking = T > 15 ? "T" : "F";
    const judging = J > 15 ? "J" : "P";

    return extroverted + sensing + thinking + judging;
  };

  const handleTestSubmit = async () => {
    if (!userData || !userData.email) {
      console.error('User data or email is not available');
      return;
    }

    console.log('Submitting MBTI:', { email: userData.email, mbtiType });

    try {
      const updatedUserData = { 
        email: userData.email, 
        mbtiType 
      };

      const response = await axios.post('http://192.168.1.24:5003/updateUserData', updatedUserData);

      if (response.data.status === 'ok') {
        console.log('User updated successfully:', response.data);
        // Navigate to next screen (if needed)
      } else {
        console.error('Backend Error:', response.data);
      }
    } catch (error) {
      console.error('Error updating MBTI:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {questionsData[currentQuestion].text}
      </Text>

      <View style={styles.questionbuttonContainer}>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => handleAnswer(5)}
        >
          <Text style={styles.answerText}>Agree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => handleAnswer(3)}
        >
          <Text style={styles.answerText}>Neutral</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => handleAnswer(1)}
        >
          <Text style={styles.answerText}>Disagree</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.questionCounter}>
        Question {currentQuestion + 1} of {questionsData.length}
      </Text>

      {currentQuestion === questionsData.length - 1 && (
        <TouchableOpacity style={styles.submitButton} onPress={handleTestSubmit}>
          <Text style={styles.submitButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionsScreen;
