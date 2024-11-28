import React, { useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import RoundedButton from "../components/RoundedButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../services/authService";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password and Confirm Password must match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(name, email, password, confirmPassword); // Call the signup service

      Alert.alert("Signup successful! Please log in.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Signup failed:", error.message);
      Alert.alert(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#1F1244" }}
    >
      <Text title center bold style={{ marginBottom: 30, color: "white" }}>
        Signup
      </Text>

      <UserInput name={"Name"} value={name} setValue={setName} />
      <UserInput
        name={"Email"}
        value={email}
        autoCompleteType="email"
        keyboardType="email-address"
        setValue={setEmail}
      />
      <UserInput
        name={"Password"}
        value={password}
        autoCompleteType="password"
        secureTextEntry={true}
        setValue={setPassword}
      />
      <UserInput
        name={"Confirm Password"}
        value={confirmPassword}
        autoCompleteType="password"
        secureTextEntry={true}
        setValue={setConfirmPassword}
      />

      <RoundedButton
        title={"Sign up"}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text center style={{ marginTop: 10, color: "#35e9bc" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
