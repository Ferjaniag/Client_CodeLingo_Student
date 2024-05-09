import React , {useEffect, useState}from 'react'

import { View , StyleSheet , ScrollView, Text, TouchableOpacity ,
   Image} from 'react-native'
 import CodeEditor from '@rivascva/react-native-code-editor';
import { executeCode } from './ExerciseAPI';
import Dialog from "react-native-dialog";
import { Clipboard } from 'react-native';


export default function PrbolemSolvExercise({exercise,onAnswerVerification}) {
  
   const [code,setCode]=useState('') ; 
   const [output,setOutput]= useState('') ;
   const [visibleHelp, setVisibleHelp] = useState(false);
   const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  

  
  
   const showDialog = () => {
    setVisibleHelp(true);
  };

  const handleCancel = () => {
    setVisibleHelp(false);
  };

  const handleCopy =()=> {
    Clipboard.setString(exercise.solution);
    setVisibleHelp(false);
  }


  const handleCodeChange = (newCode) => {
    setCode(newCode);

  
    const solutionCorrect = newCode === exercise.solution;
    setIsAnswerCorrect(solutionCorrect);
    onAnswerVerification(solutionCorrect);

    console.log("I'm in problem solv comp: ",solutionCorrect)
  };

  const runCode = async () => {

    console.log("code :",code) ; 

    const sourceCode= code ; 
    const language=exercise.language ; 
    if (!sourceCode) return ; 
     try {
const {run:result} = await executeCode(language,sourceCode)
setOutput(result.output) ;
console.log("output", output)
     } catch(error) {
      console.log('ERROR ',error) ;
     }
  }

  return (
    <View   style={{flex:1}}> 
       
    
     <Text style={styles.question}> {exercise.question}  </Text> 
    
  <CodeEditor
            style={{
                fontSize: 12,
                inputLineHeight: 26,
                highlighterLineHeight: 26,
                marginTop : 17 , 
                backgroundColor : '#1F1244', 
                height : '35%'
            }}
            language="javascript"
            showLineNumbers
            onChange={handleCodeChange}
          />  
          

          <View style={styles.buttons}> 

            <TouchableOpacity
              style={[styles.buttonStyle]}
              onPress={ ()=> showDialog()}
            >
              <Image
                source={require('../assets/help.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonStyle]}
              onPress={ ()=> runCode()}
            >
              <Image
                source={require('../assets/run.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
        
        
          </View>

          <Text style={styles.outputTitle} > Output </Text>
              <ScrollView  style={styles.output}> 
      
                <Text style={styles.question} >
                 {output}
                 
                </Text>
               
              </ScrollView>

              <Dialog.Container visible={visibleHelp} contentStyle={styles.dialog}>
        <Dialog.Title style={styles.titleDialog}>Help solving</Dialog.Title>
        <Dialog.Description style={styles.descDialog}>
        {exercise.solution}
        </Dialog.Description>
        <Dialog.Button  style={styles.labelDialog} label="Copy" onPress={handleCopy} />
        <Dialog.Button  style={styles.labelDialog}  label="Cancel" onPress={handleCancel} />
      </Dialog.Container>

     </View>
  )
}


const styles = StyleSheet.create({
   
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
      buttonStyle :  {
        position: 'relative',
        width : 40, 
        height : 40 ,
        backgroundColor : '#1F1244' ,
        justifyContent : 'center',
        alignContent : 'center',
        borderRadius : 50,
       // left : 50

       
    }, 
  
    icon : {
        width : 20 , 
        height : 20, 
        left : 10 , 
    }, 
buttons : {
  flexDirection : 'row' , 
  marginTop : 15, 
  justifyContent : 'space-between'
} , 
outputTitle : {
  fontSize : 16 ,
  fontWeight : 'bold',
  color : '#1F1244' ,
  marginTop : 15
} ,
output : {
  backgroundColor : "#EEEEEE" ,
  borderRadius : 10, 
  marginTop : 10 ,
  padding : 15 ,
  marginBottom : 5 ,

}, 
titleDialog : {
  color : '#1F1244' , 
  fontFamily : 'sans-serif',
  fontSize : 15 , 
}, 
descDialog : {
  color : '#1F1244' , 
  fontFamily : 'sans-serif',
  fontSize : 12 , 
}, 

labelDialog : {
  color : '#7659F1' , 
  fontFamily : 'sans-serif',
  fontSize : 15 , 
} ,

dialog : {
  backgroundColor : "#FFF7FC",
  borderRadius : 10
}

   

})