import axios from "axios";


export const getExercisesTByIDLesson = async (lessonID) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/get_exercises_by_type/${lessonID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises data :', error);
        
    }
};


