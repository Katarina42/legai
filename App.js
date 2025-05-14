import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IntroScreen from './screens/IntroScreen'
import ChatScreen from './screens/ChatScreen'
import InfoScreen from "./screens/InfoScreen";


const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
