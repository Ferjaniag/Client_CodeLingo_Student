import React from 'react'

import RoadMapSection from './RoadMapSection'
import { Text, View } from 'react-native'

export default function RoadMapExplorer() {
  return (
   <View >
     <Text>Roadmap Explorer</Text>
    <RoadMapSection title="FrontEnd Development" subtitle="Discover the Web Development Technologies">
      <Text>HTML</Text>
      <Text>CSS</Text>
      <Text>JAVASCRIPT</Text>
    </RoadMapSection>
    <RoadMapSection title="BackEnd Development" subtitle="Discover the Server Side Technologies">
      <Text>NODE</Text>
      <Text>SOL</Text>
      <Text>EXPRESS</Text>
    </RoadMapSection>
   </View>
  )
}
