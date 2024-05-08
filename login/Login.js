import React, { useContext, useState } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/UserInput";
import RoundedButton from "../components/RoundedButton";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../context/auth";

const Login = () => {
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
      const { data } = await axios.post(`${process.env.API_URL}/signin`, {
        email: email,
        password: password,
      });

      if(data.error) {
        alert(data.error);
        setLoading(false);
      }else{

        //! save in context
        setstate(data);

        //! response in async storage 
        await AsyncStorage.setItem('@auth',JSON.stringify(data));

        setLoading(true);
        console.log("Login success =>", data);
        navigation.navigate('Welcome');


      }

     

      

    } catch (error) {
      console.error("Login failed:", error.message);
      Alert.alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };


  const loadFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log('from async storage',data);
  };

  loadFromAsyncStorage();


  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor:'#1F1244'}}>
      <Text title center bold style={{ marginBottom: 30, color:'white' }}>
        Login
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

      <RoundedButton title={"Login"} handleSubmit={handleSubmit} loading={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text center style={{ marginTop: 10, color: '#35e9bc' }}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
