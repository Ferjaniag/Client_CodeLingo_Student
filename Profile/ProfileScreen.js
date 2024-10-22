import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import AboutSection from './AboutSection';
import AchievmentSection from './AchievementSection';
import InProgressCourses from './InProgressCourses';
export default function ProfileScreen() {
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
      <View style= {styles.header}> 

<TouchableOpacity onPress={()=> navigation.goBack()}>
      <Image
        source={require('../assets/settings.png')} 
        style = {styles.icon}
      />
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> signOut()}>
      <Image
        source={require('../assets/logout.png')} 
        style = {styles.icon}
      />
    </TouchableOpacity>
      </View>
      <AboutSection/>
      <AchievmentSection/>
      <InProgressCourses/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1244',
    alignItems: 'center',
    justifyContent : 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  header : {
    flexDirection: 'row',         // Align items in a row
    justifyContent: 'space-between', // Push one to the left, other to the right
    alignItems: 'center',         // Vertically center the items
         // Add some padding if needed
   
    paddingTop  : 60,
    width: '90%',                // Ensure the header takes full width
      
  } , 
  icon : {
  
   width : 30 , 
   height : 30, 
   
  },
});
