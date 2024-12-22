import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./pages/SplashScreen";
import RoadMapExplorer from "./pages/RoadMap/RoadMapExplorer";
import CoursesExplorer from "./pages/Courses/CoursesExplorer";
import TabNavigation from "./TabNavigation";
import UnitsScreen from "./pages/Units/UnitsScreen";
import OverViewLessons from "./pages/Lessons/OverViewLessons";
import EnrollLessonScreen from "./pages/Enroll/EnrollLessonScreen";
import EnrollExercise from "./pages/Enroll/EnrollExercise";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { AuthProvider } from "./context/auth";
import EnrolledCourses from "./pages/Profile/EnrolledCourses";
import InstructionsPage from "./pages/quiz/InstructionsPage";
import QuizPage from "./pages/quiz/QuizPage";
import Result from "./pages/quiz/Result";
import ListOfBadges from "./pages/badges/ListOfBadges";
import ListOfPortfolios from "./pages/portfolio/Portfolio";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <AuthProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="sign-up" component={Signup} />

      <Stack.Screen name="Road-Map" component={RoadMapExplorer} />

      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Courses" component={CoursesExplorer} />

      <Stack.Screen name="Units" component={UnitsScreen} />
      <Stack.Screen name="Over-View-Lessons" component={OverViewLessons} />
      <Stack.Screen name="Enroll-Lesson" component={EnrollLessonScreen} />
      <Stack.Screen name="Enroll-Exercise" component={EnrollExercise} />

      <Stack.Screen name="EnrolledCourses" component={EnrolledCourses} />
      <Stack.Screen name="InstructionsPage" component={InstructionsPage} />
      <Stack.Screen name="QuizPage" component={QuizPage} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="ListOfBadges" component={ListOfBadges} />
      <Stack.Screen name="Portfolio" component={ListOfPortfolios} />
    </Stack.Navigator>
  </AuthProvider>
);

export default AppNavigator;
