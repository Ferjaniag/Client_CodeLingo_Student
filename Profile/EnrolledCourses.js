import React, {useEffect, useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';
import { getEnrollmentCourses } from './EnrollementAPI';
import { TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { AuthContext } from '../context/auth';

const EnrolledCourses = () => {

const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId,setUserId]=useState();
//const userId='6648631c818ad87c98d07858'
 


  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        const dataString = await AsyncStorage.getItem("@auth");
        const data = JSON.parse(dataString);
        setUserId(data.user._id)
        setState(data);
        try {
    
            const data = await getEnrollmentCourses(userId);
            setCoursesData(data);
         
           console.log("data enrollementss ",coursesData);
            
        } catch (error) {
            setError(error);
            console.log("ERRROOORR ",error)
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
}, []); 

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

      { coursesData === undefined  ? <Text style={styles.notFound}> No courses enrolled yet !!! </Text> :
       (

  coursesData.map((course,index)=> (
        <TouchableOpacity style={styles.courseBox} key={index} 
        onPress={() => navigation.navigate('Units' , { courseID: course.idCourse , course : course.courseName})}
        >
          <Text style={styles.courseTitle}>{course.courseName}</Text>
          <Progress.Bar progress={course.progress} width={120} color={'#FCC329'}/>
        </TouchableOpacity>

  ) )) }
       
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1246',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 80,
    position: 'absolute',
    left: 110,
    top: 60,
  },
  headerTitle: {
    color: '#35E9BC',
    fontSize: 18,
    fontWeight: '500',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 150,
  },
  courseBox: {
    width: 142,
    height: 91,
    backgroundColor: '#7659F1',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  courseTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 30,
  },
});

export default EnrolledCourses;