import React from 'react'

import { StyleSheet } from 'react-native'
import RoadMapSection from './RoadMapSection'
import { Text, View , TouchableOpacity} from 'react-native'


export default function RoadMapExplorer() {
  return (

   <View style={styles.container} >
    

     <Text  style={styles.title} >Roadmap Explorer</Text>
     <Text  style={styles.title2} > What do you want to learn ?</Text>
    <RoadMapSection title="FrontEnd Development"
     subtitle="Discover the Web Development" 
     srcImage= {require('../assets/front-end.png')}
    >
      <Text style={styles.language}>HTML</Text>
      <Text style={styles.language}>CSS</Text>
      <Text style={styles.language} >JAVASCRIPT</Text>
    </RoadMapSection>
    
    <RoadMapSection title="BackEnd Development"
     subtitle="Discover the Server Side"
    srcImage= {require('../assets/back-end.png')}>

      <Text style={styles.language}>NODE</Text>
      <Text style={styles.language}>SOL</Text>
      <Text style={styles.language}>EXPRESS</Text>
    </RoadMapSection>

    <RoadMapSection title="Programming Languages" 
    subtitle="Dive into the principles foundation of coding"
    srcImage= {require('../assets/prog-languages.png')} >

<Text style={styles.language}>Python</Text>
<Text style={styles.language}>Java</Text>
<Text style={styles.language}>C++</Text>

</RoadMapSection>


   </View>
  )
}


const styles = StyleSheet.create({
  container: {

    flex : 1 ,
    backgroundColor: '#1F1244', // Corrected color code
    alignItems: 'center',
   
    //justifyContent: 'center',
  },

  title : {
    color: '#35E9BC',
    fontSize : 25 ,
   marginTop : 50 ,
    fontWeight : 'bold' ,
    fontFamily : 'sans-serif'
  }, 
  title2 : {
    color: 'white',
    fontSize : 18 ,
    fontWeight : 'bold' ,
    marginTop : 20 ,
    fontFamily : 'sans-serif'
  },

  language : {
    fontSize : 12 ,
    width : 100,
    backgroundColor: '#7659F1',
    borderRadius: 20,
    color : 'white',
    fontWeight : 'bold', 
    justifyContent : 'center' ,
    marginRight: 10,
    paddingVertical: 5, 
    paddingHorizontal: 10, 
  
  }
  
  
  


})