import React, { useState } from "react";
import { View, Alert } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import RoundedButton from "../components/RoundedButton";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      Alert.alert("Password and Confirm Password must match");
      setLoading(false);
      return;
    }

    console.log("message");
    console.log(name, email, password, confirmPassword);

    try {
      const { data } = await axios.post("http://192.168.1.104:5002/signup", {
        username: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      console.log("Signup success =>", data);
      Alert.alert("Signup success");
    } catch (error) {
      console.error("Signup failed:", error.message);
      Alert.alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text title center style={{ marginBottom: 30 }}>
        Signup
      </Text>

      <UserInput name={"Name"} value={name} setValue={setName} />
      <UserInput
        name={"Email"}
        value={email}
        autoCompleteType='email'
        keyboardType='email-address'
        setValue={setEmail}
      />
      <UserInput
        name={"Password"}
        value={password}
        autoCompleteType='password'
        secureTextEntry={true}
        setValue={setPassword}
      />
      <UserInput
        name={"Confirm Password"}
        value={confirmPassword}
        autoCompleteType='password'
        secureTextEntry={true}
        setValue={setConfirmPassword}
      />

      <RoundedButton
        title={"Sign up"}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

export default Signup;
