import React from 'react'
import { StyleSheet,View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import RoadMapExplorer from './RoadMap/RoadMapExplorer';
import CoursesExplorer from './Courses/CoursesExplorer';
import TabNavigation from './TabNavigation';
import UnitsScreen from './Units/UnitsScreen';
import OverViewLessons from './Lessons/OverViewLessons';
import EnrollLessonScreen from './Enroll/EnrollLessonScreen';
import EnrollExercise from './Enroll/EnrollExercise';

import Signup from "./signup/Signup";
import Login from "./login/Login";
import Welcome from "./login/Welcome";
import { AuthContext, AuthProvider } from "./context/auth";


const Stack = createStackNavigator();

const AppNavigator = () => (
  <AuthProvider>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
       
     <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Road-Map" component={RoadMapExplorer} />
        <Stack.Screen name="Courses" component={CoursesExplorer} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Units" component={UnitsScreen} />
        <Stack.Screen name="Over-View-Lessons" component={OverViewLessons} />
        <Stack.Screen name="Enroll-Lesson" component={EnrollLessonScreen} />
        <Stack.Screen name="Enroll-Exercise" component={EnrollExercise} />

        <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Welcome' component={Welcome} />

    </Stack.Navigator>
    </AuthProvider>

   
);

export default AppNavigator;
