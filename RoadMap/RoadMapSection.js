import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


export default function RoadMapSection({ title, subtitle, children , srcImage}) {
  const navigation = useNavigation();

  return (
  
    <TouchableOpacity  onPress={() => navigation.navigate('Courses', { category : title})}>

<LinearGradient
      colors={['#7659F1', 'rgba(118, 89, 241, 0.28)']}
      style={styles.sectionContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >

<View style={styles.imageContainer}>
<Image
       source= {srcImage}
        style={{
        
          resizeMode: 'cover', 
        }}
      />
  </View>
  
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionSubtitle}>{subtitle}</Text>

    <Text style={styles.techno}> Technologies </Text>
    <View style={styles.languagesContainer}>
        {children}
      </View>
     
   </LinearGradient>
</TouchableOpacity>
  
 
  )


}

const styles = StyleSheet.create({
    sectionContainer: {
      
      marginTop: 30,
      padding: 15,
     
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
    borderRadius: 15,
     height : 170,
    },
    sectionTitle: {
      color: "white" , 
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionSubtitle: {
      fontSize: 14,
      color: "white" , 
      paddingTop : 50
    },

    languagesContainer: {
      flexDirection: 'row', 
      marginTop: 0, 
      justifyContent : 'center' ,
    },
    imageContainer: {
      position: 'absolute', 
      top: 0,
      left: 100,
      marginLeft : 100,
    },

    techno : {
      color:'white',
      fontWeight : 'bold', 
      padding: 5,
     right : 10,
    }
   
  });
