import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
