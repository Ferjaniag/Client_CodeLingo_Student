import React, { useEffect, useState, useContext } from "react";
import Dialog from "react-native-dialog";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { createEnrollementCourse } from "../../services/EnrollementAPI";
import { getEnrollementCourses } from "../../services/CourseAPI";
import { getUnitsByIdCourse } from "../../services/UnitAPI";
import * as Progress from "react-native-progress";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";

export default function CoursesSection({ idCourse, title, description }) {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);

  const [visibleEnroll, setVisibleEnroll] = useState(false);
  const [dataEnroll, setDataEnroll] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false); // Change initial state to false by default
  const [loadingEnrollStatus, setLoadingEnrollStatus] = useState(true); // New state to handle loadingconst navigation = useNavigation();
  const [overalProgress, setOveralProgress] = useState(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (state?.user._id) {
        setLoadingEnrollStatus(true); // Start loading enrollment status
        const enrolled = await isEnrolledCourse(idCourse);
        setIsEnrolled(enrolled);
        setLoadingEnrollStatus(false); // Enrollment check is done
      }
    };

    checkEnrollment();
  }, [state?.user._id, idCourse]); // Add userId to dependencies

  const showDialog = () => {
    setVisibleEnroll(true);
  };

  const closeDialog = () => {
    setVisibleEnroll(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      isEnrolledCourse(idCourse);
    }, [])
  );

  const isEnrolledCourse = async (idCourse) => {
    let result = false;
    try {
      const enrollmentsData = await getEnrollementCourses(state?.user._id);

      if (enrollmentsData.length > 0) {
        result = enrollmentsData.some(
          (enrollment) => enrollment.idCourse === idCourse
        );
        const progress =
          enrollmentsData.find((enrollment) => enrollment.idCourse === idCourse)
            ?.overalProgress || 0;

        setOveralProgress(Math.floor(progress));
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
    return result;
  };

  const enrollCourse = async () => {
    try {
      const units = await getUnitsByIdCourse(idCourse);

      const data = {
        idUser: state?.user._id,
        idCourse: idCourse,
        units: units,
      };
      setDataEnroll(data);
      const enroll = await createEnrollementCourse(data);
      navigation.navigate("Units", { courseID: idCourse, course: title });
      setVisibleEnroll(false);
    } catch (error) {
      console.log("Error enrolling in course", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (isEnrolled) {
            navigation.navigate("Units", { courseID: idCourse, course: title });
          } else {
            ToastAndroid.show(
              "You need to enroll in this course before continuing!",
              ToastAndroid.SHORT
            );
          }
        }}
      >
        <LinearGradient
          colors={["#7659F1", "rgba(118, 89, 241, 0.28)"]}
          style={styles.sectionContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>

          {loadingEnrollStatus ? ( // Show loading state while enrollment is being checked
            <Text>Checking enrollment status...</Text>
          ) : isEnrolled ? (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() =>
                navigation.navigate("Units", {
                  courseID: idCourse,
                  course: title,
                })
              }
            >
              <Text style={styles.buttonText}>
                Continue Learning {overalProgress}%
              </Text>
              <Progress.Bar
                progress={overalProgress / 100}
                width={120}
                color={"#FCC329"}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => showDialog()}
            >
              <Text style={styles.buttonText}>Enroll</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <Dialog.Container visible={visibleEnroll} contentStyle={styles.dialog}>
        <Dialog.Description style={styles.descDialog}>
          Would you like to enroll in the {title} course? Begin the course now!
        </Dialog.Description>
        <Dialog.Button
          style={styles.labelDialog}
          label="Cancel"
          onPress={closeDialog}
        />
        <Dialog.Button
          style={styles.labelDialog}
          label="Start"
          onPress={enrollCourse}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 35,
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    borderRadius: 15,
    height: 150,
    width: 340,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionDescription: {
    fontSize: 14,
    color: "white",
    paddingTop: 30,
    textAlign: "center",
  },

  button: {
    //padding : 10 ,
    width: 110,
    marginTop: 5,
    height: 30,
    backgroundColor: "#FCC329",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    margin: 5,
  },

  continueButton: {
    //padding : 10 ,
    width: "auto",
    marginTop: 4,
    height: "auto",
    padding: 5,

    backgroundColor: "#35E9BC",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    alignItems: "center",
  },
  titleDialog: {
    color: "#1F1244",
    fontFamily: "sans-serif",
    fontSize: 15,
  },
  descDialog: {
    color: "#1F1244",
    fontFamily: "sans-serif",
    fontSize: 14,
  },

  labelDialog: {
    color: "#7659F1",
    fontFamily: "sans-serif",
    fontSize: 15,
  },

  dialog: {
    borderRadius: 10,
    backgroundColor: "#FFF7FC",

    borderRadius: 20,
  },
});
