import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Result = ({ route }) => {
  const navigation = useNavigation();
  const quizId = route.params.quizId;
  const [state, setState] = useContext(AuthContext);

  const [quizDetails, setquizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [resultAnswers, setResultAnswers] = useState([]);
  const [status, setStatus] = useState("");
  const [commonValues, setCommonValues] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const dataString = await AsyncStorage.getItem("@auth");
      const data = JSON.parse(dataString);
      setState(data);
    };

    fetchUser();
  }, []);

  //!fetching quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/getQuiz/${quizId}`, {
          method: "GET",
        });
        const data = await res.json();
        console.log("again");
        if (res.ok) {
          setquizDetails(data);
          console.log(quizDetails);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
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
        console.log("again");

        if (res.ok) {
          setQuestions(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchQuestions();
  }, [quizId]);

  //!fetch result
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(
          `${process.env.API_URL}/getOneResult/${state.user._id}/${quizId}`
        );
        const data = await res.json();

        notifyUser(
          data.quizName,
          new Date(data.createdAt).toISOString().split("T")[0]
        );
        if (res.ok) {
          setResultAnswers(data.answers);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };

    fetchResult();
  }, [state.user._id, quizId]);

  useEffect(() => {
    const questionObjects = createQuestionObjects();

    if (quizDetails) {
      compareArrays(questionObjects, resultAnswers);

      const updateStatus = async () => {
        try {
          await fetch(
            `${process.env.API_URL}/updateResult/${state.user._id}/${quizId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                points: point,
                resultStatus: status,
              }),
            }
          );
          console.log("again");
        } catch (error) {
          console.log(error.message);
        }
      };

      updateStatus();
    }
  }, [questions, point, resultAnswers, quizDetails]);

  const notifyUser = async (quizName, date) => {
    try {
      let userData = {
        reciever: state?.user.email,
        name: state?.user.username,
        course: quizName,
        date: date,
      };
      console.log("test notify !!");
      console.log("user data notify", userData);
      const respo = await axios.post(`${process.env.API_URL}/notify`, userData);
      ToastAndroid.show(
        "Congratulations! Please check your email to get your certificate",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.log("error notifying user ", error);
    }
  };

  const createQuestionObjects = () => {
    return questions.map((question) => question.correctOption);
  };

  const compareArrays = (questionObjects, resultAnswers) => {
    const cv = questionObjects.filter((value) => resultAnswers.includes(value));
    setCommonValues(cv);
    const wa = quizDetails.totalMarks - cv.length;
    setWrongAnswers(wa);
    setPoint(cv.length);
    console.log("again");

    if (cv.length === quizDetails.totalMarks) {
      setStatus("Success");
    } else if (cv.length >= quizDetails.passingMarks) {
      setStatus("Passing");
    } else {
      setStatus("Fail");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizDetails && (
        <View style={styles.card}>
          <Text style={styles.title}>Result</Text>
          <Text style={styles.detail}>
            quiz Name: <Text style={styles.bold}>{quizDetails.quizName}</Text>
          </Text>
          <Text style={styles.detail}>
            Total questions:{" "}
            <Text style={styles.bold}>{quizDetails.totalMarks}</Text>
          </Text>
          <Text style={styles.detail}>
            Passing Marks:{" "}
            <Text style={styles.bold}>{quizDetails.passingMarks}</Text>
          </Text>
          <Text style={styles.detail}>
            Wrong Answers: <Text style={styles.bold}>{wrongAnswers}</Text>
          </Text>
          <Text style={styles.detail}>
            Result: <Text style={styles.bold}>{commonValues.length}</Text> out
            of <Text style={styles.bold}>{quizDetails.totalMarks}</Text>
          </Text>
          <Text style={styles.detail}>
            Status: <Text style={styles.bold}>{status}</Text>
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ListOfBadges")}
      >
        <Text style={styles.buttonText}>See badges</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1F1244",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Result;
