import React from "react";
import { TextInput, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import { Colors } from "react-native/Libraries/NewAppScreen";

const UserInput = ({
  name,
  value,
  setValue,
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text semi style={{color:'white'}}>{name}</Text>
      <TextInput
        style={{
          borderBottomWidth: 0.5,
          height: 48,
          borderBottomColor: "white",
          marginBottom: 30,
          color: "white"
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
