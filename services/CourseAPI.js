import axios from "axios";

export const getCoursesByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/get_courses_by_category/${category}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching courses data :", error);
  }
};

export const getEnrollementCourses = async (userId) => {
  try {
    console.log("USER ID", userId);
    const response = await axios.get(
      `${process.env.API_URL}/enrollments/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching courses enrollements data :", error);
  }
};
