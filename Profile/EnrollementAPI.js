import axios from "axios";


export const getEnrollmentCourses = async (userId) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/enrollments/${userId}`);
      
   //   console.log('from funcc enrollementssss ', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching enrollment ddataa :', error);
        
    }
};

export const getEnrollmentByIdCourse = async (idCourse) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/enrollment_idc/${idCourse}`);
      console.log('FROM FUNC enrollement ', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching enrollment ddataa :', error);
        
    }
};


export const createEnrollementCourse = async (enrollement) => {
    try {
       // console.log("enrollmentttt1 : ",enrollement)
        const response = await axios.post(`${process.env.API_URL}/enrollment_student`, enrollement);
        return response.data;
    } catch (error) {
        console.error('Error creating new enrollment  :', error);
        
    }
};

export const updateEnrollProgress = async (data) => {
    try {
      //  console.log("data : ",data)
        const response = await axios.put(`${process.env.API_URL}/enrollement/updateLessonProgress`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating new enrollment  :', error);
        
    }
};



