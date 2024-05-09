import React , {useEffect, useState}from 'react'

import { View , StyleSheet , ScrollView, Text, Image, TouchableOpacity} from 'react-native'


export default function DoneExercise({}) {
  
  
      

  return (
    <View style={styles.container} > 
       
    
     <Text style={styles.title}>  Lesson Complete ! </Text> 
    
  <Image 
  source={require('../assets/done-exercises.png')}
  style={styles.image}
  />
   <Text style={styles.title2}>  Excellent work! Now, let's proceed to the next lesson.</Text> 
   
   <TouchableOpacity
              style={[styles.buttonNext]}
              onPress={() => console.log("next lesson")}
            >
              <Image
                source={require('../assets/chevron-right.png')}
                style={styles.iconNext}
              />
            </TouchableOpacity>
     </View>
  )
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',

    },
    title : {
        color : '#1F1244' , 
        fontFamily : 'sans-serif',
        fontSize : 20, 
        fontWeight:'bold'
  
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      image : {
        width : "50%" ,
        height : "45%"
      },
      title2 : {
        color : '#1F1244' , 
        fontFamily : 'sans-serif',
        fontSize : 16, 
  textAlign:'center'
      },
      
    buttonNext :  {
        position: 'relative',
        width : 70,
        height : 70 ,
        backgroundColor : "#7659F1" ,
        justifyContent : 'center',
        alignContent : 'center',
        borderRadius : 20,
     marginTop : 30
     
    }, 
    iconNext : {
      alignSelf : 'center',
      width : 40 , 
      height : 40, 
     },
    

})