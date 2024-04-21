import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function RoadMapSection({ title, subtitle, children }) {
  return (
    <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    {children}
  </View>
  )


}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#eee',
      borderRadius: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionSubtitle: {
      fontSize: 14,
      color: '#888',
    },
  });
