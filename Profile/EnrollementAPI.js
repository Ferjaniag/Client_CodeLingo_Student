import axios from "axios";


export const getEnrollmentCourses = async (userId) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/enrollments/${userId}/courses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching enrollment data :', error);
        
    }
};


export const createEnrollementCourse = async (enrollement) => {
    try {
        console.log("enrollment : ",enrollement)
        const response = await axios.post(`${process.env.API_URL}/enrollment_student`, enrollement);
        return response.data;
    } catch (error) {
        console.error('Error creating new enrollment  :', error);
        
    }
};

