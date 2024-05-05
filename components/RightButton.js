import React from "react";
import { View, TouchableOpacity, StyleSheet , Text, Image} from "react-native";


const RightButton = ({isDoneCheck}) => {
    return (
        <>
          {isDoneCheck ? (
            <TouchableOpacity
              style={[styles.buttonStyle, { backgroundColor: '#332462' }]}
              onPress={() => {
                console.log('Next');
              }}
            >
              <Image
                source={require('../assets/chevron-right.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.buttonStyle, { backgroundColor: 'grey' }]}
              disabled={true}
            >
              <Image
                source={require('../assets/chevron-right.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </>
      );
    };
    
    export default RightButton;

const styles = StyleSheet.create({ 
    buttonStyle :  {
        position: 'relative',
        width : 50, 
        height : 50 ,
       // backgroundColor : "#7659F1" ,
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
        left : 10 , 
    }
})