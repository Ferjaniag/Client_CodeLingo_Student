import axios from "axios";

export const getEnrollmentCourses = async (userId) => {
  try {
    console.log("mmff");
    const response = await axios.get(
      `${process.env.API_URL}/enrollments/${userId}`
    );

    console.log("from funcc enrollementssss ");
    return response.data;
  } catch (error) {
    console.error("Error fetching enrollment ddataa :", error);
  }
};

export const getEnrollmentByIdCourse = async (courseId, userId) => {
  try {
    console.log("beforffe seending", `${process.env.API_URL}/enrollment_idc`);
    const response = await axios.get(
      `${process.env.API_URL}/enrollment_idc/${courseId}/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching enrollment DATA1 :", error);
  }
};

export const createEnrollementCourse = async (enrollement) => {
  try {
    console.log("teffst", enrollement);
    console.log(`here : ${process.env.API_URL}`);
    const response = await axios.post(
      `${process.env.API_URL}/enrollment_student`,
      enrollement
    );
    return response.data;
  } catch (error) {
    console.error("Error creating new enrollment  :", error);
  }
};

export const updateEnrollProgress = async (data) => {
  try {
    console.log("data : ", data);
    const response = await axios.put(
      `${process.env.API_URL}/enrollement/updateLessonProgress`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating  enrollment progress  :", error);
  }
};
