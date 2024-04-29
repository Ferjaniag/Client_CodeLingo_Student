import React , {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View , StyleSheet, TouchableOpacity, Image, Text , ScrollView} from 'react-native'
import LessonBloc from './LessonBloc'
import { getLessonsByUnit } from './LessonAPI';

export default function OverViewLessons( {route}) {

    const navigation = useNavigation() 
    const courseName= route.params.courseName 
    const unitName=route.params.unitName
    const unitID= route.params.unitID
   

    const [lessonsData, setLessonsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getLessonsByUnit(unitID);
                setLessonsData(data)
                console.log("Lessons Data : ",data.length)
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
  
        fetchData();
    }, [unitID]); // Refetch data when ID changes
  
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

    <Text style={styles.title}> {courseName} </Text>
   
</View>
<View style={styles.underHeader}>
<Text style={styles.unitTitle}> {unitName} </Text>

<AnimatedCircularProgress
style= {styles.progress}
  size={55}
  width={7}
  fill={0}
  tintColor="#FCC329"
  backgroundColor="#332462">
  {
    (fill) => (
      <Text style={styles.progressNumber}>
      0%
      </Text>
    )
  }
</AnimatedCircularProgress>
</View>


<View style={styles.blocContainer}>
<LessonBloc lessonNumber="1"
isDone={false}
/>

    <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical: 5 }}>
      <LessonBloc lessonNumber="2" isDone={false} />
      <View style={{ marginHorizontal: 35 }} /> 
      <LessonBloc lessonNumber="3" isDone={false} />
    </View>

    </View>
    






  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex : 1 ,
      backgroundColor: '#1F1244', 
      alignItems: 'center',
      justifyContent: 'flex-start',

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
        right : 85 ,
       width : 35 , 
       height : 35, 
       
      },
      unitTitle : {
        color : 'white',
  fontSize : 20 , 
  fontWeight : 'bold', 
  fontFamily : 'sans-serif' , 
  textAlign :'right' ,

 
      },
      progress : {  
     alignItems: 'flex-end',
     marginLeft : 5,
   
      },
      progressNumber : {
        color :'white',
        fontSize: 12 ,
        fontWeight : 'bold', 
        fontFamily : 'sans-serif' , 
      },
      underHeader : {
        flexDirection : 'row' ,
        alignItems:"center",
       marginTop: 10,

      },
      blocContainer : {
        alignContent : 'center', 
        alignItems : 'center'
      }
     
})