import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen </Text>
      <Text>Profile Screen </Text>
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


