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
                console.log('again')
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
                        <Text style={styles.courseTitle}>Take Quiz</Text>
                    </TouchableOpacity>
                ))
            )
        }


     
        </View>
    );
};
const styles = StyleSheet.create({
    courseBox: {
        backgroundColor: '#4CAF50',  
        paddingVertical: 15,         
        paddingHorizontal: 25,       
        borderRadius: 10,           
        shadowColor: '#000',         
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.3,          
        shadowRadius: 4,             
        elevation: 5,                
        alignItems: 'center',        
        justifyContent: 'center',    
        marginVertical: 10, 
    },
    courseTitle: {
        color: '#FFFFFF',            
    fontSize: 18,                
    fontWeight: '600',           
    textTransform: 'uppercase'
    },
    notFound: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 30,
        marginTop: -100,
    },
});

export default QuizCard;
