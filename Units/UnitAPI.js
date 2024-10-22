import axios from "axios";


export const getUnitsByIdCourse = async (courseID) => {
    try {
        console.log('again')
        const response = await axios.get(`${process.env.API_URL}/get_units/${courseID}`);
       
        return response.data;
    } catch (error) {
        console.error('Error fetching units data :', error);
        
    }
};