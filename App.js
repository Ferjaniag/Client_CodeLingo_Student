import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';


export default function App() {
  return (
    <> 
    <StatusBar style="auto" /> 
  <NavigationContainer>
    
    <AppNavigator/>
  
  </NavigationContainer>
</>
  );
}


