import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (email, password) => {
  try {
    console.log(`${process.env.API_URL}/signin`);
    const { data } = await axios.post(`${process.env.API_URL}/signin`, {
      email,
      password,
    });

    if (data.error) {
      throw new Error(data.error);
    }

    // Save response in AsyncStorage
    await AsyncStorage.setItem("@auth", JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred during login.");
  }
};

export const registerUser = async (name, email, password, confirmPassword) => {
  try {
    const { data } = await axios.post(`${process.env.API_URL}/signup`, {
      username: name,
      email,
      password,
      confirmPassword,
    });

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred during signup.");
  }
};
