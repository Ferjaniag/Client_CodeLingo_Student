import React, { useContext,useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const QuizPage = ({route}) => {
    const quizId = route.params.quizId;

    return (
        <View style={styles.container}>
        <Text style={styles.quizText}>Quiz ID: {quizId}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizText: {
        fontSize: 18,
    },
});

export default QuizPage;