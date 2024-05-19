import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getQuizByID } from './QuizAPI';

const InstructionsPage = ({route}) => {
    const navigation = useNavigation();
    const quizId = route.params.quizId;

    const [quizData, setQuizData] = useState([]);
    const[quizName, setQuizName] = useState("");
    const[quizDuration, setQuizDuration] = useState("");
    const[totalMarks, setTotalMarks] = useState("");
    const[passingMarks, setPassingMarks] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const data = await getQuizByID(quizId);
                setQuizData(data);
                setQuizName(data.quizName);
                setQuizDuration(data.quizDuration);
                setTotalMarks(data.totalMarks);
                setPassingMarks(data.passingMarks);
                
            } catch (error) {
                setError(error);
                
            } finally {
                setIsLoading(false);
            }

        };
        fetchData();
    }, [quizId])

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
  
    
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/icon-back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{quizName}</Text>
            </View>

            <View style={styles.lessonContainer}>
                <Text style={styles.lessonTitle}>Instructions</Text>
                <ScrollView style={styles.lessonContent}>
                    <View style={styles.bulletPointContainer}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.bulletText}>Quiz must be completed in {quizDuration} mins</Text>
                    </View>
                    <View style={styles.bulletPointContainer}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.bulletText}>Quiz will be submitted automatically after{quizDuration} mins</Text>
                    </View>
                    <View style={styles.bulletPointContainer}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.bulletText}>Once submitted, you cannot change your answer</Text>
                    </View>
                    <View style={styles.bulletPointContainer}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.bulletText}>Total marks of the quiz is {totalMarks}</Text>
                    </View>
                    <View style={styles.bulletPointContainer}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.bulletText}>Passing marks of the quiz is {passingMarks}</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Quiz')}
                >
                    <Text style={styles.textButton}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1244',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
    },
    icon: {
        position: 'absolute',
        left: 20,
        top: 0,
        width: 35,
        height: 35,
    },
    title: {
        color: '#35E9BC',
        fontSize: 18,
        marginLeft: 50,
    },
    lessonContainer: {
        backgroundColor: '#FFF7FC',
        width: '95%',
        minHeight: '80%',
        marginTop: 20,
        borderRadius: 45,
        padding: 20,
        alignItems: 'center',
    },
    lessonTitle: {
        color: '#333333',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
    },
    lessonContent: {
        width: '100%',
    },
    bulletPointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        backgroundColor: '#333333',
        borderRadius: 9999,
        marginRight: 10,
    },
    bulletText: {
        color: '#333333',
        fontSize: 14,
        fontWeight: '400',
    },
    buttonStyle: {
        width: 240,
        height: 50,
        backgroundColor: '#7659F1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 45,
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default InstructionsPage;
