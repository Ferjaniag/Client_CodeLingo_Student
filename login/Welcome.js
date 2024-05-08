import React, { useState, useEffect, useContext } from "react";
import { View, Alert } from "react-native";
import Text from "@kaloraat/react-native-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const dataString = await AsyncStorage.getItem("@auth");
      const data = JSON.parse(dataString);
      setState(data);
    };
    fetchData();
  }, [navigation]); // Refresh data when navigating back to this screen

  const signOut = async () => {
    await AsyncStorage.removeItem("@auth");
    setState({ token: "", user: null }); // Update the state after logout
    navigation.navigate('Login');
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text center>{JSON.stringify(state, null, 4)}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text center bold style={{ marginTop: 50 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
