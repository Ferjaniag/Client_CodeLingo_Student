import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import UnitSection from "./UnitSection";
import { useNavigation } from "@react-navigation/native";
import { getUnitsByIdCourse } from "../../services/UnitAPI";
import QuizCard from "../quiz/QuizCard";
import { getEnrollmentByIdCourse } from "../../services/EnrollementAPI";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useFocusEffect } from "@react-navigation/native";
export default function UnitsScreen({ route }) {
  const navigation = useNavigation();
  const courseID = route.params.courseID;
  const course = route.params.course;

  const [unitsData, setUnitsData] = useState([]);
  const [enrollementData, setEnrollementData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnrollementData = async () => {
    setIsLoading(true);
    try {
      const data = await getEnrollmentByIdCourse(courseID);

      setEnrollementData(data[0]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getUnitsByIdCourse(courseID);
      setUnitsData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get specific enrollment data for a unit
  const getUnitEnrollmentData = (unitId) => {
    return enrollementData.progress?.find(
      (progressUnit) => progressUnit.unitId === unitId
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEnrollementData();
    }, [])
  );

  useEffect(() => {
    fetchEnrollementData();
    fetchData();
  }, [courseID]); // Refetch data when ID changes
  useEffect(() => {
    console.log("Enrollment Data progress:", enrollementData.overallProgress);
  }, [enrollementData]); // Log when enrollementData updates
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/icon-back.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.title}> Learning Path {course} </Text>
      </View>
      <View style={styles.underHeader}>
        <Text style={styles.courseName}> Keep going ! </Text>
        <AnimatedCircularProgress
          style={styles.progress}
          size={65}
          width={7}
          fill={Math.floor(enrollementData.overallProgress)}
          tintColor="#FCC329"
          backgroundColor="#332462"
        >
          {(fill) => (
            <Text style={styles.progressNumber}>
              {enrollementData.overallProgress !== undefined
                ? `${Math.floor(enrollementData.overallProgress)}%`
                : "%"}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <ScrollView>
        {unitsData.length === 0 ? (
          <Text style={styles.notFound}> No Units Published Yet ... </Text>
        ) : (
          unitsData.map((unit, index) => (
            <UnitSection
              key={index}
              courseId={courseID}
              unitID={unit._id}
              unitName={unit.title}
              courseName={course}
              enrollementData={getUnitEnrollmentData(unit._id)}
            />
          ))
        )}
      </ScrollView>

      <QuizCard courseID={courseID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1244",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: "#35E9BC",
    fontSize: 20,
    fontStyle: "italic",
    fontFamily: "sans-serif",
    marginTop: 60,
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
    // justifyContent : 'justify-content',
    margin: 5,
  },
  underHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  progress: {
    alignItems: "flex-end",
    marginLeft: 5,
  },
  progressNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  icon: {
    marginRight: 15,
    marginTop: 60,
    right: 65,
    width: 35,
    height: 35,
  },
  courseName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginTop: 25,
  },
  notFound: {
    color: "white",
    justifyContent: "center",
    alignItems: "flex-end",
    top: 150,
    fontSize: 20,
    fontStyle: "italic",
  },
});
