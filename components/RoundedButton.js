import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text"

const RoundedButton = ({title,handleSubmit, loading}) => {
  return (
  
      <TouchableOpacity
      onPress={handleSubmit}
        style={{
          backgroundColor: "#35e9bc",
          height: 50,
          justifyContent: "center",
          marginBottom: 20,
          marginHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <Text bold semi center>
          {loading ? 'please wait...' :title}
        </Text>
      </TouchableOpacity>
    
  );
};

export default RoundedButton;
