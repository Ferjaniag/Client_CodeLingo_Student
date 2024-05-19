import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getQuizByCourseId } from './QuizAPI'; 

const QuizCard = ({ courseID }) => {
    const navigation = useNavigation();
    const [quizData, setQuizData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            setIsLoading(true);
            try {
                const quizzes = await getQuizByCourseId(courseID);
                console.log('Fetched quiz data:', quizzes);
                setQuizData(quizzes);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizData();
    }, [courseID]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

 
    return (
        <View style={styles.container}>
            {quizData.length === 0 ? 
            <Text style={styles.notFound} > No Quiz Published Yet ... </Text> : ( 

                quizData.map((quiz, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.courseBox}
                        onPress={() => navigation.navigate('InstructionsPage', { quizName: quiz.quizName, quizId:quiz._id })}
                    >
                        <Text style={styles.courseTitle}>{quiz.quizName}</Text>
                    </TouchableOpacity>
                ))
            )
        }


     
        </View>
    );
};
const styles = StyleSheet.create({
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

export default QuizCard;
