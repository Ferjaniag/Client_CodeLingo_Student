import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import LessonBloc from "./LessonBloc";
import { getLessonsByUnit } from "../../services/LessonAPI";
import { useFocusEffect } from "@react-navigation/native";
export default function OverViewLessons({ route }) {
  const navigation = useNavigation();
  const courseName = route.params.courseName;
  const unitName = route.params.unitName;
  const unitID = route.params.unitID;
  const courseId = route.params.courseId;
  const enrollementData = route.params.enrollementData;
  const [lessonsData, setLessonsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //console.log('enrollement datttttaaa ', enrollementData)
  const isLessonCompleted = (idLesson) => {
    // enrollmentsData.find(enrollment => enrollment.idCourse === idCourse)?.overalProgress || 0;

    //   return lessonsData.find(lesson => lesson._id === enrollementData.lessons.)
    // Find the lesson with the given lessonId

    const lesson = enrollementData.lessons.find(
      (lesson) => lesson.lessonId === idLesson
    );

    //   console.log(' IS COMPLETED ?', lesson ? lesson.completed : false)
    // If lesson is found, return its "completed" status; otherwise, return false
    return lesson ? lesson.completed : false;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getLessonsByUnit(unitID);
      setLessonsData(data);
      console.log("Lessons Data : ", data.length);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  useEffect(() => {
    fetchData();
  }, [unitID]); // Refetch data when ID changes

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

        <Text style={styles.title}> Learning Path {courseName} </Text>
      </View>
      <View style={styles.underHeader}>
        <Text style={styles.unitTitle}> {unitName} </Text>

        <AnimatedCircularProgress
          style={styles.progress}
          size={55}
          width={7}
          fill={enrollementData.percentage}
          tintColor="#FCC329"
          backgroundColor="#332462"
        >
          {(fill) => (
            <Text style={styles.progressNumber}>
              {Math.floor(enrollementData.percentage)}%
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.blocContainer}>
        <ScrollView>
          {lessonsData.length === 0 ? (
            <Text style={styles.notFound}> No lessons published yet !!! </Text>
          ) : (
            lessonsData.map((lesson, index) => (
              <LessonBloc
                key={index}
                courseId={courseId}
                unitId={unitID}
                courseName={courseName}
                unitName={unitName}
                lessonNumber={index + 1}
                idLesson={lesson._id}
                lessonName={lesson.title}
                isDone={isLessonCompleted(lesson._id)}
              />
            ))
          )}
        </ScrollView>
      </View>
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
  icon: {
    marginRight: 15,
    marginTop: 60,
    right: 65,
    width: 35,
    height: 35,
  },
  unitTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    textAlign: "right",
  },
  progress: {
    alignItems: "flex-end",
    marginLeft: 5,
  },
  progressNumber: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  underHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  blocContainer: {
    //  alignContent : 'center',
    //  alignItems : 'center'
  },
  notFound: {
    color: "white",
    size: 20,
  },
});
