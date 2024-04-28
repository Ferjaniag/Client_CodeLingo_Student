import React from 'react'


import { View , StyleSheet } from 'react-native'

export default function OverViewLessons() {
  return (
    <View style={styles.container}>
    <Text>Over View Lessons Screen </Text>
    <Text>Over View Lessons Screen </Text>
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex : 1 ,
      backgroundColor: '#1F1244', 
      alignItems: 'center',
      justifyContent: 'center',

    }
})