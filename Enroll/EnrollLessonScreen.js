import React , {useEffect,useState,useRef} from 'react'

import { View , StyleSheet, Text, Image, TouchableOpacity,useWindowDimensions,ProgressBarAndroid  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress';
import { ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { getLessonByID } from '../Lessons/LessonAPI';
import Html from 'react-native-render-html';
import { getExercisesTByIDLesson } from './ExerciseAPI';

export default function EnrollLessonScreen({route}) {

 
const { width, height } = useWindowDimensions();
const navigation=useNavigation()  
const lessonName=route.params.lessonName
const lessonNumber=route.params.lessonNumber
const lessonID=route.params.lessonID
const unitId=route.params.unitId
const courseId=route.params.courseId
const courseName=route.params.courseName
const unitName=route.params.unitName
const [lessonData,setLessonData]=useState({}) ; 
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);



useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getLessonByID(lessonID);
          
            setLessonData(data.content)

            console.log("lesson data",lessonData)
         
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
}, [lessonID]); // Refetch data when ID changes

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
            source={require('../assets/icon-back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

       
        <Text style={styles.title}>
          Lesson {lessonNumber} : {lessonName}
        </Text>

      </View>

      <View style={styles.lessonContainer} >
    
        <Progress.Bar progress={0.1} width={350} color={'#35E9BC'}/>
         <View style={styles.lessonContent}>
        <ScrollView style={{ flex: 1 , }} > 
        <Html
          contentWidth={100}
         
          source={{ html: lessonData }}
          tagsStyles={{ body: { color: '#1F1246', fontSize: 16, fontFamily: 'sans-serif' } }}
        />
        </ScrollView>
</View>
         <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
         navigation.navigate('Enroll-Exercise',{courseId: courseId, unitId:unitId, courseName:courseName, unitName:unitName, lessonName:lessonName ,
           lessonNumber:lessonNumber , lessonID:lessonID})
          }}
        >
          <Text style={styles.textButton}>Next</Text>
        </TouchableOpacity>
        
    
      
       
    
      </View>
    </View>
  )

  
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
      lessonContainer : {
        backgroundColor: '#FFF7FC', 
      
        minWidth: '99%',
        minHeight: '100%',
        marginTop : 60,
        borderRadius : 45, 
        padding : 20 ,
        alignContent :'center',
       
       
         
      },
      lessonContent : {
     
        textAlign :'left' ,
        marginTop : 10, 
        marginLeft : 5,
        fontSize : 16 , 
        fontWeight:'bold', 
        minHeight: '60%',
      },
      buttonStyle :  {
        position: 'relative',
      
        width : 240,
        marginTop : 45 ,
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
        
    }
})
