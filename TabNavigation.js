import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import RoadMapExplorer from './RoadMap/RoadMapExplorer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from './SplashScreen';
import ProfileScreen from './Profile/ProfileScreen';
import { StyleSheet } from 'react-native';
import EnrolledCourses from './Profile/EnrolledCourses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { shadow } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
    activeColor="#7F5DF0" 
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7F5DF0',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { position: 'absolute' , 
        backgroundColor : "#DBD4EF" ,
        bottom : 10, 
        left : 20 , 
        right : 20 ,
        elevation: 0, 
        height : 50 ,
        borderRadius : 15 ,
...styles.shadow
    
    },
      }}
  

     >
      <Tab.Screen name="RoadMap" component={RoadMapExplorer} 
      
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home" size={26} />
        ),
      }}
      />
       <Tab.Screen name="EnrolledCourses" component={EnrolledCourses}
       options={{
        tabBarLabel: 'Enrollements',
        tabBarIcon: () => (
            <MaterialCommunityIcons name="progress-star" size={26} />
        ),
      }} />

      <Tab.Screen name="Profile" component={ProfileScreen}
       options={{
        tabBarLabel: 'Profile',
        tabBarIcon: () => (
            <MaterialCommunityIcons name="account-outline" size={26} />
        ),
      }} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
   shadow: {
    shadowColor : "#7F5DF0",
    shadowOffset : {
        width : 0 ,
        height : 10 ,
    } ,
    shadowOpacity : 0.25 ,
    shadowRadius : 3.5 ,
    elevation : 5
   }
})