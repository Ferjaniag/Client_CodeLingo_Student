import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity , Image } from 'react-native';
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

export default function AboutSection() {
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

      <View>

              <Image
        source={require('../assets/user-icon.png')} 
        style = {styles.userIcon}
      />
            </View>


        <View  style={styles.infos}> 
        <Text style={styles.title}>Account Informations </Text>
        {state && state.user && (
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>User Name:</Text>
              <Text style={styles.value}>{state.user.username}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Email :</Text>
              <Text style={styles.value}>{state.user.email}</Text>
            </View>
          </>
        )}


        </View>

       
      
       {/* 
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnrolledCourses')}>
           
            <Text style={styles.buttonText}>Enrolled Courses</Text>
         
          </TouchableOpacity>
        </View>
       */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
  content: {
    flexDirection : 'row',
    justifyContent: 'space-around',
    width:'90%',
    alignItems: 'center',
    paddingTop:25,
   
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#35E9BC',
   
  },
  infoContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
    fontWeight: 'bold',
  },
  value: {
    fontSize:16,
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
  userIcon:{
    width: 80,
    height: 80,
    borderRadius: 20
  },
  info :  {
 textAlign : 'right',
  }
});
