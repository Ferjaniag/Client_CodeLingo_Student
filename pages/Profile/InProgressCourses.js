import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, StyleSheet } from "react-native";
import { View, SafeAreaView, Image } from "react-native";
import { getEnrollmentCourses } from "../../services/EnrollementAPI";
import { TouchableOpacity, FlatList } from "react-native";
import * as Progress from "react-native-progress";
import { AuthContext } from "../../context/auth";
import { LinearGradient } from "expo-linear-gradient";

export default function InProgressCourses() {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const dataString = await AsyncStorage.getItem("@auth");
      const data = JSON.parse(dataString);

      // Make sure userId is set before making the API call
      const userIdFromStorage = data.user._id;
      setUserId(userIdFromStorage);
      setState(data);

      if (userIdFromStorage) {
        // Ensure that userId is available
        try {
          const fetchedData = await getEnrollmentCourses(userIdFromStorage); // Pass the correct userId
          setCoursesData(fetchedData);
          console.log("Enrolled courses data: ", fetchedData);
        } catch (error) {
          setError(error);
          console.log("Error fetching enrollment data: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError(new Error("User ID not available."));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it only runs on mount

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.course}
      onPress={() =>
        navigation.navigate("Units", {
          courseID: item.idCourse,
          course: item.courseName,
        })
      }
    >
      <Text style={styles.titleAchivement}> {item.courseName}</Text>
      <Progress.Bar progress={0.4} width={120} color={"#FCC329"} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.container}>
          <Text style={styles.title}> Courses </Text>

          <LinearGradient
            colors={["#7659F1", "rgba(118, 89, 241, 0.28)"]}
            style={styles.sectionContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <FlatList
              data={coursesData}
              renderItem={renderCourse}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2} // Set to display 2 courses per row
              contentContainerStyle={styles.courseList}
              ListEmptyComponent={
                <Text style={styles.notFound}>No courses enrolled yet!</Text>
              }
            />
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  content: {
    alignItems: "center",
  },
  title: {
    color: "#35E9BC",
    fontSize: 18,
    fontStyle: "italic",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },

  sectionContainer: {
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    borderRadius: 15,
    height: 250,
    width: 350,
    alignItems: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleAchivement: {
    fontSize: 14,
    color: "white",

    textAlign: "center",
    fontWeight: "bold",
  },

  button: {
    //padding : 10 ,
    width: "auto",
    marginTop: 5,
    height: 25,
    backgroundColor: "#7659F1",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  courseIcon: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },

  achievments: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 350,
  },
  course: {
    flexDirection: "column",
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#5337CEFF",
    margin: 10,
    alignItems: "center",
    padding: 15,
  },
});
