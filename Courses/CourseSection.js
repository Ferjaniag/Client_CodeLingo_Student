
import React , {useEffect, useState,useContext} from 'react'
import Dialog from "react-native-dialog";
import { View , StyleSheet , Text, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { createEnrollementCourse } from '../Profile/EnrollementAPI';
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CoursesSection({ idCourse ,title, description}) {
  const [state, setState] = useContext(AuthContext);
  const [userId,setuserId] = useState(false);
  const [visibleEnroll, setVisibleEnroll] = useState(false);
  const [dataEnroll,setDataEnroll] = useState({});
  const navigation=useNavigation() ;

//const userId='6648631c818ad87c98d07858' ;

useEffect(() => {
  const fetchData = async () => {
    const dataString = await AsyncStorage.getItem("@auth");
    const data = JSON.parse(dataString);
   
    setState(data);

    setuserId(data.user._id)
  };
  fetchData();
}, [navigation]); 

const showDialog = () => {
   
  setVisibleEnroll(true);
 
};

const CloseDialog = () => {
  setVisibleEnroll(false);
};




const enrollCourse=async ()=> {

 
  try {
   const  data={
      idUser : userId , 
      idCourse : idCourse ,
      progress : 0
    }
    setDataEnroll(data)
const enroll=await createEnrollementCourse(data)

console.log("data response entroll ",enroll)
navigation.navigate('Units' , { courseID: idCourse , course : title})
setVisibleEnroll(false);

  } catch (error) {
console.log("error enroll course", error)
  }
  
}


  return (
    <View style= {styles.container}>
 <TouchableOpacity  onPress={() => navigation.navigate('Units' , { courseID: idCourse , course : title})}>

<LinearGradient
      colors={['#7659F1', 'rgba(118, 89, 241, 0.28)']}
      style={styles.sectionContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >


  
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionDescription}>{description}</Text>

    <TouchableOpacity style={styles.button} onPress={() => showDialog()}>
            <Text style={styles.buttonText}>Enroll </Text>
          </TouchableOpacity>
  
     
   </LinearGradient>
</TouchableOpacity>

<Dialog.Container visible={visibleEnroll} contentStyle={styles.dialog}>
   
   <Dialog.Description style={styles.descDialog}>
  
   Would you like to enroll {title} Course ?
Begin the course now !
  
   </Dialog.Description>
    
  <Dialog.Button  style={styles.labelDialog} label="Cancel"  onPress={() => CloseDialog()}  />  
  <Dialog.Button  style={styles.labelDialog} label="Start"  onPress={() => enrollCourse()}  /> 
  
 </Dialog.Container>

  
 </View>
  )


}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 35,
      padding: 15,
     
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    borderRadius: 15,
     height : 150,
     width : 340 ,
     alignItems : 'center', 
     justifyContent :'center'
    },
    sectionTitle: {
      color: "white" , 
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionDescription: {
      fontSize: 14,
      color: "white" , 
      paddingTop : 30,
      textAlign : 'center'
    },

    button: {
      //padding : 10 , 
      width : 110,
      marginTop : 5 ,
      height : 30 ,
      backgroundColor : "#FCC329" ,
      justifyContent : 'center',
      alignContent : 'center',
      borderRadius : 10
  }, 

    buttonText : {
      color : 'white',
      fontSize : 16 , 
      textAlign : 'center'
    },
    titleDialog : {
      color : '#1F1244' , 
      fontFamily : 'sans-serif',
      fontSize : 15 , 
    }, 
    descDialog : {
      color : '#1F1244' , 
      fontFamily : 'sans-serif',
      fontSize : 14 , 
    }, 
    
    labelDialog : {
      color : '#7659F1' , 
      fontFamily : 'sans-serif',
      fontSize : 15 , 
    } ,
    
    dialog : {
     
      borderRadius : 10 , 
      backgroundColor :'#FFF7FC',
  
      borderRadius : 20,
     
     
      
    }
  
   
  });