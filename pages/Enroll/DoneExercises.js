import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../context/auth";
import { getEnrollmentByIdCourse } from "../../services/EnrollementAPI";

export default function DoneExercise({
  courseId: courseId,
  courseName: courseName,
  unitName: unitName,
  unitID: unitID,
  lessonID: lessonID,
}) {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);
  const [enrollementData, setEnrollementData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getEnrollmentByIdCourse(courseId, state?.user._id);

        {
          /*  const dataEnr = data.progress?.find(
          (progressUnit) => progressUnit.unitId === unitID
        );  */
        }

        const unit = data.progress.find((unit) => unit.unitId === unitID);

        setEnrollementData(unit);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]); // Refetch data when ID changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Lesson Complete ! </Text>

      <Image
        source={require("../../assets/done-exercises.png")}
        style={styles.image}
      />
      <Text style={styles.title2}>
        {" "}
        Excellent work! Now, let's proceed to the next lesson.
      </Text>

      <TouchableOpacity
        style={[styles.buttonNext]}
        onPress={() =>
          navigation.navigate("Over-View-Lessons", {
            courseId: courseId,
            courseName: courseName,
            unitName: unitName,
            unitID: unitID,
            enrollementData: enrollementData,
          })
        }
      >
        <Image
          source={require("../../assets/chevron-right.png")}
          style={styles.iconNext}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#1F1244",
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "50%",
    height: "45%",
  },
  title2: {
    color: "#1F1244",
    fontFamily: "sans-serif",
    fontSize: 16,
    textAlign: "center",
  },

  buttonNext: {
    position: "relative",
    width: 70,
    height: 70,
    backgroundColor: "#7659F1",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  iconNext: {
    alignSelf: "center",
    width: 40,
    height: 40,
  },
});
