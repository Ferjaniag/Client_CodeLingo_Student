import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnrolledCourses = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enrolled Courses</Text>
        <Text style={styles.headerSubtitle}>Keep going !</Text>
      </View>
      <View style={styles.courseContainer}>
        <View style={styles.courseBox}>
          <Text style={styles.courseTitle}>Java Foundations</Text>
        </View>
        <View style={styles.courseBox}>
          <Text style={styles.courseTitle}>Java Foundations</Text>
        </View>
        <View style={styles.courseBox}>
          <Text style={styles.courseTitle}>Java Foundations</Text>
        </View>
        <View style={styles.courseBox}>
          <Text style={styles.courseTitle}>Java Foundations</Text>
        </View>
        {/* Add more course boxes here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1246',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 80,
    position: 'absolute',
    left: 110,
    top: 60,
  },
  headerTitle: {
    color: '#35E9BC',
    fontSize: 18,
    fontWeight: '500',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 150,
  },
  courseBox: {
    width: 142,
    height: 91,
    backgroundColor: '#7659F1',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  courseTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 30,
  },
});

export default EnrolledCourses;
