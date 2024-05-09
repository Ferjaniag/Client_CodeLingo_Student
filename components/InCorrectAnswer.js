import React from 'react'
import { View, TouchableOpacity, StyleSheet , Text, Image} from "react-native";

const InCorrectAnswer= () =>{
  return (
   
    <View style={styles.container}>

        <Text style={styles.title}> Oops !</Text>

       
        <Image 
        source={require('../assets/incorrect.png')}
        style={styles.icon}/>
     
        
        <Text  style={styles.title2}> Incorrect. Let's try again.</Text>
        <Image 
        source={require('../assets/Pagenation-inc.png')}
        style={styles.iconPage}/>
      
      </View>
      );
    };
    
export default InCorrectAnswer;
    
    const styles = StyleSheet.create({ 

        container : {
          alignContent : 'center',
          justifyContent :'center',
          alignItems : 'center' ,  
        
       
        
        },
        buttonStyle :  {
            position: 'relative',
            width : 50, 
            height : 50 ,
            backgroundColor : '#FFF7FC' ,
            borderRadius : 50,
           
    
           
        }, 
       iconButton : {
            color : 'white',
            fontSize : 16 , 
          //  textAlign : 'center'
            
        },
        icon : {
            width : 100 , 
            height : 100, 
            
        },
        title : {
            color: '#7659F1',
            fontSize : 25 ,
            fontStyle : 'italic' ,
            fontFamily : 'sans-serif',
            fontWeight:'bold',
            marginBottom : 10 , 
          }, 
          title2 : {
            color: '#B5C0D0',
            fontSize : 17 ,
            fontStyle : 'italic' ,
            fontFamily : 'sans-serif',
           
            marginTop : 10 , 
          }, 
          iconPage : {
            marginTop : 20
          }
    })