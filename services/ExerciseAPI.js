import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/language_versions";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const getExercisesByIDLesson = async (lessonID) => {
  try {
    console.log("test exercise");
    const response = await axios.get(
      `${process.env.API_URL}/get_exercises_by_lesson/${lessonID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises data :", error);
  }
};

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });

  return response.data;
};
