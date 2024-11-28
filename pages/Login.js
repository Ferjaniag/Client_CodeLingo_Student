import React, { useContext, useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import RoundedButton from "../components/RoundedButton";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../context/auth";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //!context
  const [state, setstate] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      Alert.alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password); // Call the login service

      setstate(data);

      navigation.navigate("Tabs");
    } catch (error) {
      console.error("Login failed:", error.message);
      Alert.alert(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#1F1244" }}
    >
      <Text title center bold style={{ marginBottom: 30, color: "white" }}>
        Login
      </Text>

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

      <RoundedButton
        title={"Login"}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
        <Text center style={{ marginTop: 10, color: "#35e9bc" }}>
          Don't have an account? Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}
