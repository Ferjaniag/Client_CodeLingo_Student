import React from 'react'
import { View, TouchableOpacity, StyleSheet , Text, Image} from "react-native";
import Dialog from "react-native-dialog";
import CorrectAnswer from './CorrectAnswer';

export default function DialogCheck() {
  return (
    <Dialog.Container visible={visibleHelp} contentStyle={styles.dialog}>
    <Dialog.Title style={styles.titleDialog}>Check</Dialog.Title>
    <Dialog.Description style={styles.descDialog}>
   <CorrectAnswer/>
    </Dialog.Description>
    <Dialog.Button  style={styles.labelDialog} label="Copy" />
    <Dialog.Button  style={styles.labelDialog}  label="Cancel"  />
  </Dialog.Container>
  )
}


const styles= StyleSheet.create({
    titleDialog : {
        color : '#1F1244' , 
        fontFamily : 'sans-serif',
        fontSize : 15 , 
      }, 
      descDialog : {
        color : '#1F1244' , 
        fontFamily : 'sans-serif',
        fontSize : 12 , 
      }, 
      
      labelDialog : {
        color : '#7659F1' , 
        fontFamily : 'sans-serif',
        fontSize : 15 , 
      } ,
      
      dialog : {
        backgroundColor : "#FFF7FC",
        borderRadius : 10
      }
})
