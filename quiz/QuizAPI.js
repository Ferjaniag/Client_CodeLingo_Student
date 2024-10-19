import axios from "axios";

export const getQuizByCourseId = async (courseID) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/get_quiz/${courseID}`);
        console.log(response.data);
        console.log('again')
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz data :', error);
        
    }
};

export const getQuizByID = async (quizID) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/getQuiz/${quizID}`);
        console.log('again')
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz data :', error);
        
    }
};