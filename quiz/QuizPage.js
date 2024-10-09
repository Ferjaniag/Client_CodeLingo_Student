import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuizPage = ({ route }) => {
  const quizId = route.params.quizId;
  const [state, setState] = useContext(AuthContext);

  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState();

  const navigation = useNavigation();
  const fetchUser = async () => {
    const dataString = await AsyncStorage.getItem("@auth");
    const data = JSON.parse(dataString);
    setState(data);
    console.log(state.user._id);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timerInterval);
        navigation.navigate("Result", { quizId });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);
  //!fetching quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/getQuiz/${quizId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setQuizDetails(data);
          console.log(quizDetails);
          setTimer(data.quizDuration);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
    fetchQuiz();
  }, [quizId]);

  //! fetching questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${process.env.API_URL}/getQuestions/${quizId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();

        if (res.ok) {
          setQuestions(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchQuestions();
  }, [quizId, currentQuestionIndex]);

  //! if user wanted to change question
  const handleOptionChange = async (option) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];

      updatedAnswers[currentQuestionIndex] = option;
      console.log(updatedAnswers);
      return updatedAnswers;
    });

    try {
      await fetch(
        `${process.env.API_URL}/updateResult/${state.user._id}/${quizId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: [...userAnswers, option],
          }),
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
    } else {
      navigation.navigate("Result", { quizId });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icon-back.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* <Text style={styles.title}>Quiz Title: {quizDetails.quizName}</Text> */}
      </View>

      <View style={styles.questionContainer}>
        <Text>Time remaining: {timer} seconds </Text>

        <Text style={styles.questionText}>
          {questions[currentQuestionIndex]?.content}
        </Text>

        {questions[currentQuestionIndex]?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              userAnswers[currentQuestionIndex] === option &&
                styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionChange(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1244",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
  },
  selectedOptionButton: {
    backgroundColor: '#cce5ff',
},
  icon: {
    position: "absolute",
    left: 20,
    top: 0,
    width: 35,
    height: 35,
  },
  title: {
    color: "#35E9BC",
    fontSize: 18,
  },
  questionContainer: {
    backgroundColor: "#FFF7FC",
    width: "95%",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    minHeight: "70%",
  },
  questionText: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: "#333333",
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#7659F1",
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default QuizPage;
