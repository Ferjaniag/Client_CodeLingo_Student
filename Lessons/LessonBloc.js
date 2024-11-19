import { View , StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'


import { useNavigation } from '@react-navigation/native';

const PlayIcon = require('../assets/play.png');
const LockIcon = require('../assets/lock.png');
const DoneIcon = require('../assets/done.png');

export default function LessonBloc(  {courseId, unitId,courseName, unitName ,lessonNumber, isDone, idLesson, lessonName}) {
  
 // console.log('FROM LESSON BLOC', enr)
  const navigation=useNavigation()


  

  let iconSource;

  if (isDone ) {
    iconSource = DoneIcon; 
  }  else {
    iconSource = LockIcon;
  }

  return (
    <TouchableOpacity  onPress={() => navigation.navigate('Enroll-Lesson', {courseId:courseId, unitId:unitId, courseName:courseName, unitName:unitName,lessonNumber:lessonNumber , lessonID: idLesson, lessonName:lessonName})}>
    <View style={styles.sectionContainer}>
       
      <LinearGradient
      colors={['rgba(118, 89, 241, 0.28)', 'rgba(68, 51, 139, 0.28)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.box2}
    >

   
        <Text style={styles.lesson}> Lesson {lessonNumber} </Text>
        <Image
       source={iconSource}
        style = {styles.iconStart}
      />
       
     </LinearGradient>
    
     
    </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    sectionContainer: {
     
      backgroundColor: 'rgba(118, 89, 241, 0.28)', 
      alignItems: 'center',
     // justifyContent: 'center',
     width : 90 ,
     height : 90 , 
     marginTop: 25,
     padding: 10,
    
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 4,
   },
  
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5, // For Android shadow
   borderRadius: 20,

      

    } ,
    lesson : {
        color :'white',
        fontSize: 13 ,
        fontWeight : 'bold', 
        fontFamily : 'sans-serif' , 
       
    },
    box2 : {
        justifyContent : 'center',
        alignContent :'center',
        alignItems:"center",
        flex: 1 ,
        borderRadius : 20 , 
        width : 70 ,
        height : 65 , 
        flexDirection :'column',
        
        
    },
   
    progressContainer : {
        flex: 1,
         alignItems: 'flex-end',
         padding : 15 ,
         
        
      
    },

    iconStart :{
        width:25 ,
        height : 25
    }
})