import React from "react";
import { TextInput, View } from "react-native";
import Text from "@kaloraat/react-native-text";

const UserInput = ({
  name,
  value,
  setValue,
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text semi>{name}</Text>
      <TextInput
        style={{
          borderBottomWidth: 0.5,
          height: 48,
          borderBottomColor: "#8e93a1",
          marginBottom: 30,
        }}
        value={value} 
        onChangeText={setValue}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default UserInput;
