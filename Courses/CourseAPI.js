import axios from "axios";



export const getFrontEndCourses = async () => {
    try {
        const response = await axios.get(`http://localhost:5002/get_FrontEnd_courses`);
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
      // adresse IPv4
        const response = await axios.get(`http://192.168.100.3:5002/get_courses_by_category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses data :', error);
        
    }
};