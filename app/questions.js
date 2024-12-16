import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Import axios to make the POST request
import styles from '../styles/styles';

// Questions for MBTI quiz
const questionsData = [
  { id: 1, text: "You enjoy social gatherings." },
  { id: 2, text: "You often get excited by new ideas." },
  { id: 3, text: "You focus on the present rather than future possibilities." },
  { id: 4, text: "You prefer details over abstract concepts." },
  { id: 5, text: "You tend to make decisions based on logic and reason." },
  { id: 6, text: "You value harmony and avoid conflict." },
  { id: 7, text: "You like to plan things ahead of time." },
  { id: 8, text: "You prefer to stay flexible and spontaneous." },
  { id: 9, text: "You feel energized after interacting with people." },
  { id: 10, text: "You prefer facts over theories." },
  { id: 11, text: "You trust your intuition more than sensory details." },
  { id: 12, text: "You tend to think out loud." },
  { id: 13, text: "You enjoy analyzing problems logically." },
  { id: 14, text: "You consider people's feelings before making decisions." },
  { id: 15, text: "You stick to schedules and deadlines." },
  { id: 16, text: "You like having multiple options open." },
  { id: 17, text: "You prefer working in teams." },
  { id: 18, text: "You find abstract concepts exciting." },
  { id: 19, text: "You prefer structured routines." },
  { id: 20, text: "You like surprises and adapt easily to change." },
];

const QuestionsScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [mbtiType, setMbtiType] = useState('');
  const router = useRouter();

  // Handle answer selection
  const handleAnswer = (score) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = score;
    setAnswers(updatedAnswers);

    if (currentQuestion === questionsData.length - 1) {
      // Finish quiz and calculate MBTI
      const mbtiType = calculateMBTI(updatedAnswers);
      setMbtiType(mbtiType);
    } else {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // MBTI Calculation Logic
  const calculateMBTI = (answers) => {
    const E = answers.slice(0, 5).reduce((a, b) => a + b, 0); // Extroversion vs Introversion
    const S = answers.slice(5, 10).reduce((a, b) => a + b, 0); // Sensing vs Intuition
    const T = answers.slice(10, 15).reduce((a, b) => a + b, 0); // Thinking vs Feeling
    const J = answers.slice(15, 20).reduce((a, b) => a + b, 0); // Judging vs Perceiving

    const extroverted = E > 15 ? "E" : "I";
    const sensing = S > 15 ? "S" : "N";
    const thinking = T > 15 ? "T" : "F";
    const judging = J > 15 ? "J" : "P";

    return extroverted + sensing + thinking + judging;
  };

  // Handle the submission of MBTI result to the server
  const handleTestSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/update-mbti', { mbtiType });
      if (response.data.status === 'ok') {
        router.push('/interest-selection');
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error("Error updating MBTI:", error);
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
          onPress={() => handleAnswer(5)} // Agree
        >
          <Text style={styles.answerText}>Agree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => handleAnswer(3)} // Neutral
        >
          <Text style={styles.answerText}>Neutral</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => handleAnswer(1)} // Disagree
        >
          <Text style={styles.answerText}>Disagree</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.questionCounter}>
        Question {currentQuestion + 1} of {questionsData.length}
      </Text>

      {/* Once the quiz is completed, show the submit button */}
      {currentQuestion === questionsData.length && (
        <TouchableOpacity style={styles.submitButton} onPress={handleTestSubmit}>
          <Text style={styles.submitButtonText}>Submit MBTI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionsScreen;
