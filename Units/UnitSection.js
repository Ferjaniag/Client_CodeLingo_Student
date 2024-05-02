import React from 'react'

import { View , StyleSheet, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';

export default function UnitSection(  {unitName, unitID, courseName}) {
  
  const navigation=useNavigation()
  return (
    <TouchableOpacity  onPress={() => navigation.navigate('Over-View-Lessons', {courseName : courseName, unitName: unitName , unitID : unitID})}>
    <View style={styles.sectionContainer}>
       
      <LinearGradient
      colors={['rgba(118, 89, 241, 0.28)', 'rgba(68, 51, 139, 0.28)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.box2}
    >

   
        <Text style={styles.unit}> {unitName} </Text>
        <View style={styles.progressContainer}>
        
        <AnimatedCircularProgress
  size={40}
  width={6}
  fill={0}
  tintColor="#35E9BC"
  backgroundColor="#332462">
  {
    (fill) => (
      <Text style={styles.progress}>
      0%
      </Text>
    )
  }
</AnimatedCircularProgress>

  </View>
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
     width : 340 ,
     height : 75 , 
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
   borderRadius: 15,

      

    } ,
    unit : {
        color :'white',
        fontSize: 16 ,
        fontWeight : 'bold', 
        fontFamily : 'sans-serif' , 
        left : 10
    },
    box2 : {
        justifyContent : 'center',
        alignContent :'center',
        alignItems:"center",
        flex: 1 ,
        borderRadius : 20 , 
        width : 320 ,
        height : 65 , 
        flexDirection :'row'
        
        
    },
    progress : {
        color :'white',
        fontSize: 12 ,
        fontWeight : 'bold', 
        fontFamily : 'sans-serif' , 
      
    },
    progressContainer : {
        flex: 1,
         alignItems: 'flex-end',
         padding : 15 ,
         
        
      
    }
})