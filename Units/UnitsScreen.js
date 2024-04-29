import React , {useEffect,useState} from 'react'

import { View , StyleSheet, Text, TouchableOpacity , Image , ScrollView} from 'react-native'
import UnitSection from './UnitSection'
import { useNavigation } from '@react-navigation/native' 
import { getUnitsByIdCourse } from './UnitAPI'

export default function UnitsScreen( {route} ) {

  const navigation=useNavigation()
  const courseID= route.params.courseID
  
  const course = route.params.course


 const [unitsData, setUnitsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          try {
              const data = await getUnitsByIdCourse(courseID);
              setUnitsData(data)
          } catch (error) {
              setError(error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchData();
  }, [courseID]); // Refetch data when ID changes

  if (isLoading) {
      return <Text>Loading...</Text>;
  }

  
  if (error) {
      return <Text>Error: {error.message}</Text>;
  }







  
  return (
    <View style={styles.container}>
    <View style= {styles.header}> 

<TouchableOpacity onPress={()=> navigation.goBack()}>
      <Image
        source={require('../assets/icon-back.png')} 
        style = {styles.icon}
      />
    </TouchableOpacity>

    <Text style={styles.title}> Learning Path </Text>
   
</View>
<Text style={styles.courseName}> {course} </Text>

<ScrollView>

{unitsData.length === 0 ? 
<Text style={styles.notFound} > No Units Published Yet ... </Text> : ( 

unitsData.map((unit,index)=> (
<UnitSection 
key={index}
unitID={unit._id}
unitName={unit.title}
courseName={course}/>
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
    header : {
      flexDirection: 'row', 
     marginTop: 10, 
    // justifyContent : 'justify-content',
     margin : 5
    } , 
    icon : {
      marginRight : 15 ,
      marginTop : 60 , 
      right : 65 ,
     width : 35 , 
     height : 35, 
     
    },
courseName : {
  color : 'white',
  fontSize : 20 , 
  fontWeight : 'bold', 
  fontFamily : 'sans-serif' , 
  marginTop : 25 ,
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
