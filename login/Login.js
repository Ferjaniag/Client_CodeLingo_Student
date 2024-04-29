import React, { useState } from "react";
import { View, Alert } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import RoundedButton from "../components/RoundedButton";


const Login = () => {
    

return(
    <View style={{ flex: 1, justifyContent: "center" }}>
    <Text title center style={{ marginBottom: 30 }}>
      Signup
    </Text>

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
   

    <RoundedButton
      title={"Login"}
      loading={loading}
    />
  </View>
);

}

export default Login;