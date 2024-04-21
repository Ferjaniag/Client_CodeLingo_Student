import React from 'react'
import { Text,View,StyleSheet, Image, Button, TouchableOpacity } from 'react-native'

export default function SplashScreen() {
  return (
    <View style={styles.container}>

<Image source={require('./assets/speed.png')}/>


<Text style={styles.title}>
    Welcome to CodeLingo
</Text>

<Text style={styles.title2}>
Your Journey to Code Mastery Begins Here
</Text>

<Text  style={styles.title3}>
Level up your skills with ease and advance in your career
</Text>


<TouchableOpacity style={styles.buttonStyle} onPress={() => console.log('Button pressed!')}>
        <Text  style={styles.textButton}  >Start Your Journey</Text>
      </TouchableOpacity>
        </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginTop : 120 ,
      backgroundColor: '#1F1244', // Corrected color code
      alignItems: 'center',
      justifyContent: 'center',
    },

    title : {
        color: 'white',
    fontSize : 25 ,
    fontWeight : 'bold' ,
    fontFamily :'Helvetica'
    } , 

    title2 : {
        color: 'white',
    fontSize : 16 ,
    marginTop : 40 ,
    fontFamily :'Helvetica'
    }, 
    title3 : {
        color: 'white',
    fontSize : 16 ,
    marginTop : 45 ,
    fontFamily :'Helvetica',
    justifyContent : 'center',
textAlign :'center'
    
    }, 

    buttonStyle :  {
        width : 240,
        marginTop : 45 ,
        height : 50 ,
        backgroundColor : "#7659F1" ,
        justifyContent : 'center',
        alignContent : 'center',
        borderRadius : 10
    }, 
    textButton : {
        color : 'white',
        fontSize : 16 , 
        textAlign : 'center'
        
    }




  });