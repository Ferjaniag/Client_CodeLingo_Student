import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity , Image } from 'react-native';
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
export default function AchievmentSection() {
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
      <Text style={styles.title}> Achievements</Text>

<LinearGradient
      colors={['#7659F1', 'rgba(118, 89, 241, 0.28)']}
      style={styles.sectionContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >

<View style = {styles.achievments}>
<View   style = {styles.achievment}>


<Image
        source={require('../assets/silver-badge.png')} 
        style = {styles.userIcon}
      />
  
    <Text style={styles.titleAchivement}> Java</Text>
    </View>

    <View   style = {styles.achievment}>


<Image
        source={require('../assets/silver-badge.png')} 
        style = {styles.userIcon}
      />
  
    <Text style={styles.titleAchivement}> HTML</Text>
    </View>

</View>

   
<View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListOfBadges')}>
              <Text style={styles.buttonText}>See All Achievements</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Export Portfolio</Text>
            </TouchableOpacity>
          </View>
     
   </LinearGradient>




  
 </View>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1244',
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
  elevation: 5, 
  borderRadius: 15,
   height : 155,
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

  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    width: '90%', 
  },
  button: {
    padding : 7 , 
    // width : 'auto',
    marginTop : 5 ,
    // height : 25 ,
    backgroundColor : '#35E9BC' ,
    justifyContent : 'center',
    alignContent : 'center',
    borderRadius : 10,
    
}, 

  buttonText : {
    color : 'white',
    fontSize : 12 , 
    textAlign : 'center'
  },
  userIcon:{
    width: 80,
    height: 80,
    borderRadius: 20
  },

  achievments : {
    flexDirection : 'row',
     justifyContent :'flex-start',
     width : 350 ,
  }

});
