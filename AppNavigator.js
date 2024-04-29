import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen";
import RoadMapExplorer from "./RoadMap/RoadMapExplorer";
import CoursesExplorer from "./Courses/CoursesExplorer";
import TabNavigation from "./TabNavigation";
import UnitsScreen from "./Units/UnitsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Road-Map" component={RoadMapExplorer} />
        <Stack.Screen name="Courses" component={CoursesExplorer} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Units" component={UnitsScreen} /> 
  </Stack.Navigator>
);

export default AppNavigator;
