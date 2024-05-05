import React , {useEffect,useState,useRef} from 'react'
import { View , StyleSheet, Text, Image, TouchableOpacity,useWindowDimensions,ProgressBarAndroid  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress';
import RightButton from '../components/RightButton';
import LeftButton from '../components/LeftButton';
import { getExercisesTByIDLesson } from './ExerciseAPI';
import ExerciseContainer from './ExerciseContainer';


export default function EnrollExercise({ route }) {

  const navigation = useNavigation();
  const lessonName = route.params.lessonName;
  const lessonNumber = route.params.lessonNumber;
  const lessonID = route.params.lessonID;

  const [exercisesData, setExercisesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState();
  const [error, setError] = useState(null);

  console.log("lesson id ", lessonID);

  const fetchData = async () => {
    try {
      const data = await getExercisesTByIDLesson(lessonID);
      setExercisesData(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lessonID]);

  useEffect(() => {
    // Ensure exercisesData has been fetched and currentIndex is within bounds
    if (exercisesData.length > 0 && currentIndex < exercisesData.length) {
      setCurrentExercise(exercisesData[currentIndex]);
    }
  }, [currentIndex, exercisesData]);

  // Function to handle navigation to the next exercise
  const handleNextExercise = () => {
    if (currentIndex < exercisesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon-back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Lesson {lessonNumber} : {lessonName}
        </Text>

      </View>

      <View style={styles.exerciseContainer} >

        <Progress.Bar progress={0.1} width={350} color={'#35E9BC'} />
        <View style={styles.exerciseContent}>

        {currentExercise ? (
    <ExerciseContainer
      key={currentIndex}
      exercise={currentExercise}
    />
  ) : (
    <Text>Loading...</Text>
  )}


          <View style={styles.buttonGroup}>
            <LeftButton />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => handleNextExercise()}
            >
              <Text style={styles.textButton}>Check</Text>

            </TouchableOpacity>
            <RightButton isDoneCheck={true} />

          </View>
        </View>
      </View>
    </View>
  );

  
}


const styles = StyleSheet.create({
    container: {
        flex : 1 ,
        backgroundColor: '#1F1244', 
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title : {
        color: '#35E9BC',
        fontSize : 18 ,
        fontStyle : 'italic' ,
        fontFamily : 'sans-serif',
        marginTop : 60, 
        left : 5
       
      }, 
      header : {
        flexDirection: 'row', 
      // marginTop: 10, 
      justifyContent : 'justify-content',
         margin : 5
      } , 
      icon : {
       // marginRight : 15 ,
          marginTop : 60 , 
        right : 15 ,
       width : 35 , 
       height : 35, 
       
      },
      exerciseContainer : {
        backgroundColor: '#FFF7FC', 
      
        minWidth: '99%',
        minHeight: '100%',
        marginTop : 60,
        borderRadius : 45, 
        padding : 20 ,
        alignContent :'center',
       
       
         
      },
      exerciseContent : {
     
        textAlign :'left' ,
        marginTop : 10, 
        marginLeft : 5,
        fontSize : 16 , 
        fontWeight:'bold', 
        minHeight: '100%',
      },
      buttonStyle :  {
        position: 'relative',
        width : 220,
        height : 50 ,
        backgroundColor : "#7659F1" ,
        justifyContent : 'center',
        alignContent : 'center',
        borderRadius : 10,
        left : 50

       
    }, 
    textButton : {
        color : 'white',
        fontSize : 16 , 
        textAlign : 'center'
        
    },
    buttonGroup : {
      flex : 1, 
      flexDirection: 'row',
   right : 50,
   justifyContent :'space-between'
    
    }, 
    question : {
      color : '#1F1244' , 
      marginTop : 20 ,
      fontFamily : 'sans-serif',
      fontSize : 15 , 

    },
   
   
    
})