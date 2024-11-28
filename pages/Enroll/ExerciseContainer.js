import React , {useEffect, useState}from 'react'

import { View , StyleSheet , ScrollView, Text} from 'react-native'
import Checkbox from 'expo-checkbox';
import RadioGroup from 'react-native-radio-buttons-group';

export default function ExerciseContainer({exercise, onAnswerVerification}) {
  
    const [isMultipleChoiceExercises, setIsMultipleChoiceExercises]= useState(false) ;
    const [iseSingleChoiceExercises, setIsSingleChoiceExercises]= useState(false) ; 
    const [isCheckedArray, setIsCheckedArray] = useState([false, false]);
    const [selectedId, setSelectedId] = useState();
    const [radio_props,setRadioProps] = useState([]) ;
    const [options_multiple,setOptionsMultiple] = useState([]) ;
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [arrayChecked,setArrayChecked] = useState([])
   


useEffect(()=> {

   setIsMultipleChoiceExercises(false);
  setIsSingleChoiceExercises(false);
  setIsCheckedArray([]);
  setSelectedId(undefined);
  setRadioProps([]);
  setOptionsMultiple([]);

  console.log("exercise type",exercise.type)
    if (exercise.type==='Multiple Choice') {
        setIsMultipleChoiceExercises(true) ;
      
        exercise.options.map((option,index)=> {
      
          var newLine= { id: index, label: option.text , value: option.checked}
          setOptionsMultiple(prevOptions => [...prevOptions, newLine]);
        })

      
  
      } else if (exercise.type==='Single Choice') {
        setIsSingleChoiceExercises(true) ; 
       
        exercise.options.map((option,index)=> {
      
          var newLine= { id: index, label: option.text , value: option.checked, borderColor: '#7659F1', color: "#7659F1"}
         setRadioProps(prevOptions => [...prevOptions, newLine])
        })
      
      }
},[exercise])
   

    const handleSelectedRadio =(value) => {
      setSelectedId(value) ; 
      const selectedRadioValue = radio_props[value].value // Access the value of the selected radio button

      if (selectedRadioValue=== true) {
        setIsAnswerCorrect(true);

        onAnswerVerification(true)
      } else {
        setIsAnswerCorrect(false);

        onAnswerVerification(false)
      }
     
    }
    
    const handleCheckboxChange = (index) => {
      const updatedArray = [...isCheckedArray];
      updatedArray[index] = !updatedArray[index];
      setIsCheckedArray(updatedArray);
    
      if (updatedArray[index]) {
        arrayChecked.push(options_multiple[index].value);
      } else {
        const valueIndex = arrayChecked.indexOf(options_multiple[index].value);
        if (valueIndex !== -1) {
          arrayChecked.splice(valueIndex, 1);
        }
      }
    console.log("array checked", arrayChecked)
      if (arrayChecked.includes(false)) {
        setIsAnswerCorrect(false);
        onAnswerVerification(false);
      }
      else {
        setIsAnswerCorrect(true);
        onAnswerVerification(true);
      }
    };  
     
      

  return (
    <ScrollView style={{ flex: 1 , }} > 
       
    
     <Text style={styles.question}> {exercise.question} </Text> 
    
  
  <View style={styles.options}>
     {iseSingleChoiceExercises === true && (
     
  <RadioGroup 
    radioButtons={radio_props} 
    onPress={(value) => handleSelectedRadio(value)}
    selectedId={selectedId}
    containerStyle={styles.radioButtons}
  />
)}

{isMultipleChoiceExercises === true && 
  options_multiple.map((option, index) => (
    <View key={index} style={styles.section}>
      <Checkbox 
        style={styles.checkbox} 
        value={isCheckedArray[index]}
        onValueChange={() => handleCheckboxChange(index)}
        color={"#7659F1"}
      />
      <Text style={styles.paragraph}>{option.label}</Text>
    </View>
  ))
}

</View>
    
     </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex : 1 ,
      backgroundColor: '#1F1244', 
      alignItems: 'center',
      justifyContent: 'center',

    },
    question : {
        color : '#1F1244' , 
        marginTop : 20 ,
        fontFamily : 'sans-serif',
        fontSize : 15 , 
  
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph: {
        fontSize: 15,
      },
      checkbox: {
        margin: 8,
        color : "#7659F1"
      },
      radioButtons :{
        flexDirection: 'column', 
        alignItems: 'flex-start',
      },
      options : {
        marginTop : 15
      }

})