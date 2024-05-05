import React , { useState, useEffect } from 'react'
import { View , StyleSheet, Text,TouchableOpacity , Image, ScrollView } from 'react-native'
import CoursesSection from './CourseSection'
import { useNavigation } from '@react-navigation/native'
import { getCoursesByCategory } from './CourseAPI'


export default function CoursesExplorer( {route} ) {

  const navigation = useNavigation();
  const category = route.params.category ;
  
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          try {
              const data = await getCoursesByCategory(category);
              setCoursesData(data);
              console.log("data ", coursesData)
              
          } catch (error) {
              setError(error);
              console.log("ERRROOORR ",error)
          } finally {
              setIsLoading(false);
          }
      };

      fetchData();
  }, [category]); // Refetch data when userId changes

  if (isLoading) {
      return <Text>Loading...</Text>;
  }

  
  if (error) {
      return <Text>Error: {error.message}</Text>;
  }
  return (
    <View style= {styles.container}>

<View style= {styles.header}> 

<TouchableOpacity onPress={()=> navigation.navigate('Road-Map')}>
      <Image
        source={require('../assets/icon-back.png')} 
        style = {styles.icon}
      />
    </TouchableOpacity>

    <Text style={styles.title}> {category} </Text>
</View>
        <Text style={styles.title2}> Choose the {category} you want to learn </Text>

        <ScrollView>
{ coursesData.length === 0 ? (<Text style={styles.notFound}> No Courses published yet... ! </Text> ) : 
(
  coursesData.map((course, index)=> (
    <CoursesSection 
    key={index}
    idCourse={course._id}
    title= {course.title}
  description={course.description}
  />
  ))
) }

</ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex : 1 ,
      backgroundColor: '#1F1244', 
      alignItems: 'center',
     justifyContent : 'flex-start',
      

    },
    title : {
        color: '#35E9BC',
        fontSize : 20 ,
        fontStyle : 'italic' ,
        fontFamily : 'sans-serif',
        marginTop : 60
       
      }, 
      title2 : {
        color: 'white',
        fontSize : 18 ,
        fontWeight : 'bold' ,
        textAlign : 'center',
        marginTop : 50 ,
        margin : 15 ,
        fontFamily : 'sans-serif'
      },
      header : {
        flexDirection: 'row', 
       marginTop: 10, 
       justifyContent : 'center',
       margin : 5
      } , 
      icon : {
        marginRight : 15 ,
        marginTop : 60 , 
        right : 25 ,
       width : 35 , 
       height : 35
      },
      notFound : {
        color : 'white' ,
        justifyContent : 'center',
        alignItems : "flex-end",
        top : 150, 
        fontSize : 20,
        fontStyle : 'italic' 
      }
})


