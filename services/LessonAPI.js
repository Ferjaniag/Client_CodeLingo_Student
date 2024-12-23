import axios from "axios";

export const getLessonsByUnit = async (unitID) => {
  try {
    console.log("test lessons");
    const response = await axios.get(
      `${process.env.API_URL}/get_lessons/${unitID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons data :", error);
  }
};

export const getLessonByID = async (lessonID) => {
  try {
    console.log("test lesson id");
    const response = await axios.get(
      `${process.env.API_URL}/get_lesson/${lessonID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson data :", error);
  }
};
