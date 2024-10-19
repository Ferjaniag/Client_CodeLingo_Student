import React, {useEffect, useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Text, StyleSheet } from 'react-native';
import { View, SafeAreaView,   Image } from 'react-native';
import { getEnrollmentCourses } from './EnrollementAPI';
import { TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { AuthContext } from '../context/auth';
import { LinearGradient } from 'expo-linear-gradient';


export default function CompletedCourses() {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const dataString = await AsyncStorage.getItem("@auth");
      const data = JSON.parse(dataString);
      setState(data);
    };
    fetchData();
  }, [navigation]); // Refresh data when navigating back to this screen

  const signOut = async () => {
    await AsyncStorage.removeItem("@auth");
    setState({ token: "", user: null }); // Update the state after logout
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>


      <View style= {styles.container}>
      <Text style={styles.title}> Courses</Text>

<LinearGradient
      colors={['#7659F1', 'rgba(118, 89, 241, 0.28)']}
      style={styles.sectionContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >

<View style = {styles.achievments}>


    <View  style = {styles.course} > 
    <Image
        source={require('../assets/html-course.png')} 
        style = {styles.courseIcon}
      />
<Text style={styles.titleAchivement}> HTML</Text>
<Progress.Bar progress={0.4} width={100} color='#35E9BC' />
    </View>

    <View  style = {styles.course} > 
    <Image
        source={require('../assets/js-course.png')} 
        style = {styles.courseIcon}
      />
<Text style={styles.titleAchivement}> JS</Text>
<Progress.Bar progress={0.4} width={100} color='#35E9BC' />
    </View>

</View>

   
  
     
   </LinearGradient>




  
 </View>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   paddingBottom : 40
  },
  content: {
  
   alignItems: 'center',
  
  },
  title: {
    color: '#35E9BC',
    fontSize : 18 ,
    fontStyle : 'italic' ,
    fontFamily : 'sans-serif',
    fontWeight:'bold'
   
  },

  sectionContainer: {
    marginTop: 10,
  
   
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5, // For Android shadow
  borderRadius: 15,
   height : 250,
   width : 350 ,
   alignItems : 'center', 
  
  },
  sectionTitle: {
    color: "white" , 
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleAchivement: {
    fontSize: 14,
    color: "white" , 
   
    textAlign : 'center',
    fontWeight:'bold'
  },

  button: {
    //padding : 10 , 
    width : 'auto',
    marginTop : 5 ,
    height : 25 ,
    backgroundColor : '#7659F1' ,
    justifyContent : 'center',
    alignContent : 'center',
    borderRadius : 10,
    
}, 

  buttonText : {
    color : 'white',
    fontSize : 12 , 
    textAlign : 'center'
  },
  courseIcon:{
    width: 60,
    height: 60,
    borderRadius: 5
  },

  achievments : {
    flexDirection : 'row',
     justifyContent :'flex-start',
     width : 350 ,
  },
  course : {
    flexDirection : 'column',
    borderColor : 'white',
    borderRadius : 10 ,
    backgroundColor : '#5337CEFF' ,
    margin : 10,
    alignItems : 'center',
    padding : 15

  }

});

