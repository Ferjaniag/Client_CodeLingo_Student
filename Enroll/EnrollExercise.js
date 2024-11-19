import React , {useEffect,useRef, useContext,useState} from 'react'
import { View , StyleSheet, Text, Image, TouchableOpacity,useWindowDimensions,ProgressBarAndroid  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress';
import RightButton from '../components/RightButton';
import LeftButton from '../components/LeftButton';
import { getExercisesByIDLesson } from './ExerciseAPI';
import ExerciseContainer from './ExerciseContainer';
import CorrectAnswer from '../components/CorrectAnswer';
import PrbolemSolvExercise from './ProblemSolvExercise';
import Dialog from "react-native-dialog";
import InCorrectAnswer from '../components/InCorrectAnswer';
import DoneExercise from './DoneExercises';
import { updateEnrollProgress } from '../Profile/EnrollementAPI';
import { AuthContext } from '../context/auth';


export default function EnrollExercise({ route }) {
 const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const lessonName = route.params.lessonName;
  const lessonNumber = route.params.lessonNumber;
  const lessonID = route.params.lessonID;
  const courseName = route.params.courseName;
  const unitName = route.params.unitName;
const unitId= route.params.unitId;
const courseId= route.params.courseId;
  const [exercisesData, setExercisesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState();
  const [error, setError] = useState(null);
  const [visibleCheck, setVisibleCheck] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isDoneExercises, setIsDoneExercises] = useState(false);
  const [pourcentage,setPourcentage] = useState(0.2); 

  const handleAnswerVerification = (isCorrect) => {
    setIsAnswerCorrect(isCorrect);

  };

   const showDialog = () => {
   
    setVisibleCheck(true);
   
  };

  const CloseCheck = () => {
    setVisibleCheck(false);
  };

console.log("lesson id ", lessonID);

  const fetchData = async () => {
    try {
      const data = await getExercisesByIDLesson(lessonID);
      setExercisesData(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lessonID]);

  useEffect(() => {
   
    if (exercisesData.length > 0 && currentIndex < exercisesData.length) {
      setCurrentExercise(exercisesData[currentIndex]);
    }
  }, [currentIndex, exercisesData]);

 

const CheckAnswer=()=> {

  console.log("correct answer : ",isAnswerCorrect)
  setVisibleCheck(true);
 
 

}

const handleNextExercise = () => {
  setVisibleCheck(false);

  console.log("exercise length", exercisesData.length);

  if (currentIndex < exercisesData.length - 1) {
    // Increment the current index
    setCurrentIndex(currentIndex + 1);

    // Calculate the percentage based on the next index
    const percount = (currentIndex + 1) / exercisesData.length;
    console.log("POURCENTAAAGGGEE ", percount);

    // Update the percentage
    setPourcentage(percount);

    // Update the lesson progress
    handleLessonProgress(percount);
  } else {
    // If it's the last exercise, set the percentage to 1
    setPourcentage(1);

    // Handle lesson progress and mark as done
    handleLessonProgress(1);
    setIsDoneExercises(true);
  }
};

  const handleLessonProgress= async (percount) => {
 
   try {
// console.log('FROM HANDLE ', percount)
     const data={
      userId: state.user._id,
      courseId: courseId,
    unitId:unitId,
    lessonId:lessonID,
    percentage: percount*100
     }

     console.log('DATAAA FOR UPDATE LESSON' , data)
 const result = await updateEnrollProgress(data);

   } catch (err) {
    console.log(err)
   }
   
    
   // navigation.goBack()
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() =>  navigation.goBack()}>
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

        <Progress.Bar progress={pourcentage} width={350} color={'#35E9BC'} />
        <View style={styles.exerciseContent}>

   
      


        <Dialog.Container visible={visibleCheck} contentStyle={styles.dialog}>
   
    <Dialog.Description style={styles.descDialog}>
    {isAnswerCorrect ? <CorrectAnswer /> : <InCorrectAnswer />}

   
   
    </Dialog.Description>
    {isAnswerCorrect ?  <Dialog.Button  style={styles.labelDialog} label="Next"  onPress={() => handleNextExercise()}  /> 
  :  <Dialog.Button  style={styles.labelDialog} label="Try Again"  onPress={() => CloseCheck()}  />  
  }
   
  </Dialog.Container>

   
      
   {isDoneExercises ? (
  <DoneExercise 
  
  courseId={courseId}
   courseName = {courseName}
    unitName= {unitName} 
     unitID = {unitId}
  
  />
) : (
  !currentExercise ? (
    <Text>Loading...</Text>
  ) : (
    currentExercise.type === 'Single Choice' || currentExercise.type === 'Multiple Choice' ? (
      <ExerciseContainer
        key={currentIndex}
        exercise={currentExercise}
        onAnswerVerification={handleAnswerVerification}
      />
    ) : currentExercise.type === 'Problem Solving' ? (
      <PrbolemSolvExercise
        key={currentIndex}
        exercise={currentExercise}
        onAnswerVerification={handleAnswerVerification}
      />
    ) : (
      <Text>Loading...</Text>
    )
  )
)}

      
    


        
        {isDoneExercises === false ? 
           <View style={styles.buttonGroup}>
           <LeftButton />
           <TouchableOpacity
             style={styles.buttonStyle}
           //  onPress={() => handleNextExercise()}
           onPress={() => CheckAnswer()}
           >
             <Text style={styles.textButton}>Check</Text>

           </TouchableOpacity>
           <RightButton isDoneCheck={false} />

         </View>
        : null}
       
        
       
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
   titleDialog : {
    color : '#1F1244' , 
    fontFamily : 'sans-serif',
    fontSize : 15 , 
  }, 
  descDialog : {
    color : '#1F1244' , 
    fontFamily : 'sans-serif',
    fontSize : 12 , 
  }, 
  
  labelDialog : {
    color : '#7659F1' , 
    fontFamily : 'sans-serif',
    fontSize : 15 , 
  } ,
  
  dialog : {
   
    borderRadius : 10 , 
    backgroundColor :'#FFF7FC',
    borderColor: '#7659F1' , 
    borderRadius : 20,
    borderWidth: 2, 
    justifyContent:'center',
  //  alignContent:'center',
    alignItems:'center'
    
  }
   
    
})