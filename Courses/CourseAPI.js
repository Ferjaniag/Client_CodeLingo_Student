import axios from "axios";


export const getFrontEndCourses = async () => {
    try {
        const response = await axios.get(`http://localhost:5002/get_FrontEnd_courses`);
        console.log('again')
        return response.data;
    } catch (error) {
        console.error('Error fetching courses data :', error);
        
    }
};

export const getBackEndCourses = async () => {
    try {
        const response = await axios.get(`http://localhost:5002/get_BackEnd_courses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses data :', error);
        
    }
};

export const getProgLangCourses = async () => {
    try {
        const response = await axios.get(`http://localhost:5002/get_ProgrammingLanguages_courses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses data :', error);
        
    }
};



export const getCoursesByCategory = async (category) => {
    try {
      
        console.log('category', category) ; 
        const response = await axios.get(`${process.env.API_URL}/get_courses_by_category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses data :', error);
        
    }
};


export const getEnrollementCourses = async (userId) => {
    try {
        console.log('userId', userId) ; 
        const response = await axios.get(`${process.env.API_URL}/enrollments/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses data :', error);
        
    }
};

