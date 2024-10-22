import axios from "axios";


export const getEnrollmentCourses = async (userId) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/enrollments/${userId}`);
      
      console.log('from funcc enrollements ', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching enrollment dataa :', error);
        
    }
};


export const createEnrollementCourse = async (enrollement) => {
    try {
        console.log("enrollment1 : ",enrollement)
        const response = await axios.post(`${process.env.API_URL}/enrollment_student`, enrollement);
        return response.data;
    } catch (error) {
        console.error('Error creating new enrollment  :', error);
        
    }
};

