import React, { useRef } from 'react'
import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationProp,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens
import Home from '../screens/Home/Home'
import Details from '../screens/Details/Details'

// types
export type MainStackParamsList = {
  Home: undefined
  Details: { login: string }
}

export type StackNavigation = NavigationProp<MainStackParamsList>

const Stack = createNativeStackNavigator<MainStackParamsList>()

const MainNavigation = () => {
  const navigationRef =
    useRef<NavigationContainerRef<MainStackParamsList>>(null)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
