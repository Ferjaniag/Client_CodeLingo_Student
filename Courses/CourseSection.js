
import React from 'react'

import { View , StyleSheet , Text, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function CoursesSection({ idCourse ,title, description}) {

  const navigation=useNavigation() ;

  return (
    <View style= {styles.container}>
 <TouchableOpacity  onPress={() => navigation.navigate('Units' , { courseID: idCourse , course : title})}>

<LinearGradient
      colors={['#7659F1', 'rgba(118, 89, 241, 0.28)']}
      style={styles.sectionContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >


  
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionDescription}>{description}</Text>

   
  
     
   </LinearGradient>
</TouchableOpacity>
  
 </View>
  )


}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 35,
      padding: 15,
     
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    borderRadius: 15,
     height : 150,
     width : 340 ,
     alignItems : 'center', 
     justifyContent :'center'
    },
    sectionTitle: {
      color: "white" , 
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionDescription: {
      fontSize: 14,
      color: "white" , 
      paddingTop : 30,
      textAlign : 'center'
    },

  
   
  });