import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setstate] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      setstate({ ...state, user: as.user, token: as.token });

      console.log("tesstt");
    };

    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setstate]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
