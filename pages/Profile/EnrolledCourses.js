import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { getEnrollmentCourses } from "../../services/EnrollementAPI";
import { TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { AuthContext } from "../../context/auth";
import {
  generateContentCertificate,
  generateCertificate,
} from "../../services/portfolioService";

const EnrolledCourses = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await getEnrollmentCourses(state?.user._id); // Pass the correct userId
        setCoursesData(fetchedData);
        console.log("Enrolled courses data: ", fetchedData);
      } catch (error) {
        setError(error);
        console.log("Error fetching enrollment data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    /*
    const generatecertif = async () => {
      generateCertificate(
        generateContentCertificate("ferjania", "html", "12-12-2024")
      );
    };

    generatecertif();

    */
  }, []); // Empty dependency array ensures it only runs on mount

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enrolled Courses</Text>
        <Text style={styles.headerSubtitle}>Keep going !</Text>
      </View>
      <View style={styles.courseContainer}>
        {coursesData === undefined ? (
          <Text style={styles.notFound}> No courses enrolled yet !!! </Text>
        ) : (
          coursesData.map((course, index) => (
            <TouchableOpacity
              style={styles.courseBox}
              key={index}
              onPress={() =>
                navigation.navigate("Units", {
                  courseID: course.idCourse,
                  course: course.courseName,
                })
              }
            >
              <Text style={styles.courseTitle}>{course.courseName}</Text>
              <Progress.Bar
                progress={course.overalProgress}
                width={120}
                color={"#FCC329"}
              />
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1246",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 80,
    position: "absolute",
    left: 110,
    top: 60,
  },
  headerTitle: {
    color: "#35E9BC",
    fontSize: 18,
    fontWeight: "500",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 36,
  },
  viewShot: {
    width: 500,
    height: 400,
  },
  webView: {
    flex: 1,
  },
  courseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 150,
  },
  courseBox: {
    width: 142,
    height: 91,
    backgroundColor: "#7659F1",
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  courseTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 30,
  },
});

export default EnrolledCourses;
