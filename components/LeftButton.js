import React from 'react'
import { View, TouchableOpacity, StyleSheet , Text, Image} from "react-native";

const LeftButton= () =>{
  return (
   
  
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
        console.log('Next')
        }}
      >
        <Image 
        source={require('../assets/chevron-left.png')}
        style={styles.icon}/>
      </TouchableOpacity>
        
      );
    };
    
export default LeftButton;
    
    const styles = StyleSheet.create({ 
        buttonStyle :  {
            position: 'relative',
            width : 50, 
            height : 50 ,
            backgroundColor : "#332462" ,
            justifyContent : 'center',
            alignContent : 'center',
            borderRadius : 50,
            left : 50
    
           
        }, 
       iconButton : {
            color : 'white',
            fontSize : 16 , 
            textAlign : 'center'
            
        },
        icon : {
            width : 35 , 
            height : 35, 
            left : 5 , 
        }
    })